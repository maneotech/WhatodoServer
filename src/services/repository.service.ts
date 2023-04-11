
import mongoose, { ObjectId } from 'mongoose'
import { IModel, ObjId } from '../interfaces/model.interface';
import { MongooseService } from './mongoose.service';
import RepositoryHook, { IHookConf, RepositoryHookConf, IRepositoryHookCallback } from './repository.hook.service';
import { UtilitiesService } from './utilities.service';

interface IDocumentDefault extends mongoose.Document<ObjectId>, IModel {}

export type Model<T> = mongoose.Model<T>;
export type Selectors<T> = mongoose.FilterQuery<T>;
export type Populate = (string | mongoose.PopulateOptions)[];
export type Projection = string[] | { [key in string] : 0|1 }
export type UpdateData<T> = mongoose.UpdateQuery<T>
export type DeleteResult = {
  acknowledged: boolean;
  deletedCount: number;
};

export interface OptionsPage {
  skip : number,
  limit : number
};

export interface Options extends mongoose.QueryOptions {
  full_projections? : boolean;
};

export interface UpdateOptions extends Options {
  updateDocumentLinkedToo? : boolean;
};

export interface UpdateMultiOptions extends UpdateOptions {
  forceReturnDocuments? : boolean;
};

export interface DeleteOptions extends Options {
  deleteDocumentLinkedToo? : boolean;
};

export interface DeleteMultiOptions extends DeleteOptions {
  forceReturnDocuments? : boolean;
};


export type CustomPopulate = string
export type CustomPopulates = CustomPopulate[]


export default class Repository<IDocument extends IDocumentDefault = IDocumentDefault, IInitiator = any> {
  private model : Model<IDocument>;
  private customPopulate : CustomPopulates;
  private hookConf : RepositoryHookConf;
  protected linkField : string = 'link';  // field name contains a link id between some documents of same collection
  protected deleteLinkedDocumentAutomaticaly : boolean = false;

  constructor(model : Model<IDocument>, hookConf : IHookConf = null, customPopulate : string | CustomPopulates = null) {
    this.model = model;
    this.hookConf = new RepositoryHookConf(hookConf);
    this.setCustomPopulate(customPopulate);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    OPTIONS     ******************* //
  // ****************************************************** //
  // ****************************************************** //

  static convertOptionsToOptionsPage(options : Options) : OptionsPage {
    return {
      skip : options?.skip,
      limit : options?.limit
    };
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    CONF     ************************ //
  // ****************************************************** //
  // ****************************************************** //

  setHookConf(conf : IHookConf) {
    this.hookConf.setConf(conf);
  }

  enableDebug() {
    mongoose.set('debug', true);
  }

  disableDebug() {
    mongoose.set('debug', false);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    PROJECTION     ******************* //
  // ****************************************************** //
  // ****************************************************** //

  formatProjection(projection : Projection, full : boolean = false) : Projection {
    if (full) {
      projection = [];
      for (let k in this.model.schema.obj) {
        projection.push('+' + k);
      }
    }
    return projection;
  }


  // ****************************************************** //
  // ****************************************************** //
  // ******************    POPULATE     ******************* //
  // ****************************************************** //
  // ****************************************************** //

  static convertPopulateToPopulateOptions(populate : Populate) : mongoose.PopulateOptions[] {
    let result : mongoose.PopulateOptions[] = [];
    if (populate) {
      for (let p of populate) {
        if (typeof p === 'string') {
          result.push({path : p});
        } else {
          result.push(p);
        }
      }
    }
    return result;
  }

  formatPopulates(populates : Populate) : Populate{
    if (!populates) {
      populates = [];
    }
    return populates;
  }

  getCustomPopulates(populates : Populate) : CustomPopulates {
    var result = [];
    if (populates && this.customPopulate.length) {
      result = populates.filter((p) => {
        if (UtilitiesService.isString(p)) {
          return this.customPopulate.indexOf(p.toString()) < 0;
        }
        return true;
      });
    }
    return result;
  }

  setCustomPopulate(customPopulate : string | CustomPopulates) {
    if (customPopulate) {
      if (UtilitiesService.isString(customPopulate)) {
        this.customPopulate = [customPopulate.toString()];
      } else if (Array.isArray(customPopulate)) {
        this.customPopulate = customPopulate;
      } else {
        this.customPopulate = [];
      }
    } else {
      this.customPopulate = [];
    }
  }

  async preExecuteCustomPopulateIfPossible(populates : Populate, projection : Projection, options : Options) {
    if (this.preExecuteCustomPopulate) {
      let customPopulates : CustomPopulates = this.getCustomPopulates(populates);
      for (let customPopulate of customPopulates) {
        var result = this.preExecuteCustomPopulate(customPopulate, populates, projection, options);
        if (result instanceof Promise) {
          result = await result;
        }
      }
    }
  }

  async executeCustomPopulateIfPossible(obj : IDocument, populate : CustomPopulate) {
    var result = obj;
    if (this.executeCustomPopulate) {
      result = this.executeCustomPopulate(obj, populate);
      if (result instanceof Promise) {
        result = await result;
      }
    }
    return result;
  }


  // ****************************************************** //
  // ****************************************************** //
  // ******************    Selectors     ******************* //
  // ****************************************************** //
  // ****************************************************** //

  formatSelectors(selectors : Selectors<IDocument>) : Selectors<IDocument> {
    if (!selectors) {
      selectors = {};
    }
    return {... selectors}; // copy
  }
  
  async preSelectorsIfPossible(selectors : Selectors<IDocument>) {
    if (this.preSelectors) {
      var result = this.preSelectors(selectors);
      if (result instanceof Promise) {
        result = await result;
      }
    }
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    Options     ******************* //
  // ****************************************************** //
  // ****************************************************** //

  formatOptions(options : Options, defaultOptions : Options = {}, projection : Projection = null) : Options {
    if (!options) {
      options = defaultOptions;
    } else {
      if (defaultOptions) {
        let keys = Object.keys(defaultOptions);
        for (let key of keys) {
          if (!(key in options)) {
            options[key] = defaultOptions[key];
          }
        }
      }
    }

    if (projection) {
      options.projection = projection;
    }
    return options;
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    RESULT     ************************ //
  // ****************************************************** //
  // ****************************************************** //

  // Get one result
  async getResultAndExecutePopulates(asyncFind, populates : Populate) {
    var result = null;
    if (asyncFind) {
      let _populates : Populate = [...populates];
      let customPopulates = this.getCustomPopulates(_populates);
      _populates = _populates.filter((p) => {
        if (UtilitiesService.isString(p)) {
          return customPopulates.indexOf(p.toString()) < 0;
        }
        return true;
      });
      if (_populates.length) {
        for (let populate of _populates) {
          asyncFind.populate(populate);
        }
      }
      result = await asyncFind;
      if (result) {
        for (let customPopulate of customPopulates) {
          result = await this.executeCustomPopulateIfPossible(result, customPopulate);
        }
      }
    }
    return result;
  }

  // Get array result
  async getResultsAndExecutePopulates(asyncFind, populates : Populate) {
    var result = [];
    if (asyncFind) {
      let _populates = [...populates];
      let customPopulates = this.getCustomPopulates(_populates);
      _populates = _populates.filter((p) => {
        if (UtilitiesService.isString(p)) {
          return customPopulates.indexOf(p.toString()) < 0;
        }
        return true;
      });
      if (_populates.length) {
        for (let populate of _populates) {
          asyncFind.populate(populate);
        }
      }
      result = await asyncFind;
      if (result && result.length) {
        let promises = [];
        for (var i = 0; i < result.length; i++) {
          let promise = new Promise(async (resolve) => {
            let r = result[i];
            for (let customPopulate of customPopulates) {
              r = await this.executeCustomPopulateIfPossible(r, customPopulate);
            }
            resolve(r);
          });
          promises.push(promise);
        }

        result = await Promise.all(promises);
      }
    }
    return result;
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    GET     ************************ //
  // ****************************************************** //
  // ****************************************************** //

  // projection - two format is possible : 
  //    - dictionnnary : {_id: 1, data: 1} or {data: 0} to include or exclude field
  //    - string : "_id data" or "-data" or "+data"
  // options - exemple : {sort: {'createdAt': -1}, limit: 20, ...}
  // https://mongoosejs.com/docs/api/model.html#model_Model.find 
  async get(selectors : Selectors<IDocument>, populates : Populate = [], projection : Projection = null, options : Options = null, initiator : IInitiator = null) : Promise<IDocument[]> {
    projection = this.formatProjection(projection, options?.full_projections);
    options = this.formatOptions(options);
    populates = this.formatPopulates(populates);
    selectors = this.formatSelectors(selectors);

    await this.preSelectorsIfPossible(selectors);
    await this.preExecuteCustomPopulateIfPossible(populates, projection, options);
    var asyncFind = this.model.find(selectors, projection, options);
    if (options.lean) {
      asyncFind.lean();
    }
    let result = await this.getResultsAndExecutePopulates(asyncFind, populates);
    return (result);
  }

  // projection - two format is possible : 
  //    - dictionnnary : {_id: 1, data: 1} or {data: 0} to include or exclude field
  //    - string : "_id data" or "-data" or "+data"
  // options - exemple : {sort: {'createdAt': -1}, limit: 20, ...}
  // https://mongoosejs.com/docs/api/model.html#model_Model.findOne
  async getOne(selectors : Selectors<IDocument>, populates : Populate = [], projection : Projection = null, options : Options = null, initiator : IInitiator = null) : Promise<IDocument> {
    projection = this.formatProjection(projection, options?.full_projections);
    options = this.formatOptions(options);
    populates = this.formatPopulates(populates);
    selectors = this.formatSelectors(selectors);

    await this.preSelectorsIfPossible(selectors);
    await this.preExecuteCustomPopulateIfPossible(populates, projection, options);
    var asyncFind = this.model.findOne(selectors, projection, options);
    if (options.lean) {
      asyncFind.lean();
    }
    let result = await this.getResultAndExecutePopulates(asyncFind, populates);
    return (result);
  }

  async getById(id : ObjId, populates : Populate = [], projection : Projection = null, options : Options = null, initiator : IInitiator = null) : Promise<IDocument> {
    if (!id) {
      return null;
    }
    return await this.getOne({_id : id} as any, populates, projection, options, initiator);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    UPDATE     ********************* //
  // ****************************************************** //
  // ****************************************************** //

  // https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
  async updateOne(selectors : Selectors<IDocument>, data : UpdateData<IDocument>, populates : Populate = [], projection : Projection = null, options : UpdateOptions = null, initiator : IInitiator = null) : Promise<IDocument> {
    projection = this.formatProjection(projection, options?.full_projections);
    options = this.formatOptions(options, { new : true}, projection);
    populates = this.formatPopulates(populates);
    selectors = this.formatSelectors(selectors);

    await this.preSelectorsIfPossible(selectors);
    await this.preExecuteCustomPopulateIfPossible(populates, null, options);
    let hook = new RepositoryHook(this, this.hookConf, initiator);
    if (!options.hookDisabled && hook.hookUpdateOneAvailable()) {
      if (options.new || options.projection) {
        if (hook.conf.hookUpdateOneNeedLastDocuments()) {
          let last = await this.getOne(selectors, populates);
          hook.setLastDocument(last);
        }
      }
    }
    var asyncFind = this.model.findOneAndUpdate(selectors, data, options);
    if (options.lean) {
      asyncFind.lean();
    }
    let result = await this.getResultAndExecutePopulates(asyncFind, populates);
    if (this.linkField && options.updateDocumentLinkedToo) {
      await this.updateMulti({[this.linkField] : result[this.linkField]} as any, data);
    }
    if (!options.hookDisabled && hook.hookUpdateOneAvailable()) {
      if (options.new) {
        if (hook.conf.hookUpdateOneNeedNewDocuments()) {
          hook.setNewDocument(result);
        }
        hook.callHookUpdateOne(options.hookData);
      }
    }
    return (result);
  }

  async updateById(id : ObjId, data : UpdateData<IDocument>, populates : Populate = [], projection : Projection = null, options : UpdateOptions = null, initiator : IInitiator = null) : Promise<IDocument> {
    if (!id) {
      return null;
    }
    return await this.updateOne({ _id: id } as any, data, populates, projection, options, initiator);
  }

  // option.forceReturnDocuments = true allows to return all documents updated
  //https://mongoosejs.com/docs/api/model.html#model_Model.update
  async updateMulti(selectors : Selectors<IDocument>, data : UpdateData<IDocument>, populates : Populate = [], projection : Projection = null, options : UpdateMultiOptions = null, initiator : IInitiator = null) : Promise<IDocument[]> {
    options = this.formatOptions(options, { new : true});
    selectors = this.formatSelectors(selectors);

    let result = null;
    if (options.forceReturnDocuments || options.updateDocumentLinkedToo) {
      let documents = await this.get(selectors, [], null, options);
      if (documents) {
        let promises = [];
        for (let doc of documents) {
          let promise = this.updateById(doc._id, data, populates, projection, options, initiator);
          promises.push(promise);
        }
        result = await Promise.all(promises);
      }
      return result;
    }

    await this.preSelectorsIfPossible(selectors);
    let hook = new RepositoryHook(this, this.hookConf, initiator);
    if (!options.hookDisabled && hook.hookUpdateMultiAvailable()) {
      if (hook.conf.hookUpdateMultiNeedLastDocuments()) {
        let lastDocuments = await this.get(selectors);
        hook.setLastDocuments(lastDocuments);
      }
    }
    result = await this.model.updateMany(selectors, data, options);
    if (!options.hookDisabled && hook.hookUpdateMultiAvailable()) {
      if (hook.conf.hookUpdateMultiNeedNewDocuments()) {
        let newDocuments = await this.get(selectors);
        hook.setNewDocuments(newDocuments);
      }
      hook.callHookUpdateMulti(options.hookData);
    }
    return (result);
  }


  async createOrUpdateOne(selectors : Selectors<IDocument>, data : UpdateData<IDocument>, populates : Populate = [], projection : Projection = null, options : UpdateOptions = null, initiator : IInitiator = null) : Promise<IDocument> {
    options = this.formatOptions(options, { new : true});

    options['upsert'] = true;
    options['setDefaultsOnInsert'] = true;
    var result = await this.updateOne(selectors, data, populates, projection, options, initiator);
    return result;
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    CREATE     ********************* //
  // ****************************************************** //
  // ****************************************************** //

  //https://mongoosejs.com/docs/api/model.html#model_Model.create
  async create(data : Partial<IDocument>, populates : Populate = [], projection : Projection = null, options : Options = null, initiator : IInitiator = null) : Promise<IDocument> { // RETURN DOC CREATED
    options = this.formatOptions(options);

    let hook = new RepositoryHook(this, this.hookConf, initiator);
    let result = await this.model.create(data);
    if (!options.hookDisabled && hook.hookCreateAvailable()) {
      if (result) {
        if (Array.isArray(result)) {
          hook.setNewDocuments(result);
        } else {
          hook.setNewDocument(result);
        }
      }
      
      hook.callHookCreate(options.hookData);
    }
    return result;
  }

  async createMany(data : Partial<IDocument>[], populates : Populate = [], projection : Projection = null, options : Options = null, initiator : IInitiator = null) : Promise<IDocument[]> { // ARRAY
    let promises = [];
    for (let d of data) {
      promises.push(this.create(d, populates, projection, options, initiator));
    }
    return await Promise.all(promises);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    DELETE     ********************* //
  // ****************************************************** //
  // ****************************************************** //

  async deleteById(id : ObjId, populates : Populate = [], projection : Projection = null, options : DeleteOptions = null, initiator : IInitiator = null) : Promise<IDocument> {
    if (!id) {
      return null;
    }
    return await this.deleteOne({ _id: id } as any, populates, projection, options, initiator);
  }

  //https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne
  async deleteOne(selectors : Selectors<IDocument>, populates : Populate = [], projection : Projection = null, options : DeleteOptions = null, initiator : IInitiator = null) : Promise<IDocument> {
    options = this.formatOptions(options, { new : true});
    selectors = this.formatSelectors(selectors);

    await this.preSelectorsIfPossible(selectors);
    let hook = new RepositoryHook(this, this.hookConf, initiator);
    var lastDocuments = [];
    if (!options.hookDisabled && hook.hookDeleteAvailable()) {
      lastDocuments = await this.get(selectors);
    }
    var result = await this.model.findOneAndDelete(selectors, options);
    if (this.linkField && (this.deleteLinkedDocumentAutomaticaly || options.updateDocumentLinkedToo)) {
      await this.deleteMulti({[this.linkField] : result[this.linkField]} as any);
    }
    if (!options.hookDisabled && lastDocuments.length && hook.hookDeleteAvailable()) {
      let newDocuments = await this.get(selectors);
      lastDocuments = lastDocuments.filter((d) => !newDocuments.find((n) => MongooseService.areSameIds(d, n)));
      if (lastDocuments.length) {
        hook.setNewDocuments(lastDocuments);
        hook.callHookDelete(options.hookData);
      }
    }
    return result;
  }

  //https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany
  async deleteMulti(selectors : Selectors<IDocument>, populates : Populate = [], projection : Projection = null, options : DeleteMultiOptions = null, initiator : IInitiator = null) : Promise<IDocument[] | DeleteResult> {
    options = this.formatOptions(options, { new : true});
    selectors = this.formatSelectors(selectors);


    if (options.forceReturnDocuments || (this.deleteLinkedDocumentAutomaticaly || options.updateDocumentLinkedToo)) {
      const documents = await this.get(selectors, [], null, options);
      let result : IDocument[] = null;
      if (documents) {
        const promises = [];
        for (let doc of documents) {
          const promise = this.deleteById(doc._id, populates, projection, options, initiator);
          promises.push(promise);
        }
        result = await Promise.all<IDocument>(promises);
      }
      return result;
    }

    await this.preSelectorsIfPossible(selectors);
    let hook = new RepositoryHook(this, this.hookConf, initiator);
    var lastDocuments = [];
    if (!options.hookDisabled && hook.hookDeleteAvailable()) {
      lastDocuments = await this.get(selectors);
    }
    var result = await this.model.deleteMany(selectors, options);
    if (!options.hookDisabled && lastDocuments.length && hook.hookDeleteAvailable()) {
      let newDocuments = await this.get(selectors);
      lastDocuments = lastDocuments.filter((d) => !newDocuments.find((n) => MongooseService.areSameIds(d, n)));
      if (lastDocuments.length) {
        hook.setNewDocuments(lastDocuments);
        hook.callHookDelete(options.hookData);
      }
    }
    return result;
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    COUNT     ********************* //
  // ****************************************************** //
  // ****************************************************** //

  async count(selectors : Selectors<IDocument>, initiator : IInitiator = null) : Promise<number> {
    selectors = this.formatSelectors(selectors);
    
    await this.preSelectorsIfPossible(selectors);
    return await this.model.countDocuments(selectors);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    EXIST     ********************* //
  // ****************************************************** //
  // ****************************************************** //

  async exists(selectors : Selectors<IDocument>, initiator : IInitiator = null) : Promise<boolean> {
    let result = false;
    if (await this.getOne(selectors, [], ["_id"])) {
      result = true;
    }
    return result;
  }

  async existsById(id : ObjId, initiator : IInitiator = null) : Promise<boolean> {
    return await this.exists({_id : id} as any, initiator);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    SEARCH     ************************ //
  // ****************************************************** //
  // ****************************************************** //

  getStrRegexSearch(search : string) : string {
    var regex = "";
    if (search) {
      let searches = search.split(" ");
      for (let s of searches) {
        s = s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
        if (s.length) {
          regex += "(?=.*" + s + ")";
        }
      }
      regex = UtilitiesService.diacriticSensitiveRegex(regex);
      if (regex.length && searches.length > 1) {
        regex += "(.*\\s.*)";
      }
    }
    return regex;
  }

  // fields : string or array
  // options - exemple : {sort: {'createdAt': -1}, limit: 20, countryCallingCode : '+33', ...}
  async search(search : string, fields : (keyof IDocument) | (keyof IDocument)[], selectors : Selectors<IDocument> = null, populates : Populate = [], projection : Projection = null, options : Options = null, initiator : IInitiator = null) : Promise<IDocument[]> {
    selectors = this.formatSelectors(selectors);
    let _fields : (keyof IDocument)[] = [];
    if (typeof fields === 'string') _fields = [fields];
    else _fields = fields as (keyof IDocument)[];

    let strRegex = this.getStrRegexSearch(search);
    let regex = { $regex: strRegex, $options: "i" };

    let orConditionResearch = [];
    for (let field of _fields) {
      orConditionResearch.push({ [field]: regex });
      if (options) {
        let countryCallingCode = options.countryCallingCode;
        if (countryCallingCode) {
          if ((field as string).toLowerCase().indexOf('phone') >= 0) {
            if (search.startsWith('0')) {
              let searchPhone = search.replace('0', countryCallingCode);
              orConditionResearch.push({ [field]: { $regex: this.getStrRegexSearch(searchPhone), $options: "i" } });
            }
          }
        }
      }
    }

    if (selectors['$or']) {
      selectors['$and'] = [{ $or: orConditionResearch }, { $or: selectors['$or'] }] as any;
      delete selectors['$or'];
    } else {
      selectors['$or'] = orConditionResearch;
    }

    let result = await this.get(selectors, populates, projection, options);
    return (result);
  }

  async searchCount(search : string, fields : (keyof IDocument) | (keyof IDocument)[], selectors : Selectors<IDocument> = null, options : Options = null, initiator : IInitiator = null) : Promise<number> {
    selectors = this.formatSelectors(selectors);
    let _fields : (keyof IDocument)[] = [];
    if (typeof fields === 'string') _fields = [fields];
    else _fields = fields as (keyof IDocument)[];


    let strRegex = this.getStrRegexSearch(search);
    let regex = { $regex: strRegex, $options: "i" };

    let orConditionResearch = [];
    for (let field of _fields) {
      orConditionResearch.push({ [field]: regex });
      if (options) {
        let countryCallingCode = options.countryCallingCode;
        if (countryCallingCode) {
          if ((field as string).toLowerCase().indexOf('phone') >= 0) {
            if (search.startsWith('0')) {
              let searchPhone = search.replace('0', countryCallingCode);
              orConditionResearch.push({ [field]: { $regex: this.getStrRegexSearch(searchPhone), $options: "i" } });
            }
          }
        }
      }
    }

    if (selectors['$or']) {
      selectors['$and'] = [{ $or: orConditionResearch }, { $or: selectors['$or'] }] as any;
      delete selectors['$or'];
    } else {
      selectors['$or'] = orConditionResearch;
    }

    let result = await this.count(selectors);
    return (result);
  }

  // ****************************************************** //
  // ****************************************************** //
  // ******************    Aggregate     ************************ //
  // ****************************************************** //
  // ****************************************************** //
  async aggregate(pipeline : any[], initiator : IInitiator = null) : Promise<IDocument[]> {
    return await this.model.aggregate(pipeline).exec();
  }
 
  // ****************************************************** //
  // ****************************************************** //
  // ******************    ABSTRACT DECLARATIONS     ********************* //
  // ****************************************************** //
  // ****************************************************** //
  preExecuteCustomPopulate?(populate: CustomPopulate, populates : Populate, projection : Projection, options : Options)
  executeCustomPopulate?(obj : IDocument, populate : CustomPopulate)
  preSelectors?(selectors : Selectors<IDocument>);
  hookUpdate?(lastDoc : IDocument, newDoc : IDocument, data : Partial<IDocument>) : void;
  hookCreate?(newDoc : IDocument, data : Partial<IDocument>) : void;
  hookDelete?(newDoc : IDocument, data : Partial<IDocument>) : void;
}

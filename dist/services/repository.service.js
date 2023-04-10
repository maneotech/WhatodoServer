"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_service_1 = require("./mongoose.service");
const repository_hook_service_1 = __importStar(require("./repository.hook.service"));
const utilities_service_1 = require("./utilities.service");
;
;
;
;
;
;
class Repository {
    constructor(model, hookConf = null, customPopulate = null) {
        this.linkField = 'link'; // field name contains a link id between some documents of same collection
        this.deleteLinkedDocumentAutomaticaly = false;
        this.model = model;
        this.hookConf = new repository_hook_service_1.RepositoryHookConf(hookConf);
        this.setCustomPopulate(customPopulate);
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    OPTIONS     ******************* //
    // ****************************************************** //
    // ****************************************************** //
    static convertOptionsToOptionsPage(options) {
        return {
            skip: options === null || options === void 0 ? void 0 : options.skip,
            limit: options === null || options === void 0 ? void 0 : options.limit
        };
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    CONF     ************************ //
    // ****************************************************** //
    // ****************************************************** //
    setHookConf(conf) {
        this.hookConf.setConf(conf);
    }
    enableDebug() {
        mongoose_1.default.set('debug', true);
    }
    disableDebug() {
        mongoose_1.default.set('debug', false);
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    PROJECTION     ******************* //
    // ****************************************************** //
    // ****************************************************** //
    formatProjection(projection, full = false) {
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
    static convertPopulateToPopulateOptions(populate) {
        let result = [];
        if (populate) {
            for (let p of populate) {
                if (typeof p === 'string') {
                    result.push({ path: p });
                }
                else {
                    result.push(p);
                }
            }
        }
        return result;
    }
    formatPopulates(populates) {
        if (!populates) {
            populates = [];
        }
        return populates;
    }
    getCustomPopulates(populates) {
        var result = [];
        if (populates && this.customPopulate.length) {
            result = populates.filter((p) => {
                if (utilities_service_1.UtilitiesService.isString(p)) {
                    return this.customPopulate.indexOf(p.toString()) < 0;
                }
                return true;
            });
        }
        return result;
    }
    setCustomPopulate(customPopulate) {
        if (customPopulate) {
            if (utilities_service_1.UtilitiesService.isString(customPopulate)) {
                this.customPopulate = [customPopulate.toString()];
            }
            else if (Array.isArray(customPopulate)) {
                this.customPopulate = customPopulate;
            }
            else {
                this.customPopulate = [];
            }
        }
        else {
            this.customPopulate = [];
        }
    }
    preExecuteCustomPopulateIfPossible(populates, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.preExecuteCustomPopulate) {
                let customPopulates = this.getCustomPopulates(populates);
                for (let customPopulate of customPopulates) {
                    var result = this.preExecuteCustomPopulate(customPopulate, populates, projection, options);
                    if (result instanceof Promise) {
                        result = yield result;
                    }
                }
            }
        });
    }
    executeCustomPopulateIfPossible(obj, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = obj;
            if (this.executeCustomPopulate) {
                result = this.executeCustomPopulate(obj, populate);
                if (result instanceof Promise) {
                    result = yield result;
                }
            }
            return result;
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    Selectors     ******************* //
    // ****************************************************** //
    // ****************************************************** //
    formatSelectors(selectors) {
        if (!selectors) {
            selectors = {};
        }
        return Object.assign({}, selectors); // copy
    }
    preSelectorsIfPossible(selectors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.preSelectors) {
                var result = this.preSelectors(selectors);
                if (result instanceof Promise) {
                    result = yield result;
                }
            }
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    Options     ******************* //
    // ****************************************************** //
    // ****************************************************** //
    formatOptions(options, defaultOptions = {}, projection = null) {
        if (!options) {
            options = defaultOptions;
        }
        else {
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
    getResultAndExecutePopulates(asyncFind, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = null;
            if (asyncFind) {
                let _populates = [...populates];
                let customPopulates = this.getCustomPopulates(_populates);
                _populates = _populates.filter((p) => {
                    if (utilities_service_1.UtilitiesService.isString(p)) {
                        return customPopulates.indexOf(p.toString()) < 0;
                    }
                    return true;
                });
                if (_populates.length) {
                    for (let populate of _populates) {
                        asyncFind.populate(populate);
                    }
                }
                result = yield asyncFind;
                if (result) {
                    for (let customPopulate of customPopulates) {
                        result = yield this.executeCustomPopulateIfPossible(result, customPopulate);
                    }
                }
            }
            return result;
        });
    }
    // Get array result
    getResultsAndExecutePopulates(asyncFind, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = [];
            if (asyncFind) {
                let _populates = [...populates];
                let customPopulates = this.getCustomPopulates(_populates);
                _populates = _populates.filter((p) => {
                    if (utilities_service_1.UtilitiesService.isString(p)) {
                        return customPopulates.indexOf(p.toString()) < 0;
                    }
                    return true;
                });
                if (_populates.length) {
                    for (let populate of _populates) {
                        asyncFind.populate(populate);
                    }
                }
                result = yield asyncFind;
                if (result && result.length) {
                    let promises = [];
                    for (var i = 0; i < result.length; i++) {
                        let promise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                            let r = result[i];
                            for (let customPopulate of customPopulates) {
                                r = yield this.executeCustomPopulateIfPossible(r, customPopulate);
                            }
                            resolve(r);
                        }));
                        promises.push(promise);
                    }
                    result = yield Promise.all(promises);
                }
            }
            return result;
        });
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
    get(selectors, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            projection = this.formatProjection(projection, options === null || options === void 0 ? void 0 : options.full_projections);
            options = this.formatOptions(options);
            populates = this.formatPopulates(populates);
            selectors = this.formatSelectors(selectors);
            yield this.preSelectorsIfPossible(selectors);
            yield this.preExecuteCustomPopulateIfPossible(populates, projection, options);
            var asyncFind = this.model.find(selectors, projection, options);
            if (options.lean) {
                asyncFind.lean();
            }
            let result = yield this.getResultsAndExecutePopulates(asyncFind, populates);
            return (result);
        });
    }
    // projection - two format is possible : 
    //    - dictionnnary : {_id: 1, data: 1} or {data: 0} to include or exclude field
    //    - string : "_id data" or "-data" or "+data"
    // options - exemple : {sort: {'createdAt': -1}, limit: 20, ...}
    // https://mongoosejs.com/docs/api/model.html#model_Model.findOne
    getOne(selectors, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            projection = this.formatProjection(projection, options === null || options === void 0 ? void 0 : options.full_projections);
            options = this.formatOptions(options);
            populates = this.formatPopulates(populates);
            selectors = this.formatSelectors(selectors);
            yield this.preSelectorsIfPossible(selectors);
            yield this.preExecuteCustomPopulateIfPossible(populates, projection, options);
            var asyncFind = this.model.findOne(selectors, projection, options);
            if (options.lean) {
                asyncFind.lean();
            }
            let result = yield this.getResultAndExecutePopulates(asyncFind, populates);
            return (result);
        });
    }
    getById(id, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return null;
            }
            return yield this.getOne({ _id: id }, populates, projection, options, initiator);
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    UPDATE     ********************* //
    // ****************************************************** //
    // ****************************************************** //
    // https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
    updateOne(selectors, data, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            projection = this.formatProjection(projection, options === null || options === void 0 ? void 0 : options.full_projections);
            options = this.formatOptions(options, { new: true }, projection);
            populates = this.formatPopulates(populates);
            selectors = this.formatSelectors(selectors);
            yield this.preSelectorsIfPossible(selectors);
            yield this.preExecuteCustomPopulateIfPossible(populates, null, options);
            let hook = new repository_hook_service_1.default(this, this.hookConf, initiator);
            if (!options.hookDisabled && hook.hookUpdateOneAvailable()) {
                if (options.new || options.projection) {
                    if (hook.conf.hookUpdateOneNeedLastDocuments()) {
                        let last = yield this.getOne(selectors, populates);
                        hook.setLastDocument(last);
                    }
                }
            }
            var asyncFind = this.model.findOneAndUpdate(selectors, data, options);
            if (options.lean) {
                asyncFind.lean();
            }
            let result = yield this.getResultAndExecutePopulates(asyncFind, populates);
            if (this.linkField && options.updateDocumentLinkedToo) {
                yield this.updateMulti({ [this.linkField]: result[this.linkField] }, data);
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
        });
    }
    updateById(id, data, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return null;
            }
            return yield this.updateOne({ _id: id }, data, populates, projection, options, initiator);
        });
    }
    // option.forceReturnDocuments = true allows to return all documents updated
    //https://mongoosejs.com/docs/api/model.html#model_Model.update
    updateMulti(selectors, data, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            options = this.formatOptions(options, { new: true });
            selectors = this.formatSelectors(selectors);
            let result = null;
            if (options.forceReturnDocuments || options.updateDocumentLinkedToo) {
                let documents = yield this.get(selectors, [], null, options);
                if (documents) {
                    let promises = [];
                    for (let doc of documents) {
                        let promise = this.updateById(doc._id, data, populates, projection, options, initiator);
                        promises.push(promise);
                    }
                    result = yield Promise.all(promises);
                }
                return result;
            }
            yield this.preSelectorsIfPossible(selectors);
            let hook = new repository_hook_service_1.default(this, this.hookConf, initiator);
            if (!options.hookDisabled && hook.hookUpdateMultiAvailable()) {
                if (hook.conf.hookUpdateMultiNeedLastDocuments()) {
                    let lastDocuments = yield this.get(selectors);
                    hook.setLastDocuments(lastDocuments);
                }
            }
            result = yield this.model.updateMany(selectors, data, options);
            if (!options.hookDisabled && hook.hookUpdateMultiAvailable()) {
                if (hook.conf.hookUpdateMultiNeedNewDocuments()) {
                    let newDocuments = yield this.get(selectors);
                    hook.setNewDocuments(newDocuments);
                }
                hook.callHookUpdateMulti(options.hookData);
            }
            return (result);
        });
    }
    createOrUpdateOne(selectors, data, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            options = this.formatOptions(options, { new: true });
            options['upsert'] = true;
            options['setDefaultsOnInsert'] = true;
            var result = yield this.updateOne(selectors, data, populates, projection, options, initiator);
            return result;
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    CREATE     ********************* //
    // ****************************************************** //
    // ****************************************************** //
    //https://mongoosejs.com/docs/api/model.html#model_Model.create
    create(data, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            options = this.formatOptions(options);
            let hook = new repository_hook_service_1.default(this, this.hookConf, initiator);
            let result = yield this.model.create(data);
            if (!options.hookDisabled && hook.hookCreateAvailable()) {
                if (result) {
                    if (Array.isArray(result)) {
                        hook.setNewDocuments(result);
                    }
                    else {
                        hook.setNewDocument(result);
                    }
                }
                hook.callHookCreate(options.hookData);
            }
            return result;
        });
    }
    createMany(data, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            for (let d of data) {
                promises.push(this.create(d, populates, projection, options, initiator));
            }
            return yield Promise.all(promises);
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    DELETE     ********************* //
    // ****************************************************** //
    // ****************************************************** //
    deleteById(id, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return null;
            }
            return yield this.deleteOne({ _id: id }, populates, projection, options, initiator);
        });
    }
    //https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne
    deleteOne(selectors, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            options = this.formatOptions(options, { new: true });
            selectors = this.formatSelectors(selectors);
            yield this.preSelectorsIfPossible(selectors);
            let hook = new repository_hook_service_1.default(this, this.hookConf, initiator);
            var lastDocuments = [];
            if (!options.hookDisabled && hook.hookDeleteAvailable()) {
                lastDocuments = yield this.get(selectors);
            }
            var result = yield this.model.findOneAndDelete(selectors, options);
            if (this.linkField && (this.deleteLinkedDocumentAutomaticaly || options.updateDocumentLinkedToo)) {
                yield this.deleteMulti({ [this.linkField]: result[this.linkField] });
            }
            if (!options.hookDisabled && lastDocuments.length && hook.hookDeleteAvailable()) {
                let newDocuments = yield this.get(selectors);
                lastDocuments = lastDocuments.filter((d) => !newDocuments.find((n) => mongoose_service_1.MongooseService.areSameIds(d, n)));
                if (lastDocuments.length) {
                    hook.setNewDocuments(lastDocuments);
                    hook.callHookDelete(options.hookData);
                }
            }
            return result;
        });
    }
    //https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany
    deleteMulti(selectors, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            options = this.formatOptions(options, { new: true });
            selectors = this.formatSelectors(selectors);
            if (options.forceReturnDocuments || (this.deleteLinkedDocumentAutomaticaly || options.updateDocumentLinkedToo)) {
                const documents = yield this.get(selectors, [], null, options);
                let result = null;
                if (documents) {
                    const promises = [];
                    for (let doc of documents) {
                        const promise = this.deleteById(doc._id, populates, projection, options, initiator);
                        promises.push(promise);
                    }
                    result = yield Promise.all(promises);
                }
                return result;
            }
            yield this.preSelectorsIfPossible(selectors);
            let hook = new repository_hook_service_1.default(this, this.hookConf, initiator);
            var lastDocuments = [];
            if (!options.hookDisabled && hook.hookDeleteAvailable()) {
                lastDocuments = yield this.get(selectors);
            }
            var result = yield this.model.deleteMany(selectors, options);
            if (!options.hookDisabled && lastDocuments.length && hook.hookDeleteAvailable()) {
                let newDocuments = yield this.get(selectors);
                lastDocuments = lastDocuments.filter((d) => !newDocuments.find((n) => mongoose_service_1.MongooseService.areSameIds(d, n)));
                if (lastDocuments.length) {
                    hook.setNewDocuments(lastDocuments);
                    hook.callHookDelete(options.hookData);
                }
            }
            return result;
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    COUNT     ********************* //
    // ****************************************************** //
    // ****************************************************** //
    count(selectors, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            selectors = this.formatSelectors(selectors);
            yield this.preSelectorsIfPossible(selectors);
            return yield this.model.countDocuments(selectors);
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    EXIST     ********************* //
    // ****************************************************** //
    // ****************************************************** //
    exists(selectors, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            if (yield this.getOne(selectors, [], ["_id"])) {
                result = true;
            }
            return result;
        });
    }
    existsById(id, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.exists({ _id: id }, initiator);
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    SEARCH     ************************ //
    // ****************************************************** //
    // ****************************************************** //
    getStrRegexSearch(search) {
        var regex = "";
        if (search) {
            let searches = search.split(" ");
            for (let s of searches) {
                s = s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
                if (s.length) {
                    regex += "(?=.*" + s + ")";
                }
            }
            regex = utilities_service_1.UtilitiesService.diacriticSensitiveRegex(regex);
            if (regex.length && searches.length > 1) {
                regex += "(.*\\s.*)";
            }
        }
        return regex;
    }
    // fields : string or array
    // options - exemple : {sort: {'createdAt': -1}, limit: 20, countryCallingCode : '+33', ...}
    search(search, fields, selectors = null, populates = [], projection = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            selectors = this.formatSelectors(selectors);
            let _fields = [];
            if (typeof fields === 'string')
                _fields = [fields];
            else
                _fields = fields;
            let strRegex = this.getStrRegexSearch(search);
            let regex = { $regex: strRegex, $options: "i" };
            let orConditionResearch = [];
            for (let field of _fields) {
                orConditionResearch.push({ [field]: regex });
                if (options) {
                    let countryCallingCode = options.countryCallingCode;
                    if (countryCallingCode) {
                        if (field.toLowerCase().indexOf('phone') >= 0) {
                            if (search.startsWith('0')) {
                                let searchPhone = search.replace('0', countryCallingCode);
                                orConditionResearch.push({ [field]: { $regex: this.getStrRegexSearch(searchPhone), $options: "i" } });
                            }
                        }
                    }
                }
            }
            if (selectors['$or']) {
                selectors['$and'] = [{ $or: orConditionResearch }, { $or: selectors['$or'] }];
                delete selectors['$or'];
            }
            else {
                selectors['$or'] = orConditionResearch;
            }
            //console.log("Selectors : " + JSON.stringify(selectors, null, 2));
            let result = yield this.get(selectors, populates, projection, options);
            return (result);
        });
    }
    searchCount(search, fields, selectors = null, options = null, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            selectors = this.formatSelectors(selectors);
            let _fields = [];
            if (typeof fields === 'string')
                _fields = [fields];
            else
                _fields = fields;
            let strRegex = this.getStrRegexSearch(search);
            let regex = { $regex: strRegex, $options: "i" };
            let orConditionResearch = [];
            for (let field of _fields) {
                orConditionResearch.push({ [field]: regex });
                if (options) {
                    let countryCallingCode = options.countryCallingCode;
                    if (countryCallingCode) {
                        if (field.toLowerCase().indexOf('phone') >= 0) {
                            if (search.startsWith('0')) {
                                let searchPhone = search.replace('0', countryCallingCode);
                                orConditionResearch.push({ [field]: { $regex: this.getStrRegexSearch(searchPhone), $options: "i" } });
                            }
                        }
                    }
                }
            }
            if (selectors['$or']) {
                selectors['$and'] = [{ $or: orConditionResearch }, { $or: selectors['$or'] }];
                delete selectors['$or'];
            }
            else {
                selectors['$or'] = orConditionResearch;
            }
            let result = yield this.count(selectors);
            return (result);
        });
    }
    // ****************************************************** //
    // ****************************************************** //
    // ******************    Aggregate     ************************ //
    // ****************************************************** //
    // ****************************************************** //
    aggregate(pipeline, initiator = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.aggregate(pipeline).exec();
        });
    }
}
exports.default = Repository;
//# sourceMappingURL=repository.service.js.map
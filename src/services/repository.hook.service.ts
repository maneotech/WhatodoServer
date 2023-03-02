import { IDocument } from "../interfaces/model.interface";
import Repository from "./repository.service";

export interface IHookConf {
    enabled : boolean,
    update : {
        enabled : boolean,
        multi : {
            enabled : boolean,
            new : boolean,
            last : boolean
        },
        one : {
            enabled : boolean,
            new : boolean,
            last : boolean
        }
    },
    create : {
        enabled : boolean
    },
    delete : {
        enabled : boolean
    }
}
const defaultConf : IHookConf = {
    enabled : true,
    update : {
        enabled : true,
        multi : {
            enabled : true,
            new : true,
            last : true
        },
        one : {
            enabled : true,
            new : true,
            last : true
        }
    },
    create : {
        enabled : true
    },
    delete : {
        enabled : true
    }
}

export class RepositoryHookConf {
    private conf : IHookConf;

    constructor(conf = null) {
        this.setConf(conf);
    }

    setConf(conf : IHookConf) : IHookConf {
        this.conf = this.updateConf(defaultConf, conf);
        return this.conf;
    }

    updateConf(defaultConf : IHookConf, conf : IHookConf) : IHookConf {
        const result = JSON.parse(JSON.stringify(defaultConf)); // deep clone
        if (conf) {
            let updateObject = (target, obj) => {
                let keys = Object.keys(obj);
                for (let key of keys) {
                    if (target[key]) {
                        if (typeof obj[key] === 'object') {
                            updateObject(target[key], obj[key]);
                        } else {
                            target[key] = obj[key];
                        }
                    }
                }
            }
            updateObject(result, conf);
        }
        return result;
    }

    hookIsEnabled() : boolean {
        return this.conf.enabled;
    }

    hookUpdateIsEnabled() : boolean  {
        return this.hookIsEnabled() && this.conf.update.enabled;
    }

    hookUpdateOneIsEnabled() : boolean {
        return this.hookUpdateIsEnabled() && this.conf.update.one.enabled;
    }

    hookUpdateMultiIsEnabled() : boolean {
        return this.hookUpdateIsEnabled() && this.conf.update.multi.enabled;
    }

    hookUpdateCreateIsEnabled() : boolean {
        return this.hookIsEnabled() && this.conf.create.enabled;
    }

    hookUpdateDeleteIsEnabled() : boolean {
        return this.hookIsEnabled() && this.conf.delete.enabled;
    }

    hookUpdateOneNeedNewDocuments() : boolean {
        return this.conf.update.one.new;
    }

    hookUpdateOneNeedLastDocuments() : boolean {
        return this.conf.update.one.last;
    }

    hookUpdateMultiNeedNewDocuments() : boolean {
        return this.conf.update.one.new;
    }

    hookUpdateMultiNeedLastDocuments() : boolean {
        return this.conf.update.one.last;
    }
}


export class RepositoryHookCallback {
    private last : any;
    private new : any;
    private caller : any;
    private conf : RepositoryHookConf;
    private data : any;
    private initiator : any;
    
    constructor(lastDocument : any, newDocument  : any, caller : any, conf : RepositoryHookConf, data : any, initiator : any = null) {
        this.last = lastDocument;
        this.new = newDocument;
        this.caller = caller;
        this.conf = conf;
        this.data = data;
        this.initiator = initiator;
    }

    setInitiator(initiator) {
        this.initiator = initiator;
    }

    getInitiator() {
        return this.initiator;
    }

    getData() {
        return this.data || {};
    }

    isModified(field) {
        var result = true;
        if (this.last && this.new) {
            if (this.last[field] == this.new[field]) {
                result = false;
            } else {
                if (JSON.stringify(this.last[field]) == JSON.stringify(this.new[field])) {
                    result = false;
                }
            }
        }
        return result;
    }
}

export interface IRepositoryHookCallback<Document extends IDocument = IDocument> {
    hookUpdate(lastDoc : Document, newDoc : Document, data : Partial<Document>) : void;
    hookCreate(newDoc : Document, data : Partial<Document>) : void;
    hookDelete(newDoc : Document, data : Partial<Document>) : void;
}

export default class RepositoryHook<Document extends IDocument = IDocument> {
    private caller : Repository<Document> | IRepositoryHookCallback;
    public conf : RepositoryHookConf;
    private last : Document[];
    private new : Document[];
    private initiator : any;

    constructor(caller : Repository<Document> | IRepositoryHookCallback, hookConf : RepositoryHookConf, initiator = null) {
        this.last = [];
        this.new = [];
        this.caller = caller;
        this.conf = hookConf ? hookConf : new RepositoryHookConf();
        this.initiator = initiator;
    }

    setInitiator(initiator : any) : any {
        this.initiator = initiator;
        return this.initiator;
    }

    getInitiator() : any {
        return this.initiator;
    }

    getId(doc : Document) : string {
        let result = null;
        if (doc) {
            if (doc._id) {
                result = doc._id.toString();
            } else if (doc.id) {
                result = doc.id.toString();
            }
        }
        return result;
    }

    setLastDocument(doc : Document) : Document[] {
        return this.setLastDocuments(doc ? [doc] : []);
    }
    setLastDocuments(docs : Document[]) : Document[] {
        this.last = docs;
        return this.last;
    }
    setNewDocument(doc : Document) : Document[] {
        if (doc) {
            this.setNewDocuments(doc ? [doc] : []);
        }
        return this.new;
    }

    setNewDocuments(docs : Document[]) : Document[] {
        this.new = docs;
        this.last = this.last.filter((d) => this.new.find((n) => this.getId(d) == this.getId(n)));
        return this.new
    }

    hookUpdateOneAvailable() {
        return this.conf.hookUpdateOneIsEnabled() && (this.caller ? (this.caller.hookUpdate ? true : false) : false);
    }
    hookUpdateMultiAvailable() {
        return this.conf.hookUpdateMultiIsEnabled() && (this.caller ? (this.caller.hookUpdate ? true : false) : false);
    }
    hookCreateAvailable() {
        return this.conf.hookUpdateCreateIsEnabled() && (this.caller ? (this.caller.hookCreate ? true : false) : false);
    }
    hookDeleteAvailable() {
        return this.conf.hookUpdateDeleteIsEnabled() && (this.caller ? (this.caller.hookDelete ? true : false) : false);
    }

    callHookUpdateOne(data) {
        if (this.hookUpdateOneAvailable()) {
            for (let newDoc of this.new) {
                let last = this.last.find((d) => this.getId(d) == this.getId(newDoc));
                let hookCallback = new RepositoryHookCallback(last, newDoc, this.caller, this.conf, data, this.getInitiator());
                this.caller.hookUpdate.bind(hookCallback)(last, newDoc, data);
            }
        }
    }

    callHookUpdateMulti(data) {
        if (this.hookUpdateMultiAvailable()) {
            for (let newDoc of this.new) {
                let last = this.last.find((d) => this.getId(d) == this.getId(newDoc));
                let hookCallback = new RepositoryHookCallback(last, newDoc, this.caller, this.conf, data, this.getInitiator());
                this.caller.hookUpdate.bind(hookCallback)(last, newDoc, data);
            }
        }
    }

    callHookCreate(data) {
        if (this.hookCreateAvailable()) {
            for (let newDoc of this.new) {
                let hookCallback = new RepositoryHookCallback(null, newDoc, this.caller, this.conf, data, this.getInitiator());
                this.caller.hookCreate.bind(hookCallback)(newDoc, data);
            }
        }
    }

    callHookDelete(data) {
        if (this.hookDeleteAvailable()) {
            for (let newDoc of this.new) {
                let hookCallback = new RepositoryHookCallback(null, newDoc, this.caller, this.conf, data, this.getInitiator());
                this.caller.hookDelete.bind(hookCallback)(newDoc, data);
            }
        }
    }
}
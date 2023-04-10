"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryHookCallback = exports.RepositoryHookConf = void 0;
const defaultConf = {
    enabled: true,
    update: {
        enabled: true,
        multi: {
            enabled: true,
            new: true,
            last: true
        },
        one: {
            enabled: true,
            new: true,
            last: true
        }
    },
    create: {
        enabled: true
    },
    delete: {
        enabled: true
    }
};
class RepositoryHookConf {
    constructor(conf = null) {
        this.setConf(conf);
    }
    setConf(conf) {
        this.conf = this.updateConf(defaultConf, conf);
        return this.conf;
    }
    updateConf(defaultConf, conf) {
        const result = JSON.parse(JSON.stringify(defaultConf)); // deep clone
        if (conf) {
            let updateObject = (target, obj) => {
                let keys = Object.keys(obj);
                for (let key of keys) {
                    if (target[key]) {
                        if (typeof obj[key] === 'object') {
                            updateObject(target[key], obj[key]);
                        }
                        else {
                            target[key] = obj[key];
                        }
                    }
                }
            };
            updateObject(result, conf);
        }
        return result;
    }
    hookIsEnabled() {
        return this.conf.enabled;
    }
    hookUpdateIsEnabled() {
        return this.hookIsEnabled() && this.conf.update.enabled;
    }
    hookUpdateOneIsEnabled() {
        return this.hookUpdateIsEnabled() && this.conf.update.one.enabled;
    }
    hookUpdateMultiIsEnabled() {
        return this.hookUpdateIsEnabled() && this.conf.update.multi.enabled;
    }
    hookUpdateCreateIsEnabled() {
        return this.hookIsEnabled() && this.conf.create.enabled;
    }
    hookUpdateDeleteIsEnabled() {
        return this.hookIsEnabled() && this.conf.delete.enabled;
    }
    hookUpdateOneNeedNewDocuments() {
        return this.conf.update.one.new;
    }
    hookUpdateOneNeedLastDocuments() {
        return this.conf.update.one.last;
    }
    hookUpdateMultiNeedNewDocuments() {
        return this.conf.update.one.new;
    }
    hookUpdateMultiNeedLastDocuments() {
        return this.conf.update.one.last;
    }
}
exports.RepositoryHookConf = RepositoryHookConf;
class RepositoryHookCallback {
    constructor(lastDocument, newDocument, caller, conf, data, initiator = null) {
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
            }
            else {
                if (JSON.stringify(this.last[field]) == JSON.stringify(this.new[field])) {
                    result = false;
                }
            }
        }
        return result;
    }
}
exports.RepositoryHookCallback = RepositoryHookCallback;
class RepositoryHook {
    constructor(caller, hookConf, initiator = null) {
        this.last = [];
        this.new = [];
        this.caller = caller;
        this.conf = hookConf ? hookConf : new RepositoryHookConf();
        this.initiator = initiator;
    }
    setInitiator(initiator) {
        this.initiator = initiator;
        return this.initiator;
    }
    getInitiator() {
        return this.initiator;
    }
    getId(doc) {
        let result = null;
        if (doc) {
            if (doc._id) {
                result = doc._id.toString();
            }
            else if (doc.id) {
                result = doc.id.toString();
            }
        }
        return result;
    }
    setLastDocument(doc) {
        return this.setLastDocuments(doc ? [doc] : []);
    }
    setLastDocuments(docs) {
        this.last = docs;
        return this.last;
    }
    setNewDocument(doc) {
        if (doc) {
            this.setNewDocuments(doc ? [doc] : []);
        }
        return this.new;
    }
    setNewDocuments(docs) {
        this.new = docs;
        this.last = this.last.filter((d) => this.new.find((n) => this.getId(d) == this.getId(n)));
        return this.new;
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
exports.default = RepositoryHook;
//# sourceMappingURL=repository.hook.service.js.map
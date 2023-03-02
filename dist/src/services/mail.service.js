"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsService = void 0;
class MailsService {
    static formatMail(mail) {
        if (mail) {
            mail = mail.trim().toLowerCase();
        }
        return mail;
    }
    static isSameMail(mail1, mail2) {
        let result = false;
        if (mail1 && mail2) {
            if (this.formatMail(mail1) == this.formatMail(mail2)) {
                result = true;
            }
        }
        return result;
    }
    static isValid(mail) {
        if (!mail || mail.length === 0)
            return false;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail.toLowerCase());
    }
}
exports.MailsService = MailsService;
//# sourceMappingURL=mail.service.js.map
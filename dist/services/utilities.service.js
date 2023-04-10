"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilitiesService = void 0;
class UtilitiesService {
    // ---------------------- //
    // -------- ASYNC ------- //
    // ---------------------- //
    // Await delay
    static delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(ms);
            }, ms);
        });
    }
    // ---------------------- //
    // -------- NUMBER ------- //
    // ---------------------- //
    // Add zero in front of number if needed
    static numberToStringWithDigitsMin(value, digits) {
        var result = value + '';
        for (var i = result.length; i < digits; i++) {
            result = '0' + result;
        }
        return result;
    }
    // ---------------------- //
    // -------- STRING ------- //
    // ---------------------- //
    /** Function that count occurrences of a substring in a string;
  * @param {String} string               The string
  * @param {String} subString            The sub string to search for
  * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
  *
  * @author Vitim.us https://gist.github.com/victornpb/7736865
  * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
  * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
  */
    static occurrences(string, subString, allowOverlapping = false) {
        string += "";
        subString += "";
        if (subString.length <= 0)
            return (string.length + 1);
        var n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;
        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            }
            else
                break;
        }
        return n;
    }
    static diacriticSensitiveRegex(string = '') {
        return string.replace(/a/g, '[a,á,à,ä,â,ą]')
            .replace(/e/g, '[e,è,é,ë,ê,ę]')
            .replace(/i/g, '[i,ï,ì,í,î]')
            .replace(/o/g, '[o,ó,ö,ò,ô]')
            .replace(/u/g, '[u,ü,ú,ù,û]')
            .replace(/c/g, '[c,ç,ć]')
            .replace(/n/g, '[n, ñ,ń]')
            .replace(/y/g, '[y, ÿ]')
            .replace(/b/g, '[b, ß]')
            .replace(/s/g, '[s, ś]')
            .replace(/z/g, '[z, ź, ż]')
            .replace(/ae/g, '[ae, æ]')
            .replace(/oe/g, '[oe, œ]')
            .replace(/l/g, '[l, ł]');
    }
    static removeDiacriticSensitiveRegex(string = '') {
        return string.replace(/[a,á,à,ä,â,ą]/g, 'a')
            .replace(/[e,è,é,ë,ê,ę]/g, 'e')
            .replace(/[i,ï,ì,í,î]/g, 'i')
            .replace(/[o,ó,ö,ò,ô]/g, 'o')
            .replace(/[u,ü,ú,ù,û]/g, 'u')
            .replace(/[c,ç,ć]/g, 'c')
            .replace(/[n, ñ,ń]/g, 'n')
            .replace(/[y, ÿ]/g, 'y')
            .replace(/[b, ß]/g, 'b')
            .replace(/[s, ś]/g, 's')
            .replace(/[z, ź, ż]/g, 'z')
            .replace(/[æ]/g, 'ae')
            .replace(/[œ]/g, 'oe')
            .replace(/[l, ł]/g, 'l')
            .replace(/\\s/g, '')
            .replace(/\\W/g, '');
    }
    // ---------------------- //
    // -------- TYPES ------- //
    // ---------------------- //
    static isString(data) {
        return typeof data === 'string' || data instanceof String;
    }
    static isObject(data) {
        return typeof data === 'object' && data !== null;
    }
    // ---------------------- //
    // -------- FILES ------- //
    // ---------------------- //
    static substractExtensionFromFilename(name) {
        if (!name)
            return null;
        let split = name.split('.');
        let result = "";
        for (var i = 0; i < split.length - 1; i++) {
            result += split[i];
            if (i < split.length - 2)
                result += ".";
        }
        return result;
    }
    // ---------------------- //
    // -------- OBJECT ------- //
    // ---------------------- //
    static isEmpty(data) {
        if (data && Object.keys(data).length)
            return false;
        return true;
    }
    static enumContainsString(enu, str) {
        return Object.values(enu).includes(str);
    }
    // ---------------------- //
    // -------- JSON ------- //
    // ---------------------- //
    static strinfigyJsonSortedAlphabetically(obj) {
        return JSON.stringify(UtilitiesService.sortJsonAlphabetically(obj));
    }
    static sortJsonAlphabetically(obj) {
        let result = {};
        let json = JSON.parse(JSON.stringify(obj));
        let keys = Object.keys(json);
        keys.sort();
        for (let k of keys) {
            if (json[k] && typeof json[k] === 'object') {
                result[k] = UtilitiesService.sortJsonAlphabetically(json[k]);
            }
            else {
                result[k] = json[k];
            }
        }
        return result;
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
exports.UtilitiesService = UtilitiesService;
//# sourceMappingURL=utilities.service.js.map
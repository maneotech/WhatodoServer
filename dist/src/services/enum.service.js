"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_constants_1 = require("../constants/language.constants");
const platform_constants_1 = require("../constants/platform.constants");
class EnumService {
    static fromLanguageStringToEnum(language) {
        var lang = language.toUpperCase();
        if (lang == "FR") {
            return language_constants_1.LanguageEnum.FR;
        }
        else if (lang == "ES") {
            return language_constants_1.LanguageEnum.ES;
        }
        else {
            return language_constants_1.LanguageEnum.EN;
        }
    }
    static fromPlatformStringToEnum(platform) {
        var platformNormalized = platform.toUpperCase();
        if (platformNormalized == "IOS") {
            return platform_constants_1.PlatformEnum.IOS;
        }
        else if (platformNormalized == "ANDROID") {
            return platform_constants_1.PlatformEnum.ANDROID;
        }
        else {
            return platform_constants_1.PlatformEnum.OTHER;
        }
    }
}
exports.default = EnumService;
//# sourceMappingURL=enum.service.js.map
import { LanguageEnum } from "../constants/language.constants";
import { PlatformEnum } from "../constants/platform.constants";

export default class EnumService {

    public static fromLanguageStringToEnum(language: String): LanguageEnum{
        var lang = language.toUpperCase();

        if (lang == "FR"){
            return LanguageEnum.FR;
        }
        else if (lang == "ES"){
            return LanguageEnum.ES;
        }
        else {
            return LanguageEnum.EN;
        }
    } 

    public static fromPlatformStringToEnum(platform: String): PlatformEnum {
        var platformNormalized = platform.toUpperCase();

        if (platformNormalized == "IOS"){
            return PlatformEnum.IOS;
        }
        else if (platformNormalized == "ANDROID"){
            return PlatformEnum.ANDROID;
        }
        else {
            return PlatformEnum.OTHER;
        }
    }
}

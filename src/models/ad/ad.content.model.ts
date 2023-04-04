import { LanguageEnum } from "../../constants/language.constants";
import { PlatformEnum } from "../../constants/platform.constants";

export class AdContentModel {
   urlSrc: String;
   redirectTo: String;
   companyId?: String;
   companyName?: String;
   language?: LanguageEnum;
   platform?: PlatformEnum;


   constructor(urlSrc: String, redirectTo: String, companyId?: String, companyName?: String, language?: LanguageEnum, platform?: PlatformEnum) {
      this.companyId = companyId;
      this.companyName = companyName;
      this.urlSrc = urlSrc;
      this.redirectTo = redirectTo;
      this.language = language;
      this.platform = platform;
   }
}
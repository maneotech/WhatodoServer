"use strict";
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
exports.populatePlatformMiddleware = exports.formatPlatformMiddleware = void 0;
const platform_constant_1 = require("../constants/platform.constant");
const platform_repository_1 = __importDefault(require("../repositories/platform.repository"));
const mongoose_service_1 = require("../services/mongoose.service");
const request_service_1 = __importDefault(require("../services/request.service"));
const platformRepository = new platform_repository_1.default();
function formatPlatformMiddleware(req, res, next) {
    req.platformId = req.headers['platform'];
    next();
}
exports.formatPlatformMiddleware = formatPlatformMiddleware;
function populatePlatformMiddleware(required = true) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.platform = null;
            if (mongoose_service_1.MongooseService.idIsValid(req.platformId)) {
                const platform = yield platformRepository.getById(req.platformId, [], [], { full_projections: true });
                req.platform = platform;
            }
            if (required) {
                if (!req.platform) {
                    return request_service_1.default.send(res, req.platformId ? platform_constant_1.PlatformRequestError.ID_INVALID_HEADER : platform_constant_1.PlatformRequestError.ID_REQUIRED_HEADER);
                }
            }
            next();
        });
    };
}
exports.populatePlatformMiddleware = populatePlatformMiddleware;
//# sourceMappingURL=platform.middleware.js.map
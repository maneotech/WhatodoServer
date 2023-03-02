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
exports.userLoginRouter = void 0;
const async_express_service_1 = require("../../services/async-express.service");
const controllers = __importStar(require("../../controllers/user/user.login.controller"));
const utilities_service_1 = require("../../services/utilities.service");
const user_constant_1 = require("../../constants/user/user.constant");
const request_service_1 = __importDefault(require("../../services/request.service"));
const router = async_express_service_1.AsyncExpressService.getAsyncRouter();
router.post('/:role/facebook', role, controllers.login);
router.post('/:role/icloud', role, controllers.login);
router.post('/:role', role, controllers.login);
exports.userLoginRouter = router;
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
/* ------------------------ MIDDLEWARE -------------------------- */
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
function role(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let role = req.params.role;
        if (!utilities_service_1.UtilitiesService.enumContainsString(user_constant_1.UserRole, role))
            return request_service_1.default.send(res, user_constant_1.UserRequestError.ROLE_IS_INVALID);
        next();
    });
}
//# sourceMappingURL=user.login.route.js.map
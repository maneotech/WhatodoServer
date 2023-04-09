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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginRouter = void 0;
const async_express_service_1 = require("../../services/async-express.service");
const controllers = __importStar(require("../../controllers/user/user.login.controller"));
const router = async_express_service_1.AsyncExpressService.getAsyncRouter();
router.post('/facebook', controllers.loginWithFacebook);
router.post('/google', controllers.loginWithGoogle);
router.post('/apple', controllers.loginWithApple);
router.post('/', controllers.login);
exports.userLoginRouter = router;
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
/* ------------------------ MIDDLEWARE -------------------------- */
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
//# sourceMappingURL=user.login.route.js.map
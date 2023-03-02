"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const async_express_service_1 = require("../../services/async-express.service");
const user_login_route_1 = require("./user.login.route");
const user_register_route_1 = require("./user.register.route");
const router = async_express_service_1.AsyncExpressService.getAsyncRouter();
router.use('/login', user_login_route_1.userLoginRouter);
router.use('/register', user_register_route_1.userRegisterRouter);
exports.userRouter = router;
//# sourceMappingURL=user.route.js.map
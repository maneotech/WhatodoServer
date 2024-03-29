"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require('dotenv').config();
// Databases
const databases_service_1 = require("./services/databases.service");
databases_service_1.DatabasesService.initDatabases();
// Logs
const logs_service_1 = require("./services/logs.service");
const log_timestamp_1 = __importDefault(require("log-timestamp"));
(0, log_timestamp_1.default)(logs_service_1.LogsService.formatLogs);
// Libs
const express_1 = __importDefault(require("express"));
const async_express_service_1 = require("./services/async-express.service");
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Middlewares
const clientip_middleware_1 = require("./middlewares/clientip.middleware");
const firewall_middleware_1 = require("./middlewares/firewall.middleware");
// Service
const request_errors_service_1 = __importDefault(require("./services/request-errors.service"));
// Constants
const internal_path_constant_1 = require("./constants/internal-path.constant");
// Routers
const user_route_1 = require("./routes/user/user.route");
const place_route_1 = require("./routes/place/place.route");
const ad_route_1 = require("./routes/ad/ad.route");
const home_route_1 = require("./routes/home/home.route");
console.log("\n\
 _______________________________________________________  \n\
|-------------------------------------------------------| \n\
|-------------------------------------------------------| \n\
|------------        SERVER STARTING...     ------------| \n\
|------------       MODE : " + process.env.MODE + "      ------------| \n\
|-------------------------------------------------------| \n\
|-------------------------------------------------------| \n\
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞   \n\
");
// Initializations
const app = async_express_service_1.AsyncExpressService.getAsyncExpress();
const router = async_express_service_1.AsyncExpressService.getAsyncRouter();
const server = http_1.default.createServer(app);
// Middlewares
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
app.use(clientip_middleware_1.clientIpMiddleware);
app.use(firewall_middleware_1.firewallMiddleware);
//app.use(debugMiddleware);
// Main routes
app.use('/api', router);
// Routes 
router.use('/user', user_route_1.userRouter);
router.use('/place', place_route_1.placeRouter);
router.use('/ad', ad_route_1.adRouter);
router.use('/home', home_route_1.homeRouter);
// Static
console.log(internal_path_constant_1.InternalPathConstants.assets);
console.log(internal_path_constant_1.InternalPathConstants.adVideos);
app.use('/static/', express_1.default.static(internal_path_constant_1.InternalPathConstants.assets), function (req, res) {
    return request_errors_service_1.default.fileNotFound(req, res);
});
// Errors
app.use('/', (req, res, next) => {
    request_errors_service_1.default.pathNotFound(req, res, null);
});
// Listien on port
server.listen(parseInt(process.env.PORT), "0.0.0.0", () => {
    console.log('Server listening on port - HTTP : ' + process.env.PORT);
});
exports.App = app;
//# sourceMappingURL=app.js.map
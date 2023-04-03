"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adRouter = void 0;
const async_express_service_1 = require("../../services/async-express.service");
const ad_sponsorship_route_1 = require("./ad.sponsorship.route");
const ad_video_route_1 = require("./ad.video.route");
const router = async_express_service_1.AsyncExpressService.getAsyncRouter();
router.use('/video', ad_video_route_1.adVideoRouter);
router.use('/sponsorship', ad_sponsorship_route_1.adSponsorshipRouter);
exports.adRouter = router;
//# sourceMappingURL=ad.route.js.map
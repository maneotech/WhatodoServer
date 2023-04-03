import { AsyncExpressService } from '../../services/async-express.service';
import { adSponsorshipRouter } from './ad.sponsorship.route';
import { adVideoRouter } from './ad.video.route';

const router = AsyncExpressService.getAsyncRouter();

router.use('/video', adVideoRouter);
router.use('/sponsorship', adSponsorshipRouter);

export const adRouter = router;
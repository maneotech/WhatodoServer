import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/ad/ad.video.controller';
import { authentificate } from '../../middlewares/authentification.middleware';

const router = AsyncExpressService.getAsyncRouter();

router.use('/start', authentificate(), controllers.startAd);
router.use('/end', authentificate(), controllers.endAd);
router.use('/click', authentificate(), controllers.clickAd);

export const adVideoRouter = router;
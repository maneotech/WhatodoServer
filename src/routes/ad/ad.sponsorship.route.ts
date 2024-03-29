import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/ad/ad.sponsorship.controller';
import { authentificate } from '../../middlewares/authentification.middleware';

const router = AsyncExpressService.getAsyncRouter();

router.use('/create', authentificate(), controllers.createSponsorship);
router.use('/notify', authentificate(), controllers.notifySponsorship);

export const adSponsorshipRouter = router;
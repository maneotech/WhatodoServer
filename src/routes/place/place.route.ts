import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/place/place.controller';
import { authentificate } from '../../middlewares/authentification.middleware';

const router = AsyncExpressService.getAsyncRouter();

router.use('/one', authentificate(), controllers.getOnePlace);
router.use('/accept', authentificate(), controllers.acceptPlace);
router.use('/accepted', authentificate(), controllers.getAcceptedPlaces);
router.use('/refuse', authentificate(), controllers.refusePlace)
export const placeRouter = router;
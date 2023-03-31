import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/place/place.controller';
import { authentificate } from '../../middlewares/authentification.middleware';

const router = AsyncExpressService.getAsyncRouter();

router.use('/', authentificate(), controllers.getOnePlace);

export const placeRouter = router;
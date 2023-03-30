import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/place/place.controller';

const router = AsyncExpressService.getAsyncRouter();

router.use('/', controllers.getOnePlace);

export const placeRouter = router;
import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/home/home.controller';
import { authentificate } from '../../middlewares/authentification.middleware';

const router = AsyncExpressService.getAsyncRouter();

router.use('/info', authentificate(), controllers.getHome);

export const homeRouter = router;
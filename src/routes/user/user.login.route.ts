import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/user/user.login.controller';

const router = AsyncExpressService.getAsyncRouter();

router.post('/facebook', controllers.login);
router.post('/icloud', controllers.login);
router.post('/', controllers.login);

export const userLoginRouter = router;

/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
/* ------------------------ MIDDLEWARE -------------------------- */
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */


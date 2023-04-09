import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/user/user.login.controller';

const router = AsyncExpressService.getAsyncRouter();

router.post('/facebook', controllers.loginWithFacebook);
router.post('/google', controllers.loginWithGoogle);
router.post('/apple', controllers.loginWithApple);
router.post('/', controllers.login);

export const userLoginRouter = router;

/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
/* ------------------------ MIDDLEWARE -------------------------- */
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */


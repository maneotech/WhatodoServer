import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/user/user.register.controller';

const router = AsyncExpressService.getAsyncRouter();

router.post('/', controllers.register);

export const userRegisterRouter = router;

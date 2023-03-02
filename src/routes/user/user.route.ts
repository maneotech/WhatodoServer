import { AsyncExpressService } from '../../services/async-express.service';
import { userLoginRouter } from './user.login.route';
import { userRegisterRouter } from './user.register.route';

const router = AsyncExpressService.getAsyncRouter();

router.use('/login', userLoginRouter);
router.use('/register', userRegisterRouter);

export const userRouter = router;
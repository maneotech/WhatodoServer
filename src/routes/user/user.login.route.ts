import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/user/user.login.controller';
import { Request, Response } from 'express';
import { UtilitiesService } from '../../services/utilities.service';
import { UserRequestError, UserRole } from '../../constants/user/user.constant';
import RequestService from '../../services/request.service';

const router = AsyncExpressService.getAsyncRouter();

router.post('/:role/facebook', role, controllers.login);
router.post('/:role/icloud', role, controllers.login);
router.post('/:role', role, controllers.login);

export const userLoginRouter = router;

/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
/* ------------------------ MIDDLEWARE -------------------------- */
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */

async function role(req : Request, res : Response, next) {
    let role = req.params.role;
    if (!UtilitiesService.enumContainsString(UserRole, role))
        return RequestService.send(res, UserRequestError.ROLE_IS_INVALID);
    next();
}
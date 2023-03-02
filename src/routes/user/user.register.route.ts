import { AsyncExpressService } from '../../services/async-express.service';
import * as controllers from '../../controllers/user/user.register.controller';
import { UserRequestError, UserRole } from '../../constants/user/user.constant';
import { UtilitiesService } from '../../services/utilities.service';
import { Request, Response } from 'express';
import RequestService from '../../services/request.service';

const router = AsyncExpressService.getAsyncRouter();

router.post('/:role', role, controllers.register);

export const userRegisterRouter = router;

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
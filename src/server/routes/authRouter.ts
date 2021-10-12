import { AUTH_ROUTES } from 'constants/api-routes';
import Router from 'express';

import { getUserInfoController, loginController } from '../controllers/authControllers';

const authRouter = Router();

authRouter.post(AUTH_ROUTES.LOGIN, loginController);

authRouter.get(AUTH_ROUTES.GET_USER_INFO, getUserInfoController);

/* authRouter.post(AUTH_ROUTES.SIGNUP, () => {
});
 */
export { authRouter };

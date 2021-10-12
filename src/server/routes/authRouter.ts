import { AUTH_ROUTES } from 'constants/api-routes';
import Router from 'express';

import {
    getUserInfoController,
    loginController,
    logoutController,
    signUpController,
} from '../controllers/authControllers';

const authRouter = Router();

authRouter.post(AUTH_ROUTES.LOGIN, loginController);

authRouter.post(AUTH_ROUTES.SIGNUP, signUpController);

authRouter.get(AUTH_ROUTES.GET_USER_INFO, getUserInfoController);

authRouter.post(AUTH_ROUTES.LOGOUT, logoutController);

export { authRouter };

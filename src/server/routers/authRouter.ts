import { PRAKTIKUM_AUTH_ROUTES } from 'constants/api-routes';
import Router from 'express';

import {
    getUserInfoController,
    loginController,
    loginWithOAuthController, loginWithOAuthGoogleController,
    loginWithOAuthYandexController,
    logoutController,
    signUpController,
} from '../controllers/authControllers';

const authRouter = Router();

authRouter.get('/', loginWithOAuthController);

authRouter.get('/oauth/yandex', loginWithOAuthYandexController);

authRouter.get('/oauth/google', loginWithOAuthGoogleController);

authRouter.post(PRAKTIKUM_AUTH_ROUTES.LOGIN, loginController);

authRouter.post(PRAKTIKUM_AUTH_ROUTES.SIGNUP, signUpController);

authRouter.get(PRAKTIKUM_AUTH_ROUTES.GET_USER_INFO, getUserInfoController);

authRouter.post(PRAKTIKUM_AUTH_ROUTES.LOGOUT, logoutController);

export { authRouter };

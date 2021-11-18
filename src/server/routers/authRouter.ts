import { AUTH_ROUTES, LEADER_BOARD_ROUTES } from 'constants/api-routes';
import Router from 'express';

import {
    addUserResultsController, getAllLeaderboardController,
    getUserInfoController,
    loginController, loginWithOAuthController,
    logoutController,
    signUpController,
} from '../controllers/authControllers';

const authRouter = Router();

authRouter.get('/oauth/yandex', loginWithOAuthController);

authRouter.post(LEADER_BOARD_ROUTES.ADD, addUserResultsController);

authRouter.post(LEADER_BOARD_ROUTES.GET_ALL, getAllLeaderboardController);

authRouter.post(AUTH_ROUTES.LOGIN, loginController);

authRouter.post(AUTH_ROUTES.SIGNUP, signUpController);

authRouter.get(AUTH_ROUTES.GET_USER_INFO, getUserInfoController);

authRouter.post(AUTH_ROUTES.LOGOUT, logoutController);

export { authRouter };

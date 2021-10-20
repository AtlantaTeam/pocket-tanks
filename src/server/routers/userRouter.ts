import Router from 'express';

import { USER_ROUTES } from 'constants/api-routes';
import {
    changeAvatarController,
    changePasswordController,
    changeProfileController,
    getUserAvatarController,
} from 'server/controllers/userControllers';

const userRouter = Router();

userRouter.put(USER_ROUTES.CHANGE_PROFILE, changeProfileController);

userRouter.put(USER_ROUTES.CHANGE_AVATAR, changeAvatarController);

userRouter.put(USER_ROUTES.CHANGE_PASSWORD, changePasswordController);

userRouter.get(USER_ROUTES.GET_AVATAR, getUserAvatarController);

export { userRouter };

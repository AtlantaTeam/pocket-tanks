import Router from 'express';

import { USER_ROUTES } from 'constants/api-routes';
import {
    changeAvatarController,
    changePasswordController,
    changeProfileController,
} from 'server/controllers/userControllers';

const userRouter = Router();

userRouter.put(USER_ROUTES.CHANGE_PROFILE, changeProfileController);

userRouter.put(USER_ROUTES.CHANGE_AVATAR, changeAvatarController);

userRouter.put(USER_ROUTES.CHANGE_PASSWORD, changePasswordController);

export { userRouter };

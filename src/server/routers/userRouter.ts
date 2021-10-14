import { USER_ROUTES } from 'constants/api-routes';
import Router from 'express';
import { changeProfileController } from 'server/controllers/userControllers';

const userRouter = Router();

userRouter.get(USER_ROUTES.CHANGE_PROFILE, changeProfileController);

export { userRouter };

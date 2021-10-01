import { initialState as user } from './user-state';
import { initialState as game } from './game-state';
import { initialState as router } from './router-state';

export const getInitialState = (): any => ({
    user,
    game,
    router,
});

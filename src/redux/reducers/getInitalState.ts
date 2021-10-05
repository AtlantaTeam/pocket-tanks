import { RouterState } from 'connected-react-router';
import { initialState as userState } from './user-state';
import { initialState as gameState } from './game-state';
import { State } from './index';

export const getInitialState = (
    pathname = '/',
): State => ({
    userState,
    gameState,
    router: {
        location: {
            pathname,
            search: '',
            hash: '',
            key: '',
        },
        action: 'POP',
    } as RouterState,
});

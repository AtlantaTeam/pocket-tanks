import { RouterState, RouterAction } from 'connected-react-router';

export const initialState = {
    location: {
        pathname: '/',
        search: '',
        hash: '',
        key: '',
    },
    action: 'POP',
} as RouterState;

export const routerState = (
    state: RouterState = initialState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: RouterAction,
) => state;

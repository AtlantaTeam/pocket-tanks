import type { Immutable } from 'immer';
import produce from 'immer';
import { combineReducers } from 'redux-immer';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import type { UserState } from './user-state';
import { userState } from './user-state';
import type { GameState } from './game-state';
import { gameState } from './game-state';
import type { AuthCookieState } from './auth-cookie-state';
import { authCookieState } from './auth-cookie-state';

export type State = Immutable<{
    userState: UserState;
    gameState: GameState;
    authCookieState: AuthCookieState
    router: RouterState;
}>;

export const rootReducer = (history: History) => combineReducers(produce, {
    // @ts-expect-error action type
    router: connectRouter(history),
    // @ts-expect-error action type
    userState,
    // @ts-expect-error action type
    gameState,
    // @ts-expect-error action type
    authCookieState,
});

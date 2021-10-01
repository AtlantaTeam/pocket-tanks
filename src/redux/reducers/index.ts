import type { Immutable } from 'immer';
import produce from 'immer';
import { combineReducers } from 'redux-immer';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import type { UserState } from './user-state';
import { userState } from './user-state';
import type { GameState } from './game-state';
import { gameState } from './game-state';

export type State = Immutable<{
    userState: UserState;
    gameState: GameState;
    rooterState: RouterState;
}>;

export const rootReducer = (history: History) => combineReducers(produce, {
    // @ts-expect-error action type
    userState,
    // @ts-expect-error action type
    gameState,
    router: connectRouter(history),
});

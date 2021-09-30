import type { Immutable } from 'immer';
import produce from 'immer';
import { combineReducers } from 'redux-immer';

import type { UserState } from './user-state';
import { userState } from './user-state';
import type { GameState } from './game-state';
import { gameState } from './game-state';

export type State = Immutable<{
    userState: UserState;
    gameState: GameState;
}>;

export const rootReducer = combineReducers(produce, {
    // @ts-expect-error action type
    userState,
    // @ts-expect-error action type
    gameState,
});

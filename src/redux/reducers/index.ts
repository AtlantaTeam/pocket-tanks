import type { Immutable } from 'immer';
import { combineReducers } from 'redux-immer';
import produce from 'immer';

import type { UserState } from './user-state';
import { userState } from './user-state';

export type State = Immutable<{
    userState: UserState;
}>;

export const rootReducer = combineReducers(produce, {
    // @ts-expect-error action type
    userState,
});

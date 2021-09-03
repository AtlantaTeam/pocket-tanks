import { all, fork } from 'redux-saga/effects';
import { userStateSaga } from './user-state';

export function* rootSaga() {
    yield all([fork(userStateSaga)]);
}

import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

import { rootSaga } from '../src/redux/sagas';

export const mockStore = (state = {}) => {
    const store = configureMockStore([sagaMiddleware])(state);

    sagaMiddleware.run(rootSaga);

    return store;
}

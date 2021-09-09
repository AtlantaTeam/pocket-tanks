import type { compose } from 'redux';
import type { State } from '../redux/reducers';

declare global {
    interface Window {
        __INITIAL_STATE__: State;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}

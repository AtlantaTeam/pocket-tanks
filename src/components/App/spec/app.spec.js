import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'mocks/store';
import { fetchUserInfoRequested } from '../../../redux/actions/user-state/user-info';

import { App } from '../App';

jest.mock('components/Pages/Game/Game', () => function getWorker() {
    return null;
});

jest.mock('react-router-dom', () => ({
    Switch() {
        return null;
    },
    Route() {
        return null;
    }
}));

describe('<App />', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({});

        wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it('рендерится корректно', () => {
        expect(wrapper.find('App')).toHaveLength(1);
        expect(wrapper.find('Switch')).toHaveLength(1);
    });

    it.skip('при рендеринге диспатчит экшен для запроса инфы о пользователе', () => {
        expect(store.getActions()).toEqual([
            fetchUserInfoRequested()
        ]);
    });
});

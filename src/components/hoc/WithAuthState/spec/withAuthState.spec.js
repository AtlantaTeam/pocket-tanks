import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'mocks/store';

import { withAuthState } from '../WithAuthState';
import { Main } from '../../../Pages/Main/Main';

jest.mock('react-router-dom', () => ({
    Link() {
        return null;
    },
    Redirect() {
        return null;
    }
}));

describe('withAuthState hoc', () => {
    let store;
    let wrapper;

    let targerUrl = '/targerUrl'
    let WrappedComponent = withAuthState(true, targerUrl, Main);

    it('для залогиненного пользователя защищенный компонент рендерится', () => {
        store = mockStore({
            userState: {
                isLoggedIn: true,
            }
        });

        wrapper = mount(
            <Provider store={store}>
                <WrappedComponent />
            </Provider>
        );

        expect(wrapper.find('Main')).toHaveLength(1);
    });

    it('для разлогиненного пользователя сработает переадресация', () => {
        store = mockStore({
            userState: {
                isLoggedIn: false,
            }
        });

        wrapper = mount(
            <Provider store={store}>
                <WrappedComponent />
            </Provider>
        );

        expect(wrapper.find('Main')).toHaveLength(0);
        expect(wrapper.find('Redirect')).toHaveLength(1);
        expect(wrapper.find('Redirect').props().to).toEqual({pathname: targerUrl});
    });
});

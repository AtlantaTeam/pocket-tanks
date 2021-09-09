import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {mockStore} from "mocks/store";
import { loginRequested } from '../../../../../redux/actions/user-state/login';

import {FormSignIn} from '../FormSignIn';

jest.mock('react-router-dom', () => ({
    Link() {
        return null;
    }
}));

jest.mock('../../components/FieldSet/FieldSet', () => ({
    FieldSet() {
        return null;
    }
}));

describe('<FormSignIn />', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            userState: {
                isLoading: false,
            }
        });

        wrapper = mount(
            <Provider store={store}>
                <FormSignIn />
            </Provider>
        );
    });

    it('рендерится корректно', () => {
        expect(wrapper.find('FormSignIn')).toHaveLength(1);
    });

    it('прокидывает флаг загрузки данных в кнопку сабмита', () => {
        store = mockStore({
            userState: {
                isLoading: true,
            }
        });

        wrapper = mount(
            <Provider store={store}>
                <FormSignIn />
            </Provider>
        );

        expect(wrapper.find('FormSignIn').find('ButtonSubmit').props().isLoading).toEqual(true);
    });

    it('при вызове onSubmit формы диспатчит экшн запроса логина', () => {
        wrapper.find('FormSignIn').find('Formik').props().onSubmit({
            login: 'login',
            password: 'password',
        });

        const formData = new FormData();
        formData.append('login', 'login');
        formData.append('password', 'password');

        expect(store.getActions()).toEqual([
            loginRequested(formData),
        ]);
    });
});

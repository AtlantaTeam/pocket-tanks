import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from "mocks/store";
import { signupRequested } from '../../../../../redux/actions/user-state/signup';

import { FormSignUp } from '../FormSignUp';

jest.mock('react-router-dom', () => ({
    Link() {
        return null;
    }
}));

describe('<FormSignUp />', () => {
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
                <FormSignUp />
            </Provider>
        );
    });

    it('рендерится корректно', () => {
        expect(wrapper.find('FormSignUp')).toHaveLength(1);
    });

    it('при вызове onSubmit формы диспатчит экшн запроса регистрации', () => {
        wrapper.find('FormSignUp').find('Formik').props().onSubmit({
            email: 'email',
            login: 'login',
            first_name: 'first_name',
            second_name: 'second_name',
            phone: 'phone',
            password: 'password',
            password_again: 'password',
        });

        const formData = new FormData();
        formData.append('email', 'email');
        formData.append('login', 'login');
        formData.append('first_name', 'first_name');
        formData.append('second_name', 'second_name');
        formData.append('phone', 'phone');
        formData.append('password', 'password');
        formData.append('password_again', 'password');

        expect(store.getActions()).toEqual([
            signupRequested(formData),
        ]);
    });
});

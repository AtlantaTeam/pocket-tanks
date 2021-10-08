import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'mocks/store';
import { changeProfileRequested } from '../../../../../redux/actions/user-state/change-profile';

import { FormEditProfileData } from '../FormEditProfileData';

describe('<FormEditProfileData />', () => {
    let store;
    let wrapper;
    let userInfo = {
        displayName: 'displayName',
        email: 'email',
        login: 'login',
        firstName: 'firstName',
        secondName: 'secondName',
        phone: 'phone',
    };

    beforeEach(() => {
        store = mockStore({
            userState: {
                userInfo,
            },
        });

        wrapper = mount(
            <Provider store={store}>
                <FormEditProfileData />
            </Provider>
        );
    });

    it('рендерится корректно', () => {
        expect(wrapper.find('FormEditProfileData')).toHaveLength(1);
    });

    it('начальные значения инпутов получены из стора', () => {
        expect(wrapper
            .find('FormEditProfileData')
            .find('Formik')
            .props().initialValues).toEqual({
                display_name: userInfo.displayName,
                email: userInfo.email,
                login: userInfo.login,
                first_name: userInfo.firstName,
                second_name: userInfo.secondName,
                phone: userInfo.phone,
            });
    });

    it('при вызове onSubmit формы диспатчит экшн изменения профиля', () => {
        wrapper.find('FormEditProfileData').find('Formik').props().onSubmit({
            display_name: 'display_name',
            email: 'email',
            login: 'login',
            first_name: 'first_name',
            second_name: 'second_name',
            phone: 'phone',
        });

        const formData = new FormData();
        formData.append('display_name', 'display_name');
        formData.append('email', 'email');
        formData.append('login', 'login');
        formData.append('first_name', 'first_name');
        formData.append('second_name', 'second_name');
        formData.append('phone', 'phone');

        expect(store.getActions()).toEqual([
            changeProfileRequested(formData),
        ]);
    });
});

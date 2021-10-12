import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'mocks/store';
import { changePasswordRequested } from '../../../../../redux/actions/user-state/change-password';

import { FormEditPassword } from '../FormEditPassword';

describe('<FormEditPassword />', () => {
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
                <FormEditPassword />
            </Provider>
        );
    });

    it('рендерится корректно', () => {
        expect(wrapper.find('FormEditPassword')).toHaveLength(1);
    });

    it('при вызове onSubmit формы диспатчит экшн смены пароля', () => {
        wrapper.find('FormEditPassword').find('Formik').props().onSubmit({
            oldPassword: 'oldPassword',
            newPassword: 'newPassword',
            secondNewPassword: 'secondNewPassword',
        });

        const formData = new FormData();
        formData.append('oldPassword', 'oldPassword');
        formData.append('newPassword', 'newPassword');
        formData.append('secondNewPassword', 'secondNewPassword');

        expect(store.getActions()).toEqual([
            changePasswordRequested(formData),
        ]);
    });
});

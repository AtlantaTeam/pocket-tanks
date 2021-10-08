import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'mocks/store';
import { changeAvatarRequested } from '../../../../../redux/actions/user-state/change-avatar';

import { FormLoadAvatar } from '../FormLoadAvatar';

describe('<FormLoadAvatar />', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            userState: {
                userInfo: {},
            },
        });

        wrapper = mount(
            <Provider store={store}>
                <FormLoadAvatar />
            </Provider>
        );
    });

    it('рендерится корректно', () => {
        expect(wrapper.find('FormLoadAvatar')).toHaveLength(1);
    });

    it('без загруженного файла появляется предупреждение и форма не отправляется', () => {
        const preventDefault = jest.fn();
        wrapper.find('FormLoadAvatar').find('form').simulate('submit', { preventDefault });

        expect(wrapper.find('FormLoadAvatar').find('.load-message_error')).toHaveLength(1);
        expect(store.getActions()).toEqual([]);
    });

    it('с загруженным файлом форма отправляется и диспатчится экшн', () => {
        global.URL.createObjectURL = jest.fn();
        const preventDefault = jest.fn();
        const avatar = new File([], 'avatar.jpg', { type: 'image/jpeg'});

        const inputComponent = wrapper.find('FormLoadAvatar').find('input');

        inputComponent.simulate('change', {
            target: {
                files: [ avatar ],
            },
        });

        expect(wrapper.find('FormLoadAvatar').find('.load-message').text()).toEqual(
            'Файл загружен: avatar.jpg'
        );

        // files.length при попытке отправить форму почему-то 0, похоже на баг в enzyme
        jest.spyOn(inputComponent.instance().files, 'length', 'get').mockReturnValue(1);

        wrapper.find('FormLoadAvatar').find('form').simulate('submit', { preventDefault });

        const formData = new FormData();
        formData.append('avatar', avatar);

        expect(store.getActions()).toEqual([
            changeAvatarRequested(formData)
        ]);
    });
});

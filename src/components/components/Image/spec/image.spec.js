import React from 'react';
import { mount } from 'enzyme';

import { Image } from '../Image';

describe('<Image />', () => {
    let wrapper;
    let clickFunction = jest.fn();

    beforeEach(() => {
        wrapper = mount(
            <Image
                className="className"
                imagePath="imagePath"
                alt="alt"
                onClick={clickFunction}
            />
        );
    });

    it('добавляет в html разметку изображение', () => {
        const htmlImg = wrapper.find('img');

        expect(htmlImg).toHaveLength(1);
        expect(htmlImg.prop('className')).toEqual('className');
        expect(htmlImg.prop('src')).toEqual('imagePath');
        expect(htmlImg.prop('alt')).toEqual('alt');
    });

    it('переданная функция вызывается при клике по изображению', () => {
        const htmlImg = wrapper.find('img');
        htmlImg.simulate('click');

        expect(clickFunction).toBeCalledTimes(1);
    });
});

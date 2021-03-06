import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Image } from './Image';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

import imgCloseCross from '../../../../static/images/close-cross.svg';
import imgLogo from '../../../../static/images/logo.svg';
import imgErrorLogo from '../../../../static/images/error-logo.svg';
import imgAvatarPlaceHolder from '../../../../static/images/avatar-placeholder.svg';
import imgYandexLogo from '../../../../static/images/yandex-logo.svg';

export default {
    title: 'POCKET-TANKS/components/Images',
    component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => (
    <WrapperCenter className="wrapper-center">
        <Image
            className={args.className}
            imagePath={args.imagePath}
        />
    </WrapperCenter>
);

export const ImageCloseCross = Template.bind({});
ImageCloseCross.args = {
    className: 'image_close-cross',
    imagePath: imgCloseCross,
};

export const ImageLogo = Template.bind({});
ImageLogo.args = {
    className: 'image_logo',
    imagePath: imgLogo,
};

export const ImageErrorLogo = Template.bind({});
ImageErrorLogo.args = {
    className: 'image_logo',
    imagePath: imgErrorLogo,
};

export const ImageAvatarPlaceHolder = Template.bind({});
ImageAvatarPlaceHolder.args = {
    className: 'image_avatar',
    imagePath: imgAvatarPlaceHolder,
};

export const ImageYandexLogo = Template.bind({});
ImageYandexLogo.args = {
    className: 'image_yandex-logo',
    imagePath: imgYandexLogo,
};

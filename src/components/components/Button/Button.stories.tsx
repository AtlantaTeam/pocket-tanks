import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

// import '../../../../static/styles/fonts.css';
import imageYandexLogo from '../../../../static/images/yandex-logo-black.svg';
import { Button } from './Button';
import { Image } from '../Image/Image';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <WrapperCenter className="wrapper-center">
        <Button
            type={args.type}
            className={args.className}
            text={args.text}
        >
            {args.children}
        </Button>
    </WrapperCenter>
);

const TemplateWithChildren: ComponentStory<
    typeof Button
> = (args) => (
    <WrapperCenter className="wrapper-center">
        <Button type={args.type} className={args.className}>
            <Image
                className="image image_yandex-logo"
                imagePath={args.imagePath}
            />
        </Button>
    </WrapperCenter>
);

export const ButtonOrange = Template.bind({});
ButtonOrange.args = {
    text: 'Текст',
    className: 'button button_orange',
    type: 'button',
};

export const ButtonLightOrange = Template.bind({});
ButtonLightOrange.args = {
    text: 'Текст',
    className: 'button button_light-orange',
    type: 'button',
};

export const ButtonYandexLogo = TemplateWithChildren.bind(
    {},
);

ButtonYandexLogo.args = {
    className: 'button button_yandex-logo',
    imagePath: imageYandexLogo,
    type: 'button',
};

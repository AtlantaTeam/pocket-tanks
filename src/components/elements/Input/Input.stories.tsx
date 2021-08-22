import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Label } from './elements/Label/Label';
import { Input } from './Input';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';
import { ErrorLabel } from './elements/ErrorLabel/ErrorLabel';

export default {
    title: 'POCKET-TANKS/elements/Inputs',
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
    <WrapperCenter className="wrapper-center wrapper-center_padding">
        <Input
            className={args.className}
            placeholder={args.placeholder}
            type="text"
            defaultValue={args.defaultValue}
        />
    </WrapperCenter>
);

const TemplateWithLabel: ComponentStory<typeof Input> = (
    args,
) => (
    <WrapperCenter className="wrapper-center wrapper-center_padding">
        <Label
            inputName={args.name}
            className="label"
            text={args.labelText}
        />
        <Input
            className={args.className}
            placeholder={args.placeholder}
            type="text"
            defaultValue={args.defaultValue}
        />
        <ErrorLabel
            className="error-label"
            text="ошибкe не видно"
        />
        <Label
            inputName={args.name}
            className="label label_active"
            text={args.labelText}
        />
        <Input
            className={args.className}
            placeholder={args.placeholder}
            type="text"
            defaultValue={args.defaultValue}
        />
        <ErrorLabel
            className="error-label"
            text="Ошибка"
        />
    </WrapperCenter>
);

export const InputWhite = Template.bind({});
InputWhite.args = {
    className: 'input input_white',
    placeholder: 'Pocket Tanks',
    type: 'text',
    defaultValue: 'Ввод',
};

export const InputTransparent = Template.bind({});
InputTransparent.args = {
    className: 'input input_transparent',
    placeholder: 'Pocket Tanks',
};

export const InputWithLabels = TemplateWithLabel.bind({});
InputWithLabels.args = {
    className: 'input input_white',
    placeholder: 'Pocket Tanks',
    type: 'text',
    defaultValue: 'Ввод',
    labelText: 'Имя',
};

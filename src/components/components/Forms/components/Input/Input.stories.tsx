import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Label } from './components/Label/Label';
import { Input } from './Input';
import { WrapperCenter } from '../../../WrapperCenter/WrapperCenter';
import { ErrorLabel } from './components/ErrorLabel/ErrorLabel';

export default {
    title: 'POCKET-TANKS/components/Forms/components/Inputs',
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

const TemplateWithLabel: ComponentStory<
    typeof Input
> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_padding">
        <form className="form">
            <div className="form__fields-group">
                <Input
                    className="input input_normal"
                    placeholder="Login"
                    name="login"
                />
                <Label
                    className="label"
                    inputName="login"
                    text="Login"
                />
                <ErrorLabel
                    className="error-label"
                    text="Error message"
                />
            </div>
            <div className="form__fields-group">
                <Input
                    className="input input_normal"
                    placeholder="Password"
                    name="password"
                />
                <Label
                    className="label"
                    inputName="password"
                    text="password"
                />
            </div>
            <ErrorLabel
                className="error-label"
                text="Error message"
            />
        </form>
    </WrapperCenter>
);

export const InputWhite = Template.bind({});
InputWhite.args = {
    className: 'input input_normal',
    placeholder: 'Pocket Tanks',
    type: 'text',
    defaultValue: 'something',
};

export const InputTransparent = Template.bind({});
InputTransparent.args = {
    className: 'input input_transparent',
    placeholder: 'Pocket Tanks',
};

export const InputWithLabels = TemplateWithLabel.bind({});
InputWithLabels.args = {
    className: 'input input_normal',
    placeholder: 'Pocket Tanks',
    type: 'text',
    defaultValue: 'something',
    labelText: 'Name',
};

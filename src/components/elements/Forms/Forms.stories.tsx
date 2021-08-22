import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { FormSignUp } from './FormSignUp';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/elements/Forms',
    component: FormSignUp,
} as ComponentMeta<typeof FormSignUp>;

const Template: ComponentStory<typeof FormSignUp> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screeen-black">
        <FormSignUp />
    </WrapperCenter>
);

export const FormSignUpTemplate = Template.bind({});

import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { FormSignUp } from './FormSignUp';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormSignUp',
    component: FormSignUp,
} as ComponentMeta<typeof FormSignUp>;

const Template: ComponentStory<typeof FormSignUp> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screeen-big">
        <FormSignUp />
    </WrapperCenter>
);

export const FormSignUpTemplate = Template.bind({});

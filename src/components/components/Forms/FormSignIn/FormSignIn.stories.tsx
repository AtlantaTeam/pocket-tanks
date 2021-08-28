import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { FormSignIn } from './FormSignIn';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormSignIn',
    component: FormSignIn,
} as ComponentMeta<typeof FormSignIn>;

const Template: ComponentStory<typeof FormSignIn> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screen-black">
        <FormSignIn />
    </WrapperCenter>
);

export const FormSignInTemplate = Template.bind({});

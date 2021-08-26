import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';
import { FormOAuth } from './FormOAuth';

export default {
    title: 'POCKET-TANKS/components/Forms/FormOAuth',
    component: FormOAuth,
} as ComponentMeta<typeof FormOAuth>;

const Template: ComponentStory<typeof FormOAuth> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screeen-black">
        <FormOAuth />
    </WrapperCenter>
);

export const FormOAuthTemplate = Template.bind({});

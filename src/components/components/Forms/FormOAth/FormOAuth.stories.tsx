import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';
import { FormOAuthYandex } from './FormOAuthYandex';

export default {
    title: 'POCKET-TANKS/components/Forms/FormOAuth',
    component: FormOAuthYandex,
} as ComponentMeta<typeof FormOAuthYandex>;

const Template: ComponentStory<typeof FormOAuthYandex> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screen-black">
        <FormOAuthYandex />
    </WrapperCenter>
);

export const FormOAuthTemplate = Template.bind({});

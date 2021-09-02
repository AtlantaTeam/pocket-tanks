import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { FormEditProfileData } from './FormEditProfileData';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormEditProfileData',
    component: FormEditProfileData,
} as ComponentMeta<typeof FormEditProfileData>;

const Template: ComponentStory<typeof FormEditProfileData> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <FormEditProfileData />
    </WrapperCenter>
);

export const FormEditProfileDataTemplate = Template.bind({});

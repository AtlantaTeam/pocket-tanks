import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { FormEditPassword } from './FormEditPassword';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormEditPassword',
    component: FormEditPassword,
} as ComponentMeta<typeof FormEditPassword>;

const Template: ComponentStory<typeof FormEditPassword> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <FormEditPassword />
    </WrapperCenter>
);

export const FormEditPasswordTemplate = Template.bind({});

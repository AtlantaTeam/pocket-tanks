import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';
import { FormLoadAvatar } from './FormLoadAvatar';

export default {
    title: 'POCKET-TANKS/components/Forms/FormLoadAvatar',
    component: FormLoadAvatar,
} as ComponentMeta<typeof FormLoadAvatar>;

const Template: ComponentStory<typeof FormLoadAvatar> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <FormLoadAvatar />
    </WrapperCenter>
);

export const FormLoadAvavatarTemplate = Template.bind({});

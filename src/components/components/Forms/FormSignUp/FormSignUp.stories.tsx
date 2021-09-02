import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
    <WrapperCenter className="wrapper-center wrapper-center_full-screen-big">
        <Router>
            <FormSignUp />
        </Router>
    </WrapperCenter>
);

export const FormSignUpTemplate = Template.bind({});

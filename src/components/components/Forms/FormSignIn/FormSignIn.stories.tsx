import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

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
        <Router>
            <FormSignIn />
        </Router>
    </WrapperCenter>
);

export const FormSignInTemplate = Template.bind({});

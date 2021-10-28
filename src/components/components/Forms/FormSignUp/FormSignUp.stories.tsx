import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../../redux/store';

import { FormSignUp } from './FormSignUp';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormSignUp',
    component: FormSignUp,
} as ComponentMeta<typeof FormSignUp>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof FormSignUp> = () => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_full-screen-black">
            <Router>
                <FormSignUp />
            </Router>
        </WrapperCenter>
    </Provider>
);

export const FormSignUpTemplate = Template.bind({});

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../../redux/store';

import { FormSignIn } from './FormSignIn';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormSignIn',
    component: FormSignIn,
} as ComponentMeta<typeof FormSignIn>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof FormSignIn> = () => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_full-screen-black">
            <Router>
                <FormSignIn />
            </Router>
        </WrapperCenter>
    </Provider>

);

export const FormSignInTemplate = Template.bind({});

import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../../redux/store';

import { FormEditPassword } from './FormEditPassword';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormEditPassword',
    component: FormEditPassword,
} as ComponentMeta<typeof FormEditPassword>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof FormEditPassword> = () => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_tabs">
            <FormEditPassword />
        </WrapperCenter>
    </Provider>
);

export const FormEditPasswordTemplate = Template.bind({});

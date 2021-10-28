import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../../redux/store';

import { FormEditProfileData } from './FormEditProfileData';
import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Forms/FormEditProfileData',
    component: FormEditProfileData,
} as ComponentMeta<typeof FormEditProfileData>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof FormEditProfileData> = () => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_tabs">
            <FormEditProfileData />
        </WrapperCenter>
    </Provider>
);

export const FormEditProfileDataTemplate = Template.bind({});

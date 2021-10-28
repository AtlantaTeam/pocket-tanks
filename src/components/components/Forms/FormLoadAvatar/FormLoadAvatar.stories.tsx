import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../../redux/store';

import { WrapperCenter } from '../../WrapperCenter/WrapperCenter';
import { FormLoadAvatar } from './FormLoadAvatar';

export default {
    title: 'POCKET-TANKS/components/Forms/FormLoadAvatar',
    component: FormLoadAvatar,
} as ComponentMeta<typeof FormLoadAvatar>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof FormLoadAvatar> = () => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_tabs">
            <FormLoadAvatar />
        </WrapperCenter>
    </Provider>

);

export const FormLoadAvavatarTemplate = Template.bind({});

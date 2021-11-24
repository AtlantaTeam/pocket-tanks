import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../redux/store';

import { Tabs } from './Tabs';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Tabs',
    component: Tabs,
} as ComponentMeta<typeof Tabs>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof Tabs> = (args) => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_tabs">
            <Tabs tabs={args.tabs} />
        </WrapperCenter>
    </Provider>
);

export const TabsElement = Template.bind({});
TabsElement.args = {
    tabs: [
        'Data',
        'Avatar',
        'Password',
    ],
};

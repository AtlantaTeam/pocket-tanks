import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Provider } from 'react-redux';
import { getInitialState } from '../../../redux/reducers/getInitalState';
import { initializeStore } from '../../../redux/store';

import { MenuComponent } from './Menu';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Menu',
    component: MenuComponent,
} as ComponentMeta<typeof MenuComponent>;

const { store } = initializeStore(getInitialState());

const Template: ComponentStory<typeof MenuComponent> = () => (
    <Provider store={store}>
        <WrapperCenter className="wrapper-center wrapper-center_tabs">
            <Router>
                <MenuComponent />
            </Router>
        </WrapperCenter>
    </Provider>
);

export const MenuComponentTemplate = Template.bind({});

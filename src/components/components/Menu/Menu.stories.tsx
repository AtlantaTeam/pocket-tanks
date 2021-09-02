import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { MenuComponent } from './Menu';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Menu',
    component: MenuComponent,
} as ComponentMeta<typeof MenuComponent>;

const Template: ComponentStory<typeof MenuComponent> = () => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <Router>
            <MenuComponent />
        </Router>
    </WrapperCenter>
);

export const MenuComponentTemplate = Template.bind({});

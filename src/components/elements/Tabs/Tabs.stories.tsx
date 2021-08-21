import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Tabs } from './Tabs';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/elements/Tabs',
    component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <Tabs tabs={args.tabs} />
    </WrapperCenter>
);

export const TabsElement = Template.bind({});
TabsElement.args = {
    tabs: [
        'Данные',
        'Аватар',
        'Пароль',
    ],
};

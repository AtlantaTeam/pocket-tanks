import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Popup } from './Popup';

export default {
    title: 'POCKET-TANKS/elements/Poups',
    component: Popup,
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = () => (
    <Popup>
        <span> FFF </span>
    </Popup>
);

export const PopupElement = Template.bind({});

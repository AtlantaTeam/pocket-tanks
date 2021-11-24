import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Popup } from './Popup';

export default {
    title: 'POCKET-TANKS/components/Popup',
    component: Popup,
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = () => (
    <Popup
        isOpen
        title="Warning"
        textContent="Message text"
        buttonText="Close"
        overlayType="warning"
        action={() => {}}
    />
);

export const PopupElement = Template.bind({});

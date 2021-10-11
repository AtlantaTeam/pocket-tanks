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
        title="Внимание"
        textContent="Текст сообщения для пользователя"
        buttonText="Закрыть"
        action={() => {}}
    />
);

export const PopupElement = Template.bind({});

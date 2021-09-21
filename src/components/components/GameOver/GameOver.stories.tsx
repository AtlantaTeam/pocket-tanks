import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { GameOver } from './GameOver';

export default {
    title: 'POCKET-TANKS/components/GameOver',
    component: GameOver,
} as ComponentMeta<typeof GameOver>;

const Template: ComponentStory<typeof GameOver> = () => (
    <GameOver isOpen winner={() => 'Winner'}>
        <span> FFF </span>
    </GameOver>
);

export const PopupElement = Template.bind({});

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import '../../../styles/fonts.css';
import gamePlayMusic from 'audio/gameplay.mp3';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';
import { SoundButton } from './SoundButton';

export default {
    title: 'POCKET-TANKS/components/SoundButton',
    component: SoundButton,
} as ComponentMeta<typeof SoundButton>;

const Template: ComponentStory<typeof SoundButton> = () => (
    <WrapperCenter className="wrapper-center">
        <SoundButton src={gamePlayMusic} />
    </WrapperCenter>
);

export const ButtonSound = Template.bind({});
ButtonSound.args = {};

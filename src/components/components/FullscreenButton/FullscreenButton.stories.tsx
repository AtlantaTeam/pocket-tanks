import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';
import { FullscreenButton } from './FullscreenButton';

export default {
    title: 'POCKET-TANKS/components/FullscreenButton',
    component: FullscreenButton,
} as ComponentMeta<typeof FullscreenButton>;

const Template: ComponentStory<typeof FullscreenButton> = () => (
    <WrapperCenter className="wrapper-center">
        <FullscreenButton />
    </WrapperCenter>
);

export const ButtonFullscreen = Template.bind({});
ButtonFullscreen.args = {};

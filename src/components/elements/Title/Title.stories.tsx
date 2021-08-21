import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Title } from './Title';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/elements/Titles',
    component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
    <WrapperCenter className="wrapper-center">
        <Title
            className={args.className}
            text={args.text}
        />
    </WrapperCenter>
);

export const TitleMiddle = Template.bind({});
TitleMiddle.args = {
    className: 'title title_middle',
    text: 'Title',
};

export const TitleBig = Template.bind({});
TitleBig.args = {
    className: 'title title_big',
    text: 'Pocket Tanks',
};

import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Title } from './Title';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Titles',
    component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <Title
            className={args.className}
            text={args.text}
        />
    </WrapperCenter>
);

export const TitleMiddleForm = Template.bind({});
TitleMiddleForm.args = {
    className: 'title title_middle-form',
    text: 'Title',
};

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

import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Counter } from './Counter';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/Counter',
    component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => (
    <WrapperCenter className="wrapper-center wrapper-center_tabs">
        <Counter
            label={args.label}
            step={args.step}
            min={args.min}
            max={args.max}
            initialState={args.initialState}
            name={args.name}
        />
    </WrapperCenter>
);

export const CounterTemplate = Template.bind({});

CounterTemplate.args = {
    label: 'Сила мысли',
    initialState: 0,
    step: 1,
    max: '10',
    min: '0',
    name: 'counter',
};

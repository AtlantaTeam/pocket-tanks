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
            leftStepHandler={args.leftStepHandler}
            rightStepHandler={args.rightStepHandler}
            name={args.name}
        />
    </WrapperCenter>
);

export const CounterTemplate = Template.bind({});

CounterTemplate.args = {
    label: 'Сила мысли',
    name: 'counter',
    leftStepHandler: () => {},
    rightStepHandler: () => {},
};

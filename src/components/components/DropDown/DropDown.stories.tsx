import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DropDown } from './DropDown';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/DropDown',
    component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (
    args,
) => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screen">
        <DropDown
            selectedValue={args.values[0]}
            values={args.values}
            label={args.label}
            listPosition={args.listPosition}
            onChange={() => {}}
        />
    </WrapperCenter>
);

export const DropDownTemplateTop = Template.bind({});

DropDownTemplateTop.args = {
    values: [
        { id: 1, name: 'Iron ball' },
        { id: 2, name: 'Rocket' },
        { id: 3, name: 'Wall' },
        { id: 4, name: 'Acid' },
        { id: 5, name: 'TomGun' },
        { id: 6, name: 'Iron ball 9000' },
        { id: 7, name: 'Rocket 850r4' },
    ],
    label: 'Weapons',
    listPosition: 'top',
};

export const DropDownTemplateBottom = Template.bind({});

DropDownTemplateBottom.args = {
    values: [
        { id: 1, name: 'Iron ball' },
        { id: 2, name: 'Rocket' },
        { id: 3, name: 'Wall' },
        { id: 4, name: 'Acid' },
        { id: 5, name: 'TomGun' },
    ],
    label: 'Weapons',
    listPosition: 'bottom',
};

import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { WeaponSelect } from './WeaponSelect';

export default {
    title: 'POCKET-TANKS/components/WeaponSelect',
    component: WeaponSelect,
} as ComponentMeta<typeof WeaponSelect>;

const Template: ComponentStory<typeof WeaponSelect> = (
) => (
    <WeaponSelect
        weapon={[
            { id: 1, name: 'Ядро' },
            { id: 2, name: 'Ракета' },
            { id: 3, name: 'Снаряд' },
            { id: 4, name: 'Фугас' },
            { id: 5, name: 'Пулемет' },
        ]}
        label="Тип оружия"
    />
);

export const WeaponSelectTemplate = Template.bind({});

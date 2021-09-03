import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { WeaponSelect } from './WeaponSelect';
import { WrapperCenter } from '../WrapperCenter/WrapperCenter';

export default {
    title: 'POCKET-TANKS/components/WeaponSelect',
    component: WeaponSelect,
} as ComponentMeta<typeof WeaponSelect>;

const Template: ComponentStory<typeof WeaponSelect> = (
) => (
    <WrapperCenter className="wrapper-center wrapper-center_full-screen">
        <WeaponSelect
            weapon={[
                { id: 1, name: 'Ядро' },
                { id: 2, name: 'Ракета' },
                { id: 3, name: 'Снаряд' },
                { id: 4, name: 'Фугас' },
                { id: 5, name: 'Пулемет' },
                { id: 6, name: 'Ядро 9000' },
                { id: 7, name: 'Ракета 850r4' },
                { id: 8, name: 'Снаряд 55E81' },
            ]}
            label="Тип оружия"
            listPosition="top"
        />
    </WrapperCenter>
);

export const WeaponSelectTemplate = Template.bind({});

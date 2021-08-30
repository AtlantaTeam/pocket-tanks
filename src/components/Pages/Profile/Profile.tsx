import React from 'react';

import { Tabs } from 'components/components/Tabs/Tabs';
import { Page } from '../components/Page/Page';

const tabs = ['Данные', 'Аватар', 'Пароль'];

export const Profile = () => (
    <Page>
        <div>
            <Tabs tabs={tabs} />
        </div>
    </Page>
);

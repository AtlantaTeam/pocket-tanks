import React from 'react';

import { Title } from 'components/components/Title/Title';
import { Tabs } from 'components/components/Tabs/Tabs';
import { Page } from '../components/Page/Page';

import './Profile.css';

const tabs = ['Данные', 'Аватар', 'Пароль'];

export const Profile = () => (
    <Page>
        <div className="profile-wrapper">
            <Title className="title title_middle" text="Player 1" />
            <Tabs tabs={tabs} />
        </div>
    </Page>
);

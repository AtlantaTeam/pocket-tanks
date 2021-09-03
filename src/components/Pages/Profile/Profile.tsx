import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Title } from 'components/components/Title/Title';
import { Tabs } from 'components/components/Tabs/Tabs';
import { Page } from '../components/Page/Page';
import { Button } from '../../components/Button/Button';

import { logoutRequested } from '../../../redux/actions/user-state/logout';
import { fetchUserInfoRequested } from '../../../redux/actions/user-state/user-info';

import './Profile.css';

const tabs = ['Данные', 'Аватар', 'Пароль'];

export const Profile = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfoRequested());
    });

    return (
        <Page>
            <div className="profile-wrapper">
                <Title className="title title_middle" text="Player 1" />
                <Tabs tabs={tabs} />
                <Button
                    type="button"
                    text="Выйти"
                    className="button-link button-logout"
                    onClick={() => dispatch(logoutRequested())}
                />
            </div>
        </Page>
    );
};

import React from 'react';
import { useSelector } from 'react-redux';

import { i18n, useTranslation } from 'i18n';
import Loader from 'react-loader-spinner';
import { Title } from 'components/components/Title/Title';
import { Tabs } from 'components/components/Tabs/Tabs';
import { Page } from '../components/Page/Page';

import { getUserNickname } from '../../../redux/selectors/user-state';
import './Profile.css';

const tabs = [i18n.t('profileData'), i18n.t('avatar'), i18n.t('password')];

export const Spinner = () => (
    <div className="profile-spinner">
        <Loader type="BallTriangle" color="var(--main)" width="200" height="200" />
    </div>
);

export const Profile = () => {
    const userName = useSelector(getUserNickname);
    const { t } = useTranslation();

    return (
        <Page>
            <div className="profile-wrapper">
                <Title className="title title_middle" text={userName ?? t('loading')} />
                {userName ? <Tabs tabs={tabs} /> : <Spinner />}
            </div>
        </Page>
    );
};

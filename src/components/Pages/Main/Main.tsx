import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'i18n';

import './Main.css';

import imgLogo from 'images/logo.svg';
import { Title } from 'components/components/Title/Title';
import { Text } from 'components/components/Text/Text';
import { Image } from 'components/components/Image/Image';
import { Page } from '../components/Page/Page';

export const Main = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <div className="main-content">
                <div className="main-content__left-container">
                    <Title className="title title_big" text="Pocket Tanks" />
                    <div className="main-text">
                        <div>
                            <Text
                                className="text text_main"
                                text={t('graduationProject')}
                            />
                            <Text
                                className="text text_main"
                                text="for Yandex Praktikum Middle Frontend Developer course"
                            />
                        </div>
                        <div>
                            <Text
                                className="text text_main"
                                text={t('tanksBattle')}
                            />
                            <Text
                                className="text text_main"
                                text={t('mayTheBestTankWin')}
                            />
                            <Text
                                className="text text_main"
                                text={t('areYouASharpShooter')}
                            />
                        </div>
                    </div>
                    <Link
                        to="/game"
                        className="button button_orange button_orange_link"
                    >
                        {t('letsGo')}
                    </Link>
                </div>
                <Image
                    className="image_logo image_icon"
                    imagePath={imgLogo}
                />
            </div>
        </Page>
    );
};

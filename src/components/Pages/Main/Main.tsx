import React from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import { Title } from 'components/components/Title/Title';
import { Text } from 'components/components/Text/Text';
import { Image } from 'components/components/Image/Image';
import { Page } from '../components/Page/Page';
import imgLogo from '../../../../static/images/logo.svg';

export const Main = () => (
    <Page>
        <div className="main-content">
            <div className="main-content__left-container">
                <Title className="title title_big" text="Pocket Tanks" />
                <div className="main-text">
                    <div>
                        <Text
                            className="text text_main"
                            text="Проектная работа студентов курса"
                        />
                        <Text
                            className="text text_main"
                            text="Yandex Praktikum Middle Frontend Developer"
                        />
                    </div>
                    <div>
                        <Text
                            className="text text_main"
                            text="Битва двух танков в жаркой пустыне!"
                        />
                        <Text
                            className="text text_main"
                            text="Победи своего противника!"
                        />
                        <Text
                            className="text text_main"
                            text="Целься точнее!"
                        />
                    </div>
                </div>
                <Link
                    to="/leaderboard"
                    className="button button_orange button_orange_link"
                >
                    Поехали!
                </Link>
            </div>
            <Image
                className="image_logo"
                imagePath={imgLogo}
            />
        </div>
    </Page>
);

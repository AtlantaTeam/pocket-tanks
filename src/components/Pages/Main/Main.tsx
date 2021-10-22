import React from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import imgLogo from 'images/logo.svg';

import { Title } from 'components/components/Title/Title';
import { Text } from 'components/components/Text/Text';
import { Image } from 'components/components/Image/Image';
import { Page } from '../components/Page/Page';

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
                    to="/game"
                    className="button button_orange button_orange_link"
                >
                    Поехали!
                </Link>
            </div>
            <Image
                className="image_logo image_icon"
                imagePath={imgLogo}
            />
        </div>
    </Page>
);

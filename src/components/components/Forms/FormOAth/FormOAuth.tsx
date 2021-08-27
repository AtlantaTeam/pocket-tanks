import React from 'react';
import { Button } from '../../Button/Button';
import { Image } from '../../Image/Image';
import { Text } from '../../Text/Text';

import imageYandexLogo from '../../../../../static/images/yandex-logo-black.svg';

import './FormOAuth.css';

export const FormOAuth = () => (
    <form className="form-oauth">
        <Text className="text" text="Войти с помощью" />
        <Button
            className="button button_yandex-logo"
            type="button"
        >
            <Image
                className="image image_yandex-logo"
                imagePath={imageYandexLogo}
            />
        </Button>
    </form>
);

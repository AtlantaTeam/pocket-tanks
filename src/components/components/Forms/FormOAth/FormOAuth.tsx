import React from 'react';
import { useTranslation } from 'i18n';
import {
    GOOGLE_OAUTH_AUTHORIZE_URL,
    GOOGLE_REDIRECT_URI,
    YANDEX_OAUTH_AUTHORIZE_URL,
    YANDEX_REDIRECT_URI,
} from 'constants/api-routes';

import { Button } from '../../Button/Button';
import { Image } from '../../Image/Image';
import { Text } from '../../Text/Text';
import imageYandexLogo from '../../../../../static/images/yandex-logo-black.svg';
import imageGoogleLogo from '../../../../../static/images/google-logo-full.svg';
import './FormOAuth.css';

const YANDEX_OAUTH_CLIENT_ID = process.env.YANDEX_CLIENT_ID || '';
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

export const FormOAuth = () => {
    const { t } = useTranslation();

    return (
        <form className="form-oauth">
            <Text className="text" text={t('enterWith')} />

            <div className="social-button-wrapper">
                <a
                    className="social-button"
                    href={`${YANDEX_OAUTH_AUTHORIZE_URL}&client_id=${YANDEX_OAUTH_CLIENT_ID}`
                    + `&redirect_uri=${YANDEX_REDIRECT_URI}`}
                    target="_self"
                >
                    <Button
                        className="button button_yandex-logo"
                        type="submit"
                        label={t('enterWithYandex')}
                    >
                        <Image
                            className="image image_yandex-logo"
                            imagePath={imageYandexLogo}
                        />
                    </Button>
                </a>

                <a
                    className="social-button"
                    href={`${GOOGLE_OAUTH_AUTHORIZE_URL}&client_id=${GOOGLE_OAUTH_CLIENT_ID}`
                    + `&redirect_uri=${GOOGLE_REDIRECT_URI}`}
                    target="_self"
                >
                    <Button
                        className="button button_yandex-logo"
                        type="submit"
                        label={t('enterWithYandex')}
                    >
                        <Image
                            className="image image_yandex-logo"
                            imagePath={imageGoogleLogo}
                        />
                    </Button>
                </a>
            </div>
        </form>
    );
};

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';
import {
    GOOGLE_OAUTH_AUTHORIZE_URL,
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_REDIRECT_URI,
    YANDEX_OAUTH_AUTHORIZE_URL,
    YANDEX_OAUTH_CLIENT_ID,
    YANDEX_REDIRECT_URI,
} from 'constants/api-routes';

import { Button } from '../../Button/Button';
import { Image } from '../../Image/Image';
import imageYandexLogo from '../../../../../static/images/yandex-logo-black.svg';
import imageGoogleLogo from '../../../../../static/images/google-logo-full.svg';
import './FormOAuth.css';

const IS_DEV = process.env.NODE_ENV === 'development';

export const FormOAuth = () => {
    const [yandexClientId, setYandexClientId] = useState(YANDEX_OAUTH_CLIENT_ID);
    const [yandexRedirectUri, setYandexRedirectUri] = useState(YANDEX_REDIRECT_URI);
    const [googleClientId, setGoogleClientId] = useState(GOOGLE_OAUTH_CLIENT_ID);
    const [googleRedirectUri, setGoogleRedirectUri] = useState(GOOGLE_REDIRECT_URI);
    const { t } = useTranslation();

    // For local Yandex API
    useEffect(() => {
        if (IS_DEV) {
            setYandexRedirectUri(YANDEX_REDIRECT_URI.replace('pocketanks.ru', 'localhost:5000'));
            setGoogleRedirectUri(GOOGLE_REDIRECT_URI.replace('pocketanks.ru', 'localhost:5000'));
        //     authAPIDirectToAPI.getServiceId(`${SERVER_URL}`)
        //         .then(({ data }) => {
        //             const { serviceId } = objectToCamel(data);
        //             setYandexClientId(serviceId);
        //             setYandexRedirectUri(SERVER_URL);
        //             return serviceId;
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        // } else {
        }
    }, []);

    return (
        <form className="form-oauth">

            <div className="social-button-wrapper">
                <a
                    className="social-button"
                    href={`${YANDEX_OAUTH_AUTHORIZE_URL}&client_id=${yandexClientId}&redirect_uri=${yandexRedirectUri}`}
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
                    href={`${GOOGLE_OAUTH_AUTHORIZE_URL}&client_id=${googleClientId}&redirect_uri=${googleRedirectUri}`}
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

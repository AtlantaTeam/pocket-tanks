import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';
import {
    OAUTH_AUTHORIZE_URL, OAUTH_YANDEX_CLIENT_ID, SERVER_URL, YANDEX_REDIRECT_URI,
} from 'constants/api-routes';
import { objectToCamel } from 'ts-case-convert';

import { authAPIDirectToAPI } from '../../../../api/auth-api';

import { Button } from '../../Button/Button';
import { Image } from '../../Image/Image';
import { Text } from '../../Text/Text';
import imageYandexLogo from '../../../../../static/images/yandex-logo-black.svg';
import './FormOAuth.css';

const IS_DEV = process.env.NODE_ENV === 'development';

export const FormOAuthYandex = () => {
    const [clientServiceId, setClientServiceId] = useState(OAUTH_YANDEX_CLIENT_ID);
    const [redirectUri, setRedirectUri] = useState(YANDEX_REDIRECT_URI);
    const { t } = useTranslation();

    // For local Yandex API
    useEffect(() => {
        if (IS_DEV) {
            authAPIDirectToAPI.getServiceId(`${SERVER_URL}`)
                .then(({ data }) => {
                    const { serviceId } = objectToCamel(data);
                    setClientServiceId(serviceId);
                    setRedirectUri(SERVER_URL);
                    return serviceId;
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            setClientServiceId(OAUTH_YANDEX_CLIENT_ID);
        }
    }, [clientServiceId]);

    return (
        <form className="form-oauth">
            <Text className="text" text={t('enterWith')} />

            <a
                href={`${OAUTH_AUTHORIZE_URL}&client_id=${clientServiceId}&redirect_uri=${redirectUri}`}
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
        </form>
    );
};

import React, { useEffect, useState } from 'react';
import { OAUTH_AUTHORIZE_URL, SERVER_URL } from 'constants/api-routes';
import { objectToCamel } from 'ts-case-convert';
import { authAPIDirectToAPI } from '../../../../api/auth-api';
import { Button } from '../../Button/Button';

import { Image } from '../../Image/Image';

import { Text } from '../../Text/Text';
import imageYandexLogo from '../../../../../static/images/yandex-logo-black.svg';
import './FormOAuth.css';

export const FormOAuth = () => {
    const [clientServiceId, setClientServiceId] = useState('');

    useEffect(() => {
        authAPIDirectToAPI.getServiceId(SERVER_URL)
            .then(({ data }) => {
                const { serviceId } = objectToCamel(data);
                setClientServiceId(serviceId);
                return serviceId;
            }).catch((err) => {

            });
    }, [clientServiceId]);

    return (
        <form className="form-oauth">
            <Text className="text" text="Войти с помощью" />

            <a
                href={`${OAUTH_AUTHORIZE_URL}&client_id=${clientServiceId}&redirect_uri=${SERVER_URL}`}
                target="_self"
            >
                <Button
                    className="button button_yandex-logo"
                    type="submit"

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

import React from 'react';

import { Title } from '../components/Title/Title';
import { Image } from '../components/Image/Image';
import { Text } from '../components/Text/Text';
import { Button } from '../components/Button/Button';
import ErrorLogo from '../../../static/images/error-logo.svg';

import './SpareUI.css';

interface SpareUIProps {
    errorMessage: string;
}

export function SpareUI(props: SpareUIProps) {
    return (
        <div className="spare-ui">
            <Title className="title title_big" text="Что-то пошло не так..." />
            <Image
                className="image image_logo spare-ui__logo"
                imagePath={ErrorLogo}
                alt=" "
            />
            <Text text={props.errorMessage} className="text spare-ui__message" />
            <Button
                type="button"
                className="button button_orange"
                text="Перезагрузить страницу"
                // eslint-disable-next-line no-restricted-globals
                onClick={() => location.reload()}
            />
        </div>
    );
}

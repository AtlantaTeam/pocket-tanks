import React from 'react';

import { Popup, PopupProps } from '../../Popup/Popup';
import { ForumInput } from '../ForumInput/ForumInput';

export interface NewThreadModalProps {
    action: PopupProps['action'];
    onCrossPress: NonNullable<PopupProps['onCrossPress']>;
}

export const NewThreadModal = (props: NewThreadModalProps) => (
    <Popup
        isOpen
        action={() => {
            props.action();
            props.onCrossPress();
        }}
        onCrossPress={props.onCrossPress}
        title="Новая тема"
        buttonText="Создать"
        overlayType="fade"
    >
        <>
            <ForumInput
                type="text"
                placeholder="Тема"
            />
            <ForumInput
                type="textarea"
                placeholder="Сообщение"
            />
        </>
    </Popup>
);

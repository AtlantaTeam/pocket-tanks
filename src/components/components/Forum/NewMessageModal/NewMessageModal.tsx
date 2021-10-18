import React from 'react';

import { Popup, PopupProps } from '../../Popup/Popup';
import { ForumInput } from '../ForumInput/ForumInput';

export interface NewMessageModalProps {
    action: PopupProps['action'];
    onCrossPress: NonNullable<PopupProps['onCrossPress']>;
}

export const NewMessageModal = (props: NewMessageModalProps) => (
    <Popup
        isOpen
        action={() => {
            props.action();
            props.onCrossPress();
        }}
        onCrossPress={props.onCrossPress}
        title="Новое сообщение"
        buttonText="Отправить"
        overlayType="fade"
    >
        <ForumInput
            type="textarea"
            placeholder="Сообщение"
        />
    </Popup>
);

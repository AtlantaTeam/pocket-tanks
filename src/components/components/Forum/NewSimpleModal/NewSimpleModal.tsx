import React, { useState } from 'react';

import { Popup, PopupProps } from '../../Popup/Popup';
import { ForumInput } from '../ForumInput/ForumInput';

export interface NewSimpleModalProps {
    action: (title: string, text: string) => void;
    onCrossPress: NonNullable<PopupProps['onCrossPress']>;
    name: string;
    title: string;
    buttonText: string;
}

export const NewSimpleModal = (props: NewSimpleModalProps) => {
    const [titleText, setTitleText] = useState<string>('');
    const [messageText, setMessageText] = useState<string>('');

    return (
        <Popup
            isOpen
            action={() => {
                props.action(titleText, messageText);
                props.onCrossPress();
            }}
            onCrossPress={props.onCrossPress}
            title={props.name}
            buttonText={props.buttonText}
            overlayType="fade"
        >
            <>
                <ForumInput
                    type="text"
                    placeholder={props.title}
                    onChange={(text: string) => {
                        setTitleText(text);
                    }}
                />
                <ForumInput
                    type="textarea"
                    placeholder="Сообщение"
                    onChange={(text: string) => {
                        setMessageText(text);
                    }}
                />
            </>
        </Popup>
    );
};

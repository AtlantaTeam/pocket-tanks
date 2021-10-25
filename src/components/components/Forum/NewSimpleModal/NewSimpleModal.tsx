import React, { useState } from 'react';

import { Popup, PopupProps } from '../../Popup/Popup';
import { ForumInput } from '../ForumInput/ForumInput';
import { EmojiBar } from '../EmojiBar/EmojiBar';

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
                if ((props.title === 'Тема' && titleText && messageText)
                    || (props.title === 'Заголовок' && messageText)) {
                    props.onCrossPress();
                }
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
                    text={titleText}
                    onChange={setTitleText}
                />
                <ForumInput
                    type="textarea"
                    placeholder="Сообщение"
                    text={messageText}
                    onChange={setMessageText}
                />
                <EmojiBar
                    onSelect={(emoji: string) => {
                        setMessageText(messageText + emoji);
                    }}
                />
            </>
        </Popup>
    );
};

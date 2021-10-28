import React, { useState, useEffect } from 'react';

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
    const [selection, keepSelection] = useState<[number, number]>([0, 0]);

    const textareaRef = React.createRef<HTMLTextAreaElement>();

    useEffect(() => {
        textareaRef.current?.setSelectionRange(...selection);
    }, [selection]);

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
                    ref={textareaRef}
                    type="textarea"
                    placeholder="Сообщение"
                    text={messageText}
                    onChange={setMessageText}
                />
                <EmojiBar
                    onSelect={(emoji: string) => {
                        if (!textareaRef.current) {
                            return;
                        }
                        const { selectionStart: start, selectionEnd: end } = textareaRef.current;
                        const text = `${messageText.slice(0, start)}${emoji}${messageText.slice(end)}`;
                        setMessageText(text);
                        keepSelection([start + 2, start + 2]);
                        textareaRef.current.focus();
                    }}
                />
            </>
        </Popup>
    );
};

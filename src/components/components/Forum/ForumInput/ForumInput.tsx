import React, { useCallback, useEffect, useState } from 'react';

import './ForumInput.css';

export interface ForumInputProps {
    type: 'text' | 'textarea';
    placeholder: string;
    onChange: (text: string) => void;
}

export const ForumInput = (props: ForumInputProps) => {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        props.onChange(text);
    }, [text]);

    return (
        <>
            {props.type === 'text'
                ? (
                    <input
                        className={`forum-input forum-input_${props.type}`}
                        type={props.type}
                        maxLength={30}
                        placeholder={props.placeholder}
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                ) : (
                    <textarea
                        className={`forum-input forum-input_${props.type}`}
                        maxLength={350}
                        placeholder={props.placeholder}
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                )}
        </>
    );
};

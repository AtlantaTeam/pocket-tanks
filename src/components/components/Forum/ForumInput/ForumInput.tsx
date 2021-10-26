import React from 'react';

import './ForumInput.css';

export interface ForumInputProps {
    type: 'text' | 'textarea';
    placeholder: string;
    text: string;
    onChange: (text: string) => void;
}

export const ForumInput = React.forwardRef((props: ForumInputProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => (
    <>
        {props.type === 'text'
            ? (
                <input
                    className={`forum-input forum-input_${props.type}`}
                    type={props.type}
                    maxLength={30}
                    placeholder={props.placeholder}
                    value={props.text}
                    onChange={(event) => props.onChange(event.target.value)}
                />
            ) : (
                <textarea
                    ref={ref}
                    className={`forum-input forum-input_${props.type}`}
                    maxLength={350}
                    placeholder={props.placeholder}
                    value={props.text}
                    onChange={(event) => props.onChange(event.target.value)}
                />
            )}
    </>
));

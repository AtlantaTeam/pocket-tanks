import React from 'react';

import './ForumInput.css';

export interface ForumInputProps {
    type: 'text' | 'textarea';
    placeholder: string;
}

export const ForumInput = (props: ForumInputProps) => (
    <>
        {props.type === 'text'
            ? (
                <input
                    className={`forum-input forum-input_${props.type}`}
                    type={props.type}
                    maxLength={30}
                    placeholder={props.placeholder}
                />
            ) : (
                <textarea
                    className={`forum-input forum-input_${props.type}`}
                    maxLength={350}
                    placeholder={props.placeholder}
                />
            )}
    </>
);

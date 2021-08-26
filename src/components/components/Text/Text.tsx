import React from 'react';

import './Text.css';

export interface TextProps {
    className: string;
    text: string;
    onClick?: () => void;
}

export const Text = (props: TextProps) => (
    <p
        onClick={props.onClick}
        className={props.className}
        aria-hidden="true"
    >
        {props.text}
    </p>
);

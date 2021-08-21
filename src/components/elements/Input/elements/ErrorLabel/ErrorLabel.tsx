import React from 'react';

import './ErrorLabel.css';

export interface ErrorLabelProps {
    className?: string;
    visible?: string;
    text: string;
}

export const ErrorLabel = (props: ErrorLabelProps) => {
    const visible = props.visible ? 'block' : 'none';
    return (
        <span
            className={props.className}
            style={{ display: visible }}
        >
            {props.text}
        </span>
    );
};

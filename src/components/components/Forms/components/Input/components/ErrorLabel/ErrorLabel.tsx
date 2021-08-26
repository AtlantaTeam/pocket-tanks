import React from 'react';

import './ErrorLabel.css';

export interface ErrorLabelProps {
    className?: string;
    text?: string;
}

export const ErrorLabel = (props: ErrorLabelProps) => (
    <span className={props.className}>{props.text}</span>
);

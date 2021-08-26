import React from 'react';

import './Label.css';

export interface LabelProps {
    className?: string;
    text?: string;
    inputName?: string;
    children?: JSX.Element;
}

export const Label = (props: LabelProps) => (
    <label
        className={props.className}
        htmlFor={props.inputName}
    >
        {props.text}
        {props.children}
    </label>
);

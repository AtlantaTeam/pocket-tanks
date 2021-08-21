import React from 'react';

import './elements/Label/Label.css';
import './Input.css';

export interface InputProps {
    type?: string;
    className?: string;
    value?: string | number;
    defaultValue?: string | number;
    placeholder: string;
    name?: string;
    labelText?: string;
    onClick?: () => void;
    onFocus?: () => void;
    onChange?: () => void;
    onBlur?: () => void;
}

export const Input = (props: InputProps) => (
    <input
        className={props.className}
        type={props.type}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        aria-hidden="true"
        onClick={props.onClick}
        onFocus={props.onFocus}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
    />
);

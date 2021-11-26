import React from 'react';

import './Button.css';

export interface ButtonProps {
    type: undefined | 'button' | 'submit' | 'reset';
    text?: string;
    label?: string;
    className?: string;
    children?: JSX.Element[] | JSX.Element;
    imagePath?: string;
    isLoading?: boolean;
    onClick?: () => void;
    onSubmit?: () => void;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => (
    <button
        type="button"
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        className={props.className}
        aria-label={props.label || props.text}
        disabled={props.isLoading || props.disabled}
    >
        {props.text}
        {props.children}
    </button>
);

export const ButtonSubmit = (props: ButtonProps) => (
    <button
        type="submit"
        aria-label={props.text}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        className={props.className}
        disabled={props.isLoading || props.disabled}
    >
        {props.text}
        {props.children}
    </button>
);

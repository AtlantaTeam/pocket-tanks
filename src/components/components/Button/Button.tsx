import React from 'react';

import './Button.css';

export interface ButtonProps {
    type: undefined | 'button' | 'submit' | 'reset';
    text?: string;
    className?: string;
    children?: JSX.Element[] | JSX.Element;
    imagePath?: string;
    isLoading?: boolean;
    onClick?: () => void;
    onSubmit?: () => void;
}

export const Button = (props: ButtonProps) => (
    <button
        type="button"
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        className={props.className}
    >
        {props.text}
        {props.children}
    </button>
);

export const ButtonSubmit = (props: ButtonProps) => (
    <button
        type="submit"
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        className={props.className}
        disabled={props.isLoading}
    >
        {props.text}
        {props.children}
    </button>
);

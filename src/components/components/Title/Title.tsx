import React from 'react';

import './Title.css';

export interface TitleProps {
    className?: string;
    text: string;
    onClick?: () => void;
}

export const Title = (props: TitleProps) => (
    <h1
        onClick={props.onClick}
        className={props.className}
        aria-hidden="true"
    >
        {props.text}
    </h1>
);

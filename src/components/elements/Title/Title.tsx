import React from 'react';

import './Title.css';

export interface TitleProps {
    className?: string;
    text: string;
    onClick?: () => void;
}

export const Title = (props: TitleProps) => (
    <div
        onClick={props.onClick}
        className={props.className}
        aria-hidden="true"
    >
        {props.text}
    </div>
);

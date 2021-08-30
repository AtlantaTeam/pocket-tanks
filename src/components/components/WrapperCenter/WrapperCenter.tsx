import React from 'react';

import './WrapperCenter.css';

export interface WrapperCenterProps {
    className?: string;
    text?: string;
    children: JSX.Element[] | JSX.Element;
    onClick?: () => void;
}

export const WrapperCenter = (
    props: WrapperCenterProps,
) => (
    <div
        onClick={props.onClick}
        className={props.className}
        aria-hidden="true"
    >
        {props.text}
        {props.children}
    </div>
);

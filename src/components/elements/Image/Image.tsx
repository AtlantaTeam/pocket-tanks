import React from 'react';

import './Image.css';

export interface ImageProps {
    className: string;
    onClick?: () => void;
    imagePath?: string;
}

export const Image = (props: ImageProps) => (
    <img
        onClick={props.onClick}
        className={props.className}
        src={props.imagePath}
        alt="Закрыть"
        aria-hidden="true"
    />
);

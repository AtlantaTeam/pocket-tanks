import React from 'react';

import './Image.css';

export interface ImageProps {
    className: string;
    onClick?: () => void;
    alt: string;
    imagePath?: string;
}

export function Image(props: ImageProps) {
    return (
        <img
            onClick={props.onClick}
            className={props.className}
            src={props.imagePath}
            alt={props.alt}
            aria-hidden="true"
        />
    );
}

Image.defaultProps = { alt: 'Picture' };

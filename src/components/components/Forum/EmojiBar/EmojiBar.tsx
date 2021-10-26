import React from 'react';

import './EmojiBar.css';

export interface EmojiBarProps {
    onSelect: (emoji: string) => void;
}

const emojies = [
    '😀', '😄', '😆', '😉', '😬', '😝', '😎', '😵', '😅', '😴',
    '😕', '😟', '😲', '😳', '😒', '😠', '😭', '😢', '😥', '😱',
    '👍', '👎', '👋', '✋', '💪', '👀', '💯', '💥', '💣', '💀',
];

export const EmojiBar = (props: EmojiBarProps) => (
    <div
        className="emoji-bar"
        onClick={(e) => {
            if (e.target instanceof HTMLSpanElement) {
                props.onSelect(e.target.textContent as string);
            }
        }}
        aria-hidden="true"
    >
        {emojies.map((item, index) => (
            <span key={String(index)} className="emoji-bar__item">{item}</span>
        ))}
    </div>
);

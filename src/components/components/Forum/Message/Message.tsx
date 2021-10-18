import React from 'react';

import { sendNotificationDefault } from '../../../../modules/notifications/notifications';

import './Message.css';

export interface MessageProps {
    id: string;
    by: string;
    for: string | null;
    date: number;
    text: string;
    rating: number | null;
    reply: () => void;
}

export const Message = (props: MessageProps) => (
    <div
        id={props.id}
        className="message"
    >
        <div className="message__names">
            <span className="message__by">{props.by}</span>
            <span className="message__for">{` > ${props.for || 'Всем'}`}</span>
        </div>
        <div className="message__date">
            {new Date(props.date).toLocaleString()}
        </div>
        <div className="message__text">
            {props.text}
        </div>
        <div className="message__bottom-row">
            <span
                className="message__reply"
                aria-hidden="true"
                onClick={props.reply}
            >
                Ответить
            </span>
            <span
                className="message__vote message__vote_up"
                aria-hidden="true"
                onClick={() => {
                    sendNotificationDefault(`Vote up message id ${props.id}`);
                }}
            />
            <span
                className="message__vote message__vote_down"
                aria-hidden="true"
                onClick={() => {
                    sendNotificationDefault(`Vote down message id ${props.id}`);
                }}
            />
            <span className="message__rating">
                {props.rating}
            </span>
        </div>
    </div>
);

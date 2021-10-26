import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { forumAPI } from 'api/forum-api';
import { getUserId } from '../../../../redux/selectors/user-state';
import { sendNotificationDefault } from '../../../../modules/notifications/notifications';
import './Message.css';

export interface MessageProps {
    id: number;
    author: string;
    title: string | null;
    date: Date;
    text: string;
    rating: number | null;
    reply: () => void;
}

export const Message = (props: MessageProps) => {
    const [rating, setRating] = useState<number>(props.rating || 0);
    const userId = useSelector(getUserId) || null;

    const vote = (msgId: number, voteValue: number) => {
        if (msgId) {
            forumAPI.updateMessageVote(msgId, {
                ratingVote: voteValue,
                userId,
            }).then((response) => {
                if (rating !== response.data?.rating) {
                    setRating(response.data?.rating);
                    sendNotificationDefault('Ваш голос засчитан');
                }
                return true;
            }).catch((err) => {
                sendNotificationDefault(`Ошибка: Не удалось проголосовать за сообщение id:${msgId}`);
            });
        } else {
            sendNotificationDefault('Ошибка: Не удалось проголосовать! Пустое сообщение ');
        }
    };

    return (
        <div
            id={`${props.id}`}
            className="message"
        >
            <div className="message__names">
                <span className="message__author">{props.author}</span>
                <span className="message__title">{` : ${props.title || 'Всем'}`}</span>
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
                    onClick={() => vote(props.id, 1)}
                />
                <span
                    className="message__vote message__vote_down"
                    aria-hidden="true"
                    onClick={() => vote(props.id, -1)}
                />
                <span className="message__rating">
                    {rating}
                </span>
            </div>
        </div>
    );
};

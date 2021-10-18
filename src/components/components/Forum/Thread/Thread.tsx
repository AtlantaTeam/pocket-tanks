import React from 'react';

import { Message } from '../Message/Message';

import './Thread.css';

import type { MessageData } from '../../../Pages/Forum/mock-data';

export interface ThreadProps {
    id: string;
    title: string;
    messages: MessageData[];
    reply: (id: string) => void;
}

export const Thread = (props: ThreadProps) => {
    const renderMessages = (messages: ThreadProps['messages']) => {
        if (!messages.length) {
            return null;
        }
        return (
            <div className="thread__column">
                {messages.map((message) => (
                    <React.Fragment key={message.id}>
                        <Message
                            id={message.id}
                            by={message.by}
                            for={message.for}
                            date={message.date}
                            text={message.text}
                            rating={message.rating}
                            reply={() => props.reply(message.id)}
                        />
                        {renderMessages(message.replies)}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div
            id={props.id}
            className="thread"
        >
            <div
                className="thread__title"
                aria-hidden="true"
                onClick={(e) => {
                    if (e.target instanceof HTMLElement) {
                        const thread = e.target.closest('.thread');
                        if (thread) {
                            thread.classList.toggle('thread_expanded');
                        }
                    }
                }}
            >
                {props.title}
            </div>
            <div className="thread__content">
                {renderMessages(props.messages)}
            </div>
        </div>
    );
};

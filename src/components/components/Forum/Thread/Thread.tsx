import React, { useEffect, useState } from 'react';

import { MessageAttributes, MessageCreationAttributes } from 'db/models/Message';
import { forumAPI } from 'api/forum-api';
import { RepliedThread } from 'components/Pages/Forum/Forum';
import { Message } from '../Message/Message';
import './Thread.css';

export interface ThreadProps {
    id: number;
    title: string;
    messages: MessageCreationAttributes[];
    updateThread: RepliedThread;
    reply: (msg: MessageAttributes) => void;
}

const findChildren = (
    parents: MessageAttributes[],
    referenceArray: MessageAttributes[],
): MessageAttributes[] => parents.map((msg) => {
    const { id } = msg;
    return {
        ...msg,
        id,
        replies: findChildren(referenceArray.filter((i) => i.parent_id === id), referenceArray),
    };
});

const getTreeMessages = (
    messages: MessageAttributes[],
): MessageAttributes[] => findChildren(messages.filter((i) => i.parent_id === null), messages);

export const Thread = (props: ThreadProps) => {
    const [messageList, setMessageList] = useState<MessageAttributes[]>([]);

    useEffect(() => {
        forumAPI.getThreadMessages(props.id)
            .then((response) => {
                setMessageList(getTreeMessages(response.data));
                return true;
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (props.updateThread && props.updateThread.id === props.id) {
            forumAPI.getThreadMessages(props.updateThread.id)
                .then((response) => {
                    setMessageList(getTreeMessages(response.data));
                    return true;
                }).catch((err) => {
                    console.log(err);
                });
        }
    }, [props.updateThread]);

    const renderMessages = (messages: MessageAttributes[] | undefined) => {
        if (!messages || !messages.length) {
            return null;
        }
        return (
            <div className="thread__column">
                {messages.map((message) => (
                    <React.Fragment key={message.id}>
                        <Message
                            id={message.id}
                            author={message.author}
                            title={message.title}
                            date={message.date}
                            text={message.text}
                            rating={message.rating}
                            reply={() => props.reply(message)}
                        />
                        {renderMessages(message.replies)}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div
            id={`${props.id}`}
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
                {renderMessages(messageList)}
            </div>
        </div>
    );
};

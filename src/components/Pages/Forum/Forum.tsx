import React, { useState, useCallback } from 'react';

import { Page } from '../components/Page/Page';
import { Title } from '../../components/Title/Title';
import { Button } from '../../components/Button/Button';
import { Thread } from '../../components/Forum/Thread/Thread';
import { NewThreadModal } from '../../components/Forum/NewThreadModal/NewThreadModal';
import { NewMessageModal } from '../../components/Forum/NewMessageModal/NewMessageModal';

import { sendNotificationDefault } from '../../../modules/notifications/notifications';

import './Forum.css';

import { dummy, MessageData } from './mock-data';

export type ForumModalState = null | 'thread' | 'message';
export type RepliedMessageId = MessageData['id'] | null;

export const Forum = () => {
    const [modalState, setModalState] = useState<ForumModalState>(null);
    const [repliedMessageId, setRepliedMessageId] = useState<RepliedMessageId>(null);

    const pushThreadModal = useCallback(() => {
        setModalState('thread');
    }, [setModalState]);

    const pushMessageModal = useCallback(() => {
        setModalState('message');
    }, [setModalState]);

    const dismissModal = useCallback(() => {
        setModalState(null);
    }, [setModalState]);

    const sendReply = useCallback((id: string | null) => {
        setRepliedMessageId(id);
        pushMessageModal();
    }, [setRepliedMessageId]);

    const renderModal = (state: ForumModalState) => {
        switch (state) {
            case 'thread':
                return (
                    <NewThreadModal
                        action={() => sendNotificationDefault('New thread')}
                        onCrossPress={dismissModal}
                    />
                );
            case 'message':
                return (
                    <NewMessageModal
                        action={() => sendNotificationDefault(`Reply for message ${String(repliedMessageId)}`)}
                        onCrossPress={() => {
                            dismissModal();
                            setRepliedMessageId(null);
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Page>
            <div className="forum">
                <Title
                    className="title title_middle"
                    text="Форум"
                />
                <div className="forum__content">
                    <div className="forum__threads-container">
                        {dummy.map((thread) => (
                            <Thread
                                key={thread.id}
                                id={thread.id}
                                title={thread.title}
                                messages={thread.messages}
                                reply={(id) => sendReply(id)}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    className="button button_orange"
                    type="button"
                    text="Новая тема"
                    onClick={pushThreadModal}
                />
                {renderModal(modalState)}
            </div>
        </Page>
    );
};

import React, { useCallback, useEffect, useState } from 'react';
import { ThreadAttributes } from 'db/models/Thread';

import { useTranslation } from 'i18n';
import { MessageAttributes } from 'db/models/Message';
import { forumAPI } from 'api/forum-api';
import { NewSimpleModal } from 'components/components/Forum/NewSimpleModal/NewSimpleModal';
import { useSelector } from 'react-redux';
import { Spinner } from 'components/Pages/Profile/Profile';
import { getUserNickname } from '../../../redux/selectors/user-state';
import { Page } from '../components/Page/Page';
import { Title } from '../../components/Title/Title';
import { Button } from '../../components/Button/Button';

import { Thread } from '../../components/Forum/Thread/Thread';

import { sendNotificationDefault } from '../../../modules/notifications/notifications';
import './Forum.css';

export type ForumModalState = null | 'thread' | 'message';
export type RepliedMessage = MessageAttributes | null;
export type RepliedThread = ThreadAttributes | null;

export const Forum = () => {
    const [modalState, setModalState] = useState<ForumModalState>(null);
    const [repliedMessage, setRepliedMessage] = useState<RepliedMessage>(null);
    const [threadList, setThreadList] = useState<ThreadAttributes[]>([]);
    const [currentThread, setCurrentThread] = useState<RepliedThread>(null);
    const userName = useSelector(getUserNickname) || '';
    const { t } = useTranslation();

    useEffect(() => {
        forumAPI.getAllThreads()
            .then((response) => {
                setThreadList(response.data);
                return true;
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const pushThreadModal = useCallback(() => {
        setModalState('thread');
    }, [setModalState]);

    const pushMessageModal = useCallback(() => {
        setModalState('message');
    }, [setModalState]);

    const dismissModal = useCallback(() => {
        setModalState(null);
    }, [setModalState]);

    const sendReply = useCallback((msg: MessageAttributes | null) => {
        setRepliedMessage(msg);
        pushMessageModal();
    }, [setRepliedMessage]);

    const renderModal = (state: ForumModalState) => {
        switch (state) {
            case 'thread':
                return (
                    <NewSimpleModal
                        name={t('newTopic')}
                        title={t('topic')}
                        buttonText={t('create')}
                        action={(title: string, text: string) => {
                            if (!title || !text) {
                                sendNotificationDefault(t('notificationSpecifyTopicAndMessage'));
                                return;
                            }
                            forumAPI.createThread({
                                author: userName,
                                title,
                                messages: [{
                                    author: userName,
                                    title,
                                    text,
                                    parent_id: null,
                                }],
                            }).then((response) => {
                                sendNotificationDefault(t('newTopicCreated'));
                                setThreadList([...threadList, response.data]);
                                return true;
                            }).catch(() => {
                                sendNotificationDefault(t('error'));
                            });
                        }}
                        onCrossPress={dismissModal}
                    />
                );
            case 'message':
                return (
                    <NewSimpleModal
                        name={t('newMessage')}
                        title={t('msgTitle')}
                        buttonText={t('send')}
                        action={(title: string, text: string) => {
                            if (!text) {
                                sendNotificationDefault(t('notificationSpecifyMessage'));
                                return;
                            }
                            if (repliedMessage) {
                                forumAPI.createMessage({
                                    author: userName,
                                    title,
                                    text,
                                    thread_id: repliedMessage.thread_id,
                                    parent_id: repliedMessage.id,
                                }).then((response) => {
                                    const curThread = threadList.filter(
                                        (thread) => (thread.id === repliedMessage.thread_id),
                                    )[0];
                                    curThread.messages = [response.data];
                                    setCurrentThread({ ...curThread });
                                    return true;
                                }).catch(() => {
                                    sendNotificationDefault(t('notificationCreateMsgError'));
                                });
                            } else {
                                sendNotificationDefault(t('notificationNoMsgError'));
                            }
                        }}
                        onCrossPress={() => {
                            dismissModal();
                            setRepliedMessage(null);
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
                    text={t('forum')}
                />
                <div className="forum__content">
                    <div className="forum__threads-container">
                        {
                            !threadList?.length
                                ? <Spinner />
                                : threadList.map((thread) => (
                                    <Thread
                                        key={thread.id}
                                        id={thread.id}
                                        title={thread.title}
                                        messages={thread.messages}
                                        updateThread={currentThread}
                                        reply={(msg) => sendReply(msg)}
                                    />
                                ))
                        }
                    </div>
                </div>
                <Button
                    className="button button_orange"
                    type="button"
                    text={t('newTopic')}
                    onClick={pushThreadModal}
                />
                {renderModal(modalState)}
            </div>
        </Page>
    );
};

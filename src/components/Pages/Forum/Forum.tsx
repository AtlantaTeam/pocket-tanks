import React, { useCallback, useEffect, useState } from 'react';
import { ThreadAttributes } from 'db/models/Thread';

import { MessageAttributes } from 'db/models/Message';
import { forumAPI } from 'api/forum-api';
import { NewSimpleModal } from 'components/components/Forum/NewSimpleModal/NewSimpleModal';
import { useSelector } from 'react-redux';
import { Tabs } from 'components/components/Tabs/Tabs';
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
                        name="Новая тема"
                        title="Тема"
                        buttonText="Создать"
                        action={(title: string, text: string) => {
                            if (!title || !text) {
                                sendNotificationDefault('Укажите Название и Сообщение для новой темы');
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
                                sendNotificationDefault('Новая тема создана');
                                setThreadList([...threadList, response.data]);
                                return true;
                            }).catch(() => {
                                sendNotificationDefault('Ошибка');
                            });
                        }}
                        onCrossPress={dismissModal}
                    />
                );
            case 'message':
                return (
                    <NewSimpleModal
                        name="Новое сообщение"
                        title="Заголовок"
                        buttonText="Отправить"
                        action={(title: string, text: string) => {
                            if (!text) {
                                sendNotificationDefault('Укажите текст сообщения!');
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
                                    sendNotificationDefault(`Reply for message ${String(repliedMessage.id)}`);
                                    const curThread = threadList.filter(
                                        (thread) => (thread.id === repliedMessage.thread_id),
                                    )[0];
                                    curThread.messages = [response.data];
                                    setCurrentThread({ ...curThread });
                                    return true;
                                }).catch(() => {
                                    sendNotificationDefault('Ошибка создания сообщения');
                                });
                            } else {
                                sendNotificationDefault('Ошибка: не выбрано сообщение');
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
                    text="Форум"
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
                    text="Новая тема"
                    onClick={pushThreadModal}
                />
                {renderModal(modalState)}
            </div>
        </Page>
    );
};

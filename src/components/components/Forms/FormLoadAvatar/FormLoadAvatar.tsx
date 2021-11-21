import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FormLoadAvatar.css';
import { useTranslation } from 'i18n';

import '../Forms.css';
import { Image } from 'components/components/Image/Image';
import { ButtonSubmit } from 'components/components/Button/Button';
import { sendNotificationDefault } from 'modules/notifications/notifications';

import imgAvatarPlaceHolder from '../../../../../static/images/avatar-placeholder.svg';

import { Label } from '../components/Input/components/Label/Label';
import {
    getUserLoaderState,
    getUserAvatar,
    getUserAvatarResourse,
    getUserProvider,
} from '../../../../redux/selectors/user-state';
import { changeAvatarRequested } from '../../../../redux/actions/user-state/change-avatar';
import { getUserAvatar as getUserAvatarController } from '../../../../controllers/user-controller';
import { avatarFulfilled } from '../../../../redux/actions/user-state/get-avatar';

export const FormLoadAvatar = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const isLoading = useSelector(getUserLoaderState);
    const avatar = useSelector(getUserAvatar);
    const userProvider = useSelector(getUserProvider);
    const userAvatarResourse = useSelector(getUserAvatarResourse);
    const initialStateAvatar = avatar ? `${avatar}` : imgAvatarPlaceHolder;

    const [state, setState] = useState({
        message: t('avatarIsEmpty'),
        className: 'load-message',
        img: initialStateAvatar,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!avatar && userAvatarResourse) {
            getUserAvatarController()
                .then((data) => {
                    setState({
                        message: avatar ? t('newAvatarIsEmpty') : t('avatarIsEmpty'),
                        className: 'load-message',
                        img: data,
                    });
                    dispatch(avatarFulfilled(data));
                    return data;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        } else {
            setState({
                message: t('newAvatarIsEmpty'),
                className: 'load-message',
                img: initialStateAvatar,
            });
        }
    }, []);

    return (
        <>
            <form
                name="load_avatar"
                className="form form-tab"
                encType="multipart/form-data"
                onSubmit={
                    (event) => {
                        event.preventDefault();
                        if (fileInput && fileInput.current?.files?.length === 0) {
                            setState({
                                message: t('fileIsEmpty'),
                                className: 'load-message load-message_error',
                                img: initialStateAvatar,
                            });
                            return;
                        }
                        const form = event.target as HTMLFormElement;
                        const formData = new FormData(form);
                        dispatch(changeAvatarRequested(formData));
                        dispatch(avatarFulfilled(null));
                        sendNotificationDefault(t('updated'));
                    }
                }
            >
                <div className="form-tab__container">
                    <div className="form-tab__wrap">
                        <Image className="image_avatar" imagePath={state.img} />
                        {
                            !userProvider
                            && (
                                <Label className="label label_avatar" text={t('loadAvatar')} inputName="avatar">
                                    <input
                                        ref={fileInput}
                                        id="avatar"
                                        name="avatar"
                                        type="file"
                                        accept="image/jpeg"
                                        className="input-avatar"
                                        onChange={
                                            (event) => {
                                                if (event.target?.files?.[0]) {
                                                    setState({
                                                        message: `${t('fileUploaded')}: ${event.target.files[0].name}`,
                                                        className: 'load-message',
                                                        img: URL.createObjectURL(event.target.files[0]),
                                                    });
                                                } else {
                                                    setState({
                                                        message: t('errorTryAgain'),
                                                        className: 'load-message load-message_error',
                                                        img: initialStateAvatar,
                                                    });
                                                }
                                            }
                                        }
                                    />
                                </Label>
                            )
                        }
                    </div>
                    {
                        userProvider
                            ? (
                                <span className={state.className}>
                                    {`${userProvider.toUpperCase()} ${t('noAvatarToChange')} `
                                + `${userProvider.toUpperCase()} `}
                                </span>

                            )
                            : <span className={state.className}>{state.message}</span>
                    }
                </div>
                {
                    userProvider
                        ? (
                            <div className="no-button" />
                        )
                        : (
                            <div>
                                <ButtonSubmit
                                    className="button button_orange"
                                    type="submit"
                                    text={t('update')}
                                    isLoading={isLoading}
                                />
                            </div>
                        )
                }
            </form>
        </>
    );
};

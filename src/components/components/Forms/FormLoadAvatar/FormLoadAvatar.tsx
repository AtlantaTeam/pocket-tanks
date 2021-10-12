import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FormLoadAvatar.css';
import '../Forms.css';

import { Image } from 'components/components/Image/Image';
import { ButtonSubmit } from 'components/components/Button/Button';
import imgAvatarPlaceHolder from '../../../../../static/images/avatar-placeholder.svg';

import { Label } from '../components/Input/components/Label/Label';

import { RESOURCES_BASE_URL } from '../../../../constants/api-routes';
import { getUserLoaderState, getUserAvatar } from '../../../../redux/selectors/user-state';
import { changeAvatarRequested } from '../../../../redux/actions/user-state/change-avatar';

export const FormLoadAvatar = () => {
    const fileInput = useRef<HTMLInputElement>(null);

    const isLoading = useSelector(getUserLoaderState);
    const avatar = useSelector(getUserAvatar);

    const initialStateAvatar = avatar ? `${RESOURCES_BASE_URL}${avatar}` : imgAvatarPlaceHolder;

    const [state, setState] = useState({
        message: avatar ? 'Новый аватар не выбран' : 'Аватар еще не выбран',
        className: 'load-message',
        img: initialStateAvatar,
    });

    const dispatch = useDispatch();

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
                                message: 'Нужно выбрать файл',
                                className: 'load-message load-message_error',
                                img: initialStateAvatar,
                            });
                            return;
                        }
                        const form = event.target as HTMLFormElement;
                        const formData = new FormData(form);
                        dispatch(changeAvatarRequested(formData));
                    }
                }
            >
                <div className="form-tab__container">
                    <div className="form-tab__wrap">
                        <Image className="image_avatar" imagePath={state.img} />
                        <Label className="label label_avatar" text="Загрузите аватар" inputName="avatar">
                            <input
                                ref={fileInput}
                                id="avatar"
                                name="avatar"
                                type="file"
                                className="input-avatar"
                                onChange={
                                    (event) => {
                                        if (event.currentTarget !== null) {
                                            if (event.currentTarget.files !== null) {
                                                if (event.currentTarget.files[0] !== undefined) {
                                                    setState({
                                                        message: `Файл загружен: ${event.currentTarget.files[0].name}`,
                                                        className: 'load-message',
                                                        img: URL.createObjectURL(event.currentTarget.files[0]),
                                                    });
                                                } else {
                                                    setState({
                                                        message: 'Ошибка, попробуйте еще раз',
                                                        className: 'load-message load-message_error',
                                                        img: initialStateAvatar,
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            />
                        </Label>
                    </div>
                    <span className={state.className}>{state.message}</span>
                </div>
                <div>
                    <ButtonSubmit
                        className="button button_orange"
                        type="submit"
                        text="Изменить"
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </>
    );
};

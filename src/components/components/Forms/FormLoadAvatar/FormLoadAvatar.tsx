import React, { useRef, useState } from 'react';

import './FormLoadAvatar.css';
import '../Forms.css';

import { Image } from 'components/components/Image/Image';
import { ButtonSubmit } from 'components/components/Button/Button';
import imgAvatarPlaceHolder from 'images/avatar-placeholder.svg';

import { Label } from '../components/Input/components/Label/Label';

export const FormLoadAvatar = () => {
    const fileInput = useRef(null);
    const [state, setState] = useState({
        message: 'Аватар еще не выбран',
        className: 'load-message',
        img: imgAvatarPlaceHolder,
    });

    return (
        <>
            <form
                name="load_avatar"
                className="form form-tab"
                encType="multipart/form-data"
                onSubmit={
                    (event) => {
                        event.preventDefault();
                    }
                }
            >
                <div className="form-tab__container">
                    <div className="form-tab__wrap">
                        <Image className="image_avatar" imagePath={state.img} />
                        <Label className="label label_avatar" text="Загрузите аватар" inputName="input_file">
                            <input
                                ref={fileInput}
                                id="input_file"
                                name="inputFile"
                                type="file"
                                className="input-avatar"
                                onChange={
                                    (event) => {
                                        if (event.currentTarget !== null) {
                                            if (event.currentTarget.files !== null) {
                                                if (event.currentTarget.files[0] !== undefined) {
                                                    // здесь запрос на отправку аватара и в случае успеха, новый аватар
                                                    setState({
                                                        message: `Файл загружен: ${event.currentTarget.files[0].name}`,
                                                        className: 'load-message',
                                                        img: imgAvatarPlaceHolder,
                                                    });
                                                } else {
                                                    setState({
                                                        message: 'Ошибка, попробуйте еще раз',
                                                        className: 'load-message load-message_error',
                                                        img: imgAvatarPlaceHolder,
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
                    />
                </div>
            </form>
        </>
    );
};

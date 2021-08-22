import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { ERRORS } from 'utils/constants/errorsForms';

import imageYandexLogo from '../../../../static/images/yandex-logo-black.svg';

import { Image } from '../Image/Image';
import { Label } from '../Input/elements/Label/Label';
import { ErrorLabel } from '../Input/elements/ErrorLabel/ErrorLabel';

import './Forms.css';
import { Title } from '../Title/Title';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export const SignUpSchema = Yup.object().shape({
    login: Yup.string()
        .min(4, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    password: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
});

export const FormSignUp = () => (
    <>
        <div className="form-wrapper">
            <Title
                className="title title_middle"
                text="Войти в игру"
            />
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    // same shape as initial values
                    // eslint-disable-next-line no-console
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="form">
                        <div className="form__fields-group">
                            <Field
                                className="input input_white"
                                placeholder="Ваш логин"
                                name="login"
                            />
                            <Label
                                className="label"
                                inputName="login"
                                text="Логин"
                            />
                        </div>
                        {errors.login && touched.login ? (
                            <ErrorLabel
                                className="error-label"
                                text={errors.login}
                            />
                        ) : (
                            <ErrorLabel
                                className="error-label error-label_hidden"
                                text="no error"
                            />
                        )}
                        <div className="form__fields-group">
                            <Field
                                className="input input_white"
                                placeholder="Ваш пароль"
                                name="password"
                            />
                            <Label
                                className="label"
                                inputName="password"
                                text="Пароль"
                            />
                        </div>
                        {errors.password && touched.password ? (
                            <ErrorLabel
                                className="error-label"
                                text={errors.password}
                            />
                        ) : (
                            <ErrorLabel
                                className="error-label error-label_hidden"
                                text="no error"
                            />
                        )}
                        <div className="form__button-wrapper">
                            <Button
                                type="submit"
                                text="Войти"
                                className="button button_orange"
                            />
                            <Button
                                type="button"
                                text="Нет аккаунта? Зарегистрироваться"
                                className="button-link"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        <div className="oauth">
            <Text className="text" text="Войти с помощью" />
            <Button className="button button_yandex-logo" type="button">
                <Image
                    className="image image_yandex-logo"
                    imagePath={imageYandexLogo}
                />
            </Button>
        </div>
    </>
);

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { ERRORS } from 'utils/constants/errorsForms';

import { FieldSet } from '../components/FieldSet/FieldSet';

import '../Forms.css';
import { Title } from '../../Title/Title';
import { Button } from '../../Button/Button';

export const SignInSchema = Yup.object().shape({
    login: Yup.string()
        .min(4, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    password: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
});

export const FormSignIn = () => (
    <>
        <div className="form-wrapper">
            <Title
                className="title title_middle-form"
                text="Войти в игру"
            />
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                }}
                validationSchema={SignInSchema}
                onSubmit={(values) => {
                    // same shape as initial values
                    // eslint-disable-next-line no-console
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form name="signin" className="form">
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваш логин"
                            name="login"
                            type="text"
                            labelText="Логин"
                            errorText={errors.login}
                            viewError={errors.login && touched.login}
                        />
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваш пароль"
                            name="password"
                            type="password"
                            labelText="Пароль"
                            errorText={errors.password}
                            viewError={errors.password && touched.password}
                        />
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
    </>
);

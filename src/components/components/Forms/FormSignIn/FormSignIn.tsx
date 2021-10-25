import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { ERRORS } from 'utils/constants/errorsForms';

import { FieldSet } from '../components/FieldSet/FieldSet';

import '../Forms.css';
import { Title } from '../../Title/Title';
import { ButtonSubmit } from '../../Button/Button';

import { getUserLoaderState } from '../../../../redux/selectors/user-state';
import { loginRequested } from '../../../../redux/actions/user-state/login';

export const SignInSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    password: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
});

export const FormSignIn = () => {
    const isLoading = useSelector(getUserLoaderState);

    const dispatch = useDispatch();

    return (
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
                    const formData = new FormData();
                    Object.keys(values).forEach((key) => formData.append(key, values[key]));
                    dispatch(loginRequested(formData));
                }}
            >
                {({ errors, touched }) => (
                    <Form name="signin" className="form">
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваш логин"
                            name="login"
                            id="login"
                            type="text"
                            labelText="Логин"
                            errorText={errors.login}
                            viewError={errors.login && touched.login}
                        />
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваш пароль"
                            name="password"
                            id="password"
                            type="password"
                            labelText="Пароль"
                            errorText={errors.password}
                            viewError={errors.password && touched.password}
                        />
                        <div className="form__button-wrapper">
                            <ButtonSubmit
                                type="submit"
                                text="Войти"
                                className="button button_orange"
                                isLoading={isLoading}
                            />
                            <Link
                                to="/signup"
                                className="button-link button-link_margin"
                            >
                                Нет аккаунта? Зарегистрироваться
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { PATTERNS } from 'utils/constants/regex';
import { ERRORS } from 'utils/constants/errorsForms';
import { FieldSet } from '../components/FieldSet/FieldSet';

import '../Forms.css';
import { Title } from '../../Title/Title';
import { ButtonSubmit } from '../../Button/Button';

import { signupRequested } from '../../../../redux/actions/user-state/signup';

export const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .matches(new RegExp(PATTERNS.PATTERN_EMAIL),
            { message: ERRORS.ERROR_EMAIL, excludeEmptyString: true })
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    login: Yup.string()
        .min(2, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    first_name: Yup.string()
        .min(2, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    second_name: Yup.string()
        .min(2, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    phone: Yup.string()
        .matches(new RegExp(PATTERNS.PATTERN_PHONE),
            { message: ERRORS.ERROR_PHONE, excludeEmptyString: true })
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    password: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    password_again: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
});

export const FormSignUp = () => {
    const dispatch = useDispatch();

    return (
        <div className="form-wrapper">
            <Title
                className="title title_middle-form"
                text="Регистрация"
            />
            <Formik
                initialValues={{
                    email: '',
                    login: '',
                    first_name: '',
                    second_name: '',
                    phone: '',
                    password: '',
                    password_again: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    const formData = new FormData();
                    Object.keys(values).forEach((key) => formData.append(key, values[key]));
                    dispatch(signupRequested(formData));
                }}
            >
                {({ errors, touched }) => (
                    <Form name="signup" className="form">
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваш e-mail"
                            name="email"
                            id="email"
                            type="email"
                            labelText="Почта"
                            errorText={errors.email}
                            viewError={errors.email && touched.email}
                        />
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
                            placeholder="Ваше имя"
                            name="first_name"
                            id="first_name"
                            type="text"
                            labelText="Имя"
                            errorText={errors.first_name}
                            viewError={errors.first_name && touched.first_name}
                        />
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваша фамилия"
                            name="second_name"
                            id="second_name"
                            type="text"
                            labelText="Фамилия"
                            errorText={errors.second_name}
                            viewError={errors.second_name && touched.second_name}
                        />
                        <FieldSet
                            className="input input_white"
                            placeholder="Ваш телефон"
                            name="phone"
                            id="phone"
                            type="phone"
                            labelText="Телефон"
                            errorText={errors.phone}
                            viewError={errors.phone && touched.phone}
                        />
                        <FieldSet
                            className="input input_white"
                            placeholder="Придумайте пароль"
                            name="password"
                            id="password"
                            type="password"
                            labelText="Пароль"
                            errorText={errors.password}
                            viewError={errors.password && touched.password}
                        />
                        <FieldSet
                            className="input input_white"
                            placeholder="Введите пароль еще раз"
                            name="password_again"
                            id="password_again"
                            type="password"
                            labelText="Пароль (еще раз)"
                            errorText={errors.password_again}
                            viewError={errors.password_again && touched.password_again}
                        />
                        <div className="form__button-wrapper">
                            <ButtonSubmit
                                type="submit"
                                text="Зарегистрироваться"
                                className="button button_orange"
                            />

                            <Link
                                to="/login"
                                className="button-link button-link_margin"
                            >
                                Уже есть аккаунт? Авторизироваться
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

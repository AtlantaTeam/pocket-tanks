import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { i18n, useTranslation } from 'i18n';
import { PATTERNS } from 'utils/constants/regex';

import { FieldSet } from '../components/FieldSet/FieldSet';
import '../Forms.css';
import { Title } from '../../Title/Title';

import { ButtonSubmit } from '../../Button/Button';
import { getUserLoaderState } from '../../../../redux/selectors/user-state';
import { signupRequested } from '../../../../redux/actions/user-state/signup';

export const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .matches(new RegExp(PATTERNS.PATTERN_EMAIL),
            { message: i18n.t('ERROR_EMAIL'), excludeEmptyString: true })
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    login: Yup.string()
        .min(2, i18n.t('ERROR_TEXT'))
        .max(50, i18n.t('ERROR_TEXT'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    first_name: Yup.string()
        .min(2, i18n.t('ERROR_TEXT'))
        .max(50, i18n.t('ERROR_TEXT'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    second_name: Yup.string()
        .min(2, i18n.t('ERROR_TEXT'))
        .max(50, i18n.t('ERROR_TEXT'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    password: Yup.string()
        .min(6, i18n.t('ERROR_PASSWORD'))
        .max(50, i18n.t('ERROR_PASSWORD'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    password_again: Yup.string()
        .min(6, i18n.t('ERROR_PASSWORD'))
        .max(50, i18n.t('ERROR_PASSWORD'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
});

export const FormSignUp = () => {
    const isLoading = useSelector(getUserLoaderState);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <div className="form-wrapper">
            <Title
                className="title title_middle-form"
                text={t('registration')}
            />
            <Formik
                initialValues={{
                    email: '',
                    login: '',
                    first_name: '',
                    second_name: '',
                    // phone: '',
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
                            className="input input_normal"
                            placeholder={t('yourEmail')}
                            name="email"
                            id="email"
                            type="email"
                            labelText={t('email')}
                            errorText={errors.email}
                            viewError={errors.email && touched.email}
                        />
                        <FieldSet
                            className="input input_normal"
                            placeholder={t('yourLogin')}
                            name="login"
                            id="login"
                            type="text"
                            labelText={t('login')}
                            errorText={errors.login}
                            viewError={errors.login && touched.login}
                        />
                        <FieldSet
                            className="input input_normal"
                            placeholder={t('yourFirstName')}
                            name="first_name"
                            id="first_name"
                            type="text"
                            labelText={t('firstName')}
                            errorText={errors.first_name}
                            viewError={errors.first_name && touched.first_name}
                        />
                        <FieldSet
                            className="input input_normal"
                            placeholder={t('yourSecondName')}
                            name="second_name"
                            id="second_name"
                            type="text"
                            labelText={t('secondName')}
                            errorText={errors.second_name}
                            viewError={errors.second_name && touched.second_name}
                        />
                        <FieldSet
                            className="input input_normal"
                            placeholder={t('enterNewPassword')}
                            name="password"
                            id="password"
                            type="password"
                            labelText={t('newPassword')}
                            errorText={errors.password}
                            viewError={errors.password && touched.password}
                        />
                        <FieldSet
                            className="input input_normal"
                            placeholder={t('secondNewPassword')}
                            name="password_again"
                            id="password_again"
                            type="password"
                            labelText={t('secondNewPassword')}
                            errorText={errors.password_again}
                            viewError={errors.password_again && touched.password_again}
                        />
                        <div className="form__button-wrapper">
                            <ButtonSubmit
                                type="submit"
                                text={t('register')}
                                className="button button_orange"
                                isLoading={isLoading}
                                disabled={!!Object.keys(errors).length}
                            />

                            <Link
                                to="/login"
                                className="button-link button-link_margin"
                            >
                                {t('loginIfAccExists')}
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

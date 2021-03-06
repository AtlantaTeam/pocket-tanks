import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { i18n, useTranslation } from 'i18n';
import { Form, Formik } from 'formik';

import * as Yup from 'yup';

import { FieldSet } from '../components/FieldSet/FieldSet';
import '../Forms.css';
import { Title } from '../../Title/Title';

import { ButtonSubmit } from '../../Button/Button';
import { getUserLoaderState } from '../../../../redux/selectors/user-state';
import { loginRequested } from '../../../../redux/actions/user-state/login';

export const SignInSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, i18n.t('ERROR_TEXT'))
        .max(50, i18n.t('ERROR_TEXT'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    password: Yup.string()
        .min(6, i18n.t('ERROR_PASSWORD'))
        .max(50, i18n.t('ERROR_PASSWORD'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
});

export const FormSignIn = () => {
    const isLoading = useSelector(getUserLoaderState);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <div className="form-wrapper">
            <Title
                className="title title_middle-form"
                text={t('enterGame')}
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
                            placeholder={t('yourPassword')}
                            name="password"
                            id="password"
                            type="password"
                            labelText={t('password')}
                            errorText={errors.password}
                            viewError={errors.password && touched.password}
                        />
                        <div className="form__button-wrapper">
                            <ButtonSubmit
                                type="submit"
                                text={t('enter')}
                                className="button button_orange"
                                isLoading={isLoading}
                                disabled={!!Object.keys(errors).length}
                            />
                            <Link
                                to="/signup"
                                className="button-link button-link_margin"
                            >
                                {t('newUserRegister')}
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

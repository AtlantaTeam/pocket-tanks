import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { ERRORS } from 'utils/constants/errorsForms';

import { PATTERNS } from 'utils/constants/regex';

import { FieldSet } from '../components/FieldSet/FieldSet';

import { ButtonSubmit } from '../../Button/Button';

import { getUserProfile, getUserLoaderState } from '../../../../redux/selectors/user-state';
import { changeProfileRequested } from '../../../../redux/actions/user-state/change-profile';

import type { UserInfoResponse } from '../../../../api/types';

import '../Forms.css';

export const FormEditDataSchema = Yup.object().shape({
    display_name: Yup.string()
        .min(2, ERRORS.ERROR_TEXT)
        .max(50, ERRORS.ERROR_TEXT)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
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
});

export const FormEditProfileData = () => {
    const userProfile = useSelector(getUserProfile) as UserInfoResponse;
    const isLoading = useSelector(getUserLoaderState);

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                display_name: userProfile.displayName ?? '',
                email: userProfile.email ?? '',
                login: userProfile.login ?? '',
                first_name: userProfile.firstName ?? '',
                second_name: userProfile.secondName ?? '',
                phone: userProfile.phone ?? '',
            }}
            validationSchema={FormEditDataSchema}
            onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => formData.append(key, values[key]));
                dispatch(changeProfileRequested(formData));
            }}
        >
            {({ errors, touched }) => (
                <Form name="edit_profile" className="form form-tab">
                    <div className="form-tab__container form-tab__container_edit">
                        <div className="form-tab__wrap form-tab__wrap_password">
                            <div className="form-tab__block">
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Ваше имя в игре"
                                    name="display_name"
                                    id="display_name"
                                    type="text"
                                    labelText="Имя в игре"
                                    errorText={errors.display_name}
                                    viewError={errors.display_name && touched.display_name}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Ваш e-mail"
                                    name="email"
                                    id="email"
                                    type="email"
                                    labelText="Почта"
                                    errorText={errors.email}
                                    viewError={errors.email && touched.email}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Ваш логин"
                                    name="login"
                                    id="login"
                                    type="text"
                                    labelText="Логин"
                                    errorText={errors.login}
                                    viewError={errors.login && touched.login}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Ваше имя"
                                    name="first_name"
                                    id="first_name"
                                    type="text"
                                    labelText="Имя"
                                    errorText={errors.first_name}
                                    viewError={errors.first_name && touched.first_name}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Ваша фамилия"
                                    name="second_name"
                                    id="second_name"
                                    type="text"
                                    labelText="Фамилия"
                                    errorText={errors.second_name}
                                    viewError={errors.second_name && touched.second_name}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Ваш телефон"
                                    name="phone"
                                    id="phone"
                                    type="phone"
                                    labelText="Телефон"
                                    errorText={errors.phone}
                                    viewError={errors.phone && touched.phone}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <ButtonSubmit
                            className="button button_orange"
                            type="submit"
                            text="Изменить"
                            isLoading={isLoading}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

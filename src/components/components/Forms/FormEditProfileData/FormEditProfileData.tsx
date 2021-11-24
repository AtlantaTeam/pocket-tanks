import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { ERRORS } from 'utils/constants/errorsForms';
import { PATTERNS } from 'utils/constants/regex';
import { sendNotificationDefault } from 'modules/notifications/notifications';

import { LangSwitch } from 'components/components/LangSwitch/LangSwitch';
import { useTranslation } from 'i18n';

import { FieldSet } from '../components/FieldSet/FieldSet';

import { ButtonSubmit } from '../../Button/Button';
import { getUserLoaderState, getUserProfile } from '../../../../redux/selectors/user-state';
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
    // phone: Yup.string()
    //     .matches(new RegExp(PATTERNS.PATTERN_PHONE),
    //         { message: ERRORS.ERROR_PHONE, excludeEmptyString: true })
    //     .required(ERRORS.ERROR_REQUIRED_FIELD),
});

export const FormEditProfileData = () => {
    const userProfile = useSelector(getUserProfile) as UserInfoResponse;
    const { userProvider } = userProfile;
    const isLoading = useSelector(getUserLoaderState);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{
                display_name: userProfile.displayName ?? '',
                email: userProfile.email ?? '',
                login: userProfile.login ?? '',
                first_name: userProfile.firstName ?? '',
                second_name: userProfile.secondName ?? '',
                // phone: userProfile.phone ?? '',
            }}
            validationSchema={FormEditDataSchema}
            onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => formData.append(key, values[key]));
                dispatch(changeProfileRequested(formData));
                sendNotificationDefault(t('updated'));
            }}
        >
            {({ errors, touched }) => (
                <Form name="edit_profile" className="form form-tab">
                    <div className="form-tab__container form-tab__container_edit">
                        <div className="form-tab__wrap form-tab__wrap_password">
                            <div className="form-tab__block">
                                <FieldSet
                                    className="input input_inverted"
                                    placeholder={t('yourDisplayName')}
                                    name="display_name"
                                    id="display_name"
                                    type="text"
                                    labelText={t('displayName')}
                                    errorText={errors.display_name}
                                    viewError={errors.display_name && touched.display_name}
                                    isReadOnly={!!userProvider}
                                />
                                <FieldSet
                                    className="input input_inverted"
                                    placeholder={t('yourEmail')}
                                    name="email"
                                    id="email"
                                    type="email"
                                    labelText={t('email')}
                                    errorText={errors.email}
                                    viewError={errors.email && touched.email}
                                    isReadOnly={!!userProvider}
                                />
                                <FieldSet
                                    className="input input_inverted"
                                    placeholder={t('yourLogin')}
                                    name="login"
                                    id="login"
                                    type="text"
                                    labelText={t('login')}
                                    errorText={errors.login}
                                    viewError={errors.login && touched.login}
                                    isReadOnly={!!userProvider}
                                />
                                <FieldSet
                                    className="input input_inverted"
                                    placeholder={t('yourFirstName')}
                                    name="first_name"
                                    id="first_name"
                                    type="text"
                                    labelText={t('firstName')}
                                    errorText={errors.first_name}
                                    viewError={errors.first_name && touched.first_name}
                                    isReadOnly={!!userProvider}
                                />
                                <FieldSet
                                    className="input input_inverted"
                                    placeholder={t('yourSecondName')}
                                    name="second_name"
                                    id="second_name"
                                    type="text"
                                    labelText={t('secondName')}
                                    errorText={errors.second_name}
                                    viewError={errors.second_name && touched.second_name}
                                    isReadOnly={!!userProvider}
                                />
                                <div className="form__fields-group">
                                    <LangSwitch />
                                </div>
                            </div>
                        </div>
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
                </Form>
            )}
        </Formik>
    );
};

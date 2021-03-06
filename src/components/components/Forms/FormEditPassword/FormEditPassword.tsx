import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { sendNotificationDefault } from 'modules/notifications/notifications';
import { i18n, useTranslation } from 'i18n';
import { FieldSet } from '../components/FieldSet/FieldSet';

import { ButtonSubmit } from '../../Button/Button';

import { getUserLoaderState, getUserProvider } from '../../../../redux/selectors/user-state';
import { changePasswordRequested } from '../../../../redux/actions/user-state/change-password';
import './FormEditPassword.css';
import '../Forms.css';

export const FormEditPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, i18n.t('ERROR_PASSWORD'))
        .max(50, i18n.t('ERROR_PASSWORD'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    newPassword: Yup.string()
        .min(6, i18n.t('ERROR_PASSWORD'))
        .max(50, i18n.t('ERROR_PASSWORD'))
        .required(i18n.t('ERROR_REQUIRED_FIELD')),
    secondNewPassword: Yup.string()
        .min(6, i18n.t('ERROR_PASSWORD'))
        .max(50, i18n.t('ERROR_PASSWORD'))
        .required(i18n.t('ERROR_REQUIRED_FIELD'))
        .test('passwords-match', i18n.t('ERROR_PASSWORDS'), function (value) {
            return this.parent.newPassword === value;
        }),
});

export const FormEditPassword = () => {
    const userProvider = useSelector(getUserProvider);
    const isLoading = useSelector(getUserLoaderState);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            {
                userProvider
                    ? (
                        <div className="form form-tab">
                            <div className="form-tab__container">
                                <div className="form-tab__wrap form-tab__wrap_password">
                                    <div className="form-tab__block no-password-message">
                                        {`${userProvider.toUpperCase()} ${t('noPasswordToChange')} `
                                        + `${userProvider.toUpperCase()} `}
                                    </div>
                                </div>
                            </div>
                            <div className="no-button" />
                        </div>

                    )
                    : (
                        <Formik
                            initialValues={{
                                oldPassword: '',
                                newPassword: '',
                                secondNewPassword: '',
                            }}
                            validationSchema={FormEditPasswordSchema}
                            onSubmit={(values) => {
                                const formData = new FormData();
                                Object.keys(values).forEach((key) => formData.append(key, values[key]));
                                dispatch(changePasswordRequested(formData));
                                sendNotificationDefault(t('updated'));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form name="edit_profile" className="form form-tab">
                                    <div className="form-tab__container">
                                        <div className="form-tab__wrap form-tab__wrap_password">
                                            <div className="form-tab__block">
                                                <FieldSet
                                                    className="input input_inverted"
                                                    placeholder={t('enterOldPassword')}
                                                    name="oldPassword"
                                                    id="oldPassword"
                                                    type="password"
                                                    labelText={t('oldPassword')}
                                                    errorText={errors.oldPassword}
                                                    viewError={errors.oldPassword && touched.oldPassword}
                                                />
                                                <FieldSet
                                                    className="input input_inverted"
                                                    placeholder={t('enterNewPassword')}
                                                    name="newPassword"
                                                    id="newPassword"
                                                    type="password"
                                                    labelText={t('newPassword')}
                                                    errorText={errors.newPassword}
                                                    viewError={errors.newPassword && touched.newPassword}
                                                />
                                                <FieldSet
                                                    className="input input_inverted"
                                                    placeholder={t('secondNewPassword')}
                                                    name="secondNewPassword"
                                                    id="secondNewPassword"
                                                    type="password"
                                                    labelText={t('secondNewPassword')}
                                                    errorText={errors.secondNewPassword}
                                                    viewError={errors.secondNewPassword && touched.secondNewPassword}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <ButtonSubmit
                                            className="button button_orange"
                                            type="submit"
                                            text={t('update')}
                                            isLoading={isLoading}
                                            disabled={!!Object.keys(errors).length}
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )
            }
        </>

    );
};

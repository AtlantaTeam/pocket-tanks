import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { ERRORS } from 'utils/constants/errorsForms';

import { FieldSet } from '../components/FieldSet/FieldSet';

import { ButtonSubmit } from '../../Button/Button';

import '../Forms.css';

export const FormEditPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    newPassword: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
    secondNewPassword: Yup.string()
        .min(6, ERRORS.ERROR_PASSWORD)
        .max(50, ERRORS.ERROR_PASSWORD)
        .required(ERRORS.ERROR_REQUIRED_FIELD),
});

export const FormEditPassword = () => (
    <>
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                secondNewPassword: '',
            }}
            validationSchema={FormEditPasswordSchema}
            onSubmit={(values) => {
                // same shape as initial values
                // eslint-disable-next-line no-console
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form name="edit_profile" className="form form-tab">
                    <div className="form-tab__container form-tab__container_edit">
                        <div className="form-tab__wrap form-tab__wrap_password">
                            <div className="form-tab__block">
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Введите старый пароль"
                                    name="oldPassword"
                                    id="oldPassword"
                                    type="password"
                                    labelText="Старый пароль"
                                    errorText={errors.oldPassword}
                                    viewError={errors.oldPassword && touched.oldPassword}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Новый пароль"
                                    name="newPassword"
                                    id="newPassword"
                                    type="password"
                                    labelText="Придумайте новый пароль"
                                    errorText={errors.newPassword}
                                    viewError={errors.newPassword && touched.newPassword}
                                />
                                <FieldSet
                                    className="input input_black"
                                    placeholder="Повторите пароль"
                                    name="secondNewPassword"
                                    id="secondNewPassword"
                                    type="password"
                                    labelText="Повторите новый пароль"
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
                            text="Изменить"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    </>
);

import React from 'react';
import { Field } from 'formik';

import { Label } from '../Input/components/Label/Label';
import { ErrorLabel } from '../Input/components/ErrorLabel/ErrorLabel';

import '../Input/Input.css';
import '../../Forms.css';

export interface FieldSetProps{
    className?: string;
    placeholder?: string;
    name: string;
    id: string;
    type: 'text' | 'password' | 'phone' | 'file' | 'email'
    classNameLabel?: string;
    labelText?: string;
    viewError?: boolean | string;
    errorText?: string;
}

export const FieldSet = (props: FieldSetProps) => (
    <>
        <div className="form__fields-group">
            <Field
                className={props.className}
                placeholder={props.placeholder}
                name={props.name}
                id={props.name}
                type={props.type}
            />
            <Label
                className="label"
                inputName={props.name}
                text={props.labelText}
            />
        </div>
        {props.viewError ? (
            <ErrorLabel
                className="error-label"
                text={props.errorText}
            />
        ) : (
            <ErrorLabel
                className="error-label error-label_hidden"
                text="no error"
            />
        )}
    </>
);

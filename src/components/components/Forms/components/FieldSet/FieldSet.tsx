import React from 'react';
import { Field } from 'formik';
import cn from 'classnames';

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
    isReadOnly?: boolean;
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
                readOnly={props?.isReadOnly}
            />
            <Label
                className="label"
                inputName={props.name}
                text={props.labelText}
            />
        </div>
        <ErrorLabel
            className={cn('error-label', { 'error-label_hidden': !props.viewError })}
            text={props.viewError ? props.errorText : 'no error'}
        />
    </>
);

import React, { useRef } from 'react';

import { Input, InputProps } from '../Forms/components/Input/Input';

import './Counter.css';

export interface CounterProps extends InputProps {
    leftStepHandler: () => void;
    rightStepHandler: () => void;
    label: string;
}

export const Counter = (props: CounterProps) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const { value } = props;

    return (
        <div className="field-counter" ref={inputRef}>
            <p className="field-counter__parameter">
                {props.label}
            </p>
            <div className="field-counter__wrap">
                <button
                    type="button"
                    aria-hidden="true"
                    aria-label={props.label}
                    className="triangle-right"
                    onClick={props.leftStepHandler}
                />
                <Input
                    className="field-counter__input"
                    type="number"
                    name={props.name}
                    id={props.name}
                    value={value}
                    onChange={() => {}}
                />
                <button
                    type="button"
                    aria-hidden="true"
                    aria-label={props.label}
                    className="triangle-left"
                    onClick={props.rightStepHandler}
                />
            </div>
        </div>
    );
};

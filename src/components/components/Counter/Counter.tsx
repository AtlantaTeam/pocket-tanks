import React, { useState } from 'react';

import {
    Input,
    InputProps,
} from '../Forms/components/Input/Input';

import './Counter.css';

export interface CounterProps extends InputProps {
    step: number;
    label: string;
    initialState: number;
}

export const Counter = (props: CounterProps) => {
    const [
        state,
        setState,
    ] = useState({ count: props.initialState });

    return (
        <div className="field-counter">
            <p className="field-counter__parameter">
                {props.label}
            </p>
            <div className="field-counter__wrap">
                <button
                    type="button"
                    aria-hidden="true"
                    className="triangle-right"
                    onClick={() => {
                        if (props.min !== undefined) {
                            if (
                                state.count > Number(props.min)
                            ) {
                                setState({
                                    count:
                                        state.count - props.step,
                                });
                            }
                        }
                    }}
                />
                <Input
                    className="field-counter__input"
                    type="number"
                    name={props.name}
                    id={props.name}
                    defaultValue={props.initialState}
                    value={state.count}
                    min={props.min}
                    max={props.max}
                />
                <button
                    type="button"
                    aria-hidden="true"
                    className="triangle-left"
                    onClick={() => {
                        if (props.max !== undefined) {
                            if (
                                state.count < Number(props.max)
                            ) {
                                setState({
                                    count:
                                        state.count + props.step,
                                });
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

import React from 'react';
import { Listbox } from '@headlessui/react';

import './DropDown.css';
import { useTranslation } from 'i18n';
import cn from 'classnames';

export type DropDownValue = {
    readonly id: number,
    readonly name: string,
    readonly type?: unknown,
    readonly img?: string | undefined
};

export type DropDownProps = {
    selectedValue: DropDownValue;
    values: readonly DropDownValue[];
    onChange: (value: DropDownValue) => void;
    label?: string;
    listPosition?: 'top' | 'bottom'
    isBoldBorders?: boolean;
    isColorActive?: boolean;
};

export const DropDown = (props: DropDownProps) => {
    const { t } = useTranslation();

    return (
        <div className={`field-select ${props.isBoldBorders ? 'field-select--game' : ''}`}>
            {props.label
            && (
                <p className="field-select__parameter">
                    {props.label}
                </p>
            )}
            <Listbox value={props.selectedValue} onChange={props.onChange}>
                {({ open }) => (
                    <>
                        <Listbox.Button
                            className={`field-select__wrap ${props.isBoldBorders ? 'field-select__wrap--game' : ''}`}
                        >
                            <div className={cn('field-select__name',
                                { 'field-select__name--plain': !props.isColorActive })}
                            >
                                {t(props.selectedValue.name)}
                            </div>
                            <div className={(() => (open ? 'triangle-to-top' : 'triangle-to-bottom'))()} />
                        </Listbox.Button>
                        {open && (
                            <div>
                                {/*
                                Using `static`, `Listbox.Options` is always rendered and
                                ignores the `open` state.
                                */}
                                <Listbox.Options
                                    className={(() => {
                                        let strClass = '';
                                        switch (props.listPosition) {
                                            case 'top':
                                                strClass = 'options options_top';
                                                break;
                                            case 'bottom':
                                                strClass = 'options options_bottom';
                                                break;
                                            default:
                                                strClass = 'options options_bottom';
                                                break;
                                        }
                                        return strClass;
                                    })()}
                                    static
                                >
                                    {props.values.map((item) => (
                                        <Listbox.Option className="option" key={item.id} value={item}>
                                            {t(item.name)}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        )}
                    </>
                )}
            </Listbox>
        </div>
    );
};

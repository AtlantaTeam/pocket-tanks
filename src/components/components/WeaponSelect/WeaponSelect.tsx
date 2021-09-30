import React from 'react';
import { Listbox } from '@headlessui/react';

import './WeaponSelect.css';
import { Weapon } from '../../Pages/Game/types';

export type WeaponSelectProps = {
    selectedWeapon: Weapon;
    weapons: readonly {
        readonly id: number,
        readonly name: string,
        readonly type?: unknown,
        readonly img?: string | undefined
    }[];
    onChange: (value: Weapon) => void;
    label: string;
    listPosition?: 'top' | 'bottom'
};

export const WeaponSelect = (props: WeaponSelectProps) => (
    <div className="field-select">
        <p className="field-select__parameter">
            {props.label}
        </p>
        <Listbox value={props.selectedWeapon} onChange={props.onChange}>
            {({ open }) => (
                <>
                    <Listbox.Button className="field-select__wrap">
                        <div className="field-select__name">
                            {props.selectedWeapon.name}
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
                                {props.weapons.map((gun) => (
                                    <Listbox.Option className="option" key={gun.id} value={gun}>
                                        {gun.name}
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

import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';

import './WeaponSelect.css';

export interface Weapon{
    id: number,
    name: string,
    img?: string,
}

export interface WeaponSelectProps {
    weapon: Weapon[];
    label: string;
}

export const WeaponSelect = (props: WeaponSelectProps) => {
    const [selectedWeapon, setSelectedWeapon] = useState(props.weapon[0]);

    return (
        <Listbox value={selectedWeapon} onChange={setSelectedWeapon}>
            {({ open }) => (
                <>
                    <div className="field-select">
                        <p className="field-select__parameter">
                            {props.label}
                        </p>
                        <Listbox.Button className="field-select__wrap">
                            <div className="field-select__name">
                                {selectedWeapon.name}
                            </div>
                            <div className={(() => (open ? 'triangle-to-top' : 'triangle-to-bottom'))()} />
                        </Listbox.Button>
                        {open && (
                            <div>
                                {/*
                                Using `static`, `Listbox.Options` is always rendered and
                                ignores the `open` state.
                                */}
                                <Listbox.Options className="options" static>
                                    {props.weapon.map((gun) => (
                                        <Listbox.Option className="option" key={gun.id} value={gun}>
                                            {gun.name}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Listbox>
    );
};

import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import './Tabs.css';
import { FormLoadAvatar } from '../Forms/FormLoadAvatar/FormLoadAvatar';
import { FormEditPassword } from '../Forms/FormEditPassword/FormEditPassword';
import { FormEditProfileData } from '../Forms/FormEditProfileData/FormEditProfileData';

export interface TabsProps {
    tabs: string[];
    clasName?: string;
}

export const Tabs = (props: TabsProps) => (
    <>
        <Tab.Group defaultIndex={0}>
            <Tab.List className="tab-list">
                {props.tabs.map((item) => (
                    <Tab key={item} as={Fragment}>
                        {({ selected }) => (
                            <span
                                className={
                                    selected ? (
                                        'tab tab_selected'
                                    ) : (
                                        'tab'
                                    )
                                }
                            >
                                {item}
                            </span>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="tab-panels">
                <Tab.Panel>
                    <FormEditProfileData />
                </Tab.Panel>
                <Tab.Panel>
                    <FormLoadAvatar />
                </Tab.Panel>
                <Tab.Panel>
                    <FormEditPassword />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </>
);

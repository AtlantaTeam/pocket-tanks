import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import './Tabs.css';
import { Button } from '../Button/Button';

export interface TabsProps {
    tabs: string[];
    clasName?: string;
}

export const Tabs = (props: TabsProps) => (
    <Tab.Group>
        <Tab.List className="tab-list">
            {props.tabs.map((item) => (
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <Button
                            type="button"
                            className={
                                selected ? (
                                    'button-tab button-tab_selected'
                                ) : (
                                    'button-tab'
                                )
                            }
                            text={item}
                        />
                    )}
                </Tab>
            ))}
        </Tab.List>
        <Tab.Panels className="tab-panels">
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
    </Tab.Group>
);

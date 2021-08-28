import React from 'react';
import {
    Link,
} from 'react-router-dom';

import { Menu } from '@headlessui/react';

import { ROUTES } from '../../../utils/constants/routes';

import './Menu.css';

/** Использовать с BrowserRouter React, так как компонент Link */
export const MenuComponent = () => (
    <Menu>
        <Menu.Button className="menu-item menu-item_button">
            Меню
        </Menu.Button>
        <Menu.Items className="menu-items">
            {ROUTES.map((item) => (
                <Menu.Item key={item.name}>
                    {({ active }) => (
                        <Link
                            to={item.link}
                            className={(() => {
                                if (active) {
                                    return 'menu-item menu-item_active';
                                }
                                return 'menu-item';
                            })()}
                        >
                            {item.name}
                        </Link>
                    )}
                </Menu.Item>
            ))}
        </Menu.Items>
    </Menu>
);

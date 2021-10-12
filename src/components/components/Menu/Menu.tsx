import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import {
    Link,
} from 'react-router-dom';

import imageMenuButton from 'images/menu.svg';
import logoutButton from 'images/logout.svg';

import { Menu } from '@headlessui/react';
import { Button } from '../Button/Button';

import { ROUTES } from '../../../utils/constants/routes';
import './Menu.css';
import { Image } from '../Image/Image';

import { logoutRequested } from '../../../redux/actions/user-state/logout';

/** Использовать с BrowserRouter React, так как компонент Link */
export const MenuComponent = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Menu>
                <Menu.Button className="menu-item menu-item_button">
                    <Image
                        className="image"
                        imagePath={imageMenuButton}
                    />
                </Menu.Button>
                <Menu.Items className="menu-items">
                    {ROUTES.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <Link
                                    key={`${item.name}-link`}
                                    to={item.link}
                                    className={cn('menu-item', { 'menu-item_active': active })}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
            <Button
                type="button"
                className="menu-logout"
                onClick={() => dispatch(logoutRequested())}
            >
                <Image
                    className="image"
                    imagePath={logoutButton}
                />
            </Button>
        </>
    );
};

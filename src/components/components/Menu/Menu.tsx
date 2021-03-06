import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import {
    Link,
} from 'react-router-dom';

import { useTranslation } from 'i18n';
import imageMenuButton from 'images/menu.svg';

import logoutButton from 'images/logout.svg';
import { Menu } from '@headlessui/react';
import { getUserNickname } from '../../../redux/selectors/user-state';

import { Button } from '../Button/Button';
import {
    AUTH_MENU_ROUTES, MAIN_ROUTE, PRIVACY_ROUTE, ROUTES,
} from '../../../utils/constants/routes';
import './Menu.css';

import { Image } from '../Image/Image';
import { logoutRequested } from '../../../redux/actions/user-state/logout';

/** Использовать с BrowserRouter React, так как компонент Link */
export const MenuComponent = () => {
    const dispatch = useDispatch();
    const userName = useSelector(getUserNickname);
    const { t } = useTranslation();

    return (
        <>
            <Menu>
                <Menu.Button className="menu-item menu-item_button" aria-label={t('menu')}>
                    <Image
                        className="image image_icon"
                        imagePath={imageMenuButton}
                    />
                </Menu.Button>
                <Menu.Items className="menu-items">
                    {[...(userName ? ROUTES : AUTH_MENU_ROUTES), PRIVACY_ROUTE, MAIN_ROUTE].map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <Link
                                    key={`${item.name}-link`}
                                    to={item.path}
                                    className={cn('menu-item', { 'menu-item_active': active })}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
            {userName && (
                <Button
                    type="button"
                    className="menu-logout"
                    label={t('exit')}
                    onClick={() => dispatch(logoutRequested())}
                >
                    <Image
                        className="image image_icon"
                        imagePath={logoutButton}
                    />
                </Button>
            )}
        </>
    );
};

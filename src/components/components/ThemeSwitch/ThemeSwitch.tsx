import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import themeSwitchButton from 'images/theme-switch.svg';
import { userAPI } from 'api/user-api';
import { useSelector } from 'react-redux';
import { getUserId } from '../../../redux/selectors/user-state';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import './ThemeSwitch.css';

export const ThemeSwitch = () => {
    const [theme, setTheme] = useState<string>('night');
    const userId = useSelector(getUserId);

    useEffect(() => {
        if (!userId) {
            console.log('User is empty!');
            return;
        }
        userAPI.getTheme(userId)
            .then((response) => {
                const themeValue = response?.data?.theme;
                document.body.dataset.theme = themeValue;
                setTheme(themeValue);
                return true;
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const handleClick = () => {
        const themeValue = theme === 'night' ? 'light' : 'night';
        document.body.dataset.theme = themeValue;
        setTheme(themeValue);
        if (!userId) {
            console.log('User is empty!');
            return;
        }
        userAPI.setTheme(userId, themeValue)
            .then(() => true).catch((err) => {
                console.log(err);
            });
    };

    return (
        <Button
            type="button"
            className="theme-switch"
            onClick={handleClick}
        >
            <Image
                className={cn('image image_icon', { 'image_flip-x': theme === 'light' })}
                imagePath={themeSwitchButton}
            />
        </Button>
    );
};

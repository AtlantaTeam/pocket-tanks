import React, { useState } from 'react';
import cn from 'classnames';

import themeSwitchButton from 'images/theme-switch.svg';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import './ThemeSwitch.css';

export const ThemeSwitch = () => {
    const [isAlternativeTheme, switchTheme] = useState(false);

    const handleClick = () => {
        document.body.dataset.theme = !isAlternativeTheme ? 'alternative' : '';
        switchTheme(!isAlternativeTheme);
    };

    return (
        <Button
            type="button"
            className="theme-switch"
            onClick={handleClick}
        >
            <Image
                className={cn('image image_icon', { 'image_flip-x': isAlternativeTheme })}
                imagePath={themeSwitchButton}
            />
        </Button>
    );
};

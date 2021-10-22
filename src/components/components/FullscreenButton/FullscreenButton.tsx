import React, { useState } from 'react';
import imageFullscreenOnButton from 'images/fullscreenOn.svg';
import imageFullscreenOffButton from 'images/fullscreenOff.svg';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import './FullscreenButton.css';

export const FullscreenButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <Button
            type="button"
            className="button_fullscreen"
            onClick={() => {
                if (!document) {
                    return;
                }
                const { documentElement } = document;
                if (!document.fullscreenElement) {
                    if (documentElement.requestFullscreen) {
                        documentElement.requestFullscreen()
                            .then(() => {
                                setIsFullscreen(true);
                                return true;
                            }).catch(() => {
                                console.log('Failed to go Fullscreen');
                            });
                    }
                } else if (document.exitFullscreen) {
                    document.exitFullscreen()
                        .then(() => {
                            setIsFullscreen(false);
                            return false;
                        }).catch(() => {
                            console.log('Failed to get back from Fullscreen');
                        });
                }
            }}
        >
            <Image
                className="image image_icon"
                imagePath={isFullscreen ? imageFullscreenOffButton : imageFullscreenOnButton}
            />
        </Button>
    );
};

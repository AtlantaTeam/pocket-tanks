import React, { useEffect, useRef, useState } from 'react';
import './SoundButton.css';
import imageSoundOff from 'images/soundOff.svg';
import imageSoundOn from 'images/soundOn.svg';
import { Image } from 'components/components/Image/Image';
import { mediaSafePlay } from 'utils/utils';
import { Button } from '../Button/Button';

export type SoundProps = {
    src: string | undefined,
    isLoop?: boolean,
    isAutoplay?: boolean,
};

export const SoundButton = (props: SoundProps) => {
    const [isSound, setIsSound] = useState(true);
    const soundRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const soundEl = soundRef.current;
        if (!soundEl) {
            return;
        }
        if (isSound) {
            soundEl.muted = false;
            soundEl.volume = 0.7;
            mediaSafePlay(soundEl, true);
        } else {
            soundEl.muted = true;
            soundEl.pause();
        }

        // eslint-disable-next-line consistent-return
        return () => {
            soundEl.muted = true;
            soundEl.pause();
        };
    }, [isSound]);

    return (
        <Button
            type="button"
            className="button_sound"
            onClick={() => {
                setIsSound(!isSound);
            }}
        >
            <Image
                className="image image_icon"
                imagePath={isSound ? imageSoundOn : imageSoundOff}
            />
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio ref={soundRef} src={props.src} autoPlay={props.isAutoplay} loop={props.isLoop} preload="auto" />
        </Button>
    );
};

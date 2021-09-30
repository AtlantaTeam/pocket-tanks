import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

import imgCloseCross from 'images/close-cross.svg';

import { Button } from '../Button/Button';
import { Title } from '../Title/Title';
import { Image } from '../Image/Image';

import './Popup.css';

export interface PopupProps{
    children?: JSX.Element;
}

export const Popup = (props: PopupProps) => {
    const [
        isOpen,
        setIsOpen,
    ] = useState(true);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                aria-hidden="true"
            >
                Open dialog
            </button>
            <Dialog
                open={isOpen}
                onClose={closeModal}
                className="dialog"
            >
                <Image
                    className="img-close-cross image_close-cross_absolute"
                    imagePath={imgCloseCross}
                />
                <Dialog.Overlay className="overlay" />

                <Dialog.Title>
                    <Title
                        className="title title_middle"
                        text="Title"
                    />
                </Dialog.Title>
                <Dialog.Description>
                    {
                        () => {
                            if (props.children !== undefined) return props.children;
                            return <></>;
                        }
                    }
                </Dialog.Description>
                <Button
                    type="button"
                    className="button button_orange"
                    onClick={() => setIsOpen(true)}
                    text="Close"
                />
            </Dialog>
        </>
    );
};

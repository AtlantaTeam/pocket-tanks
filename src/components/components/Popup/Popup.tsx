import React from 'react';
import { Dialog } from '@headlessui/react';

import imgCloseCross from 'images/close-cross.svg';

import { Button } from '../Button/Button';
import { Image } from '../Image/Image';

import './Popup.css';

export interface PopupProps{
    isOpen: boolean;
    title: string;
    textContent?: string;
    children?: JSX.Element;
    buttonText: string;
    action: () => void;
    onCrossPress?: () => void;
}

export const Popup = (props: PopupProps) => (
    <>
        <Dialog
            open={props.isOpen}
            onClose={() => {}}
            className="popup-dialog"
        >
            <Dialog.Overlay className="popup-overlay" />

            <div className="popup-content">
                <Image
                    className="image_close-cross image_close-cross_absolute"
                    imagePath={imgCloseCross}
                    onClick={() => (props.onCrossPress ?? props.action)()}
                />

                <Dialog.Title className="title title_middle">
                    {props.title}
                </Dialog.Title>

                {props.children
                    ? props.children
                    : (
                        <Dialog.Description className="popup-text">
                            {props.textContent}
                        </Dialog.Description>
                    )}

                <Button
                    type="button"
                    className="button button_orange"
                    onClick={() => props.action()}
                    text={props.buttonText}
                />
            </div>
        </Dialog>
    </>
);

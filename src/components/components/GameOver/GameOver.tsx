import React from 'react';
import { useTranslation } from 'i18n';
import { Dialog } from '@headlessui/react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import './GameOver.css';

export interface GameOverProps{
    isOpen: boolean;
    winner: () => string;
    action?: () => void;
    children?: JSX.Element;
}

export const GameOver = (props: GameOverProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={() => {
                }}
                className="overlay"
            >
                <Dialog.Title>
                    <Text
                        className="title title_middle"
                        text={t('winner')}
                    />
                </Dialog.Title>
                <Dialog.Description className="description">
                    <span className="winner_text">
                        {props.winner()}
                    </span>
                </Dialog.Description>
                <Button
                    type="button"
                    className="button button_orange restart_button"
                    onClick={() => {
                        if (props.action) {
                            props?.action();
                        }
                    }}
                    text={t('playAgain')}
                />
            </Dialog>
        </>
    );
};

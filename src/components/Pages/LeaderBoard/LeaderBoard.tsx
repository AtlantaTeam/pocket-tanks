import { Input } from 'components/components/Forms/components/Input/Input';
import { Title } from 'components/components/Title/Title';
import React from 'react';
import { Page } from '../components/Page/Page';

import './LeaderBoard.css';

const players = [
    {
        display_name: 'Super Tankist 9000',
    },
    {
        display_name: 'Mario Abrams',
    },
    {
        display_name: 'Серый волк',
    },
    {
        display_name: 'Красная шапочка',
    },
    {
        display_name: 'Магомед Магедов',
    },
    {
        display_name: 'Player 1',
    },
    {
        display_name: 'Player 1455',
    },
    {
        display_name: 'Batya Ivanicvich',
    },
    {
        display_name: 'Пуля',
    },
    {
        display_name: 'Ракета',
    },
];

export const LeaderBoard = () => (
    <Page>
        <div className="leader-board-container">
            <div className="leader-board-container">
                <Title
                    className="title title_middle"
                    text="Лучшие стрелки"
                />
            </div>
            {
                players.map((item, index) => (
                    <div
                        key={item.display_name}
                        className="leader-name"
                    >
                        {`${String(index + 1)}   ${item.display_name}`}
                    </div>
                ))
            }
        </div>
    </Page>
);

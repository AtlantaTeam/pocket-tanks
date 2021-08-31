import React, { useEffect, useRef } from 'react';
import { GameModes, GamePlay } from './GamePlay';

export const Game = () => {
    const canvasRef = useRef(null);
    const game = new GamePlay(canvasRef);

    useEffect(() => {
        game.loadImages();
        window.addEventListener('keydown', game.onKeyDown);

        return () => {
            window.removeEventListener('keydown', game.onKeyDown);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight - 300}
            onMouseMove={(e) => {
                if (game.leftTank?.isActive) {
                    game.activateMode(GameModes.ANGLE);
                    game.mousePos = {
                        x: e.clientX - e.currentTarget.offsetLeft,
                        y: e.clientY - e.currentTarget.offsetTop,
                    };
                }
            }}
            onMouseLeave={() => (game.isAngleMode && game.activateMode(GameModes.IDLE))}
            onClick={() => (game.onFire())}
            onWheel={(e) => (game.changeTankPower(e.deltaY > 0 ? -1 : 1))}
        />
    );
};

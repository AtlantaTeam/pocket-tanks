import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isServer } from 'utils/isServer';
import { Image } from 'components/components/Image/Image';
import gamePlayMusic from 'audio/gameplay.mp3';
import imgAvatarPlaceHolder from 'images/avatar-placeholder.svg';
import imgBotAvatar from 'images/bot.jpg';
import { useTranslation } from 'i18n';
import { floor } from 'utils/canvas';
import { SoundButton } from 'components/components/SoundButton/SoundButton';
import { addUserResults } from '../../../controllers/leaderboard-controller';
import { avatarFulfilled } from '../../../redux/actions/user-state/get-avatar';
import { GameModes, GamePlay, TanksWeapons } from './GamePlay';
import './Game.css';
import { Button } from '../../components/Button/Button';
import { Counter } from '../../components/Counter/Counter';
import { Bullet } from './Bullet';
import { GameOver } from '../../components/GameOver/GameOver';
import { DropDown } from '../../components/DropDown/DropDown';
import { Weapon } from './types';
import {
    getAngle,
    getEnemyPoints,
    getMoves,
    getPlayerPoints,
    getPower,
    getSelectedWeapon,
    getWeapons,
} from '../../../redux/selectors/game-state';
import {
    changeAngle,
    changeEnemyPoints,
    changeMoves,
    changePlayerPoints,
    changePower,
    increaseAngle,
    increaseEnemyPoints,
    increasePlayerPoints,
    removeWeaponById,
    selectWeapon,
    setWeapons,
} from '../../../redux/actions/game-state';
import { getUserAvatar, getUserAvatarResourse, getUserNickname } from '../../../redux/selectors/user-state';
import { getUserAvatar as getUserAvatarController } from '../../../controllers/user-controller';

const generateRandomWeapons = (bulletTypes: typeof Bullet[], amount: number) => {
    const weapons: Weapon[] = [];
    const randomIndex = Math.floor(Math.random() * bulletTypes.length);
    for (let i = 0; i < amount; i++) {
        weapons[i] = {
            id: i,
            type: bulletTypes[randomIndex],
            name: `${bulletTypes[randomIndex].label}`,
        };
    }
    return {
        leftTankWeapons: weapons.filter((v, index) => (index % 2) - 1),
        rightTankWeapons: weapons.filter((v, index) => index % 2),
    };
};

const weaponsAmount = 10;
let allWeapons: TanksWeapons = generateRandomWeapons([Bullet], weaponsAmount);
let game: GamePlay | undefined;
let isImagesLoaded = false;
let canPointsSentToLeaderBoard = false;

const Game = () => {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStart, setIsStart] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isUserTankActive, setUserTankActive] = useState(true);
    const dispatch = useDispatch();
    const selectedWeapon = useSelector(getSelectedWeapon);
    const weapons = useSelector(getWeapons);
    const power = useSelector(getPower);
    const angle = useSelector(getAngle);
    const moves = useSelector(getMoves);
    const playerPoints = useSelector(getPlayerPoints);
    const enemyPoints = useSelector(getEnemyPoints);
    const userName = useSelector(getUserNickname) || 'Player';
    const avatar = useSelector(getUserAvatar);
    const userAvatarResourse = useSelector(getUserAvatarResourse);
    const avatarPath = avatar ? `${avatar}` : imgAvatarPlaceHolder;
    if (game?.leftTank && game?.rightTank) {
        const [activeTank] = game.getActiveAndTargetTanks(game.leftTank, game.rightTank);
        activeTank.power = power;
        if (activeTank.gunpointAngle !== angle) {
            game.activateMode(GameModes.ANGLE);
            activeTank.gunpointAngle = angle;
        }
    }

    const fire = () => {
        if (game && isUserTankActive) {
            game.onFire(selectedWeapon);
            dispatch(removeWeaponById(selectedWeapon.id));
        }
    };

    useEffect(() => {
        setUserTankActive(!!(game && game.leftTank?.isActive && !game.isFireMode));
    });

    const [avatarImgState, setAvatarImg] = useState({ img: avatarPath });

    useEffect(() => {
        if (!avatar && userAvatarResourse) {
            getUserAvatarController()
                .then((data) => {
                    setAvatarImg({ img: data });
                    dispatch(avatarFulfilled(data));
                    return data;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        } else {
            setAvatarImg({ img: avatarPath });
        }
    }, []);

    useEffect(() => {
        if (isStart) {
            console.log('New Game Started');
            allWeapons = generateRandomWeapons([Bullet], weaponsAmount);
            dispatch(setWeapons(allWeapons.leftTankWeapons));
            dispatch(selectWeapon(allWeapons.leftTankWeapons[0]));
            dispatch(changeAngle(0));
            dispatch(changePower(10));
            dispatch(changeMoves(4));
            dispatch(changePlayerPoints(0));
            dispatch(changeEnemyPoints(0));
            canPointsSentToLeaderBoard = true;
            const canvas = canvasRef.current;
            const { width, height } = document?.body.getBoundingClientRect() || { width: 1000, height: 700 };
            if (canvas) {
                canvas.width = width - 2 * canvas.offsetLeft;
                canvas.height = height - (canvas.nextSibling as HTMLBaseElement)?.offsetHeight;
            }

            game = new GamePlay(
                canvasRef,
                allWeapons,
                () => {
                    if (!game || !game.leftTank || !game.rightTank || !game.bullet) {
                        return;
                    }
                    if (game.leftTank === game.bullet.hittedTank) {
                        if (game.leftTank.isActive) {
                            dispatch(increasePlayerPoints(-game.bullet.power));
                        } else {
                            dispatch(increaseEnemyPoints(game.bullet.power));
                        }
                    } else if (game.rightTank.isActive) {
                        dispatch(increaseEnemyPoints(-game.bullet.power));
                    } else {
                        dispatch(increasePlayerPoints(game.bullet.power));
                    }
                },
                () => {
                    if (!game || !game.leftTank || !game.rightTank) {
                        return;
                    }
                    if (!isGameOver && !game.leftTank?.weapons?.length
                            && !game.rightTank?.weapons?.length && !game.isFireMode) {
                        setIsGameOver(true);
                    }
                    const [activeTank] = game.getActiveAndTargetTanks(game.leftTank, game.rightTank);
                    setUserTankActive(!game.isFireMode && activeTank === game.leftTank);
                },
            );
            if (isImagesLoaded) {
                game.initPaint();
            } else {
                game.loadImages();
                isImagesLoaded = true;
            }
            setIsStart(false);
        }
        return () => {
            if (!isStart && game && game.rafTimerId) {
                cancelAnimationFrame(game.rafTimerId);
                game = undefined;
                console.log('Stop Game!');
            }
        };
    }, [isStart]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!game?.leftTank?.isActive) {
                return;
            }
            if ((e.key !== 'ArrowRight' && e.key !== 'ArrowLeft'
                    && e.key !== 'ArrowUp' && e.key !== 'ArrowDown'
                    && e.key !== ' '
            )
                || !game || !game.leftTank || !game.rightTank) {
                return;
            }
            e.preventDefault();
            switch (e.key) {
                case 'ArrowDown': {
                    if (e.ctrlKey) {
                        if (weapons) {
                            let index = 0;
                            for (let i = 0; i < weapons.length; i += 1) {
                                if (weapons[i].id === selectedWeapon.id) {
                                    index = i + 1 > weapons.length - 1 ? 0 : i + 1;
                                    break;
                                }
                            }
                            dispatch(selectWeapon(weapons[index]));
                        }
                    } else {
                        game.changeTankPower(-1, dispatch);
                    }
                    break;
                }
                case 'ArrowUp': {
                    if (e.ctrlKey) {
                        if (weapons) {
                            let index = 0;
                            for (let i = 0; i < weapons.length; i += 1) {
                                if (weapons[i].id === selectedWeapon.id) {
                                    index = i - 1 < 0 ? weapons.length - 1 : i - 1;
                                    break;
                                }
                            }
                            dispatch(selectWeapon(weapons[index]));
                        }
                    } else {
                        game.changeTankPower(1, dispatch);
                    }
                    break;
                }
                case 'ArrowLeft': {
                    if (e.ctrlKey) {
                        if (moves > 0 && !game.isMoveMode) {
                            game.changeTankPosition(-150, dispatch);
                        }
                    } else {
                        dispatch(increaseAngle(-Math.PI / 180));
                    }
                    break;
                }
                case 'ArrowRight': {
                    if (e.ctrlKey) {
                        if (moves > 0 && !game.isMoveMode) {
                            game.changeTankPosition(150, dispatch);
                        }
                    } else {
                        dispatch(increaseAngle(Math.PI / 180));
                    }
                    break;
                }
                default: fire();
            }
        };

        const onResize = () => {
            setIsStart(true);
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
        };
    }, [selectedWeapon, moves]);

    return (
        <>
            <div className="game_wrapper">
                <canvas
                    className="canvas"
                    ref={canvasRef}
                    onMouseMove={(e) => {
                        if (game && game.leftTank?.isActive && !game.isFireMode && game.ctx) {
                            const curAngle = Math.atan2(
                                floor(e.clientY - e.currentTarget.offsetTop) - game.leftTank.gunpointY,
                                floor(e.clientX - e.currentTarget.offsetLeft) - game.leftTank.gunpointX,
                            );
                            dispatch(changeAngle(curAngle));
                        }
                    }}
                    onWheel={(e) => (game?.changeTankPower(e.deltaY > 0 ? -1 : 1, dispatch))}
                    onMouseLeave={() => (game?.isAngleMode && game?.activateMode(GameModes.IDLE))}
                    onClick={fire}
                />

                <div className="controls_wrapper">
                    <div className="avatar_group-left">
                        <div className="player_name color-main">{userName}</div>
                        <Image className="image_avatar" imagePath={avatarImgState.img} />
                        <div className="player_points">{playerPoints}</div>
                    </div>
                    <div className="control_buttons">
                        <div className="control_counter_group">
                            <Counter
                                className="control_counter"
                                label={t('power')}
                                value={power}
                                leftStepHandler={() => {
                                    isUserTankActive && game?.changeTankPower(-1, dispatch);
                                }}
                                rightStepHandler={() => {
                                    isUserTankActive && game?.changeTankPower(1, dispatch);
                                }}
                            />
                            <Counter
                                label={t('angle')}
                                value={floor(((angle < 0 ? -angle : 2 * Math.PI - angle) * 180) / Math.PI)}
                                leftStepHandler={() => {
                                    isUserTankActive && dispatch(increaseAngle(Math.PI / 180));
                                }}
                                rightStepHandler={() => {
                                    isUserTankActive && dispatch(increaseAngle(-Math.PI / 180));
                                }}
                            />
                        </div>
                        <div className="control_counter_group">
                            <DropDown
                                selectedValue={selectedWeapon}
                                values={weapons}
                                onChange={(value: Weapon) => {
                                    isUserTankActive && dispatch(selectWeapon(value));
                                }}
                                label={t('weapon')}
                                listPosition="top"
                                isBoldBorders
                            />
                            <Counter
                                label={t('moves')}
                                value={moves}
                                leftStepHandler={() => {
                                    if (moves > 0 && isUserTankActive) {
                                        game?.changeTankPosition(-150, dispatch);
                                    }
                                }}
                                rightStepHandler={() => {
                                    if (moves > 0 && isUserTankActive) {
                                        game?.changeTankPosition(150, dispatch);
                                    }
                                }}
                            />

                        </div>
                        <Button
                            className={isUserTankActive ? 'big_red_button' : 'big_red_button_disabled'}
                            type="button"
                            onClick={fire}
                            label={t('fire')}
                        />
                    </div>
                    <div className="avatar_group-right">
                        <div className="player_name color-accent">Terminator</div>
                        <Image className="image_avatar" imagePath={imgBotAvatar} />
                        <div className="player_points">{enemyPoints}</div>
                    </div>
                </div>
            </div>
            <GameOver
                isOpen={isGameOver}
                action={() => {
                    setIsGameOver(false);
                    setIsStart(true);
                }}
                winner={() => {
                    let winnerText = t('draw');
                    if (isGameOver) {
                        if (playerPoints > enemyPoints) {
                            winnerText = userName || t('youAreWinner');
                            if (canPointsSentToLeaderBoard) {
                                canPointsSentToLeaderBoard = false;
                                addUserResults(userName, playerPoints)
                                    .then(() => {
                                        console.log('Results successfully sent to LeaderBoard!');
                                        return true;
                                    })
                                    .catch(() => {
                                        console.log('Failed to send results to LeaderBoard!');
                                    });
                            }
                        } else if (playerPoints < enemyPoints) {
                            winnerText = 'Terminator';
                        }
                    }
                    return winnerText;
                }}
            />
            <SoundButton src={gamePlayMusic} isLoop isAutoplay />
        </>
    );
};

function renderGame() {
    return !isServer
        ? Game
        : () => <></>;
}

export default renderGame();

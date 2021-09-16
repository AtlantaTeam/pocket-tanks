import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'components/components/Image/Image';
import imgAvatarPlaceHolder from 'images/avatar-placeholder.svg';
import imgBotAvatar from 'images/bot.jpg';
import { GameModes, GamePlay, TanksWeapons } from './GamePlay';
import './Game.css';
import { Button } from '../../components/Button/Button';
import { Counter } from '../../components/Counter/Counter';
import { Bullet } from './Bullet';
import { GameOver } from '../../components/GameOver/GameOver';
import { WeaponSelect } from '../../components/WeaponSelect/WeaponSelect';
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
    changeAngle, changeEnemyPoints, changeMoves, changePlayerPoints, changePower,
    increaseAngle,
    increaseEnemyPoints,
    increasePlayerPoints,
    removeWeaponById,
    selectWeapon,
    setWeapons,
} from '../../../redux/actions/game-state';
import { floor, rotateFigure } from '../../../utils/canvas';
import { getUserAvatar, getUserNickname } from '../../../redux/selectors/user-state';
import { RESOURCES_BASE_URL } from '../../../constants/api-routes';

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

const weaponsAmount = 6;
let allWeapons: TanksWeapons = generateRandomWeapons([Bullet], weaponsAmount);
let game: GamePlay;

export const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStart, setIsStart] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const dispatch = useDispatch();
    const selectedWeapon = useSelector(getSelectedWeapon);
    const weapons = useSelector(getWeapons);
    const power = useSelector(getPower);
    const angle = useSelector(getAngle);
    const moves = useSelector(getMoves);
    const playerPoints = useSelector(getPlayerPoints);
    const enemyPoints = useSelector(getEnemyPoints);
    const userName = useSelector(getUserNickname);
    const avatar = useSelector(getUserAvatar);
    const avatarPath = avatar ? `${RESOURCES_BASE_URL}${avatar}` : imgAvatarPlaceHolder;
    if (game?.leftTank && game?.rightTank) {
        const [activeTank] = game.getActiveAndTargetTanks(game.leftTank, game.rightTank);
        activeTank.power = power;
        if (activeTank.gunpointAngle !== angle) {
            game.activateMode(GameModes.ANGLE);
            activeTank.gunpointAngle = angle;
        }
    }

    const fire = () => {
        if (game.leftTank?.isActive && !game.isFireMode) {
            game.onFire(selectedWeapon);
            dispatch(removeWeaponById(selectedWeapon.id));
        }
    };

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
            const canvas = canvasRef.current;
            if (canvas) {
                const { width, height } = document?.body.getBoundingClientRect() || { width: 1000, height: 700 };
                canvas.width = width - 2 * canvas.offsetLeft;
                canvas.height = height - (canvas.nextSibling as HTMLBaseElement)?.offsetHeight;
            }
            game = new GamePlay(
                canvasRef,
                allWeapons,
                () => {
                    if (!game.leftTank || !game.rightTank || !game.bullet) {
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
                    if (!isGameOver && !game.leftTank?.weapons?.length
                    && !game.rightTank?.weapons?.length && !game.isFireMode) {
                        setIsGameOver(true);
                    }
                },
            );
            game.loadImages();
            setIsStart(false);
        }
    }, [isStart]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
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
                        if (moves > 0) {
                            game.changeTankPosition(-150, dispatch);
                        }
                    } else {
                        dispatch(increaseAngle(-Math.PI / 180));
                    }
                    break;
                }
                case 'ArrowRight': {
                    if (e.ctrlKey) {
                        if (moves > 0) {
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
    }, []);

    return (
        <>
            <div className="game_wrapper">
                <canvas
                    className="canvas canvas_light"
                    ref={canvasRef}
                    onMouseMove={(e) => {
                        if (game.leftTank?.isActive && !game.isFireMode && game.ctx) {
                            const { angle: curAngle } = rotateFigure(
                                game.ctx,
                                floor(e.clientX - e.currentTarget.offsetLeft),
                                floor(e.clientY - e.currentTarget.offsetTop),
                                game.leftTank.gunpointX,
                                game.leftTank.gunpointY,
                            );
                            game.ctx.restore();
                            dispatch(changeAngle(curAngle));
                        }
                    }}
                    onWheel={(e) => (game.changeTankPower(e.deltaY > 0 ? -1 : 1, dispatch))}
                    onMouseLeave={() => (game.isAngleMode && game.activateMode(GameModes.IDLE))}
                    onClick={fire}
                />

                <div className="controls_wrapper">
                    <div className="avatar_group-left">
                        <div className="player_name color-main">{userName}</div>
                        <Image className="image_avatar" imagePath={avatarPath} />
                        <div className="player_points">{playerPoints}</div>
                    </div>
                    <div className="control_buttons">
                        <div className="control_counter_group">
                            <Counter
                                className="control_counter"
                                label="Мощность"
                                value={power}
                                leftStepHandler={() => {
                                    game.changeTankPower(-1, dispatch);
                                }}
                                rightStepHandler={() => {
                                    game.changeTankPower(1, dispatch);
                                }}
                            />
                            <Counter
                                label="Наклон"
                                value={floor(((angle < 0 ? -angle : 2 * Math.PI - angle) * 180) / Math.PI)}
                                leftStepHandler={() => {
                                    dispatch(increaseAngle(Math.PI / 180));
                                }}
                                rightStepHandler={() => {
                                    dispatch(increaseAngle(-Math.PI / 180));
                                }}
                            />
                        </div>
                        <div className="control_counter_group">
                            <WeaponSelect
                                selectedWeapon={selectedWeapon}
                                weapons={weapons}
                                onChange={(value: Weapon) => {
                                    dispatch(selectWeapon(value));
                                }}
                                label="Оружие"
                                listPosition="top"
                            />
                            <Counter
                                label="Движение"
                                value={moves}
                                leftStepHandler={() => {
                                    if (moves > 0) {
                                        game.changeTankPosition(-150, dispatch);
                                    }
                                }}
                                rightStepHandler={() => {
                                    if (moves > 0) {
                                        game.changeTankPosition(150, dispatch);
                                    }
                                }}
                            />

                        </div>
                        <Button
                            className="big_red_button"
                            type="button"
                            // text="Огонь!"
                            onClick={fire}
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
                    let winnerText = 'Похоже Ничья!';
                    if (playerPoints > enemyPoints) {
                        winnerText = userName || 'Конечно же ты! Так держать!';
                    } else if (playerPoints < enemyPoints) {
                        winnerText = 'Terminator';
                    }
                    return winnerText;
                }}
            />
        </>
    );
};

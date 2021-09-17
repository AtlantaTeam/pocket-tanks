import { RefObject } from 'react';
import { Dispatch } from 'redux';
import { wrap } from 'comlink';
import { floor } from 'utils/canvas';
import { Coords, Weapon } from './types';
import { Ground } from './Ground';
import { Tank } from './Tank';
import { Bullet } from './Bullet';

import '../../../../static/images/left-tank.svg';
import '../../../../static/images/right-tank.svg';
import '../../../../static/images/gunpoint.svg';
import '../../../../static/images/sand.jpg';
import { increaseMoves, increasePower } from '../../../redux/actions/game-state';
import { BotAimingAsyncWorker } from './Worker';

export type TanksWeapons = {
    leftTankWeapons: Weapon[],
    rightTankWeapons: Weapon[],
};
const allGameImages: Record<string, string>[] = [
    { name: 'leftTank', fileName: 'left-tank.svg' },
    { name: 'leftGunpoint', fileName: 'gunpoint.svg' },
    { name: 'rightTank', fileName: 'right-tank.svg' },
    { name: 'rightGunpoint', fileName: 'gunpoint.svg' },
    { name: 'sand', fileName: 'sand.jpg' },
];

export const GameModes = {
    IDLE: 'idle',
    FIRE: 'fire',
    ANGLE: 'angle',
    MOVE: 'move',
};

const getWorker = () => new Worker(new URL('./Worker', import.meta.url));
const worker:Worker = getWorker();

export class GamePlay {
    private prevTimestamp = 0;

    ctx: CanvasRenderingContext2D | null | undefined;

    canvasRef: RefObject<HTMLCanvasElement>;

    static images: { [p: string]: HTMLImageElement };

    innerWidth: number;

    innerHeight: number;

    mousePos: Coords | null;

    maxGameDifficulty = 5;

    gameDifficulty = 3; // 1 - легко; 5 - сложно

    ground: Ground | undefined;

    leftTank: Tank | undefined;

    rightTank: Tank | undefined;

    bullet: Bullet | undefined;

    isFireMode = true;

    isAngleMode = false;

    isMoveMode = false;

    private lastAnimationTime: number;

    private isImagesLoaded = false;

    allWeapons: TanksWeapons;

    calcPoints: () => void;

    isGameOver: () => void;

    constructor(canvasRef: RefObject<HTMLCanvasElement>, allWeapons: TanksWeapons,
        calcPoints: () => void, isGameOver: () => void) {
        this.canvasRef = canvasRef;
        this.mousePos = null;
        this.lastAnimationTime = 0;
        this.allWeapons = allWeapons;
        this.isGameOver = isGameOver;
        this.calcPoints = calcPoints;
        const { width, height } = document?.body.getBoundingClientRect() || { width: 1000, height: 700 };
        this.innerWidth = width - 150;
        this.innerHeight = height - 300;
    }

    changeTankPosition = (delta: number, dispatch: Dispatch) => {
        if (!this.leftTank || !this.rightTank) {
            return;
        }
        this.activateMode(GameModes.MOVE);
        const [activeTank] = this.getActiveAndTargetTanks(this.leftTank, this.rightTank);
        activeTank.dx = delta;
        dispatch(increaseMoves(-1));
    };

    changeTankPower = (delta: number, dispatch: Dispatch) => {
        if (!this.leftTank || !this.rightTank) {
            return;
        }
        const [activeTank] = this.getActiveAndTargetTanks(this.leftTank, this.rightTank);
        if (activeTank.power + delta >= activeTank.powerMin
            && activeTank.power + delta <= activeTank.powerMax) {
            dispatch(increasePower(delta));
        }
    };

    loadImages = () => {
        if (this.ctx) {
            this.animate();
            return;
        }
        let assetCount = 0;
        allGameImages.forEach(({ name, fileName }) => {
            const img = new Image();
            img.onload = () => {
                assetCount += 1;
                if (assetCount === allGameImages.length) {
                    this.isImagesLoaded = true;
                    this.initPaint();
                }
            };
            img.src = `images/${fileName}`;
            GamePlay.images = {
                ...GamePlay.images,
                [name]: img,
            };
        });
    };

    initPaint = () => {
        const canvas = this.canvasRef.current;
        if (canvas) {
            this.ctx = canvas.getContext('2d');
            this.innerWidth = canvas.width;
            this.innerHeight = canvas.height;
        }
        const { leftTank, leftGunpoint, sand } = GamePlay.images;
        const { leftTankWeapons, rightTankWeapons } = this.allWeapons;
        this.ground = new Ground(this.innerWidth, this.innerHeight, sand);
        const leftTankX = floor(this.innerWidth / 4);
        const leftTankY = this.innerHeight - this.ground.heights[leftTankX];
        this.leftTank = new Tank(
            leftTankX,
            leftTankY,
            this.innerWidth,
            this.innerHeight,
            0,
            leftTankWeapons,
            leftTank,
            leftGunpoint,
        );
        this.leftTank.isActive = true;

        const rightTankX = floor((this.innerWidth * 3) / 4);
        const rightTankY = this.innerHeight - this.ground.heights[rightTankX];
        const { rightTank, rightGunpoint } = GamePlay.images;
        this.rightTank = new Tank(
            rightTankX,
            rightTankY,
            this.innerWidth,
            this.innerHeight,
            Math.PI,
            rightTankWeapons,
            rightTank,
            rightGunpoint,
        );
        if (this.ctx) {
            this.ground.draw(this.ctx);
        }
        this.animate();
        this.fullRedraw();
    };

    getActiveAndTargetTanks = (tank1: Tank, tank2: Tank) => (tank1.isActive
        ? [tank1, tank2]
        : [tank2, tank1]);

    changeActiveTank = () => {
        if (this.leftTank && this.rightTank) {
            [this.leftTank.isActive, this.rightTank.isActive] = this.leftTank.isActive
                ? [false, true]
                : [true, false];
            this.fullRedraw();
        }
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        const now = performance.now();
        this.isGameOver();
        if (now - this.prevTimestamp < 15
            || !this.ctx || !this.leftTank || !this.rightTank || !this.ground || this.isIdleMode()) {
            return;
        }

        this.prevTimestamp = now;
        if ((this.isFireMode && (!this.bullet || this.bullet.explosionRadius)) || this.ground.isFalling) {
            if (this.bullet) {
                this.explosionAreaRedraw(this.bullet);
                this.tankAreaRedraw([this.leftTank, this.rightTank]);
            } else {
                this.fullRedraw();
            }
        } else if (!this.bullet) {
            this.tankAreaRedraw([this.leftTank, this.rightTank]);
        }

        // Выходим из режима разворота дула
        this.isAngleMode = false;
        // Если выстрел, взрыв, осыпание земли завершены и танки не движутся,
        // то переходим в режим ожидания, т.е. прекращаем перерисовку
        if (this.isFireMode && !this.bullet && !this.ground.isFalling && !this.leftTank.dy && !this.rightTank.dy) {
            if (this.rightTank.isActive) {
                this.rightTank.isActive = false;
                if (worker) {
                    const { botAimingAsync } = wrap<BotAimingAsyncWorker>(worker);
                    botAimingAsync(
                        JSON.stringify(this.leftTank),
                        JSON.stringify(this.rightTank),
                        JSON.stringify(this.ground),
                        this.innerWidth,
                        this.innerHeight,
                        this.maxGameDifficulty,
                        this.gameDifficulty,
                    ).then((resultStr) => {
                        const result = JSON.parse(resultStr);
                        if (this.leftTank && this.rightTank) {
                            const {
                                gunpointAngle, power, closestToHit, x,
                            } = result;
                            this.rightTank.gunpointAngle = gunpointAngle;
                            this.rightTank.power = power;
                            this.rightTank.closestToHit = closestToHit;
                            this.rightTank.x = x;
                            this.tankAreaRedraw([this.leftTank, this.rightTank]);
                            this.botFire();
                        }
                        return 'GOOD';
                    }).catch((error) => {
                        console.log('Bot failed to aim in Worker', error);
                        console.log('Start aiming in sync');
                        this.botAiming();
                        if (this.leftTank && this.rightTank && this.rightTank.isReadyToFire) {
                            this.tankAreaRedraw([this.leftTank, this.rightTank]);
                            this.botFire();
                        }
                    });
                } else {
                    this.botAiming();
                    if (this.leftTank && this.rightTank && this.rightTank.isReadyToFire) {
                        this.tankAreaRedraw([this.leftTank, this.rightTank]);
                        this.botFire();
                    }
                }
            } else {
                this.activateMode(GameModes.IDLE);
            }
        }

        // Передвигаем снаряд
        this.moveBullet(this.ctx);
    };

    private tankAreaRedraw(tanks: Tank[]) {
        // перерисовываем только землю под танком
        this.redrawGroundUnderTanks(tanks);
        tanks.forEach((tank) => {
            // Рисуем танк
            if (this.ctx && this.ground) {
                tank.draw(this.ctx, this.mousePos, this.ground);
            }
        });
    }

    private explosionAreaRedraw(bullet: Bullet) {
        // Перерисовываем землю под взрывом +- padding
        const padding = 5;
        if (this.ctx && this.ground) {
            this.ctx.clearRect(bullet.x - bullet.explosionRadius - padding, 0,
                bullet.explosionRadius * 2 + padding * 2, this.innerHeight);
            this.ground.draw(this.ctx, bullet.x - bullet.explosionRadius - padding,
                bullet.x + bullet.explosionRadius * 2 + padding);
        }
    }

    private fullRedraw() {
        if (!this.ctx || !this.leftTank || !this.rightTank || !this.ground) {
            return;
        }
        // перерисовываем всю землю
        this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
        this.ground.draw(this.ctx);
        // Рисуем танки
        this.leftTank.draw(this.ctx, this.mousePos, this.ground);
        this.rightTank.draw(this.ctx, this.mousePos, this.ground);
    }

    private redrawGroundUnderTanks(tanks: Tank[]) {
        tanks.forEach((tank) => {
            // Перерисовываем землю под танками +- padding
            const padding = 50;
            if (this.ctx && this.ground) {
                this.ctx.clearRect(tank.x - padding, 0, tank.tankWidth + padding * 2, this.innerHeight);
                this.ground.draw(this.ctx, tank.x - padding, tank.x + tank.tankWidth + padding);
            }
        });
    }

    moveBullet = (ctx: CanvasRenderingContext2D) => {
        if (!this.isFireMode || !this.bullet) {
            return;
        }
        this.bullet.move();
        if (this.bullet.isHit(ctx)) {
            if (this.bullet.isTankHit && this.bullet.hittedTank) {
                this.bullet.hittedTank.jumpOnHit(this.bullet.power, this.bullet.gravity, this.bullet.dx);
                this.calcPoints();
            }
            this.bullet.drawExplosion(ctx);
        }

        if (!this.bullet.isFinished) {
            // Рисуем снаряд
            this.bullet?.draw(ctx);
            return;
        }
        this.bullet = undefined;
        this.changeActiveTank();
    };

    botFire = () => {
        console.log('fire');
        if (!this.leftTank || !this.rightTank || !this.ground) {
            return;
        }
        this.fire(this.rightTank, this.leftTank, this.ground, this.rightTank.weapons[0]);
        this.rightTank.isReadyToFire = false;
    };

    botAiming = () => {
        if (!this.leftTank || !this.rightTank || !this.ground) {
            return;
        }
        this.mousePos = null;
        const angleStep = 0.01;
        let startAngle = (3 * Math.PI) / 2;
        const startPower = 2;
        const [step, stopCondition] = this.leftTank.x < this.rightTank.x
            ? [-angleStep, (curAngle: number) => (curAngle > Math.PI)]
            : [angleStep, (curAngle: number) => (curAngle < 2 * Math.PI)];

        const isOverMissing = (hitX: number, tank: Tank) => {
            const isFireMissLeft = step < 0 && hitX < tank.x;
            const isFireMissRight = step > 0 && hitX > tank.x + tank.tankWidth;
            return isFireMissLeft || isFireMissRight;
        };

        // Пристреливаемся
        for (let curPower = startPower; curPower < 18; curPower += 1) {
            for (let currentAngle = startAngle; stopCondition(currentAngle); currentAngle += step) {
                this.rightTank.canHarmYourself = false;

                const { hitX, isTankHit } = this.virtualFire(currentAngle, curPower);

                if (isTankHit || isOverMissing(hitX, this.leftTank)) {
                    if (!isTankHit) {
                        if (!this.rightTank.closestToHit
                            || Math.abs(hitX - this.leftTank.x) < this.rightTank.closestToHit.minDiff
                        ) {
                            const count = this.rightTank.closestToHit?.count || 0;
                            this.rightTank.closestToHit = {
                                angle: currentAngle,
                                power: curPower,
                                minDiff: Math.abs(hitX - this.leftTank.x),
                                count,
                            };
                        }
                        // Перебор с силой - уменьшаем. И возвращаем угол на 2 шага назад
                        startAngle = currentAngle - 2 * step;
                        break;
                    }
                    // Добавляем случайности в выстрел, в зависимости от сложности игры
                    this.rightTank.gunpointAngle += Math.random()
                        * (this.maxGameDifficulty - this.gameDifficulty)
                        * (step / 10);
                    this.rightTank.isReadyToFire = true;
                    this.rightTank.canHarmYourself = true;
                    this.rightTank.closestToHit = null;
                    return;
                }
            }
        }
        // В случае, если не удалось попасть наверняка - стреляем лучшим вариантом
        if (this.rightTank.closestToHit) {
            this.rightTank.gunpointAngle = this.rightTank.closestToHit.angle;
            this.rightTank.power = this.rightTank.closestToHit.power;
            const delta = this.rightTank.x > this.innerWidth / 2 ? -10 : 10;
            this.rightTank.x += this.rightTank.closestToHit.count > 1 ? delta : 0;
            this.rightTank.closestToHit.count += 1;
        }
        this.rightTank.isReadyToFire = true;
        this.rightTank.canHarmYourself = true;
    };

    virtualFire(angle: number, power: number): { hitX: number, isTankHit: boolean } {
        if (!this.ctx || !this.leftTank || !this.rightTank || !this.ground) {
            return { hitX: 0, isTankHit: false };
        }
        this.rightTank.gunpointAngle = angle;
        this.rightTank.power = power;
        const virtualBullet = new Bullet(
            this.innerWidth,
            this.innerHeight,
            this.ground,
            this.rightTank,
            this.leftTank,
        );
        virtualBullet.move();
        while (!virtualBullet.isHit(this.ctx)) {
            virtualBullet.move();
        }
        return { hitX: virtualBullet.x, isTankHit: virtualBullet.isTankHit };
    }

    onFire = (weaponType: Weapon) => {
        if (!this.leftTank || !this.rightTank || !this.ground || !weaponType) {
            return;
        }
        this.fire(this.leftTank, this.rightTank, this.ground, weaponType);
    };

    fire = (activeTank: Tank, targetTank: Tank, ground: Ground, weaponType: Weapon) => {
        if (weaponType?.type) {
            this.activateMode(GameModes.FIRE);
            this.bullet = new (weaponType.type as typeof Bullet)(
                this.innerWidth,
                this.innerHeight,
                ground,
                activeTank,
                targetTank,
            );
            activeTank.fire(weaponType);
        }
    };

    activateMode(mode: string) {
        switch (mode) {
            case 'fire':
                this.isFireMode = true;
                this.isAngleMode = false;
                this.isMoveMode = false;
                break;
            case 'angle':
                if (!this.isFireMode) {
                    this.isAngleMode = true;
                    this.isMoveMode = false;
                }
                break;
            case 'move':
                if (!this.isFireMode) {
                    this.isMoveMode = true;
                    this.isAngleMode = false;
                }
                break;
            case 'idle':
            default:
                this.isFireMode = false;
                this.isAngleMode = false;
                this.isMoveMode = false;
        }
    }

    isIdleMode() {
        return !this.isFireMode && !this.isAngleMode && !this.isMoveMode;
    }
}

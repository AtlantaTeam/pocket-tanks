import { RefObject } from 'react';
import { Coords } from '../../../types/Coords';
import { Ground } from './Ground';
import { Tank } from './Tank';
import { Bullet } from './Bullet';

import '../../../../static/images/left-tank.svg';
import '../../../../static/images/right-tank.svg';
import '../../../../static/images/gunpoint.svg';
import '../../../../static/images/sand.jpg';

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

export class GamePlay {
    private ctx: CanvasRenderingContext2D | null | undefined;

    private canvasRef: RefObject<HTMLCanvasElement>;

    private images: { [p: string]: HTMLImageElement };

    private innerWidth: number;

    private innerHeight: number;

    mousePos: Coords | null;

    maxGameDifficulty = 5;

    gameDifficulty = 3; // 1 - легко; 5 - сложно

    private ground: Ground | undefined;

    leftTank: Tank | undefined;

    private rightTank: Tank | undefined;

    private bullet: Bullet | undefined;

    isFireMode = true;

    isAngleMode = false;

    isMoveMode = false;

    private lastAnimationTime: number;

    private isImagesLoaded = false;

    constructor(canvasRef: RefObject<HTMLCanvasElement>) {
        this.canvasRef = canvasRef; // React.createRef<HTMLCanvasElement>();
        this.images = {};
        const { width, height } = document.body.getBoundingClientRect();
        this.innerWidth = width;
        this.innerHeight = height < 700 ? 700 : height;
        this.mousePos = { x: 0, y: 0 };
        this.lastAnimationTime = 0;
    }

    onKeyDown = (e: KeyboardEvent) => {
        if ((e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') || !this.leftTank || !this.rightTank) {
            return;
        }
        e.preventDefault();
        this.activateMode(GameModes.MOVE);
        const [activeTank] = this.getActiveAndTargetTanks(this.leftTank, this.rightTank);
        const step = 5;
        if (e.key === 'ArrowRight') {
            activeTank.x = activeTank.x + activeTank.tankWidth + step < this.innerWidth
                ? activeTank.x + step
                : activeTank.x;
        } else {
            activeTank.x = activeTank.x - step > 0 ? activeTank.x - step : activeTank.x;
        }
    };

    changeTankPower = (delta: number) => {
        if (!this.leftTank || !this.rightTank) {
            return;
        }
        const [activeTank] = this.getActiveAndTargetTanks(this.leftTank, this.rightTank);
        activeTank.power = activeTank.power + delta > 0 && activeTank.power + delta <= 20
            ? activeTank.power + delta
            : activeTank.power;
        console.log('Tank Power:', activeTank.power);
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
            this.images = {
                ...this.images,
                [name]: img,
            };
        });
    };

    initPaint = () => {
        const { leftTank, leftGunpoint, sand } = this.images;
        this.ground = new Ground(this.innerWidth, this.innerHeight, sand);
        const leftTankX = Math.floor(this.innerWidth / 4);
        const leftTankY = this.innerHeight - this.ground.heights[leftTankX];
        this.leftTank = new Tank(leftTankX, leftTankY, this.innerWidth, this.innerHeight, leftTank, leftGunpoint, 0);
        this.leftTank.isActive = true;

        const rightTankX = Math.floor((this.innerWidth * 3) / 4);
        const rightTankY = this.innerHeight - this.ground.heights[rightTankX];
        const { rightTank, rightGunpoint } = this.images;
        this.rightTank = new Tank(
            rightTankX,
            rightTankY,
            this.innerWidth,
            this.innerHeight,
            rightTank,
            rightGunpoint, Math.PI,
        );

        const canvas = this.canvasRef.current;
        if (canvas) {
            canvas.width = this.innerWidth;
            canvas.height = this.innerHeight;
            this.ctx = canvas.getContext('2d');
            if (this.ctx) {
                this.ground.draw(this.ctx);
            }
            this.animate();
        }
    };

    getActiveAndTargetTanks = (tank1: Tank, tank2: Tank) => (tank1.isActive
        ? [tank1, tank2]
        : [tank2, tank1]);

    changeActiveTank = () => {
        if (this.leftTank && this.rightTank) {
            [this.leftTank.isActive, this.rightTank.isActive] = this.leftTank.isActive
                ? [false, true]
                : [true, false];
        }
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        if (!this.ctx || !this.leftTank || !this.rightTank || !this.ground || this.isIdleMode()) {
            return;
        }

        if ((this.isFireMode && (!this.bullet || this.bullet.explosionRadius)) || this.ground.isFalling) {
            this.fullRedraw();
        } else if (!this.bullet) {
            this.tankAreaRedraw([this.leftTank, this.rightTank]);
        }

        // Выходим из режима разворота дула
        this.isAngleMode = false;
        // Если выстрел, взрыв, осыпание земли завершены и танки не движутся,
        // то переходим в режим ожидания, т.е. прекращаем перерисовку
        if (this.isFireMode && !this.bullet && !this.ground.isFalling && !this.leftTank.dy && !this.rightTank.dy) {
            if (this.rightTank.isActive) {
                this.botAiming();
                if (this.rightTank.isReadyToFire) {
                    this.tankAreaRedraw([this.leftTank, this.rightTank]);
                    this.botFire();
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
            if (this.bullet.isTankHit) {
                this.bullet.targetTank.jumpOnHit(this.bullet.power, this.bullet.gravity, this.bullet.dx);
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
        this.fire(this.rightTank, this.leftTank, this.ground);
        this.rightTank.isReadyToFire = false;
    };

    botAiming = () => {
        if (!this.ctx || !this.leftTank || !this.rightTank || !this.ground) {
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

    private virtualFire(angle: number, power: number): { hitX: number, isTankHit: boolean } {
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

    onFire = () => {
        if (!this.leftTank || !this.rightTank || !this.ground) {
            return;
        }
        this.fire(this.leftTank, this.rightTank, this.ground);
    };

    fire = (activeTank: Tank, targetTank: Tank, ground: Ground) => {
        this.activateMode(GameModes.FIRE);
        this.bullet = new Bullet(
            this.innerWidth,
            this.innerHeight,
            ground,
            activeTank,
            targetTank,
        );
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

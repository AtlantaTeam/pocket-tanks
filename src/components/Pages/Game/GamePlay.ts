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

// TODO: пока определяю пустые, потом буду заполнять
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameProps {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameState {
}

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

    mousePos: Coords;

    private ground: Ground | undefined;

    private leftTank: Tank | undefined;

    private rightTank: Tank | undefined;

    private bullet: Bullet | undefined;

    isFireMode = true;

    isAngleMode = false;

    isMoveMode = false;

    private lastAnimationTime: number;

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
        e.preventDefault();
        if ((e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') || !this.leftTank || !this.rightTank) {
            return;
        }
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
        let assetCount = 0;
        allGameImages.forEach(({ name, fileName }) => {
            const img = new Image();
            img.onload = () => {
                assetCount += 1;
                if (assetCount === allGameImages.length) {
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
        // Рисуем землю
        if (this.isFireMode) {
            // Во время выстрела перерисовываем всю землю
            this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
            this.ground.draw(this.ctx);
        } else {
            // В остальное время только землю под танками +-40px
            this.ctx.clearRect(this.leftTank.x - 40, 0, this.leftTank.tankWidth + 40 * 2, this.innerHeight);
            this.ground.draw(this.ctx, this.leftTank.x - 40, this.leftTank.x + this.leftTank.tankWidth + 40);
            this.ctx.clearRect(this.rightTank.x - 40, 0, this.rightTank.tankWidth + 40 * 2, this.innerHeight);
            this.ground.draw(this.ctx, this.rightTank.x - 40, this.rightTank.x + this.rightTank.tankWidth + 40);
        }

        // Рисуем танки
        this.leftTank.draw(this.ctx, this.mousePos, this.ground);
        this.rightTank.draw(this.ctx, this.mousePos, this.ground);

        // Выходим из режима разворота дула
        this.isAngleMode = false;
        // Если выстрел, взрыв, осыпание земли завершены и танки не движутся,
        // то переходим в режим ожидания, т.е. прекращаем перерисовку
        if (this.isFireMode && !this.bullet && !this.ground.isFalling && !this.leftTank.dy && !this.rightTank.dy) {
            this.activateMode(GameModes.IDLE);
        }

        // Передвигаем снаряд
        this.moveBullet(this.ctx);
    };

    moveBullet = (ctx: CanvasRenderingContext2D) => {
        if (!this.isFireMode || !this.bullet) {
            return;
        }
        this.bullet.move();
        this.bullet.hit(ctx);

        if (!this.bullet.isFinished) {
            // Рисуем снаряд
            this.bullet?.draw(ctx);
            return;
        }
        this.bullet = undefined;
        this.changeActiveTank();
    };

    onFire = () => {
        if (!this.leftTank || !this.rightTank || !this.ground) {
            return;
        }
        const [activeTank, targetTank] = this.getActiveAndTargetTanks(this.leftTank, this.rightTank);
        const bulletPos = activeTank.calcBulletStartPos();
        this.activateMode(GameModes.FIRE);
        this.bullet = new Bullet(
            bulletPos.x,
            bulletPos.y,
            this.innerWidth,
            this.innerHeight,
            this.ground,
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

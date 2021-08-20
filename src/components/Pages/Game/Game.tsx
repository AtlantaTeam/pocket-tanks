import React, { Component, RefObject } from 'react';
import { Ground } from './Ground';
import { Bullet } from './Bullet';
import { Tank } from './Tank';
import { Coords } from '../../../types/Coords';

import '../../../../static/images/left-tank.svg';
import '../../../../static/images/left-gunpoint.svg';
import '../../../../static/images/right-tank.svg';
import '../../../../static/images/right-gunpoint.svg';

const allGameImages: Record<string, string>[] = [
    { name: 'leftTank', fileName: 'left-tank.svg' },
    { name: 'leftGunpoint', fileName: 'left-gunpoint.svg' },
    { name: 'rightTank', fileName: 'right-tank.svg' },
    { name: 'rightGunpoint', fileName: 'right-gunpoint.svg' },
];

// TODO: пока определяю пустые, потом буду заполнять
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameProps {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameState {
}

export class Game extends Component<GameProps, GameState> {
    private ctx: CanvasRenderingContext2D | null | undefined;

    private canvasRef: RefObject<HTMLCanvasElement>;

    private images: { [p: string]: HTMLImageElement };

    private innerWidth: number;

    private innerHeight: number;

    private mousePos: Coords;

    private ground: Ground;

    private leftTank: Tank | undefined;

    private rightTank: Tank | undefined;

    private bullet: Bullet | null;

    constructor(props: GameProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
        this.images = {};
        const { width, height } = document.body.getBoundingClientRect();
        this.innerWidth = width;
        this.innerHeight = height < 700 ? 700 : height;
        this.mousePos = { x: 0, y: 0 };
        this.bullet = null;
        this.ground = new Ground(this.innerWidth, this.innerHeight);
    }

    componentDidMount() {
        this.loadImages(allGameImages);
    }

    loadImages = (assets: Record<string, string>[]) => {
        let assetCount = 0;
        assets.forEach(({ name, fileName }) => {
            const img = new Image();
            img.onload = () => {
                assetCount += 1;
                if (assetCount === assets.length) {
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
        const { leftTank, leftGunpoint } = this.images;
        const leftTankX = Math.floor(this.innerWidth / 4);
        const leftTankY = this.innerHeight - this.ground.heights[leftTankX];
        this.leftTank = new Tank(leftTankX, leftTankY, leftTank, leftGunpoint, 0);
        this.leftTank.isActive = true;

        const rightTankX = Math.floor((this.innerWidth * 3) / 4);
        const rightTankY = this.innerHeight - this.ground.heights[rightTankX];
        const { rightTank, rightGunpoint } = this.images;
        this.rightTank = new Tank(rightTankX, rightTankY, rightTank, rightGunpoint, Math.PI);

        const canvas = this.canvasRef.current;
        if (canvas) {
            canvas.width = this.innerWidth;
            canvas.height = this.innerHeight;
            this.ctx = canvas.getContext('2d');

            canvas.addEventListener('mousemove', (e) => {
                this.mousePos = {
                    x: e.clientX - canvas.offsetLeft,
                    y: e.clientY - canvas.offsetTop,
                };
            });

            canvas.addEventListener('click', () => {
                if (this.leftTank && this.rightTank) {
                    const tank = this.leftTank.isActive ? this.leftTank : this.rightTank;
                    const bulletPos = tank.calcBulletStartPos();
                    this.bullet = new Bullet(
                        tank.gunpointAngle,
                        bulletPos.x,
                        bulletPos.y,
                        this.innerWidth,
                        this.innerHeight,
                        this.ground,
                    );
                }
            });

            this.animate();
        }
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        if (this.ctx && this.leftTank && this.rightTank) {
            this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
            // Рисуем землю
            this.ground.draw(this.ctx);
            // Рисуем танки
            this.leftTank.draw(this.ctx, this.mousePos, this.ground, this.innerHeight);
            this.rightTank.draw(this.ctx, this.mousePos, this.ground, this.innerHeight);

            // Передвигаем снаряд
            if (this.bullet) {
                this.bullet.move();
                this.bullet.hit(this.ctx);
                if (this.bullet.isFinished) {
                    this.bullet = null;
                    // по завершении взрыва меняем активный танк
                    [this.leftTank.isActive, this.rightTank.isActive] = this.leftTank.isActive
                        ? [false, true]
                        : [true, false];
                } else {
                    // Рисуем снаряд
                    this.bullet?.draw(this.ctx);
                }
            }
        }
    };

    render() {
        return (
            <canvas ref={this.canvasRef} height="1000" />
        );
    }
}

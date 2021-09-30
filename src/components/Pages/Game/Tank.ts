import { rotateFigureByAngle, rotateFigure, transformPoint } from 'utils/canvas';
import { Ground } from './Ground';
import { Coords, Weapon } from './types';
import { floor } from '../../../utils/canvas';

interface GroundUnderTankData {
    leftSideX: number,
    rightSideX: number,
    xBySortedHeights: { x: number, index: number }[],
    ground: Ground,
}

export class Tank {
    private gunpointDeltaX: number;

    private gunpointDeltaY: number;

    tankWidth: number;

    tankHeight: number;

    private gunpointWidth: number;

    private gunpointHeight: number;

    gunpointAngle: number;

    gunpointAngleMin = 0;

    gunpointAngleMax = 2 * Math.PI;

    private tankBodyImg: HTMLImageElement | undefined;

    private gunpointImg: HTMLImageElement | undefined;

    x: number;

    y: number;

    gunpointX: number;

    gunpointY: number;

    isActive = false;

    canHarmYourself = true;

    tankHitArea: Path2D;

    tankHitAreaCtx: CanvasRenderingContext2D | undefined;

    currentTransformer: DOMMatrix | undefined;

    innerWidth: number;

    innerHeight: number;

    dx = 0;

    dy = 0;

    power = 10;

    powerMin = 1;

    powerMax = 20;

    gravity = 0;

    isReadyToFire = true;

    closestToHit: { minDiff: number; angle: number; power: number, count: number } | null;

    weapons: Weapon[];

    constructor(
        x: number,
        y: number,
        innerWidth: number,
        innerHeight: number,
        gunpointAngle: number,
        weapons: Weapon[],
        tankBodyImg?: HTMLImageElement,
        gunpointImg?: HTMLImageElement,
    ) {
        this.gunpointDeltaX = 30;
        this.gunpointDeltaY = 23;
        this.tankWidth = 60;
        this.tankHeight = 30;
        this.gunpointWidth = 35;
        this.gunpointHeight = 5;
        this.gunpointAngle = gunpointAngle;
        this.tankHitArea = new Path2D();
        this.weapons = weapons;

        this.tankBodyImg = tankBodyImg;
        this.gunpointImg = gunpointImg;
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;

        this.x = x;
        this.y = y;
        this.gunpointX = this.x + this.gunpointDeltaX;
        this.gunpointY = this.y - this.gunpointDeltaY;
        this.closestToHit = null;
    }

    // Вычисляем координаты старта снаряда
    calcBulletStartPos() {
        return {
            x: this.gunpointX + this.gunpointWidth * Math.cos(this.gunpointAngle),
            y: this.gunpointY + this.gunpointWidth * Math.sin(this.gunpointAngle),
        };
    }

    fire = (weaponType: Weapon) => {
        this.weapons = this.weapons.filter((weapon) => weapon !== weaponType);
    };

    move = () => {
        const step = 2;
        const direction = this.dx > 0 ? 1 : -1;
        if (this.x + this.tankWidth + step < this.innerWidth && this.x - step > 0) {
            if (Math.abs(this.dx) > step) {
                this.x += direction * step;
            } else {
                this.x += direction * this.dx;
            }
            this.dx -= direction * step;
        } else {
            this.dx = 0;
        }
        this.gunpointX = this.x + this.gunpointDeltaX;
        this.gunpointY = this.y - this.gunpointDeltaY;
    };

    jump(highestYUnderTank: number) {
        // Столкновение с правой или левой стеной
        if (this.x + this.tankWidth > this.innerWidth || this.x < 0) {
            this.dx *= -1;
        }

        // Учитываем гравитацию при движении
        if (this.y < this.innerHeight) {
            this.dy += this.gravity;
        }

        // Завершаем полет если танк достиг земли
        if (this.y >= this.innerHeight - highestYUnderTank) {
            if (this.dy < 0) {
                this.y += this.dy;
            } else {
                this.dx = 0;
                this.dy = 0;
            }
        } else {
            this.x += this.dx;
            this.y += this.dy;
        }

        this.gunpointX = this.x + this.gunpointDeltaX;
        this.gunpointY = this.y - this.gunpointDeltaY;
    }

    jumpOnHit(hitPower: number, gravity: number, dx: number) {
        if (!this.dx && !this.dy) {
            this.gravity = gravity;
            // TODO: когда появится разное по мощности оружие, в зависимости от hitPower изменять dx и dy,
            // а пока сила отскока танка будет зависеть от силы выстрела
            this.dx = floor(dx / 5);
            this.dy = -Math.abs(floor(dx / 3));
        }
    }

    slopeTank(
        ctx: CanvasRenderingContext2D,
        {
            leftSideX,
            rightSideX,
            xBySortedHeights,
            ground,
        }: GroundUnderTankData,
    ) {
        const firstHighestX = xBySortedHeights[0].x;
        let secondHighestX = xBySortedHeights[10].x;

        // Определяем в какую сторону будет наклонятся танк, в зависимости от того,
        // где находится наивысшая точка относительно середины танка
        const slopeClockwise = firstHighestX < leftSideX + (rightSideX - leftSideX) / 2;
        const tankBeginX = slopeClockwise ? firstHighestX : leftSideX;
        const tankEndX = slopeClockwise ? rightSideX : firstHighestX;
        const restOfTankWidth = this.tankWidth / 4; // tankEndX - tankBeginX;
        let bestAngleToHorizon = slopeClockwise ? Math.PI : 0;

        for (let i = 0; i < xBySortedHeights.length; i++) {
            const current = xBySortedHeights[i];
            // Ищем вторую самую высокую точку опоры, при условии,
            // чтобы через две наивысшие точки можно было провести линию длиной restOfTankWidth
            // и она не утопала в земле
            const angleToHorizon = Math.atan2(this.innerHeight - ground.heights[current.x], current.x);
            if (tankBeginX < current.x
                && current.x < tankEndX
                && Math.abs(current.x - firstHighestX) > restOfTankWidth
                && (
                    (slopeClockwise && bestAngleToHorizon) > angleToHorizon
                    || (!slopeClockwise && bestAngleToHorizon < angleToHorizon)
                )
            ) {
                bestAngleToHorizon = Math.atan2(this.innerHeight - ground.heights[current.x], current.x);
                secondHighestX = current.x;

                const xDiff = Math.abs(firstHighestX - secondHighestX);
                const yDiff = Math.abs(ground.heights[firstHighestX] - ground.heights[secondHighestX]);
                const xyHypo = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                if (xyHypo > this.tankWidth) {
                    break;
                }
            }
        }

        const [x, y, rotationPointX, rotationPointY] = [
            slopeClockwise ? secondHighestX : firstHighestX,
            slopeClockwise
                ? this.innerHeight - ground.heights[secondHighestX]
                : this.innerHeight - ground.heights[firstHighestX],
            slopeClockwise ? firstHighestX : secondHighestX,
            slopeClockwise
                ? this.innerHeight - ground.heights[firstHighestX]
                : this.innerHeight - ground.heights[secondHighestX],
        ];
        const { transformer } = rotateFigure(ctx, x, y, rotationPointX, rotationPointY);
        this.currentTransformer = transformer;
        return { x: rotationPointX, y: rotationPointY };
    }

    private getGroundUnderTankData(ground: Ground) {
        const leftSideX = floor(this.x) + 10;
        const rightSideX = floor(this.x + this.tankWidth) - 15;
        const xBySortedHeights = [];

        for (let index = 0, xCur = leftSideX; xCur <= rightSideX; xCur++, index++) {
            xBySortedHeights.push({ x: xCur, index });
        }
        xBySortedHeights.sort((a, b) => (ground.heights[b.x] - ground.heights[a.x]));
        return {
            leftSideX,
            rightSideX,
            xBySortedHeights,
            highestPointUnderTank: {
                x: xBySortedHeights[0].x,
                y: ground.heights[xBySortedHeights[0].x],
            },
            ground,
        };
    }

    recalcPosition(ctx: CanvasRenderingContext2D, ground: Ground) {
        const { highestPointUnderTank, ...restGroundUnderTankParams } = this.getGroundUnderTankData(ground);
        if (this.dx && !this.dy) {
            // Если в танк движется и его dx не 0
            this.move();
        }
        if (this.dy) {
            // Если в танк попали и его dy не 0, то совершаем прыжок
            this.jump(highestPointUnderTank.y);
        } else {
            // Наклоняем танк в зависимости от земли под ним
            const { y } = this.slopeTank(ctx, restGroundUnderTankParams);
            this.y = y;
            if (this.currentTransformer) {
                const { x: newX, y: newY } = transformPoint({
                    x: this.x + this.gunpointDeltaX,
                    y: this.y - this.gunpointDeltaY,
                }, this.currentTransformer);
                this.gunpointX = floor(newX);
                this.gunpointY = floor(newY);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, mousePos: Coords | null, ground: Ground) {
        this.recalcPosition(ctx, ground);
        // Рисуем танк
        if (this.tankBodyImg) {
            ctx.drawImage(this.tankBodyImg, floor(this.x), floor(this.y - 30), this.tankWidth, this.tankHeight);
        }
        // Определяем зону поражения танка заново, на случай если он изменил расположение
        this.tankHitArea = new Path2D();
        this.tankHitArea.rect(floor(this.x), floor(this.y - 30), this.tankWidth, this.tankHeight);
        this.tankHitAreaCtx = ctx;
        ctx.restore();

        // Рисуем дуло
        if (mousePos && this.isActive) {
            // Вращаем дуло, если танк активный
            const { x, y } = mousePos;
            const { angle } = rotateFigure(ctx, floor(x), floor(y), this.gunpointX, this.gunpointY);
            this.gunpointAngle = angle;
        } else {
            // Восстанавливаем последний угол поворота
            rotateFigureByAngle(ctx, this.gunpointAngle, this.gunpointX, this.gunpointY);
        }
        if (this.gunpointImg) {
            ctx.drawImage(this.gunpointImg, this.gunpointX, this.gunpointY, this.gunpointWidth, this.gunpointHeight);
        }
        ctx.restore();
    }
}

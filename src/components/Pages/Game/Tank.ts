import { rotateFigureByAngle, rotateFigure, transformPoint } from 'utils/canvas';
import { Ground } from './Ground';
import { Coords } from '../../../types/Coords';

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

    private tankBodyImg: HTMLImageElement;

    private gunpointImg: HTMLImageElement;

    x: number;

    y: number;

    private gunpointX: number;

    private gunpointY: number;

    isActive = false;

    canHarmYourself = true;

    tankHitArea: Path2D;

    currentTransformer: DOMMatrix | undefined;

    innerWidth: number;

    innerHeight: number;

    private dx = 0;

    dy = 0;

    power = 10;

    private gravity = 0;

    constructor(
        x: number,
        y: number,
        innerWidth: number,
        innerHeight: number,
        tankBodyImg: HTMLImageElement,
        gunpointImg: HTMLImageElement,
        gunpointAngle: number,
    ) {
        this.gunpointDeltaX = 30;
        this.gunpointDeltaY = 23;
        this.tankWidth = 60;
        this.tankHeight = 30;
        this.gunpointWidth = 35;
        this.gunpointHeight = 5;
        this.gunpointAngle = gunpointAngle;
        this.tankHitArea = new Path2D();

        this.tankBodyImg = tankBodyImg;
        this.gunpointImg = gunpointImg;
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;

        this.x = x;
        this.y = y;
        this.gunpointX = this.x + this.gunpointDeltaX;
        this.gunpointY = this.y - this.gunpointDeltaY;
    }

    // Вычисляем координаты старта снаряда
    calcBulletStartPos() {
        return {
            x: this.gunpointX + this.gunpointWidth * Math.cos(this.gunpointAngle),
            y: this.gunpointY + this.gunpointWidth * Math.sin(this.gunpointAngle),
        };
    }

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
        this.gravity = gravity;
        // TODO: когда появится разное по мощности оружие, в зависимости от hitPower изменять dx и dy,
        // а пока сила отскока танка будет зависеть от силы выстрела
        this.dx = Math.floor(dx / 5);
        this.dy = -Math.abs(Math.floor(dx / 3));
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
        const leftSideX = Math.floor(this.x) + 10;
        const rightSideX = Math.floor(this.x + this.tankWidth) - 15;
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
        if (this.dx || this.dy) {
            // Если в танк попали и его dx и dy не 0, то совершаем прыжок
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
                this.gunpointX = Math.floor(newX);
                this.gunpointY = Math.floor(newY);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, mousePos: Coords, ground: Ground) {
        this.recalcPosition(ctx, ground);
        // Рисуем танк
        ctx.drawImage(this.tankBodyImg, Math.floor(this.x), Math.floor(this.y - 30), this.tankWidth, this.tankHeight);
        // Определяем зону поражения танка заново, на случай если он изменил расположение
        this.tankHitArea = new Path2D();
        this.tankHitArea.rect(Math.floor(this.x), Math.floor(this.y - 30), this.tankWidth, this.tankHeight);
        ctx.restore();

        // Рисуем дуло
        if (mousePos && this.isActive) {
            // Вращаем дуло, если танк активный
            const { x, y } = mousePos;
            const { angle } = rotateFigure(ctx, Math.floor(x), Math.floor(y), this.gunpointX, this.gunpointY);
            this.gunpointAngle = angle;
        } else {
            // Восстанавливаем последний угол поворота
            rotateFigureByAngle(ctx, this.gunpointAngle, this.gunpointX, this.gunpointY);
        }
        ctx.drawImage(this.gunpointImg, this.gunpointX, this.gunpointY, this.gunpointWidth, this.gunpointHeight);
        ctx.restore();
    }
}

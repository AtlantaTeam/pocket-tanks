import { rotateFigureByAngle, rotateFigure, transformPoint } from 'utils/canvas';
import { Ground } from './Ground';
import { Coords } from '../../../types/Coords';

export class Tank {
    private gunpointDeltaX: number;

    private gunpointDeltaY: number;

    private tankWidth: number;

    private tankHeight: number;

    private gunpointWidth: number;

    private gunpointHeight: number;

    gunpointAngle: number;

    private tankBodyImg: HTMLImageElement;

    private gunpointImg: HTMLImageElement;

    private x: number;

    private y: number;

    private gunpointX: number;

    private gunpointY: number;

    isActive = false;

    constructor(
        x: number,
        y: number,
        tankBodyImg: HTMLImageElement,
        gunpointImg: HTMLImageElement,
        gunpointAngle: number,
    ) {
        this.gunpointDeltaX = 30;
        this.gunpointDeltaY = 24;
        this.tankWidth = 60;
        this.tankHeight = 30;
        this.gunpointWidth = 35;
        this.gunpointHeight = 5;
        this.gunpointAngle = gunpointAngle;

        this.tankBodyImg = tankBodyImg;
        this.gunpointImg = gunpointImg;

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

    slopeTank(ctx: CanvasRenderingContext2D, ground: Ground, innerHeight: number) {
        const leftSideX = Math.floor(this.x) + 10;
        const rightSideX = Math.floor(this.x + this.tankWidth) - 15;
        const xBySortedHeights = [];

        for (let index = 0, xCur = leftSideX; xCur <= rightSideX; xCur++, index++) {
            xBySortedHeights.push({ x: xCur, index });
        }
        xBySortedHeights.sort((a, b) => (ground.heights[b.x] - ground.heights[a.x]));
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
            const angleToHorizon = Math.atan2(innerHeight - ground.heights[current.x], current.x);
            if (tankBeginX < current.x
                && current.x < tankEndX
                && Math.abs(current.x - firstHighestX) > restOfTankWidth
                && (
                    (slopeClockwise && bestAngleToHorizon) > angleToHorizon
                    || (!slopeClockwise && bestAngleToHorizon < angleToHorizon)
                )
            ) {
                bestAngleToHorizon = Math.atan2(innerHeight - ground.heights[current.x], current.x);
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
            slopeClockwise ? innerHeight - ground.heights[secondHighestX] : innerHeight - ground.heights[firstHighestX],
            slopeClockwise ? firstHighestX : secondHighestX,
            slopeClockwise ? innerHeight - ground.heights[firstHighestX] : innerHeight - ground.heights[secondHighestX],
        ];
        const { transformer } = rotateFigure(ctx, x, y, rotationPointX, rotationPointY);

        return { x: rotationPointX, y: rotationPointY, transformer };
    }

    recalcPosition(ctx: CanvasRenderingContext2D, ground: Ground, innerHeight: number) {
        const { y, transformer } = this.slopeTank(ctx, ground, innerHeight);
        this.y = y;
        const { x: newX, y: newY } = transformPoint({
            x: this.x + this.gunpointDeltaX,
            y: this.y - this.gunpointDeltaY,
        }, transformer);
        this.gunpointX = newX;
        this.gunpointY = newY;
    }

    draw(ctx: CanvasRenderingContext2D, mousePos: Coords, ground: Ground, innerHeight: number) {
        this.recalcPosition(ctx, ground, innerHeight);
        // Рисуем танк
        ctx.drawImage(this.tankBodyImg, this.x, this.y - 30, this.tankWidth, this.tankHeight);
        ctx.restore();

        // Рисуем дуло
        if (mousePos && this.isActive) {
            // Вращаем дуло, если танк активный
            const { x, y } = mousePos;
            const { angle } = rotateFigure(ctx, x, y, this.gunpointX, this.gunpointY);
            this.gunpointAngle = angle;
        } else {
            // Восстанавливаем последний угол поворота
            rotateFigureByAngle(ctx, this.gunpointAngle, this.gunpointX, this.gunpointY);
        }
        ctx.drawImage(this.gunpointImg, this.gunpointX, this.gunpointY, this.gunpointWidth, this.gunpointHeight);
        ctx.restore();
    }
}

import { Coords } from '../components/Pages/Game/types';

// eslint-disable-next-line no-bitwise
export const floor = (num: number) => (num | 0);

export const rotateFigureByAngle = (
    ctx: CanvasRenderingContext2D,
    angle: number,
    rotationPointX: number,
    rotationPointY: number,
) => {
    // Сохраняем контекст, чтобы вращался только объект, а не весь канвас
    ctx.save();

    // Перемещаем ось вращения в заданную точку
    ctx.translate(rotationPointX, rotationPointY);
    ctx.rotate(angle);
    ctx.translate(-rotationPointX, -rotationPointY);
};

export const rotateFigure = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rotationPointX: number,
    rotationPointY: number,
) => {
    // Сохраняем контекст, чтобы вращалось только дуло/танк, а не весь канвас
    ctx.save();
    // Вычисляем угол между осью X и координатами
    const angle = Math.atan2(y - rotationPointY, x - rotationPointX);
    rotateFigureByAngle(ctx, angle, rotationPointX, rotationPointY);

    return { angle, transformer: ctx.getTransform() };
};

// Определяем новые координаты точки после трансформации (разворота или переноса точки отсчета)
export const transformPoint = (point: Coords, matrix: DOMMatrix) => ({
    x: floor(matrix.a * point.x + matrix.c * point.y + matrix.e),
    y: floor(matrix.b * point.x + matrix.d * point.y + matrix.f),
});

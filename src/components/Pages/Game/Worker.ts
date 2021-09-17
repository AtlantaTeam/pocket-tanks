import { expose } from 'comlink';
import { Bullet } from './Bullet';
import { Tank } from './Tank';
import { Ground } from './Ground';
import { floor } from '../../../utils/canvas';

const virtualFire = (
    ctx: OffscreenCanvasRenderingContext2D,
    leftTank: Tank,
    rightTank: Tank,
    ground: Ground,
    innerWidth: number,
    innerHeight: number,
): { hitX: number, isTankHit: boolean } => {
    if (!ctx || !leftTank || !rightTank || !ground) {
        return { hitX: 0, isTankHit: false };
    }

    const virtualBullet = new Bullet(
        innerWidth,
        innerHeight,
        ground,
        rightTank,
        leftTank,
    );
    virtualBullet.move();
    while (!virtualBullet.isHit(ctx)) {
        virtualBullet.move();
    }
    return { hitX: virtualBullet.x, isTankHit: virtualBullet.isTankHit };
};

const botAimingAsync = (
    leftTankParamsStr: string,
    rightTankParamsStr: string,
    groundParamsStr: string,
    innerWidth: number,
    innerHeight: number,
    maxGameDifficulty: number,
    gameDifficulty: number,
): string => {
    const leftTankObj = JSON.parse(leftTankParamsStr);
    const rightTankObj = JSON.parse(rightTankParamsStr);
    const groundObj = JSON.parse(groundParamsStr);
    const canvas = new OffscreenCanvas(innerWidth, innerHeight);
    const ctx = canvas.getContext('2d');
    const ground = Object.assign(new Ground(innerWidth, innerHeight), groundObj);
    const leftTank = Object.assign(new Tank(
        0,
        0,
        innerWidth,
        innerHeight,
        0,
        [],
    ), leftTankObj) as Tank;
    const rightTank = Object.assign(new Tank(
        0,
        0,
        innerWidth,
        innerHeight,
        0,
        [],
    ), rightTankObj) as Tank;
    if (!ctx || !leftTank || !rightTank) {
        throw new Error('Failed to create objects!');
    }
    leftTank.tankHitArea = new Path2D();
    leftTank.tankHitArea.rect(floor(leftTank.x), floor(leftTank.y - 30), leftTank.tankWidth, leftTank.tankHeight);
    rightTank.tankHitArea = new Path2D();
    rightTank.tankHitArea.rect(floor(rightTank.x), floor(rightTank.y - 30), rightTank.tankWidth, rightTank.tankHeight);

    const angleStep = 0.01;
    let startAngle = (3 * Math.PI) / 2;
    const startPower = 2;
    const [step, stopCondition] = leftTank.x < rightTank.x
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
            rightTank.canHarmYourself = false;
            rightTank.gunpointAngle = currentAngle;
            rightTank.power = curPower;
            const { hitX, isTankHit } = virtualFire(
                ctx,
                leftTank,
                rightTank,
                ground,
                innerWidth,
                innerHeight,
            );

            if (isTankHit || isOverMissing(hitX, leftTank)) {
                if (!isTankHit) {
                    if (!rightTank.closestToHit || Math.abs(hitX - leftTank.x) < rightTank.closestToHit.minDiff) {
                        const count = rightTank.closestToHit ? rightTank.closestToHit.count : 0;
                        rightTank.closestToHit = {
                            angle: currentAngle,
                            power: curPower,
                            minDiff: Math.abs(hitX - leftTank.x),
                            count,
                        };
                    }
                    // Перебор с силой - уменьшаем. И возвращаем угол на 2 шага назад
                    startAngle = currentAngle - 2 * step;
                    break;
                }
                // Добавляем случайности в выстрел, в зависимости от сложности игры
                rightTank.gunpointAngle += Math.random()
                    * (maxGameDifficulty - gameDifficulty)
                    * (step / 10);
                rightTank.isReadyToFire = true;
                rightTank.canHarmYourself = true;
                rightTank.closestToHit = null;
                return JSON.stringify(rightTank);
            }
        }
    }
    // В случае, если не удалось попасть наверняка - стреляем лучшим вариантом
    if (rightTank.closestToHit) {
        rightTank.gunpointAngle = rightTank.closestToHit.angle;
        rightTank.power = rightTank.closestToHit.power;
        const delta = rightTank.x > innerWidth / 2 ? -10 : 10;
        rightTank.x += rightTank.closestToHit.count > 1 ? delta : 0;
        rightTank.closestToHit.count += 1;
    }
    rightTank.isReadyToFire = true;
    rightTank.canHarmYourself = true;
    return JSON.stringify(rightTank);
};

const worker = {
    botAimingAsync,
};

export type BotAimingAsyncWorker = typeof worker;

expose(worker);

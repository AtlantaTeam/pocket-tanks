import { Ground } from './Ground';
import { Tank } from './Tank';
import { floor } from '../../../utils/canvas';

export class Bullet {
    static readonly label = 'Ядро';

    radius: number;

    private mass: number;

    x: number;

    lastX = 0;

    y: number;

    lastY = 0;

    power: number;

    dx: number;

    private dy: number;

    gravity: number;

    elasticity: number;

    private wind: number;

    explosionRadius: number;

    private explosionMaxRadius: number;

    private color: string;

    innerWidth: number;

    innerHeight: number;

    isFinished = false;

    isTankHit = false;

    private ground: Ground;

    targetTank: Tank;

    private activeTank: Tank;

    hittedTank: Tank | undefined;

    constructor(
        innerWidth: number,
        innerHeight: number,
        ground: Ground,
        activeTank: Tank,
        targetTank: Tank,
    ) {
        this.activeTank = activeTank;
        this.targetTank = targetTank;
        this.radius = 2;
        this.mass = this.radius;
        const { x, y } = activeTank.calcBulletStartPos();
        this.x = x;
        this.y = y;
        this.power = activeTank.power;
        this.dx = floor(Math.cos(activeTank.gunpointAngle) * this.power);
        this.dy = floor(Math.sin(activeTank.gunpointAngle) * this.power);
        this.gravity = 0.1;
        this.elasticity = 1;
        this.wind = 0;
        this.explosionRadius = 0;
        this.explosionMaxRadius = 50;
        this.color = '#000000';
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.ground = ground;
    }

    move() {
        // Учитываем гравитацию при движения снаряда
        if (this.y + this.radius < this.innerHeight) {
            this.dy += this.gravity;
        }

        // Учитываем сопротивление ветра
        this.dx -= (this.dx * this.wind);

        this.x = floor(this.x + this.dx);
        this.y = floor(this.y + this.dy);
    }

    isHit = (ctx: CanvasRenderingContext2D) => {
        if (this.isTankHit) {
            return true;
        }

        // Проверим попадание в танк противника
        this.checkTankHit(ctx, this.targetTank);

        // Проверим попадание в себя
        if (this.activeTank.canHarmYourself) {
            this.checkTankHit(ctx, this.activeTank);
        }

        if (!this.isTankHit) {
            // Удар о стены или пол
            if (this.x + this.radius > this.innerWidth
                    || this.x - this.radius < 0
                    || this.y + this.radius > this.innerHeight
                    || this.y - this.radius < 0) {
                // elasticity - коэффициент потери силы при столкновении о стену
                this.dy *= this.elasticity;

                // Удар о правую стену
                if (this.x + this.radius > this.innerWidth) {
                    this.x = this.innerWidth - this.radius;
                    this.dx *= -1;
                } else if (this.x - this.radius < 0) {
                    // Удар о левую стену
                    this.x = this.radius;
                    this.dx *= -1;
                } else if (this.y > this.innerHeight) {
                    return true;
                }
            }

            // Удар о землю
            if (this.innerHeight - this.y - this.radius <= this.ground.heights[floor(this.x)]) {
                return true;
            }
        } else {
            return true;
        }

        return false;
    };

    checkTankHit = (ctx: CanvasRenderingContext2D, tank: Tank) => {
        ctx.save();
        ctx.setTransform(tank.currentTransformer);
        if (ctx.isPointInPath(tank.tankHitArea, this.x, this.y)) {
            this.isTankHit = true;
            this.hittedTank = tank;
            console.log('HIT!!!');
        }
        ctx.restore();
    };

    drawExplosion = (ctx: CanvasRenderingContext2D) => {
        this.dx = 0;
        this.dy = 0;
        this.radius = 0;

        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.explosionRadius / 10,
            this.x, this.y, this.explosionRadius + this.explosionRadius / 2,
        );

        gradient.addColorStop(0, '#f37575ff');
        gradient.addColorStop(0.3, '#ff0000ee');
        gradient.addColorStop(1, '#571a1a55');

        // Заполнить взрыв градиентом
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        this.explosionRadius += 1;
        if (this.explosionRadius >= this.explosionMaxRadius) {
            // Создаем провал земли в пределах взрыва
            this.ground.fall(floor(this.x), floor(this.y), this.explosionRadius);
            // Удаляем снаряд после взрыва
            this.isFinished = true;
            this.explosionRadius = 0;
        }

        return true;
    };

    isPositionChanged() {
        return this.lastX !== this.x || this.lastY !== this.y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.isPositionChanged()) {
            ctx.clearRect(
                this.lastX,
                this.lastY,
                this.radius * 2,
                this.radius * 2,
            );

            if (ctx.fillStyle !== this.color) {
                ctx.fillStyle = this.color;
            }
            ctx.fillRect(this.x, this.y, this.radius * 2, this.radius * 2);
            this.lastX = this.x;
            this.lastY = this.y;
        }
    }
}

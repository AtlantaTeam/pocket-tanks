import { Ground } from './Ground';
import { Tank } from './Tank';

export class Bullet {
    private radius: number;

    private mass: number;

    private x: number;

    private y: number;

    power: number;

    private dx: number;

    private dy: number;

    gravity: number;

    elasticity: number;

    private wind: number;

    private explosionRadius: number;

    private explosionMaxRadius: number;

    private color: string;

    innerWidth: number;

    innerHeight: number;

    isFinished = false;

    isTankHit = false;

    private ground: Ground;

    private targetTank: Tank;

    private activeTank: Tank;

    constructor(
        x: number,
        y: number,
        innerWidth: number,
        innerHeight: number,
        ground: Ground,
        activeTank: Tank,
        targetTank: Tank,
    ) {
        this.activeTank = activeTank;
        this.targetTank = targetTank;
        this.radius = 3;
        this.mass = this.radius;
        this.x = x;
        this.y = y;
        this.power = activeTank.power;
        this.dx = Math.floor(Math.cos(activeTank.gunpointAngle) * this.power);
        this.dy = Math.floor(Math.sin(activeTank.gunpointAngle) * this.power);
        this.gravity = 0.1;
        this.elasticity = 1;
        this.wind = 0;
        this.explosionRadius = 0;
        this.explosionMaxRadius = 50;
        this.color = 'black';
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

        this.x += this.dx;
        this.y += this.dy;
    }

    hit = (ctx: CanvasRenderingContext2D) => {
        if (this.isTankHit) {
            this.explosion(ctx);
        } else {
            // Попадание в танк противника
            this.checkTankHit(ctx, this.targetTank);
            // Попали в себя
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
                        this.explosion(ctx);
                    }
                }

                // Удар о землю
                if (this.innerHeight - this.y - this.radius <= this.ground.heights[Math.floor(this.x)]) {
                    this.explosion(ctx);
                }
            }
        }
    };

    checkTankHit = (ctx: CanvasRenderingContext2D, tank: Tank) => {
        ctx.save();
        ctx.setTransform(tank.currentTransformer);
        if (ctx.isPointInPath(tank.tankHitArea, this.x, this.y)) {
            ctx.restore();
            this.isTankHit = true;
            tank.jumpOnHit(this.power, this.gravity, this.dx);
            this.explosion(ctx);
            console.log('HIT!!!');
        } else {
            ctx.restore();
        }
    };

    explosion = (ctx: CanvasRenderingContext2D) => {
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
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
        this.explosionRadius += 1;
        if (this.explosionRadius >= this.explosionMaxRadius) {
            // Создаем провал земли в пределах взрыва
            this.ground.fall(Math.floor(this.x), Math.floor(this.y), this.explosionRadius);
            // Удаляем снаряд после взрыва
            this.isFinished = true;
            this.explosionRadius = 0;
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

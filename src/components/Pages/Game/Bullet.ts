import { Ground } from './Ground';

export class Bullet {
    private radius: number;

    private mass: number;

    private x: number;

    private y: number;

    private power: number;

    private dx: number;

    private dy: number;

    private gravity: number;

    private elasticity: number;

    private wind: number;

    private explosionRadius: number;

    private explosionMaxRadius: number;

    private explosionColor: string;

    private color: string;

    private innerWidth: number;

    private innerHeight: number;

    isFinished = false;

    private ground: Ground;

    constructor(angle: number, x: number, y: number, innerWidth: number, innerHeight: number, ground: Ground) {
        this.radius = 3;
        this.mass = this.radius;
        this.x = x;
        this.y = y;
        this.power = 12;
        this.dx = Math.cos(angle) * this.power;
        this.dy = Math.sin(angle) * this.power;
        this.gravity = 0.1;
        this.elasticity = 1;
        this.wind = 0;
        this.explosionRadius = 0;
        this.explosionMaxRadius = 50;
        this.explosionColor = 'red';
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
    };

    explosion = (ctx: CanvasRenderingContext2D) => {
        this.dx = 0;
        this.dy = 0;
        this.radius = 0;

        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.explosionRadius / 3,
            this.x, this.y, this.explosionRadius + this.explosionRadius / 2,
        );
        gradient.addColorStop(0, this.explosionColor);
        gradient.addColorStop(1, 'white');

        // Заполнить взрыв градиентом
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        this.explosionRadius += 1;
        if (this.explosionRadius >= this.explosionMaxRadius) {
            // Создаем провал земли в пределах взрыва
            this.ground.fall(Math.floor(this.x), Math.floor(this.y), this.explosionRadius);
            // Удаляем снаряд после взрыва
            this.isFinished = true;
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

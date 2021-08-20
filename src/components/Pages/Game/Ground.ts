interface Explosion {
    bulletY: number,
    delta: number,
}

export class Ground {
    private stepMax: number;

    private stepChange: number;

    private heightMax: number;

    private color: string;

    heights: number[];

    private explosionHeights: number[] | Explosion[];

    private innerWidth: number;

    private innerHeight: number;

    constructor(innerWidth: number, innerHeight: number) {
        this.stepMax = 3;
        this.stepChange = 0.3;
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.heightMax = Math.floor((innerHeight * 2) / 3);
        this.color = 'orange';

        this.heights = [];
        this.explosionHeights = [];
        this.generate();
    }

    generate = () => {
        // Случайно генерим начальные условия для создания земли
        let height = Math.random() * this.heightMax;
        let slope = (Math.random() * this.stepMax) * 2 - this.stepMax;

        for (let x = 0; x < this.innerWidth; x++) {
            // меняем наклон
            height += slope;
            slope += (Math.random() * this.stepChange) * 2 - this.stepChange;

            // держим наклон и высоту в пределах максимума
            slope = slope > this.stepMax ? this.stepMax : slope;
            slope = slope < -this.stepMax ? -this.stepMax : slope;

            // если достигли максимума высоты - меняем направление
            if (height > this.heightMax) {
                height = this.heightMax;
                slope *= -1;
            }
            if (height < 0) {
                height = 0;
                slope *= -1;
            }
            this.heights[x] = Math.floor(height);
            this.explosionHeights[x] = 0;
        }
    };

    fall = (x: number, y: number, radius: number) => {
        // Вычисляем длины вертикальных линий, входящие в круг взрыва
        // Крайние будут высотой 2px
        this.explosionHeights[x - radius] = {
            bulletY: y,
            delta: 2,
        };
        this.explosionHeights[x + radius] = this.explosionHeights[x - radius];
        // Остальные определяем по теореме Пифагора
        for (let i = 1; i <= radius; i++) {
            const katetNear = radius - i;
            const katetOpposite = Math.floor(Math.sqrt(radius * radius - katetNear * katetNear));
            this.explosionHeights[x - radius + i] = {
                bulletY: y,
                delta: katetOpposite * 2,
            };
            this.explosionHeights[x + radius - i] = {
                bulletY: y,
                delta: katetOpposite * 2,
            };
        }
    };

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = this.color;
        ctx.translate(0, this.innerHeight);
        for (let x = 0; x < this.innerWidth; x++) {
            ctx.beginPath();
            if (typeof this.explosionHeights[x] === 'object') {
                const { bulletY, delta } = <Explosion> this.explosionHeights[x];
                const bottomY = this.innerHeight - bulletY - delta / 2;
                if (delta) {
                    const h = -this.heights[x] + delta / 2;
                    ctx.moveTo(x, -this.heights[x]);
                    ctx.lineTo(x, (h < 0 ? h : 0));
                    if (this.heights[x] > bottomY && bottomY > 0) {
                        this.heights[x] -= 1;
                    }
                    this.explosionHeights[x] = {
                        bulletY,
                        delta: delta - 1,
                    };
                } else {
                    this.explosionHeights[x] = 0;
                }
                const h = -this.heights[x] + delta / 2;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, (h < 0 ? h : 0));
            } else {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, -this.heights[x]);
            }

            ctx.stroke();
        }
        ctx.translate(0, -this.innerHeight);
    };
}

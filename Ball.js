const INITIAL_VELOCITY = 0.025
const INCREASE_VELOCITY = 0.000001;
class Ball{
    constructor(ballElem){
        this.ballElem = ballElem;
        this.reset()
    }

    get x()
    {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(val)
    {
        this.ballElem.style.setProperty("--x", val)
    }

    get y()
    {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(val)
    {
        this.ballElem.style.setProperty("--y", val)
    }

    rect()
    {
        return this.ballElem.getBoundingClientRect();
    }

    reset()
    {
        this.x = 50;
        this.y = 50;
        this.direction = {x: 0}
        while(Math.abs(this.direction.x <= 0.2) || Math.abs(this.direction.x >= 0.9))
        {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.veloctiy = INITIAL_VELOCITY; 
    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.veloctiy * delta
        this.y += this.direction.y * this.veloctiy * delta
        this.veloctiy += INCREASE_VELOCITY * delta
        const rect = this.rect();

        if( rect.bottom >= window.innerHeight || rect.top <= 0)
        {
            this.direction.y *= -1;
        }

        if( paddleRects.some(r => isCollision(r, rect)))
        {
            this.direction.x *= -1
        }
    }
}

function randomNumberBetween(min, max)
{
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2)
{
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}

export default Ball;
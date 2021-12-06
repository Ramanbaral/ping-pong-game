const SPEED = 0.02
class Paddle
{
    constructor(paddleElem)
    {
        this.paddleElem = paddleElem
        this.reset()
    }

    get position()
    {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }

    set position(val)
    {
        this.paddleElem.style.setProperty("--position", val)
    }

    rect()
    {
        return this.paddleElem.getBoundingClientRect()
    }

    reset()
    {
        this.position = 50 
    }

    update(delta,  ballHeight)
    {
        this.position += SPEED * delta * (ballHeight - this.position);
    }
}

export default Paddle;
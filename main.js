import Ball from "./Ball.js";
import Paddle from "./paddle.js"

let ball = new Ball(document.getElementById("ball"))
let playerPaddle = new Paddle(document.getElementById("player-paddle"))
let computerPaddle = new Paddle(document.getElementById("computer-paddle"))
let playerScore = document.getElementById("player-score")
let computerScore = document.getElementById("computer-score")



let lastTime;
function update(time)
{
    if(lastTime != null)
    {
        let delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        let hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if(isLose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(update)

}

function isLose()
{
    let rect = ball.rect()    
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose()
{
    const rect = ball.rect()
    if(rect.right >= window.innerWidth)
    {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }
    else
    {
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)
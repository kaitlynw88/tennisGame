const app= {}

let canvas
let canvasContext
let ballX = 50
let ballY = 50
let ballSpeedX = 10
let ballSpeedY = 4

let paddleY = 250
let paddleX = 0
const paddleHeight = 100;



document.addEventListener('keydown', recordKey);

function recordKey(e){
    // let rect = canvas.getBoundingClientRect()
    // let root = document.documentElement;
    keydown = e.key 
    console.log(keydown)
    if(keydown === "w" && paddleY > 0){
        paddleY = paddleY - 15
        console.log(paddleY)
    }
    if (keydown === "s" && paddleY < (600 - paddleHeight)) {
        paddleY = paddleY + 15
        console.log(paddleY)
    }
    if (keydown === "a" && paddleX > 0) {
        paddleX = paddleX - 15
        console.log(paddleY)
    }
    if (keydown === "d") {
        paddleX = paddleX + 10
        console.log(paddleX)
    }
}

app.game = function(){
    canvas = document.getElementById("gameCanvas")
    canvasContext = canvas.getContext("2d")
    let framesPerSecond = 30
    setInterval(function(){
        app.moveEverything()
        app.drawEverything()
    }, 1000/framesPerSecond
    )

}

app.moveEverything = function(){
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX > canvas.width || ballX < 0 || ballX === paddleX){
        ballSpeedX = -ballSpeedX
    }
    if(ballY < 0 || ballY > canvas.height || ballY === paddleY){
        ballSpeedY = - ballSpeedY
    }
}

app.colorCircle = function(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill()
}

app.drawEverything = function(){
    // fill the canvas with Blackness
    app.colorRect(0, 0, canvas.width, canvas.height, "black")
    // this is the left paddle
    app.colorRect(paddleX, paddleY, 10, 100, "white")
    // this is the ball 
    app.colorCircle(ballX, ballY, 10, "white")
}
app.colorRect = function(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}

app.init = function(){
    app.game()
}

app.init()

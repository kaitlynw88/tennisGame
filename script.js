const app= {}

let canvas
let canvasContext
let ballX = 50
let ballY = 50
let ballSpeedX = 10
let ballSpeedY = 4

let player1Score = 0
let player2Score = 0

const winningScore = 10

let showWin = false

let paddleY = 250
let paddleX = 0
let paddle2Y = 250

const paddleThickness = 15
const paddleHeight = 100;

app.recordKey = function(e) {
    keydown = e.key
    console.log("keydown")
    if (keydown === "w" && paddleY > 0) {
        paddleY -= 35
    }
    if (keydown === "s" && paddleY < (600 - paddleHeight)) {
        paddleY += 35
    }
}

app.handleClick = function(){
    if(showWin){
        player1Score = 0
        player2Score = 0
        showWin = false
    }
    app.ballReset()
}

app.computerMovement = function(){
    let paddle2YCenter = paddle2Y + (paddleHeight / 2)
    if (paddle2YCenter < ballY - 20 && paddle2Y + paddleHeight < canvas.height){
        paddle2Y += 6
    } else if (paddle2YCenter > ballY + 20 && paddle2Y > 0) {
        paddle2Y -= 6
    }
}

app.ballReset = function(){
    if (player1Score >= winningScore || player2Score >= winningScore){
        showWin = true
    }else{
        ballSpeedX = -ballSpeedX
        ballX = canvas.width / 2
        ballY = canvas.height / 2
}
}
app.game = function(){
    canvas = document.getElementById("gameCanvas")
    canvas.addEventListener("mousedown", app.handleClick)
    canvasContext = canvas.getContext("2d")
    let framesPerSecond = 30
    setInterval(function(){
        app.moveEverything()
        app.drawEverything()
    }, 1000/framesPerSecond
    )

}

app.moveEverything = function(){
    if(showWin){
        return
    }
    app.computerMovement()
    document.addEventListener('keydown', app.recordKey);
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0){
        if(ballY > paddleY && ballY < paddleY + paddleHeight){
            ballSpeedX = -ballSpeedX
            let deltaY = ballY - (paddleY + paddleHeight / 2)
            ballSpeedY = deltaY * 0.35
        }else{
            player2Score++
            app.ballReset()
        }
    }
    if(ballX > canvas.width){
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX
            let deltaY = ballY - (paddle2Y + paddleHeight / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            player1Score++
            app.ballReset()
        }
    }

    if(ballY < 0){
        ballSpeedY = -ballSpeedY
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY
    }
}

app.colorCircle = function(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill()
}

app.drawNet = function(){
    for(let i =0; i<canvas.height; i += 40){
        app.colorRect(canvas.width/2 - 1,i, 2, 20, "white")
    }
}

app.drawEverything = function(){
    // fill the canvas with Blackness
    app.colorRect(0, 0, canvas.width, canvas.height, "black")
    if(showWin){
        canvasContext.fillStyle = "white"
        if(player1Score >= winningScore){
            canvasContext.fillText("Left Player won", 350, 200)
        }else{
            canvasContext.fillText("Right Player won", 350, 200)
        }
        canvasContext.fillStyle = "white"
        canvasContext.fillText("click to continue", 350, 300)
        return
    }
    app.drawNet( )
    // this is the left paddle
    app.colorRect(paddleX, paddleY, paddleThickness, paddleHeight, "white")
    //this is the right paddle
    app.colorRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, "white")
    // this is the ball 
    app.colorCircle(ballX, ballY, 10, "white")
    // player scores
    canvasContext.fillText(player1Score, 100, 100)
    canvasContext.fillText(player2Score, canvas.width-100, 100)
}
app.colorRect = function(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}

app.init = function(){
    alert("Welcome to my game!!!!! It's the first to 10 points, use the `w` and `s` keys to move your paddle!")
    app.game()
}

app.init()

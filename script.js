const app= {}

let canvas
let canvasContext
let ballX = 50
let ballY = 50
let ballSpeedX = 10
let ballSpeedY = 4

let paddleY = 250
let paddleX = 0
let paddle2Y = 250
const paddleThickness = 15
const paddleHeight = 100;

// document.addEventListener('keydown', recordKey);

// function recordKey(e){
//     keydown = e.key 
//     console.log(keydown)
//     if(keydown === "w" && paddleY > 0){
//         paddleY -= 30
//     }
//     if (keydown === "s" && paddleY < (600 - paddleHeight)) {
//         paddleY += 30
//     } 
// }


app.recordKey = function(e) {
    
    keydown = e.key
    console.log("keydown")
    if (keydown === "w" && paddleY > 0) {
        paddleY -= 30
    }
    if (keydown === "s" && paddleY < (600 - paddleHeight)) {
        paddleY += 30
    }
}

app.computerMovement = function(){
    let paddle2YCenter = paddle2Y + (paddleHeight / 2)
    if (paddle2YCenter < ballY - 20 && paddle2Y + paddleHeight < canvas.height){
        paddle2Y += 10
    } else if (paddle2YCenter > ballY + 20 && paddle2Y > 0) {
        paddle2Y -= 10
    }
}

app.ballReset = function(){
    ballSpeedX = -ballSpeedX
    ballX = canvas.width / 2
    ballY = canvas.height / 2
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
    app.computerMovement()
    document.addEventListener('keydown', app.recordKey);
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0){
        if(ballY > paddleY && ballY < paddleY + paddleHeight){
            ballSpeedX = -ballSpeedX
        }else{
            app.ballReset()
        }
    }
    if(ballX > canvas.width){
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX
        } else {
            app.ballReset()
        }
    }

    if(ballY < 0){
        ballSpeedY = - ballSpeedY
    }
    if (ballY > canvas.height) {
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
    app.colorRect(paddleX, paddleY, paddleThickness, paddleHeight, "white")
    //this is the right paddle
    app.colorRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, "white")
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

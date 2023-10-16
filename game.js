var gameEnded = false;
document.addEventListener("DOMContentLoaded", function () {
    
    const canvas = document.getElementById("snake");
    var canvas2d = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    var snakeSegments = [];
    var snakeLength = 1;

    var snakeX = 10;
    var snakeY = 0;

    var directionX = 10;
    var directionY = 0;

    document.onkeydown = function(event){
        switch (event.keyCode){
            case 37:
                directionX = -10;
                directionY = 0;
                break;
            case 38:
                directionX = 0;
                directionY = -10;
                break;
            case 39:
                directionX = 10;
                directionY = 0;
                break; 
            case 40:
                directionX = 0;
                directionY = 10;
                break;
        }
    }

    setInterval(gameLoop, 400);

    function moveSnake(){
        snakeSegments.unshift({x: snakeX, y: snakeY});
        snakeX += directionX;
        snakeY += directionY;
        
        while (snakeSegments.length > snakeLength){
            snakeSegments.pop();
        }
    }

    function drawSnake(){
        canvas2d.clearRect(0,0, canvas.width, canvas.height);
        canvas2d.fillStyle ="black";
        for(var i = 0; i < snakeSegments.length; i++){
            const segment = snakeSegments[i];
            canvas2d.fillRect(segment.x, segment.y, 20, 20);
        }
    }

    var dots = [];
    function spawnDots(){
        if(dots.length < 10){
            var dotX = Math.floor(Math.random()* canvas.width);
            var dotY = Math.floor(Math.random()* canvas.height);
            dots.push({ x: dotX, y: dotY});
        }
        for( var i = 0; i<dots.length; i++){
            canvas2d.fillStyle = "red";
            canvas2d.fillRect(dots[i].x, dots[i].y, 20, 20);
        }
    }
    
    function checkCollision(){
        for (var i=0; i< dots.length; i ++){
            if (snakeX < dots[i].x + 10&&
                snakeX + 10 > dots[i].x &&
                snakeY < dots[i].y +10&&
                snakeY +10 > dots[i].y){
                    snakeLength++;
                    dots.splice(i, 1);
                }
        }
            if (snakeX < 0 || 
                snakeY < 0 ||
                snakeX > canvas.width ||
                snakeY > canvas.height){
                    gameOver();
                }
            for (var i =1; i < snakeSegments.length; i++){
                if(snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y){
                    gameOver();
                }
            }
        }


    function gameOver(){
        if(!gameEnded){
            gameEnded = true;
            setTimeout(function(){
                alert("Game over!");
                resetGame();
            }, 500);
        }
    }
    function resetGame(){
        snakeSegments=[];
        snakeLength=1;
        snakeX= 10;
        snakeY=0;
        directionX = 10;
        directionY =0;
        dots=[];
        gameEnded = false;
        
        canvas2d.clearRect(0,0, canvas.width, canvas.height);

        spawnDots();
    }

    function gameLoop(){
      moveSnake();
      canvas2d.clearRect(0,0, canvas.width, canvas.height);
      drawSnake();  
      spawnDots();
      checkCollision();
      if(!gameEnded){
        setTimeout(gameLoop, 100);
      }
    }

});

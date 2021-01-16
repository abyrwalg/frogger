//Метод для получения случайного элемента из массива
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

var yesButton = document.getElementById("yes-button");
yesButton.addEventListener("click", restartGame);
var noButton = document.getElementById("no-button");
noButton.addEventListener("click", endGame);

var animationId; //Id для requestanimationframe
var winTimeoutId; //Id для таймаута функции победы
var killTimeoutId //Id для убийства лягушки в реке

var sprites = []; //Массив для хранения спрайтов

var score = 0; //Счет
var scoreBoard = document.getElementById("score");
var highScore = 999; //Рекорд
var highScoreBoard = document.getElementById("high-score");
var lives = 2; //Жизни
var frogs = 0; //Лягушки, дошедшие до конечных зон

var timeToLive = 30//Время таймера
var timer = document.querySelector(".timer-bar"); //Полоса таймера
var timerId; //id для setTimeout в функции timerTick;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var background = new Sprite(0, 0, 0, 0, 650, 700, "background.png", false, false, 0); //Фон
var water = new Sprite(0, 97, 0, 0, 650, 250, "water.png", true, false, 0); 

//Конечные зоны
//var endZone = new Sprite(0, 47, 0, 0, 50, 50, "end.png", true, false, 0);
var endZone = new Sprite(100, 47, 0, 0, 50, 50, "end.png", true, false, 0);
var endZone = new Sprite(200, 47, 0, 0, 50, 50, "end.png", true, false, 0);
var endZone = new Sprite(300, 47, 0, 0, 50, 50, "end.png", true, false, 0);
var endZone = new Sprite(400, 47, 0, 0, 50, 50, "end.png", true, false, 0);
var endZone = new Sprite(500, 47, 0, 0, 50, 50, "end.png", true, false, 0);
//var endZone = new Sprite(600, 47, 0, 0, 50, 50, "end.png", true, false, 0);

//Массив параметров спрайтов автомобилей
var movingSpritesParams = [
    {name: "car1.png", width: 87, height: 40},
    {name: "pickup.png", width: 77, height: 45},
    {name: "sportscar.png", width: 87, height: 40},
    {name: "car2.png", width: 87, height: 40},
    {name: "tanker.png", width: 127, height: 46},
    {name: "police.png", width: 76, height: 40},
    {name: "sportscar2.png", width: 78, height: 40},
]


//Массив для движущихся спрайтов

var movingSprites = [];

//Спрайты автомобилей
var row1Car = new Sprite(canvas.width, 605, 0, 0, 87, 40, "car1.png", true, false, 1.5);
movingSprites.push(row1Car);
var row2Car = new Sprite(canvas.width, 550, 0, 0, 77, 45, "pickup.png", true, false, -1);
movingSprites.push(row2Car);
var row2Car2 = new Sprite(300, 550, 0, 0, 78, 40, "sportscar2.png", true, false, -1);
row2Car2.rotation = 180;
movingSprites.push(row2Car2);
var row3Car = new Sprite(250, 500, 0, 0, 78, 40, "sportscar.png", true, false, 3);
movingSprites.push(row3Car);
var row4Car = new Sprite(canvas.width, 450, 0, 0, 87, 40, "car2.png", true, false, -2);
movingSprites.push(row4Car);
var row5Car = new Sprite(350, 398, 0, 0, 87, 40, "car1.png", true, false, 1);
movingSprites.push(row5Car);
var row5Car2 = new Sprite(canvas.width, 398, 0, 0, 127, 46, "tanker.png", true, false, 1);
movingSprites.push(row5Car2);

//Бревна
var row3log = new Sprite(0, 100, 0, 0, 154, 35, "log2.png", true, false, -1);
movingSprites.push(row3log);
var row3log = new Sprite(300, 100, 0, 0, 154, 35, "log2.png", true, false, -1);
movingSprites.push(row3log);
var row3log = new Sprite(600, 100, 0, 0, 154, 35, "log2.png", true, false, -1);
movingSprites.push(row3log);
var row2log = new Sprite(canvas.width, 200, 0, 0, 205, 35, "log1.png", true, false, -1.5);
movingSprites.push(row2log);
var row2log = new Sprite(300, 200, 0, 0, 205, 35, "log1.png", true, false, -1.5);
movingSprites.push(row2log);
var row1log = new Sprite(0, 250, 0, 0, 102, 35, "log3.png", true, false, -0.5);
movingSprites.push(row1log);
var row1log = new Sprite(300, 250, 0, 0, 102, 35, "log3.png", true, false, -0.5);
movingSprites.push(row1log);
var row1log = new Sprite(600, 250, 0, 0, 102, 35, "log3.png", true, false, -0.5);
movingSprites.push(row1log);

//Черепахи
var row1Turtle = new Sprite(200, 300, 0, 0, 150, 50, "turtle1.png", true, false, 1);
movingSprites.push(row1Turtle);
var row1Turtle = new Sprite(400, 300, 0, 0, 150, 50, "turtle1.png", true, false, 1);
movingSprites.push(row1Turtle);
var row1Turtle = new Sprite(600, 300, 0, 0, 150, 50, "turtle1.png", true, false, 1);
movingSprites.push(row1Turtle);
var row2Turtle = new Sprite(600, 140, 0, 0, 100, 50, "turtle2.png", true, false, 1.5);
movingSprites.push(row2Turtle);
var row2Turtle = new Sprite(150, 140, 0, 0, 100, 50, "turtle2.png", true, false, 1.5);
movingSprites.push(row2Turtle);
var row2Turtle = new Sprite(300, 140, 0, 0, 100, 50, "turtle2.png", true, false, 1.5);
movingSprites.push(row2Turtle);
var row2Turtle = new Sprite(450, 140, 0, 0, 100, 50, "turtle2.png", true, false, 1.5);
movingSprites.push(row2Turtle);

var frog = new Sprite(0, 0, 0, 0, 40, 40, "frog.png", true, true); //Создаем спрайт лягушки

frog.velocityX = 0;
frog.velocityY = 0;

frog.posX = (canvas.width - frog.width) / 2;
frog.posY = 655;
frog.minY = 655;

frog.rotation = 0;

//Обработка движения лягушки
frog.move = function() {
        
    if (Math.abs(frog.velocityX) <= 100) frog.posX += frog.velocityX;
    if (Math.abs(frog.velocityY)  <= 100) frog.posY += frog.velocityY;
    
}


function update() {
    animationId = requestAnimationFrame(update, canvas);
    
    
    for (var i = 0; i < sprites.length; i++) {
        
        for (var j = 0; j < sprites.length; j++) {
            if (sprites[i] !== sprites[j] && sprites[j].collidable && sprites[i].collidable) {
                
                var result = sprites[i].checkCollision(sprites[j]);
                if (result === true) {
                    console.log(sprites[i].image.src + "collided with " + sprites[j]);
                }
    
            }
        }
        
        sprites[i].updateAnimation();
        
        //Проверяем, не утонула ли лягушка. Если она находится в границах реки, но при этом не имеет ускорения, полученного от черепахи или бревна, значит утонула. 
        if (frog.posY <= 350 && !killTimeoutId) {
            killTimeoutId = setTimeout(function() {
                    if (!frog.velocity) {
                        killFrog();
                    }
                    killTimeoutId = null;
                }, 20);
        }
        
        
        //Отключаем ускорение лягушки, если она не находится на бревне или черепахе
        if (frog.posY >= 355 || frog.posY <= 55) {
            setTimeout(function() {
                frog.velocity = 0;
            }, 20);
        }
        
        //Убиваем лягушку, если она уплыла за границу канваса на бревне или черепахе
        if (frog.posX < -35 || frog.posX > canvas.width + 10) {
            killFrog();
        }        
        
        
        //Остановка игры, если реку пересекли семь лягушек
        if (frogs === 5 && !winTimeoutId) {
            winTimeoutId = setTimeout(function() {
                stopGame("win"); 
                winTimeoutId = null;
            }, 50);
        }
        
        
    }
    
    if (score > highScore) {
        highScore = score;
    }
    
    if (lives === -1) {
        stopGame("lose");
    }
    
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    //Отображение спрайтов
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].visible && sprites[i]) {
            sprites[i].posX -= sprites[i].velocity;
                
            //Проверяем, выехала ли машина за пределы игрового поля и если выехала, вызываем функцию для ее перемещения в стартовую позицию и смены спрайта
            if (sprites[i].posX < -sprites[i].width || sprites[i].posX > canvas.width) {
                repositionSprite(sprites[i]);
            }
            //Отрисовка спрайта
            if (sprites[i].rotation != 0) {
                ctx.save();
                ctx.translate(sprites[i].posX + sprites[i].width / 2, sprites[i].posY + sprites[i].height / 2);
                ctx.rotate(sprites[i].rotation * Math.PI / 180);
                ctx.translate(-(sprites[i].posX + sprites[i].width / 2), -(sprites[i].posY + sprites[i].height / 2));
                ctx.drawImage(sprites[i].image, sprites[i].sourceX, sprites[i].sourceY, sprites[i].width, sprites[i].height, sprites[i].posX, sprites[i].posY, sprites[i].width, sprites[i].height);
                ctx.restore();
            } else ctx.drawImage(sprites[i].image, sprites[i].sourceX, sprites[i].sourceY, sprites[i].width, sprites[i].height, sprites[i].posX, sprites[i].posY, sprites[i].width, sprites[i].height);
        }
    }
    spriteX.innerHTML = frog.posX;
    spriteY.innerHTML = frog.posY;
    
    scoreBoard.innerHTML = score;
    highScoreBoard.innerHTML = highScore;
    
}

//Функция для отрисовки автомобилей
function repositionSprite(sprite) {
    var randomCar = movingSpritesParams.random();
    
    if (sprite !== frog) {
        if (sprite.velocity > 0) {
            sprite.posX = canvas.width;
            sprite.rotation = 0;
        } else {
            sprite.posX = -sprite.width;
            sprite.rotation = 180;
        }
    
        if (sprite.posY >= 400) {
            sprite.image.src = "assets/" + randomCar.name;
            sprite.width = randomCar.width;
            sprite.height = randomCar.height;
        }
    }
        
    
}

//Обработчики событий нажатий на кнопки клавиатуры для управления лягушкой
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

var leftFlag, rightFlag, upFlag, downFlag;

//Управление лягушкой с клавиатуры
function onKeyDown(event) {
    if (event.keyCode === 37 && frog.posX > 10 && !leftFlag) {
        frog.posX -= 50;
        leftFlag = true;
        frog.rotation = -90;
    } else if (event.keyCode === 39 && frog.posX < 640 - frog.width && !rightFlag) {
        frog.posX += 50;
        rightFlag = true;
        frog.rotation = 90;
    } else if (event.keyCode === 38 && frog.posY > 100 && !upFlag) {
        frog.posY -= 50;
        upFlag = true;
        frog.rotation = 0;
        updateScore();
        
    } else if (event.keyCode === 40 && frog.posY < 650 - frog.height && !downFlag) {
        frog.posY += 50;
        downFlag = true;
        frog.rotation = 180;
    }
    
    //Если X-координата лягушки оказалась за пределами канваса, возвращаем лягушку назад
    if (frog.posX < 0) {
        frog.posX = 0;
    } else if (frog.posX + frog.width > canvas.width) {
        frog.posX = canvas.width - frog.width;
    }
}

function onKeyUp(event) {
    if (event.keyCode === 37) {
        leftFlag = false;
    } else if (event.keyCode === 39) {
        rightFlag = false;
    } else if (event.keyCode === 38) {
        upFlag = false;
    } else if (event.keyCode === 40) {
        downFlag = false;
    }
}

function timerTick() {
    var timerWidth = timer.offsetWidth;
    if (timerWidth - 400 / timeToLive < 0) {
        timer.style.width = "0px";
    } else timer.style.width = timerWidth - 400 / timeToLive + "px";
    if (timerWidth <= 0) {
        killFrog();
    }
    timerId = setTimeout(timerTick, 1000);
}

//Функция убийства лягушки
function killFrog() {
    lives -= 1;
    resetSprites();
    if (lives === 1) {
        document.getElementById("live1").style.backgroundImage = "url()";
    } else if (lives === 0) {
        document.getElementById("live2").style.backgroundImage = "url()";
    }
        
}


//Функция для возврата спрайтов на исходные позиции
function resetSprites() {
    timer.style.width = "400px";
    
    //Сброс спрайта лягушки
    frog.rotation = 0;
    frog.posX = (canvas.width - frog.width) / 2;
    frog.posY = 655;
    frog.minY = 655;
    
    //Сброс спрайтов автомобилей
    row1Car.posX = canvas.width;
    row1Car.posY = 605;
    row2Car.posX = canvas.width;
    row2Car.posY = 550;
    row2Car2.posX = 300;
    row2Car2.posY = 550;
    row3Car.posX = 250;
    row3Car.posY = 505;
    row4Car.posX = canvas.width;
    row4Car.posY = 450;
    row5Car.posX = 350;
    row5Car.posY = 398;
    row5Car2.posX = canvas.width;
    row5Car2.posY = 398;
    
    
}

//Функция для ускорения автомобилей после победы
function speedUpmovingSprites() {
    console.log("Speed up!");
    for (var i = 0; i < movingSprites.length; i++) {
        if (movingSprites[i].velocity > 0) {
            movingSprites[i].velocity += 0.25;
        } else {
            movingSprites[i].velocity += -0.25;
        }
        
    }
}


//Функция для перезапуска игры
function restartGame(state) {
    document.getElementById("game-over-div").style.display = "none";
    animationId = requestAnimationFrame(update, canvas);
    
    document.getElementById("live1").style.backgroundImage = "url(assets/frog.png)";
    document.getElementById("live2").style.backgroundImage = "url(assets/frog.png)";
    timer.style.width = "400px";
    frogs = 0;
    
    if (state !== "win") {
        score = 0;
        lives = 2;
    }
    
     //Удаляем лягушек из конечных зон
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].posY === 53) {
            sprites.splice(i, 1);
            i -= 1;
        }
    }
    
    
    resetSprites();
    timerTick();
}

//Функция для остановки игры
function stopGame(state) {
    cancelAnimationFrame(animationId);
    clearTimeout(timerId);
    if (state === "win") {
        speedUpmovingSprites();
        restartGame("win");
    } else if (state === "lose") {
        document.getElementById("game-over-div").style.display = "block";
    }
}


//Функция для выхода из игры игры
function endGame() {
    window.location.href = "../index.html";
}

//Функция для обновления счета
function updateScore() {
    if (frog.posY < frog.minY) {
        score += 10;
        frog.minY = frog.posY;
    }
}

//Запуск таймера
setTimeout(timerTick, 1000);

//Debug info

var spriteX = document.getElementById("sprite-x");
var spriteY = document.getElementById("sprite-y");

update();
//Конструктор спрайтов
function Sprite(posX, posY, sourceX, sourceY, width, height, imageName, collidable, movable, velocity, frames, animationSpeed) { 
    
    var loadHandler = function() {
        this.COLUMNS = this.image.width / width;
    }.bind(this);    
    
    this.posX = posX; //Позиция спрайта на канвасе
    this.posY = posY;
    
    this.sourceX = sourceX; //Позиция отображаемого изображения в tilesheet
    this.sourceY = sourceY;
    
    this.width= width; //Размер спрайта
    this.height = height;
    
    this.collidable = collidable || false //Проверять ли спрайт на столкновения
    this.movable = movable || false //Можно ли двигать спрайт при столкновении
    
    this._numberOfFrames = frames || 0; //Количество кадров анимации, по умолчанию - 0
    this.currentFrame = 0; //Текущий кадр анимации (нумерация с нуля)
       
    this.image = document.createElement("img"); //Создание элемента img с заданным изображением для отображения на канвасе
    this.image.addEventListener("load", loadHandler);
    this.image.src = "assets/" + imageName;
    
    this.visible = 1; //Видимость спрайта
    
    this.controlled = 0 //Возможность управления спрайтом
    this.animationSpeed = animationSpeed //Скорость анимации, меньше значение - выше скорость
    
    this.velocity = velocity || 0; //Скорость движения
    
    
    this.animationInterval; //Таймер для анимацци
    
    sprites.push(this);
}

Sprite.prototype.updateAnimation = function() {
    this.sourceX = Math.floor(this.currentFrame % this.COLUMNS) * this.width; 
    this.sourceY = Math.floor(this.currentFrame / this.COLUMNS) * this.height;
    
    if (this._numberOfFrames) {
        
        var doAnimation = function() {
            this.currentFrame++;
            //this.animationTimer = 0;
            if (this.currentFrame === this._numberOfFrames) {
                this.currentFrame = 0;
            }
        }.bind(this);
        
        if(!this.animationInterval) {
            this.animationInterval = setInterval(doAnimation, this.animationSpeed);
        }
    }
       
};

//Метод для обнаружения столкновений спрайтов
Sprite.prototype.checkCollision = function(sprite) {
    var collision = false;
    
    //Расстояние между центральными точками спрайтов по горизонтали и вертикали
    var vx = this.centerX() - sprite.centerX();
    var vy = this.centerY() - sprite.centerY();
    
    //Расстояние между спрайтами, на котором засчитывается столкновение
    var halfWidths = (this.width + sprite.width) / 2;
    var halfHeights = (this.height + sprite.height) / 2;
    
    //Проверка на столкновение
    if (Math.abs(vx) < halfWidths &&  this.collidable && this === frog) {
        if (Math.abs(vy) < halfHeights) {
            
            
            //Проверяем, дошла ли лягушка до конца локации
            if (sprite.posY === 47) {
                score += 300;
                frogs += 1;
                var endZoneFrog = new Sprite(sprite.posX + 5, 53, 0, 0, 40, 40, "frog.png", false, false);
                resetSprites();
                timer.style.width = "400px";
                
            //Проверяем, находится ли лягушка на бревне или черепахе и если да, то заставляем ее двигаться вслед за спрайтом
            } else if (sprite.posY <= 350 && sprite.posY - frog.posY < 20 && (sprite.posX - frog.posX < 20) && (sprite.posX - frog.posX > -sprite.width + frog.width / 2)) {
                 
                frog.velocity = sprite.velocity;
                
            //Проверяем, не столкнулась ли лягушка с автомобилем    
            } else if (sprite.posY > 390) {
               killFrog(); 
            }
            
            
        } 
    } 
    
};

//Методы для определения координат спрайта
Sprite.prototype.left = function() {
    return this.posX;
};

Sprite.prototype.right = function() {
    return this.posX + this.width;
};

Sprite.prototype.top = function() {
    return this.posY;
};

Sprite.prototype.bottom = function() {
    return this.posY + this.height;
};

Sprite.prototype.centerX = function() {
    return this.posX + this.width / 2;
};

Sprite.prototype.centerY = function() {
    return this.posY + this.height / 2;
};

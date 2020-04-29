var basePoint = Object.defineProperties({},
    {
        x : {value:0, writable: true, enumerable: false, configurable: true},
        y : {value:0, writable: true, enumerable: false, configurable: true},

        setPosition : { writable: false, enumerable: false, configurable: true, value:
            function(point){
                this.x = point.x;
                this.y = point.y;
                return this;
            }
        },

        add: { writable: false, enumerable: false, configurable: true, value: 
            function(point)
            {
                this.x+=point.x;
                this.y+=point.y;
                return this;
            }
        },
         
         sub: { writable: false, enumerable: false, configurable: true, value: 
            function(point)
            {
                this.x-=point.x;
                this.y-=point.y;
                return this;
            }
        },
         
        mul: { writable: false, enumerable: false, configurable: true, value: 
            function(scale)
            {
                this.x*=scale;
                this.y*=scale;
                return this;
            }
        },

        clonePoint : {writable: false, enumerable: false, configurable: true, value:
            function(){
                return new Point(this.x, this.y);
            }
        }

    }    
);
function Point(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype = basePoint;

var baseBlock = Object.defineProperties({},
    {
        position : {value : new Point(0,0),writable: true, enumerable: false, configurable: true},
        color    : {value:"#000000", writable: true, enumerable: false, configurable: true},

        setBlockPosition : {writable: false, enumerable: false, configurable: true, value:
            function(point){
                this.position.setPosition(point);
            }
        },

        blockRight : {writable: false, enumerable: false, configurable: true, value:
            function(){
                this.position.add(new Point(1,0));
            }
        },
        
        blockLeft : {writable: false, enumerable: false, configurable: true, value:
            function(){
                this.position.sub(new Point(1,0));
            }
        },

        blockDown : {writable: false, enumerable: false, configurable: true, value:
            function(){
                this.position.add(new Point(0,1))
            }
        },

        blockCollision : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                if(this.position.y + 1 > field.rows-1 || field.mat[this.position.y + 1][this.position.x ].value != 0 ){
                    return true;
                }
                else{
                    return false;
                }
            }
        },

        blockLeftLimits : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                if(this.position.x == 0 || field.mat[this.position.y][this.position.x - 1].value !== 0)
                    return true;
                else
                    return false;
            }
        },

        blockRightLimits : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                if(this.position.x == field.col - 1 || field.mat[this.position.y][this.position.x + 1].value !== 0)
                    return true;
                else
                    return false;
            }
        },

        blockDownLimits : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                if(this.position.y == field.rows - 1 || field.mat[this.position.y + 1][this.position.x].value !== 0)
                    return true;
                else
                    return false;
            }
        },

        cloneBlock : {writable: false, enumerable: false, configurable: true, value:
            function(){
                return new Block(this.position.clonePoint(), this.color);
            }
        }

    }
);
function Block(point,color){
    this.position = point;
    this.color    = color;
}
Block.prototype = baseBlock;

var baseShape = Object.defineProperties({},
    {
        blocks : {value : new Array(), writable: true, enumerable: false, configurable: true},

        setShape : {writable: false, enumerable: false, configurable: true, value:
            function(s){
                if(s == 0){
                    return new Array(new Block(new Point(0,0), "#3BB9FF"),new Block(new Point(1,0), "#3BB9FF"),new Block(new Point(2,0), "#3BB9FF"),new Block(new Point(3,0), "#3BB9FF"), new Point(4,1), 0, 0);
                }else if(s == 1){
                    return new Array(new Block(new Point(0,0), "#52D017"),new Block(new Point(0,1), "#52D017"),new Block(new Point(1,1), "#52D017"),new Block(new Point(2,1), "#52D017"), new Point(3,2), 1, 0);
                }else if(s == 2){
                    return new Array(new Block(new Point(0,1), "#FF0000"),new Block(new Point(1,1), "#FF0000"),new Block(new Point(2,1), "#FF0000"),new Block(new Point(1,0), "#FF0000"), new Point(3,2), 2, 0);
                }else if(s == 3){
                    return new Array(new Block(new Point(0,1), "#2B60DE"),new Block(new Point(1,1), "#2B60DE"),new Block(new Point(1,0), "#2B60DE"),new Block(new Point(2,0), "#2B60DE"), new Point(3,2), 3, 0);
                }else if(s == 4){
                    return new Array(new Block(new Point(0,1), "#8D38C9"),new Block(new Point(1,1), "#8D38C9"),new Block(new Point(2,0), "#8D38C9"),new Block(new Point(2,1), "#8D38C9"), new Point(3,2), 4, 0);
                }else if(s == 5){
                    return new Array(new Block(new Point(0,0), "#FFFC17"),new Block(new Point(0,1), "#FFFC17"),new Block(new Point(1,0), "#FFFC17"),new Block(new Point(1,1), "#FFFC17"), new Point(2,2), 5, 0);
                }else if(s == 6){
                    return new Array(new Block(new Point(0,0), "#FBB117"),new Block(new Point(1,0), "#FBB117"),new Block(new Point(1,1), "#FBB117"),new Block(new Point(2,1), "#FBB117"), new Point(3,2), 6, 0);
                }
            }
        },

        setShapeTopPosition : {writable: false, enumerable: false, configurable: true, value:
            function(point){
                var diffX = point.x - this.blocks[0].position.x;
                var diffY = point.y - this.blocks[0].position.y;
                for(var i = 0; i < this.blocks.length-3; i++){
                    var newX = this.blocks[i].position.x + diffX;
                    var newY = this.blocks[i].position.y + diffY;
                    this.blocks[i].setBlockPosition(new Point(newX,newY));
                }
            }
        },

        shapeDown : {writable: false, enumerable: false, configurable: true, value:
            function(){
                for(var i = 0; i < this.blocks.length-3; i++){
                    this.blocks[i].blockDown();
                }
            }
        },

        shapeRight : {writable: false, enumerable: false, configurable: true, value:
            function(){
                for(var i = 0; i < this.blocks.length-3; i++){
                    this.blocks[i].blockRight();
                }
            }
        },

        shapeLeft : {writable: false, enumerable: false, configurable: true, value:
            function(){
                for(var i = 0; i < this.blocks.length-3; i++){
                    this.blocks[i].blockLeft();
                }
            }
        },

        shapeCollision : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                for(var i = 0; i < this.blocks.length-3; i++){
                    if(this.blocks[i].blockCollision(field)){
                        return true;
                    }
                }
                return false;
            }
        },

        isTopCollision : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                if(this.shapeCollision(field)){
                    for(var i = 0; i < this.blocks.length-3; i++){
                        if(this.blocks[i].position.y <= 0)
                            return true;
                    }
                    return false;
                }
            }
        },

        shapeLeftLimits : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                for(var i = 0; i < this.blocks.length-3; i++){
                    if(this.blocks[i].blockLeftLimits(field)){
                        return true;
                    }
                }
                return false;
            }
        },

        shapeRightLimits : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                for(var i = 0; i < this.blocks.length-3; i++){
                    if(this.blocks[i].blockRightLimits(field)){
                        return true;
                    }
                }
                return false;
            }
        },

        shapeDownLimits : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                for(var i = 0; i < this.blocks.length-3; i++){
                    if(this.blocks[i].blockDownLimits(field)){
                        return true;
                    }
                }
                return false;
            }
        },

        shapeRotate : {writable: false, enumerable: false, configurable: true, value:
            function(field){
                var topPosition = this.blocks[0].position;
                var ordineX = this.blocks[4].x;
                var ordineY = this.blocks[4].y;
                var iter = this.blocks[6];
                var newShape = new Shape(this.blocks[5]);
                var i = 0;
                while(i < iter+1){
                    for(var j = 0; j < newShape.blocks.length-3; j++)
                        newShape.blocks[j].setBlockPosition(new Point((ordineY-1) - newShape.blocks[j].position.y,newShape.blocks[j].position.x));
                    i++;
                }
                newShape.blocks[4] = new Point(ordineY, ordineX);
                newShape.blocks[6] = iter+1;

                newShape.setShapeTopPosition(topPosition);

                var rotate = true; 
                for(var i = 0; i < newShape.blocks.length-3; i++){
                    if(field.mat[newShape.blocks[i].position.y][newShape.blocks[i].position.x].value !== 0)
                        rotate = false;
                }

                if(rotate) {
                    for(var i = 0; i < this.blocks.length; i++){
                        if(this.blocks[i] instanceof Block){
                            this.blocks[i].setBlockPosition(newShape.blocks[i].position.clonePoint());
                            this.blocks[i].color = newShape.blocks[i].color;
                        }else if(this.blocks[i] instanceof Point){
                            this.blocks[i].setPosition(newShape.blocks[i].clonePoint());
                        }else{
                            this.blocks[i] = newShape.blocks[i];
                        }
                    }
                }

            }
        },

        cloneShape : {writable: false, enumerable: false, configurable: true, value:
            function(){
                var newShape = new Shape(this.blocks[5]);
                for(var i = 0; i < this.blocks.length; i++)
                    newShape.blocks[0] = this.blocks[0].cloneBlock();

                return newShape;
            }
        }
    }
);
function Shape(s){
    this.blocks = this.setShape(s);
}
Shape.prototype = baseShape;
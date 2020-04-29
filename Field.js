var baseCell = Object.defineProperties({},
    {
        value  : {value:0, writable: true, enumerable: false, configurable: true},
        width  : {value:0, writable: true, enumerable: false, configurable: true},
        height : {value:0, writable: true, enumerable: false, configurable: true},

        isEmpty : {writable: false, enumerable: false, configurable: true, value:
            function(){
                return this.value <= 0;
            }
        },

        setValue : {writable: false, enumerable: false, configurable: true, value:
            function(value){
                this.value = value;
                return this;
            }
        } 
    }
);

function Cell(value, w, h){
    this.value = value;
    this.width = w;
    this.height = h;
}
Cell.prototype = baseCell;

var baseField = Object.defineProperties({},
    {
        rows   : {value:0, writable: true, enumerable: false, configurable: true},
        col    : {value:0, writable: true, enumerable: false, configurable: true},
        side   : {value:0, writable: true, enumerable: false, configurable: true},
        width  : {value:0, writable: true, enumerable: false, configurable: true},
        height : {value:0, writable: true, enumerable: false, configurable: true},
        mat    : {value: new Array(), writable: true, enumerable: false, configurable: true},

        clone : {writable: false, enumerable: false, configurable: true, value:
            function(){
                var mat = Array();
                for(var i = 0; i < this.rows; i++){
                    mat[i] = new Array(this.col);
                    for(var j = 0; j < this.col; j++){
                        mat[i][j] = new Cell(this.mat[i][j].value,this.side,this.side);
                    }
                }
                return new Field(this.rows, this.col, this.width, this.height, this.side, mat);
            }
        },

        putShape : {writable: false, enumerable: false, configurable: true, value:
            function(shape){
                shape = shape.blocks;
                for(var i = 0; i < shape.length-3; i++){
                    this.mat[shape[i].position.y][shape[i].position.x].value = shape[i];
                }
            }
        },

        checkRow : {writable: false, enumerable: false, configurable: true, value:
            function(row){
                for(var c = 0; c < this.col; c++){
                    //console.log(this.mat[row][c].value);
                    if(this.mat[row][c].value == 0)
                        return false;
                }
                return true;
            }
        },

        updateField : {writable: false, enumerable: false, configurable: true, value:
            function(){
                for(var r = this.rows-1; r > 0; r--){
                    if(this.checkRow(r)){
                        console.log(r);
                        //console.log("sssss");
                        for(var c = 0; c < this.col; c++){
                            for(var suppR = r; suppR > 0; suppR--){
                                console.log(this.mat[suppR][c].value);
                                if(this.mat[suppR-1][c].value instanceof Block)
                                    this.mat[suppR][c].value.color = this.mat[suppR-1][c].value.color;
                                else{
                                    this.mat[suppR][c].setValue(0);
                                }
                            }
                        }
                        r++;
                    }

                }
            }
        }
        
    }
);

function Field(rows, col, w, h, side, mat){
    this.rows   = rows;
    this.col    = col;
    this.width  = w;
    this.height = h;
    this.side   = side;

    if(mat)
        this.mat = mat;
    else{
        for(var i = 0; i < rows; i++){
            this.mat[i] = new Array(col);
            for(var j = 0; j < col; j++){
                this.mat[i][j] = new Cell(0,side,side);
            }
        }
    }
}
Field.prototype = baseField;
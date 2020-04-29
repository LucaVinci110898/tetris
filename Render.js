function renderAllCanvas(canvas, field){
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    for(var r = 0; r < field.rows; r++){
        for(var c = 0; c < field.col; c++){
            if(field.mat[r][c].value != 0)
                renderCanvas(context, field.mat[r][c], field.side, field.width, field.height);
        }
    }
}

function renderCanvas(context, object, side, width, height){
    context.beginPath();
    context.rect(object.value.position.x*side, object.value.position.y*side, side-1, side-1);
    context.fillStyle = object.value.color; 
    context.strokeStyle = "#ffffff";
    context.stroke();
    context.fill(); 
}
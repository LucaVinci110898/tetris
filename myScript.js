 window.onload = function(){

    var field = new Field(20,10,300,600,30);
    
    var shape = new Shape(Math.floor(Math.random() * 7));
    shape.setShapeTopPosition(new Point(4,1));

    window.addEventListener("keydown",function(e){
        if(e.keyCode == 37)
            if(!shape.shapeLeftLimits(field))
                shape.shapeLeft();
        
        if(e.keyCode == 39)
            if(!shape.shapeRightLimits(field))
                shape.shapeRight();

        if(e.keyCode == 32)
            shape.shapeRotate(field);

        if(e.keyCode == 40)
            if(!shape.shapeDownLimits(field))
                shape.shapeDown();

        suppField.putShape(shape);
        renderAllCanvas(document.getElementById("myCanvas"),suppField);

    });

    var suppField = field.clone();
    suppField.putShape(shape);
    renderAllCanvas(document.getElementById("myCanvas"),suppField);

    var game = setInterval(
        function(){

            suppField = field.clone();

            if(shape.shapeCollision(field) && shape.isTopCollision(field)){
                stopGame();
                window.confirm("GAMEOVER");
                window.location.href = "./index.html";
            }
            else if(shape.shapeCollision(field)){
                console.log("Collisione");
                suppField.putShape(shape);
                field.putShape(shape);
                suppField.updateField();
                field.updateField(); 
                renderAllCanvas(document.getElementById("myCanvas"),suppField);
                shape = new Shape(Math.floor(Math.random() * 7));
                shape.setShapeTopPosition(new Point(4,1));
                
            }
            else{
                shape.shapeDown();
                suppField.putShape(shape);
            }
                

            renderAllCanvas(document.getElementById("myCanvas"),suppField);
            
        }, 800);

    function stopGame(){
        clearInterval(game);
    }


    

}
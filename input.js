var mouse = {};


mouse.setup = function() {
    mouse = {coords: {x: midP.x, y: midP.y}, lastCoords: {x: midP.x, y: midP.y}, down: false, tile: {x: 0, y: 0}};

    //Mouse Move:
    canvas.addEventListener('mousemove', function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouse.lastCoords.x = mouse.coords.x;
        mouse.lastCoords.y = mouse.coords.y;
        mouse.coords.x = evt.clientX - rect.left;
        mouse.coords.y = evt.clientY - rect.top;

        mouse.tile.x = Math.floor((mouse.coords.x + camera.offset.x) / (TILE_SIZE * camera.zoom));
        mouse.tile.y = Math.floor((mouse.coords.y + camera.offset.y) / (TILE_SIZE * camera.zoom));

        if(mouse.down) {
            camera.move(mouse.lastCoords.x - mouse.coords.x, mouse.lastCoords.y - mouse.coords.y);//Move Camera when left mouse boutton is pressed and the mouse dragged
        }

    }, false);


    //Mouse Leave/Up:
    function mouseUpLeaveHandler(event) {
        mouse.down = false;
    }
    canvas.addEventListener('mouseup', mouseUpLeaveHandler, false);
    canvas.addEventListener('mouseleave', mouseUpLeaveHandler, false);


    //Mouse Down:
    canvas.addEventListener('mousedown', function(evt) {
        mouse.down = true;
        
    }, false);

    
    //Mouse Click:
    canvas.addEventListener('click', function(evt) {
        //Remove, just for debugging:
        console.log(map.tiles[mouse.tile.x][mouse.tile.y]);
        tileLogic.updateTile(map, mouse.tile.x, mouse.tile.y, false);
        console.log(map.tiles[mouse.tile.x][mouse.tile.y]);
        console.log("----------------");
    }, false);

    //Mouse Wheel: -TODO!
    
    window.onkeydown = function(event){
        console.log(event.keyCode);
        switch(event.keyCode){
            case 37: 
                camera.move(-2, 0);//Move Cam Left
                break;
            case 39:
                camera.move(2, 0);//Move Cam Right
                break;
            case 38:
                camera.move(0, -2);//Move Cam Up
                break;
            case 40:
                camera.move(0, 2);//Move Cam Down
                break;
            case 187:
                camera.changeZoom(1.2);
                break;
            case 189:
                camera.changeZoom(1/1.2);
                break;
        }
    }
    
    function mouseWheelHandler(evt) {
        // chrome: camera.changeZoom(Math.min(Math.max(evt.deltaY, 1/1.2), 1.2));//Call camera zoom function
        camera.changeZoom(Math.min(Math.max(evt.detail, 1/1.2), 1.2));//Call camera zoom function
    }
    canvas.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
    canvas.addEventListener('mousewheel', mouseWheelHandler, false);
    
};
mouse.checkRect = function(rectX,rectY,rectWidth,rectHeight){
    if (mouse.coords.x > rectX && mouse.coords.y > rectY)
        if (mouse.coords.x < rectX+rectWidth && mouse.coords.y < rectY+rectHeight)
            return true;
    else
        return false;
}
var mouse = {};


mouse.setup = function() {
    mouse = {coords: {x: midP.x, y: midP.y}, lastCoords: {x: midP.x, y: midP.y}, down: false};

    //Mouse Move:
    canvas.addEventListener('mousemove', function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouse.lastCoords.x = mouse.coords.x;
        mouse.lastCoords.y = mouse.coords.y;
        mouse.coords.x = evt.clientX - rect.left;
        mouse.coords.y = evt.clientY - rect.top;
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

    
    //Mouse Click/Wheel: -TODO!
    
    //canvas.addEventListener('click', function(evt) {
    //
    //}, false);
    //
    //function mouseWheelHandler(evt) {
    //
    //}
    //canvas.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
    //canvas.addEventListener('mousewheel', mouseWheelHandler, false);
    
};
mouse.checkRect = function(rectX,rectY,rectWidth,rectHeight){
    if (mouse.coords.x > rectX && mouse.coords.y > rectY)
        if (mouse.coords.x < rectX+rectWidth && mouse.coords.y < rectY+rectHeight)
            return true;
    else
        return false;
}
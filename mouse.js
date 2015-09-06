var mouse;


function setup(initialPosition) {
    mouse = {coords: {x: midP.x, y: midP.y}, lastCoords: {x: midP.x, y: midP.y}, down: false};



    canvas.addEventListener('mousemove', function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouse.lastCoords.x = mouse.coords.x;
        mouse.lastCoords.y = mouse.coords.y;
        mouse.coords.x = evt.clientX - rect.left;
        mouse.coords.y = evt.clientY - rect.top;
    }, false);


    function mouseUpLeaveHandler(event) {
        mouse.down = false;
    }
    canvas.addEventListener('mouseup', mouseUpLeaveHandler, false);
    canvas.addEventListener('mouseleave', mouseUpLeaveHandler, false);
    
};
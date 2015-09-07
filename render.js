var render = {}, 
camera,
TILE_SIZE = 32;


render.setup = function() {
    camera = {offset: {x: 0, y: 0}, zoom: 1};
    camera.changeZoom = function(z) {

    	camera.zoom += z;
    	//TODO!
    	//camera.offset.x += (z / camera.zoom) * mouse.coords.x;
    	//camera.offset.y += (z / camera.zoom) * mouse.coords.y;
    };
    camera.move = function(x, y) {
    	if(!(camera.offset.x + x >= (1/2) * TILE_SIZE * camera.zoom * MAP_WIDTH && x >= 0) &&
    		!(camera.offset.x + x <= - canvas.width + (1/2) * TILE_SIZE * camera.zoom * MAP_WIDTH && x <= 0)) {
    		camera.offset.x += x;
    	}
    	if(!(camera.offset.y + y >= (1/2) * TILE_SIZE * camera.zoom * MAP_HEIGHT && y >= 0) &&
    		!(camera.offset.y + y <= - canvas.height + (1/2) * TILE_SIZE * camera.zoom * MAP_HEIGHT && y <= 0)) {
    		camera.offset.y += y;
    	}
    	
    };
};

render.clear = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

render.draw = function() {
	this.clear();
    for(
    	var x = Math.max(Math.floor(camera.offset.x / (TILE_SIZE * camera.zoom)), 0);
    	x < Math.min(Math.ceil((camera.offset.x + canvas.width) / (TILE_SIZE * camera.zoom)), MAP_WIDTH);
    	x++) {

        for(
        	var y = Math.max(Math.floor(camera.offset.y / (TILE_SIZE * camera.zoom)), 0);
        	y < Math.min(Math.ceil((camera.offset.y + canvas.height) / (TILE_SIZE * camera.zoom)), MAP_HEIGHT);
        	y++) {

            ctx.strokeStyle = "blue";
            ctx.strokeRect(x * TILE_SIZE * camera.zoom - camera.offset.x + 4, y * TILE_SIZE * camera.zoom - camera.offset.y + 4, TILE_SIZE * camera.zoom - 4, TILE_SIZE * camera.zoom - 4);
        }
    }
};


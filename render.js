var render = {}, 
camera,
TILE_SIZE = 32;
var TILE_SHEET = new Image();


render.setup = function() {
    TILE_SHEET.src = "tilesheet.png" //Image which contains all tilesImages
    camera = {offset: {x: 0, y: 0}, zoom: 1};//Initial offset and zoom level
    camera.changeZoom = function(factor) {

    	camera.zoom *= factor;
    	//TODO!
    	//camera.offset.x += (z / camera.zoom) * mouse.coords.x;
    	//camera.offset.y += (z / camera.zoom) * mouse.coords.y;
    };
    camera.move = function(x, y) {
    	//Faulty! TODO!

    	//if(!(camera.offset.x + x >= (1/2) * TILE_SIZE * camera.zoom * MAP_WIDTH && x >= 0) &&
    	//	!(camera.offset.x + x <= - canvas.width + (1/2) * TILE_SIZE * camera.zoom * MAP_WIDTH && x <= 0)) {
    		camera.offset.x += x;
    	//}
    	//if(!(camera.offset.y + y >= (1/2) * TILE_SIZE * camera.zoom * MAP_HEIGHT && y >= 0) &&
    	//	!(camera.offset.y + y <= - canvas.height + (1/2) * TILE_SIZE * camera.zoom * MAP_HEIGHT && y <= 0)) {
    		camera.offset.y += y;
    	//}
    	
    };
};

render.clear = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

render.draw = function() {

    function drawTile(x, y) {
    	var tile = tiles[x][y];
    	var sx, sy, scol;

    	//Ground:
    	switch(tile.ground) {//Define which tiles should be drawn form the tileSheet and define its LOD Color 
    		case GROUND_TYPES.grass:
    			sx = 0;
    			sy = 0;
    			scol = "green";

    		break;
    		case GROUND_TYPES.stone:
    			sx = 1;
    			sy = 0;
    			scol = "gray";
    		break;
    	}
    	if (camera.zoom < 0.5) {
    		ctx.fillStyle = scol;
    		ctx.fillRect(x * TILE_SIZE * camera.zoom - camera.offset.x,y * TILE_SIZE * camera.zoom - camera.offset.y,TILE_SIZE*camera.zoom,TILE_SIZE*camera.zoom);
    	} else {
    		ctx.drawImage(TILE_SHEET,sx * TILE_SIZE,sy * TILE_SIZE,TILE_SIZE,TILE_SIZE,x * TILE_SIZE * camera.zoom - camera.offset.x,y * TILE_SIZE * camera.zoom - camera.offset.y,TILE_SIZE*camera.zoom,TILE_SIZE*camera.zoom);
    	}

    	//Building:
    	switch(tile.building) {
    		 case BUILDING_TYPES.forest:

    		 break;
    		 case BUILDING_TYPES.pylon:
    		 	sx = 15;
    			sy = 0;
    			scol = "black";
    		 break;
    	}

    	if(tile.building != BUILDING_TYPES.empty) {
    		ctx.drawImage(TILE_SHEET, sx * TILE_SIZE, sy * TILE_SIZE,TILE_SIZE,TILE_SIZE,x * TILE_SIZE * camera.zoom - camera.offset.x,y * TILE_SIZE * camera.zoom - camera.offset.y,TILE_SIZE*camera.zoom,TILE_SIZE*camera.zoom);
    	}
    	
    }

	this.clear();
    for(
    	var x = Math.max(Math.floor(camera.offset.x / (TILE_SIZE * camera.zoom)), 0);
    	x < Math.min(Math.ceil((camera.offset.x + canvas.width) / (TILE_SIZE * camera.zoom)), MAP_WIDTH);
    	x++) {

        for(
        	var y = Math.max(Math.floor(camera.offset.y / (TILE_SIZE * camera.zoom)), 0);
        	y < Math.min(Math.ceil((camera.offset.y + canvas.height) / (TILE_SIZE * camera.zoom)), MAP_HEIGHT);
        	y++) {

            //ctx.strokeStyle = "blue";
            //ctx.strokeRect(x * TILE_SIZE * camera.zoom - camera.offset.x + 4, y * TILE_SIZE * camera.zoom - camera.offset.y + 4, TILE_SIZE * camera.zoom - 4, TILE_SIZE * camera.zoom - 4);
            
            drawTile(x, y);
           
        }
    }
};
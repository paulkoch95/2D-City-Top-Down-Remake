var logic = {};


logic.tick = function(map) { //just a regular dumpster fire
	for(
    	var x = Math.max(Math.floor(camera.offset.x / (TILE_SIZE * camera.zoom)), 0);
    	x < Math.min(Math.ceil((camera.offset.x + canvas.width) / (TILE_SIZE * camera.zoom)), map.WIDTH);
    	x++) {

        for(
        	var y = Math.max(Math.floor(camera.offset.y / (TILE_SIZE * camera.zoom)), 0);
        	y < Math.min(Math.ceil((camera.offset.y + canvas.height) / (TILE_SIZE * camera.zoom)), map.HEIGHT);
        	y++) {

            if(map.tiles[x][y].building.hasOwnProperty('animations')) {
                for(var i = 0; i < map.tiles[x][y].building.animations.length; i++) {
                	 
                     map.tiles[x][y].building.animations[i].currentState_ms += LOGIC_TICK_DURATION;
                     if(map.tiles[x][y].building.animations[i].currentState_ms >= map.tiles[x][y].building.animations[i].duration_ms) {
                        switch(map.tiles[x][y].building.animations[i].repeatType) {
                            case ANIMATION_REPEAT_TYPES.INFINITE:
                                map.tiles[x][y].building.animations[i].currentState_ms = 0;
                            break;
                                
                            case ANIMATION_REPEAT_TYPES.ONCE:
                                //Remove that animation
                                map.tiles[x][y].building.animations.splice(i, 1);
                                i--;
                            break;
                        }
                     }
                }
            }
           
        }
    }
}
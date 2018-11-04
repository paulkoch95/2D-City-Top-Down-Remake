var tileLogic = {};


tileLogic.setup = function() {
   
}

tileLogic.updateTile = function(map, x, y, recursive) {
    recursive = recursive || true;
    switch(map.tiles[x][y].ground.type) {
        case GROUND_TYPES.stone:
            tile_ground_stone.update(map, x, y, recursive);
        break;
    }
    switch(map.tiles[x][y].building.type) {
        case BUILDING_TYPES.forest:
            tile_building_forest.update(map, x, y, recursive);//Call foresTile connective tile algor 
        break;

        case BUILDING_TYPES.river:
            tile_building_river.update(map, x, y, recursive);//Call foresTile connective tile algor 
        break;
    }
};

tileLogic.updateEverything = function(map) {
	for(var x = 0; x < map.WIDTH; x++) {
        for(var y = 0; y < map.HEIGHT; y++) {
        	this.updateTile(map, x, y, false);
        }
    }
};
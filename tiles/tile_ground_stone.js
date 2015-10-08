var tile_ground_stone = {};
//MUCH TODO!

tile_ground_stone.update = function(map, x, y, recursive) {
	//Count neighbours
	var grass_neighbours = 0;
	for(var ix = Math.max(0, x - 1); ix < Math.min(map.WIDTH, x + 2); ix++) {
		for(var iy = Math.max(0, y - 1); iy < Math.min(map.HEIGHT, y + 2); iy++) {
			if(ix != x || iy != y) {
				if(map.tiles[ix][iy].ground.type == GROUND_TYPES.grass) {
					grass_neighbours++; 
				}
			} 
		}
	}
	map.tiles[x][y].ground.data.overgrowth = Math.min(Math.round(2 * grass_neighbours / 8 - 0.1), 8); //TODO: Seed!

};
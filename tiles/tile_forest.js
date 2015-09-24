var tile_forest = {};
//MUCH TODO!

tile_forest.update = function(map, x, y, recursive) {
	//Count neighbours
	var neighbours = 0;
	for(var ix = Math.max(0, x - 1); ix < Math.min(map.WIDTH, x + 2); ix++) {
		for(var iy = Math.max(0, y - 1); iy < Math.min(map.HEIGHT, y + 2); iy++) {
			if(ix != x || iy != y) {
				if(map.tiles[ix][iy].building.type == BUILDING_TYPES.forest) {
					neighbours++; 
				}
			} 
		}
	}
	map.tiles[x][y].building.data.neighbours = neighbours;
};
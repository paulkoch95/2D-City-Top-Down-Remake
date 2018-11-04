var tile_building_river = {};

var direction_stencils = [
	{
		stencil: 	[[0, 0, 0],
                     [1, 0, 1],
                     [0, 0, 0]],
		dir:		DIRECTIONS.vertical
	},
	{
		stencil: 	[[0, 1, 0],
                     [0, 0, 0],
                     [0, 1, 0]],
		dir:		DIRECTIONS.horizontal
	},
	{
		stencil: 	[[0, 1, 0],
                     [0, 0, 1],
                     [0, 0, 0]],
		dir:		DIRECTIONS.curve_left_down
	},
	{
		stencil: 	[[0, 0, 0],
                     [1, 0, 0],
                     [0, 1, 0]],
		dir:		DIRECTIONS.curve_top_right
	},
	{
		stencil: 	[[0, 1, 0],
                     [0, 0, 1],
                     [0, 1, 0]],
		dir:		DIRECTIONS.junction_left_right_down
	},
	{
		stencil: 	[[0, 0, 0],
                     [1, 0, 1],
                     [0, 1, 0]],
		dir:		DIRECTIONS.junction_top_right_down
	},
	{
		stencil: 	[[0, 1, 0],
                     [1, 0, 0],
                     [0, 1, 0]],
		dir:		DIRECTIONS.junction_top_right_left
	},
	{
		stencil: 	[[0, 1, 0],
                     [1, 0, 1],
                     [0, 0, 0]],
		dir:		DIRECTIONS.junction_top_left_down
	}
];


function stencil_compare (s1, s2) {
	for (var x = 0; x < s1.length; x++) {
		for (var y = 0; y < s1[x].length; y++) {
			if ((x == 0 && y == 0) || (x == 2 && y == 0) || (x == 0 && y == 2) || (x == 2 && y == 2)) continue; //Skip corners

			if (s1[x][y] != s2[x][y]) return false;
		}
	}
	return true;
}

// junction_left_right_down:4,junction_top_right_down:5

tile_building_river.update = function(map, x, y, recursive) {
 
	//Create Neighbour Map:
	var neighbours = [[0, 0, 0],
                      [0, 0, 0],
                      [0, 0, 0]];
     
	for(var ix = Math.max(0, x - 1); ix < Math.min(map.WIDTH, x + 2); ix++) {
		for(var iy = Math.max(0, y - 1); iy < Math.min(map.HEIGHT, y + 2); iy++) {
			
			if(ix == x && iy == y) continue;

			if(map.tiles[ix][iy].building.type == BUILDING_TYPES.river) {
				neighbours[ix - x + 1][iy - y + 1] = 1;
			}
			
		}
	}

	
	// console.log("Updating river.");
	// console.log(neighbours);
	
	for (var sten = 0; sten < direction_stencils.length; sten++) {
		if(stencil_compare(direction_stencils[sten].stencil, neighbours)) {
			map.tiles[x][y].building.data.direction = direction_stencils[sten].dir;

			// console.log("Direction: " + map.tiles[x][y].building.data.direction);
			return;
		}
	}
	// console.log("No match fdound..");
	// map.tiles[x][y].building.data.neighbours = neighbours;
	// map.tiles[x][y].building.data.density = Math.min(Math.round(0.5 + 3 * neighbours / 8), 8); //TODO: Seed!


};
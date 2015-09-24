worldgen = {};

worldgen.createMap = function(map) {
    //Test World Gen:
    for(var x = 0; x < map.WIDTH; x++) {
        map.tiles.push([]);
        for(var y = 0; y < map.HEIGHT; y++) {
            map.tiles[x].push({
                ground: (Math.random() > 0.15 ? GROUND_TYPES.grass : GROUND_TYPES.grass),
                building: {type: (Math.random() > 0.50 ? BUILDING_TYPES.empty : BUILDING_TYPES.forest), data: {}}
            });
        }
    }
    tileLogic.updateEverything(map);
    for(var x = 0; x < map.WIDTH; x++) {
        for(var y = 0; y < map.HEIGHT; y++) {
            if (x > 0 && y > 0 && x<map.WIDTH - 1 && y<map.HEIGHT - 1){
                if (map.tiles[x][y].building.data.neighbours < 4){
                   map.tiles[x][y].building = {type:BUILDING_TYPES.empty,data:{}}; 
                }
                 
                //map.tiles[x][y].building = {type:BUILDING_TYPES.forest,data:{}};
            }
        }
    }
   tileLogic.updateEverything(map);
}
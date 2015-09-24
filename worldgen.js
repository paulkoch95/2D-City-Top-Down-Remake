worldgen = {};

worldgen.createMap = function(map) {
    //Test World Gen:
    for(var x = 0; x < map.WIDTH; x++) {
        map.tiles.push([]);
        for(var y = 0; y < map.HEIGHT; y++) {
            map.tiles[x].push({
                ground: (Math.random() > 0.15 ? GROUND_TYPES.grass : GROUND_TYPES.stone),
                building: {type: (Math.random() > 0.50 ? BUILDING_TYPES.empty : BUILDING_TYPES.forest), data: {}}
            });
        }
    }
    tileLogic.updateEverything(map);
}
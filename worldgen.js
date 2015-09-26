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
    placeRiver(0,0,30,30,0,40);
    function placeRiver(x,y,endX,endY,currentLength,length){
        
        if(x == endX && y == endY || currentLength==length){
            return;
        }else{
            map.tiles[x][y].building = {type:BUILDING_TYPES.pylon,data:{}};
            currentLength++;
            console.log(currentLength);
            placeRiver((Math.random() < 0.5 ? x+1 : x+0),(Math.random() < 0.5 ? y+1 : y+0),endX,endY,currentLength,length);
            
        }
        
    }
    tileLogic.updateEverything(map);
}
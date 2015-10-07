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
    //DIRECTIONS!
    //--|01|--
    //02|Tl|03
    //--|04|--
    placeRiver(0,0,0,20,0.5);
    function placeRiver(x,y,currentLength,length,direction){
        if(x==map.WIDTH || y==map.HEIGHT){
            return;
        }else{
            if(currentLength==length){
                placeRiver(x,y,0,50,0.2);
                placeRiver(x,y,0,50,0.7);
                //placeRiver(x,y+1,0,10,split+=1);
            }else{
                if(Math.random()<direction){
                    map.tiles[x][y].building = {type:BUILDING_TYPES.river,data:{direction: Math.round(direction), variation: Math.round(1 - (0.7 * Math.random()))}}; // TODO!
                    currentLength++;
                    placeRiver(x+1,y,currentLength,length,direction);
                }else{
                    map.tiles[x][y].building = {type:BUILDING_TYPES.river,data:{direction: Math.round(direction), variation: Math.round(1 - (0.7 * Math.random()))}}; // TODO!
                    currentLength++;
                    placeRiver(x,y+1,currentLength,length,direction);
                }


            }
        }
    }
    tileLogic.updateEverything(map);
}
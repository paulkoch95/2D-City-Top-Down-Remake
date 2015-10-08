var worldgen = {};

worldgen.createMap = function(map) {
    //Test World Gen:

    //Fill with grass:
    for (var x = 0; x < map.WIDTH; x++) {
        map.tiles.push([]);
        for (var y = 0; y < map.HEIGHT; y++) {
            map.tiles[x].push({
                ground: {type: GROUND_TYPES.grass, data: {}},
                building: {type: BUILDING_TYPES.empty, data: {}}
            });
        }
    }

    //Generate Stone patches:
    // Not done im any way - TODO!
    var amount = Math.round(Math.random() * 3 + 4);
    for (var i = 0; i < amount; i++) {
        var radius = Math.round(Math.random() * 2 + 2), 
            sx = Math.round(Math.random() * (map.WIDTH - 1)),
            sy = Math.round(Math.random() * (map.WIDTH - 1));
        for (var x = Math.max(0, sx - radius); x <= Math.min(sx + radius, map.WIDTH - 1); x++) {
            for (var y = Math.max(0, sy - radius); y <= Math.min(sy + radius, map.HEIGHT - 1); y++) {
                if(Math.sqrt(Math.pow(x - sx, 2) + Math.pow(y - sy, 2)) <= radius && Math.random() > 0.2) {
                    map.tiles[x][y].ground = {type: (GROUND_TYPES.stone), data: {variation: 0}};
                }
            }
        }
         for (var x = Math.max(0, sx - radius - 1); x <= Math.min(sx + radius + 1, map.WIDTH - 1); x++) {
            for (var y = Math.max(0, sy - radius - 1); y <= Math.min(sy + radius + 1, map.HEIGHT - 1); y++) {
                if(Math.sqrt(Math.pow(x - sx, 2) + Math.pow(y - sy, 2)) <= radius && Math.random() > 0.5) {
                    map.tiles[x][y].building = {type: (BUILDING_TYPES.boulders), data: {variation: Math.round(Math.random())}};
                }
            }
        }
    }

    tileLogic.updateEverything(map);



    //Generate Forests:
    for(var x = 0; x < map.WIDTH; x++) {
        for(var y = 0; y < map.HEIGHT; y++) {
            if (Math.random() > 0.5){  
                map.tiles[x][y].building = {type: BUILDING_TYPES.forest, data: {variation: Math.round(Math.random())}};
            }
        }
    }
    tileLogic.updateEverything(map);
    for(var x 
        = 0; x < map.WIDTH; x++) {
        for(var y = 0; y < map.HEIGHT; y++) {
            if (x > 0 && y > 0 && x<map.WIDTH - 1 && y<map.HEIGHT - 1){
                if (map.tiles[x][y].building.type == BUILDING_TYPES.forest && (map.tiles[x][y].building.data.neighbours < 4 ||
                    map.tiles[x][y].ground.type == GROUND_TYPES.stone)) {
                   map.tiles[x][y].building = {type:BUILDING_TYPES.empty,data:{}}; 
                }
            }
        }
    }
    


    //Generate River: 
    placeRiver(0,0,0,20,0.5);
    function placeRiver(x,y,currentLength,length,tendency){
        if(x==map.WIDTH || y==map.HEIGHT){
            return;
        }else{
            if(currentLength==length){
                placeRiver(x,y,0,50,0.2);
                placeRiver(x,y,0,50,0.7);
                //placeRiver(x,y+1,0,10,split+=1);
            }else{
                if(Math.random()<tendency){
                    map.tiles[x][y].building = {type:BUILDING_TYPES.river,data:{direction: DIRECTIONS.horizontal,variation: Math.round(1 - (0.7 * Math.random()))}}; // TODO!
                    currentLength++;
                    placeRiver(x+1,y,currentLength,length,tendency);
                }else{
                    map.tiles[x][y].building = {type:BUILDING_TYPES.river,data:{direction: DIRECTIONS.vertical,variation: Math.round(1 - (0.7 * Math.random()))}}; // TODO!
                    currentLength++;
                    placeRiver(x,y+1,currentLength,length,tendency);
                }


            }
        }
    }
    //Defining River Directions
    function defineDirections(){
      for(var x = 0; x < map.WIDTH; x++) {
        for(var y = 0; y < map.HEIGHT; y++) {
            if (x > 0 && y > 0 && x<map.WIDTH - 1 && y<map.HEIGHT - 1){
                if(map.tiles[x][y-1].building.data.direction == DIRECTIONS.vertical && (map.tiles[x+1][y].building.data.direction == DIRECTIONS.horizontal || map.tiles[x+1][y].building.data.direction == DIRECTIONS.vertical)){
                    map.tiles[x][y].building.data.direction = DIRECTIONS.curve_top_right;
                }
                if((map.tiles[x-1][y].building.data.direction == DIRECTIONS.horizontal || map.tiles[x-1][y].building.data.direction == DIRECTIONS.curve_top_right) && (map.tiles[x][y+1].building.data.direction == DIRECTIONS.vertical || map.tiles[x][y+1].building.data.direction == DIRECTIONS.curve_top_right)){
                    map.tiles[x][y].building.data.direction = DIRECTIONS.curve_right_down;
                }
                if(map.tiles[x-1][y].building.type == BUILDING_TYPES.river && map.tiles[x+1][y].building.type == BUILDING_TYPES.river && map.tiles[x][y+1].building.type == BUILDING_TYPES.river){
                    map.tiles[x][y].building.data.direction = DIRECTIONS.junction_left_right_down;
                }
                if(map.tiles[x][y-1].building.type == BUILDING_TYPES.river && map.tiles[x][y+1].building.type == BUILDING_TYPES.river && map.tiles[x+1][y].building.type == BUILDING_TYPES.river){
                    map.tiles[x][y].building.data.direction = DIRECTIONS.junction_top_right_down;
                }
            }
        }
      }  
    }
    defineDirections();
    tileLogic.updateEverything(map);
    defineDirections();
}
var tileLogic = {};


tileLogic.setup = function() {
   
}

tileLogic.updateTile = function(map, x, y, recursive) {
    recursive = recursive || true;
    switch(map.tiles[x][y].building.type) {
        case BUILDING_TYPES.forest:
            tile_forest.update(map, x, y, recursive);//Call foresTile connective tile algor 
        break;
    }
};
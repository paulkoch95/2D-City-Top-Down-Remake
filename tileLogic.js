var tileLogic = {};


tileLogic.setup = function() {
   
}

tileLogic.updateTile = function(x, y, recursive) {
    recursive = recursive || true;
    switch(tiles[x][y].building.type) {
        case BUILDING_TYPES.forest:
            tile_forest.update(x, y, recursive);//Call foresTile connective tile algor 
        break;
    }
};
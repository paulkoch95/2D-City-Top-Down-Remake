var tileLogic = {};


tileLogic.setup = function() {
   
}

tileLogic.updateTile = function(x, y, recursive) {
    recursive = recursive || true;
    switch(tiles[x][y].building) {
        case BUILDING_TYPES.forest:
            tile_forest.update(x, y, recursive);
        break;
    }
};
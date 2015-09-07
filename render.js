var render = {}, 
camera,
TILE_SIZE = 32;


render.setup = function() {
    camera = {offset: {x: 0, y: 0}, zoom: 1};
};

render.clear = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

render.draw = function() {
    for(var x = Math.floor(camera.offset.x / TILE_SIZE); x < Math.ceil((camera.offset.x + canvas.width) / TILE_SIZE); x++) {
        for(var y = Math.floor(camera.offset.y / TILE_SIZE); y < Math.ceil((camera.offset.y + canvas.height) / TILE_SIZE); y++) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(x * TILE_SIZE - camera.offset.x + 4, y * TILE_SIZE - camera.offset.y + 4, TILE_SIZE - 4, TILE_SIZE - 4);
        }
    }
};
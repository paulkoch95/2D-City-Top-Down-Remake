///////////
//CORE.JS//
///////////

var canvas, ctx, midP,
tiles, sprites,
MAP_WIDTH = 64, MAP_HEIGHT = 64, BORDER_THICKNESS = 5,
GROUND_TYPES = {grass: 0, stone: 1, darkStone: 2},
BUILDING_TYPES = {emtpy: 0, forest: 1, pylon: 2};

window.onload = function () {
	//Stuff
	canvas = document.getElementById('board');
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    midP = {x : Math.round(canvas.width / 2), y : Math.round(canvas.height / 2)};
    window.onresize = function(event) {
		//Change variables when the window is resized
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		midP.x = Math.round(canvas.width / 2);
		midP.y = Math.round(canvas.height / 2);
	};


    mouse.setup();
    render.setup();


    
    tiles = [];

    //Test World Gen:
    for(var x = 0; x < MAP_WIDTH; x++) {
        tiles.push([]);
        for(var y = 0; y < MAP_HEIGHT; y++) {
            tiles[x].push({
                ground: (Math.random() > 0.15 ? GROUND_TYPES.grass : GROUND_TYPES.stone),
                building: {type: (Math.random() > 0.50 ? BUILDING_TYPES.empty : BUILDING_TYPES.forest), data: {}}
            });
        }
    }




    ///////////////////
    tick();
    ///////////////////
};

function tick() {
    //Do cool stuff
    //console.log(mouse);
    render.draw();
    
    requestAnimationFrame(tick);
}



function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }
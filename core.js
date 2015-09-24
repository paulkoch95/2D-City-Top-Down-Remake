///////////
//CORE.JS//
///////////

var canvas, ctx, midP,
map,

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
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
	};


    mouse.setup();
    render.setup();


    map = {
        WIDTH: 1024, HEIGHT: 1024, BORDER_THICKNESS: 5,
        tiles: [], sprites: []
    };


    worldgen.createMap(map);




    ///////////////////
    tick();
    ///////////////////
};

function tick() {
    //Do cool stuff
    //console.log(mouse);
    render.draw(map);
    
    requestAnimationFrame(tick);
}



function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }
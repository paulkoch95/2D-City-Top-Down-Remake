///////////
//CORE.JS//
///////////

var canvas, ctx, midP,
map,

GROUND_TYPES = {grass: 0, stone: 1, darkStone: 2},
BUILDING_TYPES = {emtpy: 0, forest: 1, pylon: 2, river: 3},
DIRECTIONS = {horizontal:0,vertical:1,curve_top_right:2,curve_right_down:3,junction_left_right_down:4,junction_top_right_down:5};

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
        //TODO: reset camera
	};


    map = {
        WIDTH: 64, HEIGHT: 64, BORDER_THICKNESS: 0,
        tiles: [], sprites: []
    };


    mouse.setup();
    render.setup(map);



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
var canvas, ctx, midP,
tiles, sprites,
MAP_WIDTH = 64, MAP_HEIGHT = 64, GRUND_TYPES = {grass: 0, stone: 1}, BUILDING_TYPES;

window.onload = function () {
	//Stuff
	canvas = document.getElementById('board');
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx = canvas.getContext('2d');
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


    //Fill tiles with grass: TODO!
    for(var x = 0; x < MAP_WIDTH; x++) {
        tiles.push([]);
        for(var y = 0; y < MAP_HEIGHT; y++) {
            tiles[y].push({ground: GRUND_TYPES.grass});
        }
    }




    ///////////////////
    tick();
    ///////////////////
};

function tick() {
    //Do cool stuff
    //console.log(mouse);

    
    requestAnimationFrame(tick);
}




function rgbaStr(color) {
    var nR, nG, nB, nA;
    nR = Math.round(color.r);
    nG = Math.round(color.g);
    nB = Math.round(color.b);
    nA = color.a;
    return "rgba(" + String(nR) + ", " + String(nG) + ", " + String(nB) + ", "  + String(nA) + ")";
}


// By http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslaToRgb(h, s, l, a){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: a};
}

function cloneColor(color) {
    return {r: color.r, g: color.g, b: color.b, a: color.a};
}

function colorVar(color, d) {
    function rand(d) {
        return d - (Math.random() * 2 * d);
    }
    return {r: color.r + rand(d), g: color.g + rand(d), b: color.b + rand(d), a: color.a};
}

function mixColors(col1, col2, pos) {
    //Returns the color that's a mix between the 2 given ones, with position being the ratio between them
    var nR, nG, nB, nA;
    nR = Math.round(col1.r * (1 - pos) + col2.r * pos);
    nG = Math.round(col1.g * (1 - pos) + col2.g * pos);
    nB = Math.round(col1.b * (1 - pos) + col2.b * pos);
    nA = col1.a * (1 - pos) + col2.a * pos;

    return {col: {r: nR, g: nG, b: nB, a: nA},
            string: "rgba(" + String(nR) + ", " + String(nG) + ", " + String(nB) + ", "  + String(nA) + ")"};
}
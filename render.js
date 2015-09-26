var render = {}, 
camera,
maxZoom, minZoom,
TILE_SIZE = 32;
var TILE_SHEET = new Image();


render.setup = function(map) {
    TILE_SHEET.src = "tilesheet.png" //Image which contains all tilesImages
    camera = {offset: {x: 0, y: 0}, zoom: 1, enableBoundaries: true};//Initial offset and zoom level

    maxZoom = Math.min(canvas.width/(TILE_SIZE * 2), canvas.height/(TILE_SIZE * 2));
    minZoom = Math.max(canvas.width/(TILE_SIZE * map.WIDTH), canvas.height/(TILE_SIZE * map.HEIGHT));



    //TODO: Smooth translations
    camera.move = function(x, y) {
        if(camera.enableBoundaries) {
    	   camera.offset.x = Math.min(Math.max(camera.offset.x + x, 0), TILE_SIZE * camera.zoom * map.WIDTH - canvas.width);
    	   camera.offset.y = Math.min(Math.max(camera.offset.y + y, 0), TILE_SIZE * camera.zoom * map.WIDTH - canvas.height);
        } else {
            camera.offset.x += x;
            camera.offset.y += y;
        }
    	
    };
    camera.changeZoom = function(factor) {
        //TODO: Min/Max zoom level -> boundaries!
        if(camera.enableBoundaries) {
            factor = Math.max(Math.min(factor, maxZoom / camera.zoom), minZoom / camera.zoom);
        }
        camera.zoom *= factor;
        camera.move(sign(factor) * (factor - 1) * (mouse.coords.x + camera.offset.x), sign(factor) * (factor - 1) * (mouse.coords.y + camera.offset.y));
    };
};

render.clear = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

render.draw = function(map) {

    function drawTile(map, x, y) {
    	var tile = map.tiles[x][y];
    	var sx, sy, scol;

    	//Ground:
    	switch(tile.ground) {//Define which tiles should be drawn form the tileSheet and define its LOD Color 
    		case GROUND_TYPES.grass:
    			sx = 0;
    			sy = 0;
    			scol = "green"; //TODO!

    		break;
    		case GROUND_TYPES.stone:
    			sx = 1;
    			sy = 0;
    			scol = "gray"; //TODO!
    		break;
            case GROUND_TYPES.darkStone:
                sx = 3;
                sy = 0;
                scol = "gray"; //TODO!
            break;
    	}
    	if (camera.zoom < 0.5) {//TODO!
    		ctx.fillStyle = scol;
    		ctx.fillRect(x * TILE_SIZE * camera.zoom - camera.offset.x,y * TILE_SIZE * camera.zoom - camera.offset.y,TILE_SIZE*camera.zoom,TILE_SIZE*camera.zoom);
    	} else {
    		ctx.drawImage(TILE_SHEET,sx * TILE_SIZE,sy * TILE_SIZE,TILE_SIZE,TILE_SIZE,x * TILE_SIZE * camera.zoom - camera.offset.x,y * TILE_SIZE * camera.zoom - camera.offset.y,TILE_SIZE*camera.zoom,TILE_SIZE*camera.zoom);
    	}

    	//Building:
    	switch(tile.building.type) {
    		 case BUILDING_TYPES.forest:
                switch(tile.building.data.density) {
                    case 1:
                         switch(tile.building.data.variation) {
                             case 0:
                                 sx=4;
                                 sy=1;
                             break;
                             case 1:
                                 sx=5;
                                 sy=1;
                             break;
                         }
                    break;

                    case 2:
                         switch(tile.building.data.variation) {
                             case 0:
                                 sx=2;
                                 sy=1;
                             break;
                             case 1:
                                 sx=3;
                                 sy=1;
                             break;
                         }
                    break;

                    case 3:
                         switch(tile.building.data.variation) {
                             case 0:
                                 sx=0;
                                 sy=1;
                             break;
                             case 1:
                                 sx=1;
                                 sy=1;
                             break;
                         }
                    break;
                }
                scol = "green";
    		 break;
    		 case BUILDING_TYPES.pylon:
    		 	sx = 15;
    			sy = 0;
    			scol = "black";
    		 break;
             case BUILDING_TYPES.river:
    		 	sx = 0;
    			sy = 2;
    		 break;
    	}

    	if(tile.building.type != BUILDING_TYPES.empty) {//TODO! (?)
    		ctx.drawImage(TILE_SHEET, sx * TILE_SIZE, sy * TILE_SIZE,TILE_SIZE,TILE_SIZE,x * TILE_SIZE * camera.zoom - camera.offset.x,y * TILE_SIZE * camera.zoom - camera.offset.y,TILE_SIZE*camera.zoom,TILE_SIZE*camera.zoom);
    	}

        //Map-Border:
        //Just experimental. TODO!
        if(x < map.BORDER_THICKNESS || x > map.WIDTH - map.BORDER_THICKNESS || y < map.BORDER_THICKNESS || y > map.HEIGHT - map.BORDER_THICKNESS) {
            var off = Math.min(x, map.WIDTH - x, y, map.HEIGHT - y);
            ctx.fillStyle = "rgba(0, 0, 0, " + (0.7 - 0.4 * (off / map.BORDER_THICKNESS)) + ")";
            ctx.fillRect(Math.round(x * TILE_SIZE * camera.zoom - camera.offset.x), Math.round(y * TILE_SIZE * camera.zoom - camera.offset.y), Math.round(TILE_SIZE*camera.zoom), Math.round(TILE_SIZE*camera.zoom));
    	}

        //Mouse-Hover. Just experimental as well. TODO!
        if(x == mouse.tile.x && y == mouse.tile.y) {
             ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.fillRect(Math.round(x * TILE_SIZE * camera.zoom - camera.offset.x), Math.round(y * TILE_SIZE * camera.zoom - camera.offset.y), Math.round(TILE_SIZE*camera.zoom), Math.round(TILE_SIZE*camera.zoom));
        }

    }

	this.clear();
    for(
    	var x = Math.max(Math.floor(camera.offset.x / (TILE_SIZE * camera.zoom)), 0);
    	x < Math.min(Math.ceil((camera.offset.x + canvas.width) / (TILE_SIZE * camera.zoom)), map.WIDTH);
    	x++) {

        for(
        	var y = Math.max(Math.floor(camera.offset.y / (TILE_SIZE * camera.zoom)), 0);
        	y < Math.min(Math.ceil((camera.offset.y + canvas.height) / (TILE_SIZE * camera.zoom)), map.HEIGHT);
        	y++) {

            //ctx.strokeStyle = "blue";
            //ctx.strokeRect(x * TILE_SIZE * camera.zoom - camera.offset.x + 4, y * TILE_SIZE * camera.zoom - camera.offset.y + 4, TILE_SIZE * camera.zoom - 4, TILE_SIZE * camera.zoom - 4);
            
            drawTile(map, x, y);
           
        }
    }
};

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
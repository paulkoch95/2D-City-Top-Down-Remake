function animation(repeatType, duration_ms, currentState_ms){
	this.repeatType = repeatType;
	this.duration_ms = duration_ms;
	this.currentState_ms = currentState_ms;
}



function flowingRiver() {
	animation.call(this, ANIMATION_REPEAT_TYPES.INFINITE, 100, 0);

	var MAX_FRAMES = 2;

	this.getTileSheetPos = function() {
		var current_frame = Math.floor(MAX_FRAMES * (this.currentState_ms / this.duration_ms));
		return {x: current_frame, y: 2};

	};
}


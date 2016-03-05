"use strict";

class Velocity {
	constructor() {
		this.dx = 0;
		this.dy = 0;
		this.dz = 0;
		this.rotx = 0;
		this.roty = 0;
		this.rotz = 0;
	}

	setDz(num) {
		this.dz += num;
	}

	setDx(num) {
		this.dx += num;
	}

	setDy(num) {
		this.dy += num;
	}
}
"use strict";

class Bolt {
	constructor(object, scene) {
		this.model = object.clone();
		this.delta = 4;
		// this.timeAlive = 1000;
	}

	advance() {
		this.model.translateZ(-this.delta);
		// this.timeAlive--;
		this.model.updateMatrix();
	}
}
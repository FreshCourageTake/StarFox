"use strict";

class asteroidClone {
    constructor(mdl) {
    	this.type = "big";

		this.rotateX = Math.random() * 0.01;
		this.rotateY = Math.random() * 0.01;
		this.rotateZ = Math.random() * 0.01;

		this.tX = Math.random() * 0.1;
		this.tY = Math.random() * 0.1;
		this.tZ = Math.random() * 0.1;	
		this.model = mdl;

		var scaleX = 4 + Math.random() * 25;
		var scaleY = 4 + Math.random() * 25;
		var scaleZ = 4 + Math.random() * 25;
		// this.model.scale.set(scaleX, scaleY, scaleZ);
		
		this.colBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		this.colBox.setFromObject(this.model);
		// this.thing = new THREE.BoundingBoxHelper(this.model);
		// scene.add(this.thing);
    }

    rotateMove() {
		this.model.rotateX(this.rotateX);
		this.model.rotateY(this.rotateY);
		this.model.rotateZ(this.rotateZ);
		this.model.translateX(this.tX);
		this.model.translateY(this.tY);
		this.model.translateZ(this.tZ);	
		if (this.colBox != undefined) {
			this.colBox.setFromObject(this.model);
			this.colBox.expandByScalar(-20);
		}
		// this.thing.update();
    }
}

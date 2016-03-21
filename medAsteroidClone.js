"use strict";

class medAsteroidClone {
    constructor(mdl) {
    	this.type = "med";

		this.rotateX = (Math.random() * 0.04) - 0.02;
		this.rotateY = (Math.random() * 0.04) - 0.02;
		this.rotateZ = (Math.random() * 0.04) - 0.02;

		this.tX = (Math.random() * ROCKSPEED) - HALFSPEED;
		this.tY = (Math.random() * ROCKSPEED) - HALFSPEED;
		this.tZ = (Math.random() * ROCKSPEED) - HALFSPEED;	
		this.model = mdl;
		this.model.position.set(mdl.position.x + Math.random() * 20, mdl.position.y + Math.random() * 20, mdl.position.z + Math.random() * 20);

		this.model.scale.set(4, 4, 4);
		
		this.colBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		this.colBox.setFromObject(this.model);
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
			this.colBox.expandByScalar(-10);
		}
    }
}

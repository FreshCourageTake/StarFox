"use strict";

class smallAsteroidClone {
    constructor(mdl) {
    	this.type = "small";

		this.rotateX = (Math.random() * 0.06) - 0.03;
		this.rotateY = (Math.random() * 0.06) - 0.03;
		this.rotateZ = (Math.random() * 0.06) - 0.03;

		this.tX = (Math.random() * ROCKSPEED) - HALFSPEED;
		this.tY = (Math.random() * ROCKSPEED) - HALFSPEED;
		this.tZ = (Math.random() * ROCKSPEED) - HALFSPEED;	
		this.model = mdl;
		this.model.position.set(mdl.position.x + Math.random() * 10, mdl.position.y + Math.random() * 10, mdl.position.z + Math.random() * 10);
                  console.log("small made");


		this.model.scale.set(1, 1, 1);
		
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
		}
    }
}

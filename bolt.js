"use strict";

class Bolt {
	constructor(object, scene, color) {
		this.model = object.clone();

		// Code to make the lasers into light sources
		var sphere = new THREE.SphereGeometry( .01, 1, 8 );
	    this.pointLight = new THREE.PointLight(color, 1, 100);
	    this.pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) ) );
	    this.pointLight.position.set(laser.model.position.x, laser.model.position.y, laser.model.position.z);
	    this.pointLight.rotation.set(laser.model.rotation.x, laser.model.rotation.y, laser.model.rotation.z);
	    scene.add( this.pointLight );

	    // give the bolt a velocity and a time to live
		this.delta = 4;
		this.timeAlive = 200;
	}

	advance() {
		// move the bullet and the light
		this.model.translateZ(-this.delta);
		this.pointLight.translateZ(-this.delta);
		// age the bolt
		this.timeAlive--;
		this.model.updateMatrix();
	}
}
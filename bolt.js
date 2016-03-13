"use strict";

class Bolt {
    constructor(object, scene, p) {
	this.model = object.clone();
	
	// Code to make the lasers into light sources
	var sphere = new THREE.SphereGeometry( .01, 1, 8 );
	this.pointLight = new THREE.PointLight(0x00ff00, 1, 100);
	this.pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) ) );

	console.log(p);
	if (p == 2) {
		this.pointLight.position.set(laser2.model.position.x, laser2.model.position.y, laser2.model.position.z);
		this.pointLight.rotation.set(laser2.model.rotation.x, laser2.model.rotation.y, laser2.model.rotation.z);
		if (arwing.bullets < 5)
			scene.add( this.pointLight );
	} 
	else {
		this.pointLight.position.set(laser.model.position.x, laser.model.position.y, laser.model.position.z);
		this.pointLight.rotation.set(laser.model.rotation.x, laser.model.rotation.y, laser.model.rotation.z);
		if (tieBomber.bullets < 5)
			scene.add( this.pointLight );
	}
	
	// give the bolt a velocity and a time to live
	this.delta = 4;
	this.timeAlive = 200;
	
	this.colBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	this.colBox.setFromObject(this.model);
	
    }
    
    advance() {
	// move the bullet and the light
	this.model.translateZ(-this.delta + tieBomber.velocity.dz);
	this.pointLight.translateZ(-this.delta + tieBomber.velocity.dz);
	// age the bolt
	this.timeAlive--;
	this.model.updateMatrix();
	if (this.colBox != undefined)
		this.colBox.setFromObject(this.model);
    }
}

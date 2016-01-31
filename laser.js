"use strict";

class Laser {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;

		var geometry = new THREE.SphereGeometry( .05, 10, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		var mesh = new THREE.Mesh( geometry, material );
		this.model = mesh;
	}
}
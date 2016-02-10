"use strict";

class Asteroid {
	constructor(type, scene) {
		var that = this;

		var loader = new THREE.JSONLoader();
		loader.load( type, function ( geometry, materials ) {
		    var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		    mesh.scale.set(30, 30, 30);
		    that.model = mesh;
		});

	}

	clone() {
		if (this.model != undefined) {
	        var newAsteroid = this.model.clone();
	        newAsteroid.position.set(Math.floor((Math.random() * 1000) - 500), 
	                                       Math.floor((Math.random() * 1000) - 500),
	                                       Math.floor((Math.random() * 1000) - 500));
	    }
		return newAsteroid;        
	}
}
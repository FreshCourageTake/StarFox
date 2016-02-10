"use strict";

class Asteroid {
	constructor(type, scene) {
		var that = this;

		var loader = new THREE.JSONLoader(); // downloaded both json and deprecated.  Try those in downlaods
		loader.load( type, function ( geometry, materials ) {
		    var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		    mesh.scale.set(30, 30, 30);
		    that.model = mesh;
		});

        // var loader = new THREE.ObjectLoader();
        // loader.load(type, function ( obj ) {
        // that.model = obj;
        // scene.add( obj );
      // });

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
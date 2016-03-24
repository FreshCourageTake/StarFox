"use strict";

class Asteroid {
	constructor(type, scene) {
		var that = this;

			var mtlLoader = new THREE.MTLLoader();
				mtlLoader.setBaseUrl( 'models/' );
				mtlLoader.setPath( 'models/' );
				mtlLoader.load( 'Asteroid_no_lamp.mtl', function( materials ) {

					materials.preload();

					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					objLoader.setPath( 'models/' );
					objLoader.load( 'Asteroid_no_lamp.obj', function ( object ) {
						object.scale.set(10, 10, 10);
						that.model = object;

					});

				});


	}

	clone() {
		if (this.model != undefined) {
	        var newAsteroid = this.model.clone();
	        newAsteroid.position.set(Math.floor((Math.random() * WORLDSPACE) - HALFWORLD), 
	                                       Math.floor((Math.random() * WORLDSPACE) - HALFWORLD),
	                                       Math.floor((Math.random() * WORLDSPACE) - HALFWORLD));
	    }
		return newAsteroid;        
	}
}
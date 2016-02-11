"use strict";

class Asteroid {
	constructor(type, scene) {
		var that = this;
		// var loader = new THREE.OBJLoader();
		// loader.load(type, function ( obj ) {
		// 	obj.traverse( function ( child ) {
  //             if ( child instanceof THREE.Mesh ) {
  //               child.material.color.setHex(0x302013);
  //             }
  //           } );    
	 //    	that.model = obj;
	 //    	scene.add( obj );
  //     });

			var mtlLoader = new THREE.MTLLoader();
				mtlLoader.setBaseUrl( 'models/' );
				mtlLoader.setPath( 'models/' );
				mtlLoader.load( 'Asteroid.mtl', function( materials ) {

					materials.preload();

					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					objLoader.setPath( 'models/' );
					objLoader.load( 'Asteroid.obj', function ( object ) {
						object.scale.set(10, 10, 10);
						that.model = object;

					});

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
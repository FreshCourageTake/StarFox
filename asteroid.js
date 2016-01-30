"use strict";

class Asteroid {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;
      	loader.load(type, function ( obj ) {
      		obj.position.set(Math.floor((Math.random() * 1000) - 500), 
      						 Math.floor((Math.random() * 1000) - 500),
      						 Math.floor((Math.random() * 1000) - 500));
        	that.model = obj;
        	scene.add( obj );
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
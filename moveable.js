"use strict";

class Moveable {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
      	loader.load(type, function ( obj ) {
        	scene.add( obj );
          });
	}
}
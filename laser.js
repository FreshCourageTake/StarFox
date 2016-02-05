"use strict";

class Laser {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;

		// instantiate a loader
        var loader = new THREE.OBJLoader();

        // load an obj / mtl resource pair
        loader.load(
            // OBJ resource URL
            type,
            // Function when both resources are loaded
            function ( obj ) {

            obj.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material.color.setHex(0x0ff00);
              }
            } );    
        	that.model = obj;
        	that.model.scale.set(1, 1, 2);
     },
        // Function called when downloads progress
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when downloads error
        function ( xhr ) {
            console.log( 'An error happened' );
        });

	}
}
"use strict";

class Laser {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;
        this.velocity = new Velocity();
        // load an obj / mtl resource pair
        loader.load(
            // OBJ resource URL
            type,
            // Function when both resources are loaded
            function ( obj ) {

            obj.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material.color.setHex(0x0ff00);
                child.material.specular.set(0,0,0);
              }
            } );    
        	that.model = obj;
        	that.model.scale.set(.01, .01, .04);
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

    advance() {
        this.model.translateX(this.velocity.dx);
        this.model.translateY(this.velocity.dy);
        this.model.translateZ(this.velocity.dz);
    }

    orient(obj) {
        this.model.position.set(obj.model.position.x, obj.model.position.y, obj.model.position.z);
        this.model.rotation.set(obj.model.rotation.x, obj.model.rotation.y, obj.model.rotation.z);
    }
}
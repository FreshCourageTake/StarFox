"use strict";

class Ship {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;
    var test = null;
    this.lasers = [];
  	loader.load(type, function ( obj ) {
    	that.model = obj;
    	scene.add( obj );
      });
	}

	keyPress() {
      keyboard.update();

      var delta = clock.getDelta(); // seconds.
      // delta was causing jitters (probably due to floating point precision)
      var moveDistance = 2// * delta; // 200 pixels per second
      var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
      
      // local transformations

      // move forwards/backwards and rotate left/right
      if ( keyboard.pressed("W") )
        this.model.translateZ( -moveDistance );
      if ( keyboard.pressed("S") )
        this.model.translateZ(  moveDistance );
      if ( keyboard.pressed("A") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      }
      if ( keyboard.pressed("D") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      }

      // strafe left/right
      // if ( keyboard.pressed("Q") )
      //   this.model.translateX( -moveDistance );
      // if ( keyboard.pressed("E") )
      //   this.model.translateX(  moveDistance ); 

      // rotate left/right/up/down
      var rotation_matrix = new THREE.Matrix4().identity();
      if ( keyboard.pressed("I") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
      }
      if ( keyboard.pressed("K") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
      }
      if ( keyboard.pressed("J") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
        laser.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
      }
      if ( keyboard.pressed("L") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
        laser.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
      }

      if ( keyboard.pressed("space") ) {
        audio = new Audio('tie_fire.mp3');
        // if (audio.ended)
          audio.play();
        var bolt = new Bolt(laser.model, scene);
        // var bolt2 = new Bolt(laser.model, scene);
        // bolt2.model.position.set(this.model.position.x + .6, this.model.position.y, this.model.position.z - 1);
        bolt.model.position.set(this.model.position.x, this.model.position.y, this.model.position.z);
        this.lasers.push(bolt);
        // this.lasers.push(bolt2);
        // scene.add(bolt2.model);
        scene.add(bolt.model);
      }
      
      // reset ship position
      if ( keyboard.pressed("Z") )
      {
        this.model.position.set(0,0,0);
        this.model.rotation.set(0,0,0);
      }
      
      var relativeCameraOffset = new THREE.Vector3(0,1,6);

      var cameraOffset = relativeCameraOffset.applyMatrix4( this.model.matrixWorld );

      camera.position.x = cameraOffset.x;
      camera.position.y = cameraOffset.y;
      camera.position.z = cameraOffset.z;
      camera.lookAt( this.model.position );
      
      // camera.updateMatrix();
      // camera.updateProjectionMatrix();
          
      // controls.update();
      // stats.update();
    }
}
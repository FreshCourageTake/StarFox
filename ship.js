"use strict";

var CHARGED = 25;

class Ship {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;
    var test = null;
    this.soundPlayed = false;
    this.lasers = [];
    this.charge = 0;
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
      if ( keyboard.pressed("W") ) {
        this.model.translateZ( -moveDistance );
        laser.model.translateZ( -moveDistance );
      }
      if ( keyboard.pressed("S") ) {
        this.model.translateZ(  moveDistance );
        laser.model.translateZ( moveDistance );
      }
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
        this.charge++;
        if (this.charge >= CHARGED && !this.soundPlayed) {
          audio = new Audio('charge_laser.mp3');
          audio.play();
          this.soundPlayed = true;
        }
      }

      // fire on key up so we can do charging bullets
      if ( keyboard.up("space") ) {
        if (this.charge > CHARGED + 100) {
          audio = new Audio('explosion.mp3');
          audio.play();
          var chargedBolt = new Bolt(bullet, scene, 0xff0000); // change laser.model
          chargedBolt.model.position.set(laser.model.position.x, laser.model.position.y, laser.model.position.z);
          chargedBolt.model.rotation.set(laser.model.rotation.x, laser.model.rotation.y, laser.model.rotation.z);
          this.lasers.push(chargedBolt);
          scene.add(chargedBolt.model);
          this.charge = 0;
          this.soundPlayed = false;
        }
        else {
          audio = new Audio('tie_fire.mp3');
          audio.play();
          var bolt = new Bolt(laser.model, scene, 0x00ff00);
          bolt.model.position.set(laser.model.position.x, laser.model.position.y, laser.model.position.z);
          bolt.model.rotation.set(laser.model.rotation.x, laser.model.rotation.y, laser.model.rotation.z);
          this.lasers.push(bolt);
          scene.add(bolt.model);
          this.charge = 0;
          this.soundPlayed = false;
        }
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
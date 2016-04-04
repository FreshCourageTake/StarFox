"use strict";

var CHARGED = 25;
var oldZ = 0;
var oldY = 0;
var oldX = 0;

class Ship {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;
    var test = null;
    this.alive = true;
    this.velocity = new Velocity();
    this.orientationXZ = 0;
    this.orientationYZ = 0;
    this.orientationZ = 0;
    this.soundPlayed = false;
    this.lasers = [];
    this.charge = 0;
    this.bullets = 0;

  	loader.load(type, function ( obj ) {      
    	that.model = obj;
      scene.add( obj );

      that.colBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      that.colBox.setFromObject(that.model);
      });
	}

  advance() {
    this.model.translateZ(this.velocity.dz);
    this.model.translateX(this.velocity.dx);
    this.model.translateY(this.velocity.dy);
    this.colBox.setFromObject(this.model);
  }

  kill() {
    this.velocity.dx = this.velocity.dy = this.velocity.dz = 0;
    laser.velocity.dx = laser.velocity.dy = laser.velocity.dz = 0;

    scene.remove(this.model);
    parts.push(new ExplodeAnimation(this.model.position.x, this.model.position.y, this.model.position.z, true));
    audio = new Audio('asteroid_explosion.mp3');
    audio.play();
    audio = new Audio('Wilhelm-Scream.mp3');
    audio.play();
    this.alive = false;
  }

    keyPress(pad) {
      keyboard.update();

      var delta = clock.getDelta(); // seconds.
      // delta was causing jitters (probably due to floating point precision)
      var moveDistance = .05// * delta; // 200 pixels per second
      var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
      var fix = moveDistance;
      var dec = 30;
      // local transformations

      // move forwards/backwards and rotate left/right
      if ( keyboard.pressed("E") ) {
        if (this.velocity.dz > -maxShipSpeed) {
          this.velocity.setDz(-moveDistance);
          laser.velocity.setDz(-moveDistance);
        }
      }
      if ( keyboard.pressed("Q") ) {
        if (this.velocity.dz < maxShipSpeed) {
          this.velocity.setDz(moveDistance);
          laser.velocity.setDz(moveDistance);
        }
      }
      if ( keyboard.pressed("X") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      }
      if ( keyboard.pressed("C") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      }

      // rotate left/right/up/down
      var rotation_matrix = new THREE.Matrix4().identity();
      if ( keyboard.pressed("W") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        this.orientationYZ += rotateAngle;
        oldX = this.model.rotation._x;
        oldY = this.model.rotation._y;
        oldZ = this.model.rotation._z;
      }
      // if (keyboard.up("W") ) {
      //   // this.model.rotation.set(oldX, oldY, oldZ);
      //   // if (this.model.rotation.x < 3.1415 && this.model.rotation.x > 0)
      //   //   this.model.rotation.set(-0,this.model.rotation.y,-0);
      //   // else if (this.model.rotation.x == 0)
      //   //   this.model.rotation.set(0,this.model.rotation.y,0);
      //   // else if (this.model.rotation > 0)
      //   //   this.model.rotation.set(3.14159, this.model.rotation,3.14159);
      //   // else if (this.model.rotation < 0)
      //   //   this.model.rotation.set(-3.14159, this.model.rotation,-3.14159);                    
      // }
      if ( keyboard.pressed("S") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        laser.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        this.orientationYZ -= rotateAngle;
      }
      // if (keyboard.up("S") ) {
      //   // if (this.model.rotation.z > 0)
      //     // this.model.rotation.set(0,this.model.rotation.y,0);
      //   // else
      //     // this.model.rotation.set(3.14159,this.model.rotation.y,3.14159);
      // }
      if ( keyboard.pressed("A") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
        laser.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
      }
      // else if ( keyboard.pressed("A") ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      //   laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      // }
      if ( keyboard.pressed("D") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
        laser.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
      }
      // else if ( keyboard.pressed("D") ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      //   laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      // }
      

      // Controller Support
      if (pad != undefined) {
        if (pad.buttons[5] != undefined && pad.buttons[5].pressed == true ) {
        if (this.velocity.dz > -maxShipSpeed) {
            this.velocity.setDz(-moveDistance);
            laser.velocity.setDz(-moveDistance);
          }
        }
        if (pad.buttons[4] != undefined && pad.buttons[4].pressed == true ) {
        if (this.velocity.dz < maxShipSpeed) {
            this.velocity.setDz(moveDistance);
            laser.velocity.setDz(moveDistance);
          }
        }
          this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
        if ( pad.axes[2] < -0.5 ) { // left/right
          this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
          laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
        }
        if ( pad.axes[2] > 0.5 ) {
          this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
          laser.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
        }
        if ( pad.axes[3] > 0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          laser.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          this.orientationYZ += rotateAngle;
        }
        if ( pad.axes[3] < -0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          laser.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          this.orientationYZ -= rotateAngle;
        }
        if ( pad.axes[0] < -0.2 ) {
          laser.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
        }
        if ( pad.axes[0] > 0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
          laser.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
        }
      }


      if ( keyboard.pressed("space")) {
        this.charge++;
        if (this.charge >= CHARGED && !this.soundPlayed) {
          audio = new Audio('charge_laser.mp3');
          audio.play();
          this.soundPlayed = true;
        }
        if (this.charge > CHARGED + 100) {
          temp.material.visible = true;
        }
      }

      // fire on key up so we can do charging bullets
      if ( keyboard.up("space") || (pad != undefined && pad.buttons[7] != undefined && pad.buttons[7].pressed == true) ) {
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
          temp.material.visible = false;
        }
        else {
            this.bullets++;
            audio = new Audio('tie_fire.mp3');
            audio.play();
            var bolt = new Bolt(laser.model, scene, 0x00ff00);
            bolt.model.position.set(laser.model.position.x, laser.model.position.y, laser.model.position.z);
            bolt.model.rotation.set(laser.model.rotation.x, laser.model.rotation.y, laser.model.rotation.z);
            this.lasers.push(bolt);
            scene.add(bolt.model);
            this.charge = 0;
            this.soundPlayed = false;
          // }
        }
      }
      
      var relativeCameraOffset = new THREE.Vector3(0,1,6);

      var cameraOffset = relativeCameraOffset.applyMatrix4( this.model.matrixWorld );

      camera.position.x = cameraOffset.x;
      camera.position.y = cameraOffset.y;
      camera.position.z = cameraOffset.z;
      camera.lookAt( this.model.position );
    }
}

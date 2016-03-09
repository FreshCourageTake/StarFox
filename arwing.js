"use strict";

var CHARGED = 25;

class Arwing {
	constructor(type, scene) {
		var loader = new THREE.ObjectLoader();
		var that = this;
    var test = null;
    this.velocity = new Velocity();
    this.orientationXZ = 0;
    this.orientationYZ = 0;
    this.orientationZ = 0;
    this.soundPlayed = false;
    this.lasers = [];
    this.charge = 0;
  	loader.load(type, function ( obj ) {
      obj.scale.set(.03, .03, .03); // for arwing
    	that.model = obj;
      scene.add( obj );

      that.colBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      that.colBox.setFromObject(that.model);
      // that.thing = new THREE.BoundingBoxHelper(that.model);
      // scene.add(that.thing);
      });
	}

  advance() {
    // this.model.position.z = this.model.position.z + this.velocity.dz;
    this.model.translateZ(this.velocity.dz);
    this.model.translateX(this.velocity.dx);
    this.model.translateY(this.velocity.dy);
    this.colBox.setFromObject(this.model);
    // this.thing.update();
    // this.model.position.x = this.model.position.x + this.velocity.dx;
    // this.model.position.y = this.model.position.y + this.velocity.dy;
  }

  kill() {
    this.velocity.dx = this.velocity.dy = this.velocity.dz = 0;
    scene.remove(this.model);
    parts.push(new ExplodeAnimation(this.model.position.x, this.model.position.y, this.model.position.z, true));
    audio = new Audio('asteroid_explosion.mp3');
    audio.play();
    audio = new Audio('fox-ahhh.mp3');
    audio.play();
  }

	keyPress() {
      keyboard.update();

      var delta = clock.getDelta(); // seconds.
      // delta was causing jitters (probably due to floating point precision)
      var moveDistance = .05// * delta; // 200 pixels per second
      var rotateAngle = .031;   // pi/2 radians (90 degrees) per second
      var fix = moveDistance;
      // local transformations

      // move forwards/backwards and rotate left/right
      if ( keyboard.pressed("P") ) {
        this.velocity.setDz(-moveDistance);
        laser2.velocity.setDz(-moveDistance);
        // this.model.translateZ( -moveDistance );
        // laser2.model.translateZ( -moveDistance );

        // var angleXZ = -Math.cos(this.orientationXZ);
        // var angleYZ = -Math.cos(this.orientationYZ);

        // if (angleXZ < 0 && angleYZ < 0) {
        //   fix = moveDistance;
        // }
        // else if (angleXZ > 0 && angleYZ > 0) {
        //   fix = -moveDistance * 3;
        // }

        // // console.log( (-angleXZ + -angleYZ) * moveDistance);

        // this.velocity.setDz( ((angleXZ + angleYZ) * moveDistance) + fix );
        // console.log( (angleXZ + angleYZ) * moveDistance + " + " + fix );
        // this.velocity.setDx(Math.sin(this.orientationXZ) * moveDistance);
        // // console.log("Dx: " + this.velocity.dx);
        // // console.log("Dz from xz plane: " + -Math.cos(this.orientationXZ) * moveDistance);

        // // this.velocity.setDz(-Math.cos(this.orientationYZ) * moveDistance);
        // this.velocity.setDy(Math.sin(this.orientationYZ) * moveDistance);
        // // console.log("Dy: " + this.velocity.dy);
        // // console.log("Dz from yz plane: " + -Math.cos(this.orientationYZ) * moveDistance);

        // // this.velocity.setDz(Math.cos(this.orientationZ));
      }
      if ( keyboard.pressed("O") ) {
        // this.model.translateZ(  moveDistance );
        // laser2.model.translateZ( moveDistance );
        this.velocity.setDz(moveDistance);
        laser2.velocity.setDz(moveDistance);
      }
      // if ( keyboard.pressed("A") ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      //   laser2.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      //   // this.orientationXZ -= rotateAngle;
      // }
      // if ( keyboard.pressed("D") ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      //   laser2.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      //   // this.orientationXZ += rotateAngle;
      // }

      // strafe left/right
      // if ( keyboard.pressed("Q") )
      //   this.model.translateX( -moveDistance );
      // if ( keyboard.pressed("E") )
      //   this.model.translateX(  moveDistance ); 

      // rotate left/right/up/down
      var rotation_matrix = new THREE.Matrix4().identity();
      if ( keyboard.pressed("T") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        this.orientationYZ += rotateAngle;
      }
      if ( keyboard.pressed("G") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        this.orientationYZ -= rotateAngle;

      }
      if ( keyboard.pressed("F") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
        laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
      }
      if ( keyboard.pressed("H") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
        laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
      }

      if ( keyboard.pressed("M") ) {
        console.log("pressed B");
        this.charge++;
        if (this.charge >= CHARGED && !this.soundPlayed) {
          audio = new Audio('charge_laser.mp3');
          audio.play();
          this.soundPlayed = true;
        }
        if (this.charge > CHARGED + 100) {
          temp.material.visible = true;
          // alert(temp.material.visible);
        }
      }

      // fire on key up so we can do charging bullets
      if ( keyboard.pressed("M") ) { // TODO: Check to see that this is firing
        console.log("here");
        if (this.charge > CHARGED + 100) {
          audio = new Audio('explosion.mp3');
          audio.play();
          var chargedBolt = new Bolt(bullet, scene, 0xff0000); // change laser2.model
          chargedBolt.model.position.set(laser2.model.position.x, laser2.model.position.y, laser2.model.position.z);
          chargedBolt.model.rotation.set(laser2.model.rotation.x, laser2.model.rotation.y, laser2.model.rotation.z);
          this.lasers.push(chargedBolt);
          scene.add(chargedBolt.model);
          this.charge = 0;
          this.soundPlayed = false;
          temp.material.visible = false;
        }
        else {
          audio = new Audio('arwingOneShot.mp3');
          audio.play();
          var bolt = new Bolt(laser2.model, scene, 0x00ff00);
          bolt.model.position.set(laser2.model.position.x, laser2.model.position.y, laser2.model.position.z);
          bolt.model.rotation.set(laser2.model.rotation.x, laser2.model.rotation.y, laser2.model.rotation.z);
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
      
      var relativeCameraOffset2 = new THREE.Vector3(0,40,150);

      var cameraOffset2 = relativeCameraOffset2.applyMatrix4( this.model.matrixWorld );

      camera2.position.x = cameraOffset2.x;
      camera2.position.y = cameraOffset2.y;
      camera2.position.z = cameraOffset2.z;
      camera2.lookAt( this.model.position );
      
      // camera.updateMatrix();
      // camera.updateProjectionMatrix();
          
      // controls.update();
      // stats.update();
    }
}
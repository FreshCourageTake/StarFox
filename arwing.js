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
    this.alive = true;
    this.bullets = 0;

    // var sphere = new THREE.SphereGeometry( .01, 1, 8 );
    // this.signalLight = new THREE.PointLight(0xff0000, 1, 100);
    // this.signalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) ) );

  	loader.load(type, function ( obj ) {
      obj.scale.set(.03, .03, .03); // for arwing
      obj.position.set(0, 0, -100);
      obj.rotateOnAxis( new THREE.Vector3(0,1,0), 3.14);
    	that.model = obj;
      // scene.add( obj );
      // scene.add(that.signalLight);
      that.colBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      that.colBox.setFromObject(that.model);
      });
	}

  advance() {
    this.model.translateZ(this.velocity.dz);
    this.model.translateX(this.velocity.dx);
    this.model.translateY(this.velocity.dy);
    // this.signalLight.position.set(this.model.position.x, this.model.position.y, this.model.position.z);
    this.colBox.setFromObject(this.model);
  }

  kill() {
    this.velocity.dx = this.velocity.dy = this.velocity.dz = 0;
    laser2.velocity.dx = laser2.velocity.dy = laser2.velocity.dz = 0;

    scene.remove(this.model);
    parts.push(new ExplodeAnimation(this.model.position.x, this.model.position.y, this.model.position.z, true));
    audio = new Audio('asteroid_explosion.mp3');
    audio.play();
    audio = new Audio('fox-ahhh.mp3');
    audio.play();
    this.alive = false;
  }

    keyPress(pad) {
      keyboard.update();
      var delta = clock.getDelta(); // seconds.
      // delta was causing jitters (probably due to floating point precision)
      var moveDistance = .05// * delta; // 200 pixels per second
      var rotateAngle = .031;   // pi/2 radians (90 degrees) per second
      var fix = moveDistance;
      var dec = 30;

      // local transformations
      // move forwards/backwards and rotate left/right
      // if ( keyboard.pressed("U") || (pad.axes[1] < -0.5)) {
      //   this.velocity.setDz(-moveDistance);
      //   laser2.velocity.setDz(-moveDistance);
      // }
      // if ( keyboard.pressed("O") || (pad.axes[1] > 0.5)) {
      //   this.velocity.setDz(moveDistance);
      //   laser2.velocity.setDz(moveDistance);
      // }

      // // rotate left/right/up/down
      // var rotation_matrix = new THREE.Matrix4().identity();
      // if ( keyboard.pressed("I") || (pad.axes[3] < -0.5) ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
      //   laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
      //   this.orientationYZ += rotateAngle;
      // }
      // if ( keyboard.pressed("K") || (pad.axes[3] > 0.5) ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
      //   laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
      //   this.orientationYZ -= rotateAngle;

      // }
      // if ( keyboard.pressed("J") || (pad.axes[2] < -0.5) ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
      //   laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
      // }
      // if ( keyboard.pressed("L") || (pad.axes[2] > 0.5) ) {
      //   this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
      //   laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
      // }
      // move forwards/backwards and rotate left/right
      if ( keyboard.pressed("O") ) {
        this.velocity.setDz(-moveDistance);
        laser2.velocity.setDz(-moveDistance);
      }
      if ( keyboard.pressed("U") ) {
        this.velocity.setDz(moveDistance);
        laser2.velocity.setDz(moveDistance);
      }
      if ( keyboard.pressed(">") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        laser2.model.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
      }
      if ( keyboard.pressed("<") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
        laser2.model.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      }

      // rotate left/right/up/down
      var rotation_matrix = new THREE.Matrix4().identity();
      if ( keyboard.pressed("I") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
        this.orientationYZ += rotateAngle;
      }
      if ( keyboard.pressed("K") ) {
        this.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
        this.orientationYZ -= rotateAngle;
      }
      if ( keyboard.pressed("J") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
        laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle * 2);
      }
      if ( keyboard.pressed("L") ) {
        this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
        laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle * 2);
      }
      

      // Controller Support
      if (pad != undefined) {
        if (pad.buttons[5] != undefined && pad.buttons[5].pressed == true ) {
          this.velocity.setDz(-moveDistance);
          laser2.velocity.setDz(-moveDistance);
        }
        if (pad.buttons[4] != undefined && pad.buttons[4].pressed == true ) {
          this.velocity.setDz(moveDistance);
          laser2.velocity.setDz(moveDistance);
        }
        if ( pad.axes[2] < -0.5 ) {
          this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
          laser2.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
        }
        if ( pad.axes[2] > 0.5 ) {
          this.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
          laser2.model.rotateOnAxis( new THREE.Vector3(0,1,0), -pad.axes[2] / dec );
        }
        if ( pad.axes[3] > 0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          this.orientationYZ += rotateAngle;
        }
        if ( pad.axes[3] < -0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          laser2.model.rotateOnAxis( new THREE.Vector3(1,0,0), pad.axes[3] / dec );
          this.orientationYZ -= rotateAngle;
        }
        if ( pad.axes[0] < -0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
          laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
        }
        if ( pad.axes[0] > 0.2 ) {
          this.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
          laser2.model.rotateOnAxis( new THREE.Vector3(0,0,1), -pad.axes[0] / (dec/2) );
        }
      }

      if ( keyboard.pressed("N") ) {
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
      if ( keyboard.pressed("N") || (pad != undefined && pad.buttons[7] != undefined && (pad.buttons[7].pressed == true))) { //TODO: Should be keyboard.up. Fix this.
        if (this.charge > CHARGED + 100) {
          audio = new Audio('explosion.mp3');
          audio.play();
          var chargedBolt = new Bolt(bullet, scene, 2); // TODO: Fix arwing laser light
          chargedBolt.model.position.set(laser2.model.position.x, laser2.model.position.y, laser2.model.position.z);
          chargedBolt.model.rotation.set(laser2.model.rotation.x, laser2.model.rotation.y, laser2.model.rotation.z);
          chargedBolt.model.updateMatrix();
          this.lasers.push(chargedBolt);
          scene.add(chargedBolt.model);
          this.charge = 0;
          this.soundPlayed = false;
          temp.material.visible = false;
        }
        else {
          // if (this.bullets < 5) {
            this.bullets++;
            audio = new Audio('arwingOneShot.mp3');
            audio.play();
            var bolt = new Bolt(laser2.model, scene, 2);
            bolt.model.position.set(laser2.model.position.x, laser2.model.position.y, laser2.model.position.z);
            bolt.model.rotation.set(laser2.model.rotation.x, laser2.model.rotation.y, laser2.model.rotation.z);
            this.lasers.push(bolt);
            scene.add(bolt.model);
            this.charge = 0;
            this.soundPlayed = false;
          // }
        }
      }
      
      // reset ship position
      // if ( keyboard.pressed("Z") )
      // {
      //   this.model.position.set(0,0,0);
      //   this.model.rotation.set(0,0,0);
      // }
      
      var relativeCameraOffset2 = new THREE.Vector3(0,40,150);

      var cameraOffset2 = relativeCameraOffset2.applyMatrix4( this.model.matrixWorld );

      camera2.position.x = cameraOffset2.x;
      camera2.position.y = cameraOffset2.y;
      camera2.position.z = cameraOffset2.z;
      camera2.lookAt( this.model.position );

    }
}

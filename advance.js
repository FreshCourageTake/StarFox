"use strict";

function advance() {
    // fire a laser
    var deadLasers = 0;
    if (tieBomber.lasers[0] != undefined) {
      for (var i = 0; i < tieBomber.lasers.length; i++) {
      	if (tieBomber.lasers[i].timeAlive < 0) {
      		deadLasers++;
      		scene.remove(tieBomber.lasers[i].model);
      		scene.remove(tieBomber.lasers[i].pointLight);
      	}
        tieBomber.lasers[i].advance();
        tieBomber.lasers[i].model.updateMatrix();
      }
    }
    while (deadLasers > 0) {
    	tieBomber.lasers.shift();
    	deadLasers--;
    }

    temp.position.set(tieBomber.model.position.x, tieBomber.model.position.y, tieBomber.model.position.z);
    tieBomber.advance();
    laser.advance();


    // rotate and update the asteroids
	// Using an asteroid class will make this much smoother.  Take an object as the constructor parameter.
	//    Include: rotation, velocity, size.
	for (var i = 0; i < 50; i++) {
	  if (asteroids[i] != undefined) {
	    asteroids[i].rotation.set(asteroids[i].rotation.x + (Math.random() * 0.01),
	                              asteroids[i].rotation.y + (Math.random() * 0.01),
	                              asteroids[i].rotation.z + (Math.random() * 0.01));
	    asteroids[i].translateX(Math.random() * 0.1);
	    asteroids[i].translateY(Math.random() * 0.1);
	    asteroids[i].translateZ(Math.random() * 0.1);
	    asteroids[i].updateMatrix();
	  }
	}
}
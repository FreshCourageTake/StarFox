"use strict";

function advance() {
    // fire a laser
    if (tieBomber.lasers[0] != undefined) {
      for (var i = 0; i < tieBomber.lasers.length; i++) {
        tieBomber.lasers[i].advance();
        tieBomber.lasers[i].model.updateMatrix();
      }
    }

    // rotate and update the asteroids
	// Using an asteroid class will make this much smoother.  Take an object as the constructor parameter.
	//    Include: rotation, velocity, size.
	for (var i = 0; i < 100; i++) {
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
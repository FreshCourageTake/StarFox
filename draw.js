"use strict";

function draw() {
// Object matrix needs to be updated continually
    tieBomber.model.updateMatrix();
    asteroid.model.updateMatrix();
    laser.model.updateMatrix();
    temp.updateMatrix();

    if (twoPlayer) {
    arwing.model.updateMatrix();
    laser2.model.updateMatrix();
    }

    // clone the asteroids once the parent has loaded and give them a random rotation angl
    if(asteroid != undefined && needToClone==true) {
	for(var i = 0; i < 50; i++) {
	    asteroids[i] = new asteroidClone(asteroid.clone());
	    asteroids[i].model.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
            scene.add(asteroids[i].model); 
	}
	needToClone = false;
    }

    // Render the scene.
    // renderer.render(scene, camera);
}

"use strict";

function draw() {
// Object matrix needs to be updated continually
    tieBomber.model.updateMatrix();
    asteroid.model.updateMatrix();
    laser.model.updateMatrix();
    temp.updateMatrix();

    // clone the asteroids once the parent has loaded and give them a random rotation angle
    if (asteroid != undefined && needToClone == true) {
      for (var i = 0; i < 50; i++) {
        asteroids[i] = asteroid.clone();
        asteroids[i].rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
        // var scale = (Math.random() * 30) - 15;
        // asteroids[i].scale.set(scale, scale, scale); // could be used for irregular-sized asteroids.
        scene.add(asteroids[i]);
      }
      needToClone = false;
      
    }

    // Render the scene.
	// renderer.render(scene, camera);
}
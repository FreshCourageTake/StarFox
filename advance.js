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

    if (twoPlayer) {
      deadLasers = 0;
      if (arwing.lasers[0] != undefined) {
        for (var i = 0; i < arwing.lasers.length; i++) {
          if (arwing.lasers[i].timeAlive < 0) {
            deadLasers++;
            scene.remove(arwing.lasers[i].model);
            scene.remove(arwing.lasers[i].pointLight);
          }
          arwing.lasers[i].advance();
          arwing.lasers[i].model.updateMatrix();
        }
      }
      while (deadLasers > 0) {
        arwing.lasers.shift();
        deadLasers--;
      }

    arwing.advance();
    laser2.advance();
    }

    temp.position.set(tieBomber.model.position.x, tieBomber.model.position.y, tieBomber.model.position.z);
    // skyBox.position.set(tieBomber.model.position.x, tieBomber.model.position.y, tieBomber.model.position.z);
    tieBomber.advance();
    laser.advance();

    // particle explosion
    var pCount = parts.length;
    while(pCount--) {
      parts[pCount].update();
    }

    // rotate and update the asteroids
    // Using an asteroid class will make this much smoother.  Take an object as the constructor parameter.
    //    Include: rotation, velocity, size.
    for (var i = 0; i < asteroids.length; i++) {
	if(asteroids[i].model.rotation.x != undefined)
	    asteroids[i].rotateMove();
    }

    // LASER Collision detection
    var limit = asteroids.length; // avoids infinite loop when we create smaller asteroids
    for(var a = 0; a < limit; a++) {
    	for(var b = 0; b < tieBomber.lasers.length; b++) {
    	    if(asteroids[a].model != undefined && tieBomber.lasers[b].model != undefined && tieBomber.lasers[b].colBox != undefined) { // Ensure creation
        		if(tieBomber.lasers[b].colBox.intersectsBox(asteroids[a].colBox)) {// Check collision
        		    tieBomber.lasers[b].model.x = 1000000000000
                delete tieBomber.lasers[b].colBox;
                audio = new Audio('asteroid_explosion.mp3');
                audio.play();
                if (asteroids[a].type == "big") {
                  for (var i = 0; i < 3; i++) {
                      var rock = new medAsteroidClone(asteroids[a].model.clone());
                      asteroids.push(rock);
                      scene.add(rock.model);
                    }
                    parts.push(new ExplodeAnimation(tieBomber.lasers[b].model.position.x, tieBomber.lasers[b].model.position.y, tieBomber.lasers[b].model.position.z));
                    asteroids[a].model.position.x = 10000000; 
                } else if (asteroids[a].type == "med") {
                    for (var i = 0; i < 4; i++) {
                      var rock = new smallAsteroidClone(asteroids[a].model.clone());
                      asteroids.push(rock);
                      scene.add(rock.model);
                    }
                    parts.push(new ExplodeAnimation(tieBomber.lasers[b].model.position.x, tieBomber.lasers[b].model.position.y, tieBomber.lasers[b].model.position.z));
                    asteroids[a].model.position.x = 10000000;                  
                } else {
                    parts.push(new ExplodeAnimation(tieBomber.lasers[b].model.position.x, tieBomber.lasers[b].model.position.y, tieBomber.lasers[b].model.position.z));
                    asteroids[a].model.position.x = 10000000;
                }
        		}
          }
    	}

      if (twoPlayer && arwing.lasers[b] != undefined && arwing.lasers[b].model != undefined && arwing.lasers[b].colBox != undefined) {
        for(var b = 0; b < arwing.lasers.length; b++) {
          
          if(asteroids[a].model != undefined && arwing.lasers[b].model != undefined && arwing.lasers[b].colBox != undefined) { // Ensure creation
            if(arwing.lasers[b].colBox.intersectsBox(asteroids[a].colBox)) {// Check collision
                arwing.lasers[b].model.x = 1000000000000
                delete arwing.lasers[b].colBox;
                audio = new Audio('asteroid_explosion.mp3');
                audio.play();
                if (asteroids[a].type == "big") {
                  for (var i = 0; i < 3; i++) {
                      var rock = new medAsteroidClone(asteroids[a].model.clone());
                      asteroids.push(rock);
                      scene.add(rock.model);
                    }
                    parts.push(new ExplodeAnimation(arwing.lasers[b].model.position.x, arwing.lasers[b].model.position.y, arwing.lasers[b].model.position.z));
                    asteroids[a].model.position.x = 10000000; 
                } else if (asteroids[a].type == "med") {
                    for (var i = 0; i < 4; i++) {
                      var rock = new smallAsteroidClone(asteroids[a].model.clone());
                      asteroids.push(rock);
                      scene.add(rock.model);
                    }
                    parts.push(new ExplodeAnimation(arwing.lasers[b].model.position.x, arwing.lasers[b].model.position.y, arwing.lasers[b].model.position.z));
                    asteroids[a].model.position.x = 10000000;                  
                } else {
                    parts.push(new ExplodeAnimation(arwing.lasers[b].model.position.x, arwing.lasers[b].model.position.y, arwing.lasers[b].model.position.z));
                    asteroids[a].model.position.x = 10000000;
                }
            }
          }
      }
      }
    }

    // SHIP Collision detection
    for (var a = 0; a < asteroids.length; a++) {
      if(asteroids[a].model != undefined && tieBomber.model != undefined) // Ensure creation
            if(tieBomber.colBox.intersectsBox(asteroids[a].colBox)) {// Check collision
                tieBomber.velocity.dx = tieBomber.velocity.dy = tieBomber.velocity.dz = 0;
                scene.remove(tieBomber.model);
                parts.push(new ExplodeAnimation(asteroids[a].model.position.x, asteroids[a].model.position.y, asteroids[a].model.position.z),
                           new ExplodeAnimation(tieBomber.model.position.x, tieBomber.model.position.y, tieBomber.model.position.z, true));
                audio = new Audio('asteroid_explosion.mp3');
                audio.play();
                audio = new Audio('Wilhelm-Scream.mp3');
                audio.play();
                asteroids[a].model.position.x = 10000000;
            }

      if(asteroids[a].model != undefined && arwing.model != undefined) // Ensure creation
        if(arwing.colBox.intersectsBox(asteroids[a].colBox)) {// Check collision
            arwing.velocity.dx = arwing.velocity.dy = arwing.velocity.dz = 0;
            scene.remove(arwing.model);
            parts.push(new ExplodeAnimation(asteroids[a].model.position.x, asteroids[a].model.position.y, asteroids[a].model.position.z),
                       new ExplodeAnimation(arwing.model.position.x, arwing.model.position.y, arwing.model.position.z, true));
            audio = new Audio('asteroid_explosion.mp3');
            audio.play();
            audio = new Audio('fox-ahhh.mp3');
            audio.play();
            asteroids[a].model.position.x = 10000000;
        }
    }
}

"use strict";

function deg2rad(value) {
  return ((3.14159 / 180) * (value))
}

function advance() {
    // play sounds
    var sound = document.getElementById("good_luck");
    sound.onended = function() {
      if(!music) {
        var s = new Audio('star_wars.mp3');
        s.play();
        music = true;
      }     
    }

    // fire a laser
    var deadLasers = 0;
    if (tieBomber.lasers[0] != undefined) {
      for (var i = 0; i < tieBomber.lasers.length; i++) {
      	if (tieBomber.lasers[i].timeAlive < 0) {
      		deadLasers++;
      		scene.remove(tieBomber.lasers[i].model);
      		scene.remove(tieBomber.lasers[i].pointLight);
          tieBomber.bullets--;
      	}
        tieBomber.lasers[i].advance();
        tieBomber.lasers[i].model.updateMatrix();
      }
    }
    while (deadLasers > 0) {
    	tieBomber.lasers.shift();
    	deadLasers--;
    }

    var numRocks = asteroids.length;
    for (var a = 0; a < numRocks; ++a) {
      //wrapping
        if (asteroids[a].model != undefined) {
          var rockPosZ = 0 + asteroids[a].model.position.z * Math.cos(deg2rad(asteroids[a].model.rotation.z));
          var rockPosX = 0 + asteroids[a].model.position.x * Math.cos(deg2rad(asteroids[a].model.rotation.z));
          var boundPos = HALFWORLD;

          if (-rockPosX > boundPos) {
            asteroids[a].model.position.x *= -1;
            asteroids[a].model.position.x -= 10;
          }
          else if ( rockPosX < -boundPos) {
            asteroids[a].model.position.x *= -1;
            asteroids[a].model.position.x += 10;
          }
          if (-rockPosZ > boundPos) {
            asteroids[a].model.position.z *= -1;
            asteroids[a].model.position.z -= 10;
          }
          else if ( rockPosZ < -boundPos) {
            asteroids[a].model.position.z *= -1;
            asteroids[a].model.position.z += 10;
          }
          if (asteroids[a].model.position.y < -HALFWORLD) {
            asteroids[a].model.position.y *= -1;
            asteroids[a].model.position.z *= -1;
            asteroids[a].model.position.x *= -1;
          }
          else if (asteroids[a].model.position.y > HALFWORLD) {
            asteroids[a].model.position.y *= -1;
            asteroids[a].model.position.z *= -1;
            asteroids[a].model.position.x *= -1;
          }
        }
    }

    if(skyBox == skyBoxSpace) { // On space level
	// wrapping for tieBomber
	var shipPosZ = 0 + tieBomber.model.position.z * Math.cos(deg2rad(tieBomber.model.rotation.z));
	var shipPosX = 0 + tieBomber.model.position.x * Math.cos(deg2rad(tieBomber.model.rotation.z));
	var boundPos = HALFWORLD;
	if (-shipPosX > boundPos || shipPosX > boundPos) {
	    tieBomber.model.position.x *= -1;
	    laser.model.position.x *= -1;
	}
	if (-shipPosZ > boundPos || shipPosZ > boundPos) {
	    tieBomber.model.position.z *= -1;
	    laser.model.position.z *= -1;
	}
	if (tieBomber.model.position.y > HALFWORLD || tieBomber.model.position.y < -HALFWORLD) {
	    tieBomber.model.position.y *= -1;
	    laser.model.position.y *= -1;
	}
    }

    if (numPlayers == 2) {
	if(skyBox == skyBoxSpace) { // On space level
	    // wrapping for arwing
	    var shipPosZ = 0 + arwing.model.position.z * Math.cos(deg2rad(arwing.model.rotation.z));
	    var shipPosX = 0 + arwing.model.position.x * Math.cos(deg2rad(arwing.model.rotation.z));
	    var boundPos = HALFWORLD;
	    if (-shipPosX > boundPos || shipPosX > boundPos) {
		arwing.model.position.x *= -1;
		laser2.model.position.x *= -1;
	    }
	    if (-shipPosZ > boundPos || shipPosZ > boundPos) {
		arwing.model.position.z *= -1;
		laser2.model.position.z *= -1;
	    }
	    if (arwing.model.position.y > HALFWORLD || arwing.model.position.y < -HALFWORLD) {
		arwing.model.position.y *= -1;
		laser2.model.position.y *= -1;
	    }
	}

      // laser clean up
      deadLasers = 0;
      if (arwing != undefined && arwing.lasers[0] != undefined) {
        for (var i = 0; i < arwing.lasers.length; i++) {
          if (arwing.lasers[i].timeAlive < 0) {
            deadLasers++;
            scene.remove(arwing.lasers[i].model);
            scene.remove(arwing.lasers[i].pointLight);
            arwing.bullets--;
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

      if (orientLaser2 == true && laser2 != undefined && arwing != undefined) {
        laser2.model.position.set(arwing.model.position.x, arwing.model.position.y, arwing.model.position.z);
        laser2.model.rotation.set(arwing.model.rotation.x, arwing.model.rotation.y, arwing.model.rotation.z);
        orientLaser2 = false;
      }
    }

    temp.position.set(tieBomber.model.position.x, tieBomber.model.position.y, tieBomber.model.position.z);
    tieBomber.advance();
    laser.advance();

   if (numPlayers == 1 && skyBox != skyBoxLand)
      skyBox.position.set(tieBomber.model.position.x, tieBomber.model.position.y, tieBomber.model.position.z);

    // particle explosion
    var pCount = parts.length;
    while(pCount--) {
      parts[pCount].update();
    }

    // rotate and update the asteroids
    for (var i = 0; i < asteroids.length; i++) {
	if(asteroids[i].model.rotation.x != undefined)
	    asteroids[i].rotateMove();
    }

    // LASER Collision detection for tieBomber
    var limit = asteroids.length; // avoids infinite loop when we create smaller asteroids
    for(var b = 0; b < tieBomber.lasers.length; b++) {
      //Fox v Lasers
      if(arwing != undefined && arwing.model != undefined && tieBomber.lasers[b].model != undefined && tieBomber.lasers[b].colBox != undefined) { // Ensure creation
        if (tieBomber.lasers[b].colBox.intersectsBox(arwing.colBox)) {
            arwing.kill();
        }
      }
      //Asteroid v Lasers
    	for(var a = 0; a < limit; a++) {
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
    }

    // LASER Collision detection for arwing
    var limit = asteroids.length; // avoids infinite loop when we create smaller asteroids
    if(numPlayers == 2) {
	for(var b = 0; b < arwing.lasers.length; b++) {
	    //tie v Lasers
	    if(tieBomber.model != undefined && arwing.lasers[b].model != undefined && arwing.lasers[b].colBox != undefined) { // Ensure creation
		if (arwing.lasers[b].colBox.intersectsBox(tieBomber.colBox)) {
		    tieBomber.kill();
		}
	    }
	    //Asteroid v Lasers
	    for(var a = 0; a < limit; a++) {
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
                tieBomber.kill();
                parts.push(new ExplodeAnimation(asteroids[a].model.position.x, asteroids[a].model.position.y, asteroids[a].model.position.z));
                asteroids[a].model.position.x = 10000000;
            }
	
	if(numPlayers == 2) {
	    if(asteroids[a].model != undefined && arwing.model != undefined) // Ensure creation
		if(arwing.colBox.intersectsBox(asteroids[a].colBox)) {// Check collision
		    arwing.kill();
		    parts.push(new ExplodeAnimation(asteroids[a].model.position.x, asteroids[a].model.position.y, asteroids[a].model.position.z));
		    asteroids[a].model.position.x = 10000000;
		}
	}
    }
}

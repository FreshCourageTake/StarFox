"use strict";

function control() {
    // Update controllers if they're being used
    pads = navigator.getGamepads();

    // User input callback for player 1
    tieBomber.keyPress(pads[0]);

    // User input for player 2
    if (numPlayers == 2)
	arwing.keyPress(pads[1]);
    
    if (keyboard.pressed("2"))
	numPlayers = 2;
    else if(keyboard.pressed("1")) {
	numPlayers = 1;
    }
 
    if (keyboard.pressed("3") && SKYVAL == 1)  {
    	scene.remove(skyBox);
    	skyBox = skyBoxSpace;
    	scene.add(skyBox);
        SKYVAL = 0;
        if (tieBomber.model != undefined) {
            tieBomber.model.position.set(0, 0, 0);
            laser.model.position.set(0, 0, 0);
        }
        if (arwing.model != undefined) {
            arwing.model.position.set(0, 0, -100);
            laser2.model.position.set(0, 0, -100);
        }
        needToClone = true;
    }
    else if(keyboard.pressed("4") && SKYVAL == 0) {
    	scene.remove(skyBox);
    	skyBox = skyBoxLand;
    	scene.add(skyBox);
        SKYVAL = 1;
        if (tieBomber.model != undefined) {
            tieBomber.model.position.set(0, 0, 0);
            laser.model.position.set(0, 0, 0);
        }
        if (arwing.model != undefined) {
            arwing.model.position.set(0, 0, -100);
            laser2.model.position.set(0, 0, -100);
        }
        var len = asteroids.length;
        for (var i = 0; i < len; i++) {
            scene.remove(asteroids[i].model);
        }
        asteroids.length = 0;
    }




}

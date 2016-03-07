function explode() {
				if (time < (explodeTime+1900)) {
					return;
				}

				explodeTime = time;

				for (var i=0; i<particleArray.length; ++i ) {
					var particles = particleArray[i].p;
					var material = particleArray [i].m;

					particles.visible = true;

					var outscale = 2+Math.random()*5;

					var scaletween = new TWEEN.Tween(particles.scale)
						.to({x: outscale, y: outscale, z: outscale}, 1400)
						.easing(TWEEN.Easing.Exponential.EaseOut)
					scaletween.start();

					var alphatween = new TWEEN.Tween(material)
						.to({opacity: 0}, 1400)
						.easing(TWEEN.Easing.Exponential.EaseOut);
					alphatween.start();

					var rotatetween = new TWEEN.Tween(particles.rotation)
						.to({x: particles.rotation.x+0.75, y: particles.rotation.y+0.75, z: particles.rotation.z+0.75}, 1800)
						.easing(TWEEN.Easing.Exponential.EaseOut);
					rotatetween.start();

					var positiontween = new TWEEN.Tween(particles.position)
						.to({z: particles.position.z+250}, 1800)
						.easing(TWEEN.Easing.Exponential.EaseOut)
						.onComplete(explodeDone);
					positiontween.start();

				}

				grenade.visible = false;
				click.opacity = 0;
				effectFocus.uniforms[ "sampleDistance" ].value = 1.85;
				effectFocus.uniforms[ "waveFactor" ].value = 0.00825;

				sndeffect.play();

			}

			function explodeDone() {
				
				for (var i=0; i<particleArray.length; ++i ) {
					var particles = particleArray[i].p;
					var material = particleArray [i].m;
				
					particles.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
					particles.scale.set(0.1,0.1,0.1);
					material.opacity = 1;
					particles.visible = false;

					var positiontween = new TWEEN.Tween(particles.position)
						.to({z: particles.position.z-250}, 10)
						.easing(TWEEN.Easing.Linear.EaseNone);
					positiontween.start();
				}

				grenade.visible = true;
				click.opacity = 1;
				effectFocus.uniforms[ "sampleDistance" ].value = 0.85;
				effectFocus.uniforms[ "waveFactor" ].value = 0.00225;

			}
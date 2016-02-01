

function loadSkybox(){
    // base image texture for mesh
    var lavaTexture = new THREE.ImageUtils.loadTexture( 'images/skyTexture1.jpg');
    lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;
    // multiplier for distortion speed
    var baseSpeed = 0.02;
    var repeatT;
    // number of times to repeat texture in each direction
    var repeatS = repeatT = 4.0;

    // texture used to generate "randomness", distort all other textures
    var noiseTexture = new THREE.ImageUtils.loadTexture( 'images/skyTexture1.jpg' );
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;
    // magnitude of noise effect
    var noiseScale = 0.5;

    // texture to additively blend with base image texture
    var blendTexture = new THREE.ImageUtils.loadTexture( 'images/skyTexture1.jpg' );
    blendTexture.wrapS = blendTexture.wrapT = THREE.RepeatWrapping;
    // multiplier for distortion speed
    var blendSpeed = 0.01;
    // adjust lightness/darkness of blended texture
    var blendOffset = 0.25;
    // texture to determine normal displacement
    var bumpTexture = noiseTexture;
    bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
    // multiplier for distortion speed
    var bumpSpeed   = 0.15;
    // magnitude of normal displacement
    var bumpScale   = 40.0;

    // use "this." to create global object
    this.customUniforms = {
        baseTexture: 	{ type: "t", value: lavaTexture },
        baseSpeed:		{ type: "f", value: baseSpeed },
        repeatS:		{ type: "f", value: repeatS },
        repeatT:		{ type: "f", value: repeatT },
        noiseTexture:	{ type: "t", value: noiseTexture },
        noiseScale:		{ type: "f", value: noiseScale },
        blendTexture:	{ type: "t", value: blendTexture },
        blendSpeed: 	{ type: "f", value: blendSpeed },
        blendOffset: 	{ type: "f", value: blendOffset },
        bumpTexture:	{ type: "t", value: bumpTexture },
        bumpSpeed: 		{ type: "f", value: bumpSpeed },
        bumpScale: 		{ type: "f", value: bumpScale },
        alpha: 			{ type: "f", value: 1.0 },
        time: 			{ type: "f", value: 1.0 }
    };

    var customMaterial = new THREE.ShaderMaterial(
        {
            uniforms: customUniforms,
            vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent
        }   );

    // BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    //var material = new THREE.MeshLambertMaterial( {color: 0xf054a0} );

    var geometry = new THREE.SphereGeometry(3000, 60, 40);

    skyBox = new THREE.Mesh(geometry, customMaterial);
    skyBox.scale.set(-1, 1, 1);
    skyBox.rotation.order = 'XZY';
    skyBox.renderDepth = 1000.0;

    scene.add( skyBox );
}


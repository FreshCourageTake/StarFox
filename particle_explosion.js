//////////////settings/////////
var movementSpeed = 2;
var totalObjects = 1000;
var objectSize = 2;
var sizeRandomness = 4000;
var colors = [0xDCDCDC, 0xC0C0C0, 0x808080, 0x696969, 0xFFFFFF];
/////////////////////////////////
var dirs = [];
var parts = [];

// http://codepen.io/Xanmia/pen/DoljI
function ExplodeAnimation(x,y,z,red)
{
  this.timeAlive = 150;

  var geometry = new THREE.Geometry();
  
  for (i = 0; i < totalObjects; i ++) 
  { 
    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = z;
  
    geometry.vertices.push( vertex );
    dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
  }
  if (red)
    var material = new THREE.ParticleBasicMaterial( { size: objectSize,  color: 0xFF0000 });
  else
    var material = new THREE.ParticleBasicMaterial( { size: objectSize,  color: colors[Math.round(Math.random() * colors.length)] });


  var particles = new THREE.ParticleSystem( geometry, material );
  
  this.object = particles;
  this.status = true;
  
  this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);

  this.object.material.transparent = true;
  scene.add( this.object  ); 
  
  this.update = function(){
    if (this.status == true){

      this.object.material.opacity -= 0.01;

      this.timeAlive--;
      if (this.timeAlive < 1 ) {
          console.log("romoved stuff");
          scene.remove(this.object);
          this.status = false;
      }
      
      var pCount = totalObjects;
      // var pCount = parts.length;

      while(pCount--) {
        var particle =  this.object.geometry.vertices[pCount]
        particle.y += dirs[pCount].y;
        particle.x += dirs[pCount].x;
        particle.z += dirs[pCount].z;
      }
      this.object.geometry.verticesNeedUpdate = true;
    }
  }
  
}
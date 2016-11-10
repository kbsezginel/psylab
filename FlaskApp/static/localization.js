// Main colors
var blackColor = 0X000000;
var redColor = 0X800000;
var yellowColor = 0XF39C12;
var lightGreenColor = 0X73C6B6;

// Speaker Properties ------------------------------------------------------------------------------
var speaker = {color: yellowColor, height: 40, width: 25, depth: 20};
speaker.geo = new THREE.BoxGeometry( speaker.width, speaker.height, speaker.depth );
speaker.mat = new THREE.MeshLambertMaterial( { color: speaker.color } );
speaker.add = function(speakerCoor){
  mesh = new THREE.Mesh( speaker.geo, speaker.mat );
  mesh.position.set(speakerCoor);
  scene.add(mesh);
};

// Calculating circular coordinates for speakers ---------------------------------------------------
function get_speaker_info(radius, theta, num_of_speakers) {
  // ^ z
  // |
  // -----> x
  var x1 = 0;
  var z1 = 0;
  var positions = [];
  var rotations = [];
  // var labels = [8, 9, 10, 11, 12, 13, 14, 15, 16, 7, 6, 5, 4, 3, 2, 1];
  var labels = [7, 8, 9, 10, 11, 12, 13, 14, 15, 6, 5, 4, 3, 2, 1];
  var y_coors = [-10, 0, -10, -20, -30, -40, -50, -60, -70, -20, -30, -40, -50, -60, -70];
  var y_coors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var new_theta = theta / 180 * Math.PI;
  theta = new_theta;
  var rot_theta = new_theta;
  for (var i = 0; i < num_of_speakers; i++) {
    x = x1 + radius * Math.sin(new_theta);
    z = z1 - radius * (1 - Math.cos(new_theta));
    y = y_coors[i] / 2;
    if (i === Math.round(num_of_speakers / 2)) {
      new_theta = theta;
      rot_theta = 0;
    }
    if (i < num_of_speakers / 2) {
      new_theta -= theta;
      rot_theta -= theta;
    } else {
      new_theta += theta;
      rot_theta += theta;
    }
    if (i === 0) {rot_theta = theta};
    if( i === 1) {rot_theta = 0};
    positions.push([x, y, z]);
    rotations.push(rot_theta);
  }
  return {positions: positions, labels: labels, rotations: rotations};
}

// Adding text -------------------------------------------------------------------------------------
var label = new Object();
label.size = 100;
label.color = redColor;
//label.mat = new THREE.MeshBasicMaterial( {color: label.color});
label.add = function(labelCoor, string, size=label.size, color=label.color, bevel=false){
  if (typeof string !== "string") { string = string.toString(); };
  label.mat = new THREE.MeshBasicMaterial( {color: color});
  var labelGeo = new THREE.TextGeometry( string, {
    size: size,
    height: 0,
    font: "helvetiker",
    bevelEnabled: bevel,
    bevelThickness: 1,
    bevelSize: 1
  });
  var text = new THREE.Mesh(labelGeo, label.mat);
  text.position.set(labelCoor[0],labelCoor[1],labelCoor[2]);
  text.rotation.y = Math.PI;
  scene.add( text );
  texts.push( text );
  return text;
};

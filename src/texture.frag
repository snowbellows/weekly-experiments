precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNormal;

void main() {

  vec3 purple = vec3(0.2578125, 0.125, 0.25);
  vec3 violet = vec3(0.9140625, 0.4765625, 0.953125);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 blue = vec3(28.0/256.0, 93.0/256.0, 153.0/256.0);

  gl_FragColor = vec4(mix(purple, violet, vNormal.x * vNormal.y * vNormal.z) , 1.0);

}
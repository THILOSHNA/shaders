uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
// uniform float uFrequency;
uniform vec2 uFrequency; // for two coordinate point

uniform float uTime;

attribute vec3 position; 
// attribute float aRandom; // check in html file 

attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;


  void main()
  {
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x *uFrequency.x + uTime)*0.1;
    modelPosition.z += sin(modelPosition.y *uFrequency.y + uTime)*0.1;
    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix*viewPosition;
    gl_Position = projectionPosition;
    gl_Position.z = 0.5;

    // vRandom = aRandom ;// vRandom here is to use it in the fragments

    vUv = uv;
  }  
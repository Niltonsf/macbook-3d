export default /* glsl */
`uniform sampler2D uBakedTexture;
uniform sampler2D uLightMapTexture;
uniform float uMix;

varying vec2 vUv;

void main() 
{
  vec3 lightMapColor = texture2D(uBakedTexture, vUv).rgb;
  vec3 darkMapColor = texture2D(uLightMapTexture, vUv).rgb;

  vec3 bakedColor = mix(darkMapColor, lightMapColor, uMix);

  gl_FragColor = vec4(bakedColor, 1.0);
}`;
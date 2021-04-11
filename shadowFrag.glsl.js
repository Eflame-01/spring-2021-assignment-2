export default `#version 300 es
precision highp float;

uniform sampler2D uSampler;

in vec4 vColor;
in vec4 vLightSpacePos;
out vec4 outColor;

vec3 shadowCalculation(vec4 lightSpacePos) {
    // TODO: shadow calculation
    vec3 projCoords = lightSpacePos.xyz / lightSpacePos.w;

    projCoords = projCoords * 0.05 + 0.05;
    
    //find out what shadowMap is
    float closestDepth = texture(shadowMap, projCoords.xy).r;
    float currentDepth = projCoords.z;
    float shadow = currentDepth > closestDepth ? 1.0 : 0.0;
    return projCoords;
}

void main() {
    // TODO: compute shadowmap coordenates
    vec3 vTexCoord = shadowCalculation(vLightSpacePos);

    // TODO: evaluate if point is in shadow or not
    outColor = texture(uSampler, vTexCoord);
    gl_FragColor = vec4(outColor.rgb * vLightSpacePos, outColor.a);
}
`;
export default `#version 300 es
precision highp float;

uniform sampler2D uSampler;

in vec4 vColor;
in vec4 vLightSpacePos;
out vec4 outColor;

vec3 shadowCalculation(vec4 lightSpacePos) {
    // TODO: shadow calculation
    vec3 projCoords = lightSpacePos.xyz / lightSpacePos.w;
    projCoords = projCoords * 0.5 + 0.5;
    return projCoords;
}

void main() {
    // TODO: compute shadowmap coordenates
    vec3 projCoords = shadowCalculation(vLightSpacePos);

    // TODO: evaluate if point is in shadow or not
    float closestDepth = texture(uSampler, projCoords.xy).r;
    float currentDepth = projCoords.z;
    float shadow = 0.0;
    vec2 texelSize = 1.0 / textureSize(projCoords, 0);
    bias = 0.0025;
    for(int x = -1; x <= 1; ++x){
        for(int y = -1; y <= 1; ++y){
            float pcfDepth = texture(projCoords, vLightSpacePos.xy + vec2(x, y) * texelSize).r;
            shadow += currentDepth - bias > pcfDepth ? 1.0 : 0.0;
        }
    }
    shadow /= 9.0;
    outColor = vec4(vColor.rgb*(1.0-shadow),1.0);
}
`;
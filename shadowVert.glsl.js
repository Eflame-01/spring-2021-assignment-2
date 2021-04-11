export default `#version 300 es

uniform mat4 uModel;
uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uLightView;
uniform mat4 uLightProjection;
uniform vec4 uColor;
uniform vec3 uLightDir;
uniform bool uHasNormals;

in vec3 position;
in vec3 normal;

out vec4 vColor;
out vec4 vLightSpacePos;

void main() {
    // TODO: If has normals, compute color considering it
    if(uHasNormals){
        vColor = uColor * normal
    }
    else{
        vColor = uColor
    }

    // TODO: compute light space position and gl_Position
    vec3 fragPos = vec3(uModel * vec4(position, 1.0));
    lightSpaceMatrix = uLightProjection * uLightView;

    vLightSpacePos = lightSpaceMatrix * vec4(fragPos, 1.0);
    gl_Position = uProjection * uView * vec4(fragPos, 1.0);
}
`;
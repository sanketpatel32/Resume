import { noiseGLSL } from "./noise";

export const strataVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * A tunnel of contour-line plates seen head-on. Each plate sits one unit
 * deeper than the last; screen space maps to plate space by multiplying with
 * the plate's distance, which gives true perspective without geometry. Every
 * plate has an opening the camera falls through as the page scrolls.
 */
export const strataFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform float uDepth;
uniform vec2 uMouse;
uniform float uVel;
uniform float uIntensity;
uniform float uCore;
uniform vec3 uBg;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;

varying vec2 vUv;

${noiseGLSL}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise2(p);
    p = r * p * 2.03 + 3.1;
    a *= 0.5;
  }
  return v;
}

vec3 strataColor(float idx) {
  float m = mod(idx, 3.0);
  return m < 0.5 ? uC0 : (m < 1.5 ? uC1 : uC2);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5 * uRes) / uRes.y;
  float aspect = uRes.x / uRes.y;
  vec2 mouse = uMouse * vec2(aspect, 1.0) * 0.5;
  vec2 vp = uMouse * vec2(0.07, 0.05);
  float speed = clamp(abs(uVel), 0.0, 1.0);

  vec2 warped = uv * (1.0 - speed * 0.06 * length(uv));
  float torch = exp(-2.6 * length(uv - mouse));

  vec3 col = uBg;
  float base = floor(uDepth);

  for (int i = STRATA; i >= 1; i--) {
    float idx = base + float(i);
    float d = idx - uDepth;
    vec2 p = (warped - vp * (1.0 - 0.25 * d)) * d * 1.35;
    float r = length(p);
    float hole = 0.62 + 0.1 * sin(idx * 1.7);
    float fade = smoothstep(float(STRATA), float(STRATA) * 0.45, d) * smoothstep(0.04, 0.7, d);
    vec3 c = strataColor(idx);

    float h = fbm(p * 0.85 + vec2(idx * 3.1, idx * 1.3) + vec2(uTime * 0.012, -uTime * 0.008));
    float k = h * 10.0;
    float f = fract(k);
    float line = 1.0 - smoothstep(0.0, fwidth(k) * 1.1, min(f, 1.0 - f));

    float fr = fwidth(r);
    float outside = smoothstep(hole - fr, hole + fr, r);
    float rimDist = abs(r - hole);
    float rim = 1.0 - smoothstep(0.0, fr * 1.6, rimDist);
    float halo = exp(-rimDist * 16.0) * 0.28;

    float ang = atan(p.y, p.x) / 6.2831853 + 0.5;
    float tick = step(0.86, fract(ang * 96.0)) * step(hole, r) * (1.0 - smoothstep(0.0, 0.07, r - hole));

    float a = line * (0.16 + 1.1 * torch) * outside + rim * 0.85 + halo + tick * 0.55;
    col = mix(col, c, clamp(a * fade * uIntensity, 0.0, 1.0));
  }

  float ang = atan(uv.y, uv.x);
  float streak = smoothstep(0.78, 1.0, noise2(vec2(ang * 34.0, uTime * 0.6))) * smoothstep(0.15, 0.9, length(uv));
  col += uC0 * streak * speed * 0.35 * uIntensity;

  float coreDist = length(uv - vp);
  col += uC0 * uCore * (0.035 / (coreDist + 0.035)) * 0.55;
  col += uC2 * uCore * exp(-coreDist * 3.0) * 0.12;

  col *= 1.0 - 0.5 * dot(uv * 0.75, uv * 0.75);
  col += (hash21(frag + fract(uTime) * 91.0) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

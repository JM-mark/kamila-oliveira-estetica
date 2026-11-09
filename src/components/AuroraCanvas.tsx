"use client";

import { useEffect, useRef } from "react";
import { createProgram, finePointer, getGL, reducedMotion, visibleLoop } from "@/lib/gl";

// Aurora: fundo em dourado, champanhe e preto. Movimento lento (domain warp de ruído fractal) que reage ao cursor só no desktop.
// Shader escrito para este projeto a partir da descrição pública do efeito; não usa código de terceiros.
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uMouseOn;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;
  vec2 m = (uMouse - 0.5) * 0.35 * uMouseOn;
  vec2 q = vec2(fbm(p * 1.25 + vec2(0.0, t)), fbm(p * 1.25 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.55 + 3.6 * q + vec2(1.7, 9.2) + 0.7 * t + m), fbm(p * 1.55 + 3.6 * q + vec2(8.3, 2.8) - 0.55 * t - m));
  float f = fbm(p * 1.35 + 3.0 * r);
  vec3 black = vec3(0.059, 0.051, 0.043);
  vec3 gold = vec3(0.722, 0.584, 0.353);
  vec3 champ = vec3(0.851, 0.753, 0.549);
  vec3 pale = vec3(0.925, 0.871, 0.745);
  vec3 col = mix(black, gold * 0.5, smoothstep(0.22, 0.68, f));
  col = mix(col, champ * 0.62, smoothstep(0.55, 0.98, f * (0.6 + r.x)));
  col += pale * 0.09 * pow(r.y, 3.0);
  vec2 mp = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  col += gold * 0.16 * exp(-length(p - mp) * 3.2) * uMouseOn;
  col *= mix(0.5, 1.0, smoothstep(1.25, 0.15, length(p * vec2(0.85, 1.15))));
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.028;
  gl_FragColor = vec4(col, 1.0);
}`;

/** Canvas do shader Aurora. Se o WebGL falhar, travar ou o usuário pedir menos movimento, fica o fundo em CSS (ou um quadro parado). */
export default function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = getGL(canvas, false);
    if (!gl) return;
    const prog = createProgram(gl, FRAG);
    if (!prog) return;
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uMouseOn = u("uMouseOn");
    const reduced = reducedMotion();
    const fine = finePointer() && !reduced;
    const scale = fine ? 0.5 : 0.38; // baixa resolução: é um fundo desfocado por natureza
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0 };
    let ready = false;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(2, Math.round(r.width * scale));
      const h = Math.max(2, Math.round(r.height * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (t: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseOn, mouse.on);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!ready) { ready = true; canvas.classList.add("on"); canvas.parentElement?.classList.add("gl"); }
    };

    const parent = canvas.parentElement as HTMLElement;
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      mouse.on = 1;
    };
    if (fine) parent.addEventListener("pointermove", move);

    const lost = (e: Event) => { e.preventDefault(); canvas.classList.remove("on"); };
    canvas.addEventListener("webglcontextlost", lost);

    const stop = visibleLoop(canvas, draw, { reduced, onGiveUp: () => { /* aparelho lento: deixa o último quadro parado */ } });
    return () => {
      stop();
      parent.removeEventListener("pointermove", move);
      canvas.removeEventListener("webglcontextlost", lost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="aurora-canvas" aria-hidden="true" />;
}

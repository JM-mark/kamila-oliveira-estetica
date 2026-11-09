"use client";

import { useEffect, useRef } from "react";
import { createProgram, finePointer, getGL, reducedMotion, visibleLoop } from "@/lib/gl";

// Moldura: luz com grão, em dourado claro, que corre só pelas bordas em lóbulos fluidos e estica na direção do cursor.
// Shader escrito para este projeto a partir da descrição pública do efeito; não usa código de terceiros.
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform vec4 uBox; uniform float uTime; uniform vec2 uMouse; uniform float uMouseOn; uniform float uDpr;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
void main(){
  vec2 p = gl_FragCoord.xy;
  vec2 c = (uBox.xy + uBox.zw) * 0.5;
  vec2 hs = (uBox.zw - uBox.xy) * 0.5;
  vec2 q = abs(p - c) - hs;
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  vec2 d = p - c;
  float ang = atan(d.y, d.x);
  float wob = noise(vec2(ang * 2.0, uTime * 0.25)) * 1.6;
  float lobes = 0.0;
  for (int k = 0; k < 3; k++){
    float fk = float(k);
    lobes += pow(0.5 + 0.5 * cos(ang - uTime * (0.32 + 0.11 * fk) + fk * 2.4 + wob), 7.0);
  }
  vec2 md = uMouse - c;
  float mang = atan(md.y, md.x);
  float stretch = pow(max(0.0, cos(ang - mang)), 3.0) * uMouseOn;
  float w = 1.4 * uDpr;
  float line = exp(-sd * sd / (2.0 * w * w));
  float glowOut = exp(-max(sd, 0.0) / (7.0 * uDpr)) * step(0.0, sd);
  float glowIn = exp(-max(-sd, 0.0) / (5.0 * uDpr)) * step(sd, 0.0);
  float inten = 0.16 + lobes * 0.55 + stretch * 1.15;
  float grain = 0.72 + 0.28 * hash(floor(p / max(1.0, uDpr)) + floor(uTime * 24.0));
  float a = (line * inten + (glowOut * 0.55 + glowIn * 0.35) * inten * 0.7) * grain;
  a = clamp(a, 0.0, 1.0);
  vec3 col = vec3(0.851, 0.753, 0.549) * a;
  gl_FragColor = vec4(col, a);
}`;

/** Canvas da Moldura, posto sobre a borda de uma foto ou card. Só no desktop com mouse e sem "reduzir movimento": no resto, vale a borda dourada estática de 1 px. */
export default function MolduraCanvas({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = target.current;
    if (!canvas || !host) return;
    if (reducedMotion() || !finePointer()) return;
    const gl = getGL(canvas, true);
    if (!gl) return;
    const prog = createProgram(gl, FRAG);
    if (!prog) return;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uBox = u("uBox"), uTime = u("uTime"), uMouse = u("uMouse"), uMouseOn = u("uMouseOn"), uDpr = u("uDpr");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const M = 16; // margem do canvas ao redor da moldura, em px CSS
    const mouse = { x: 0, y: 0, on: 0, tx: 0, ty: 0, ton: 0 };
    let ready = false;

    const size = () => {
      const w = host.clientWidth + M * 2;
      const h = host.clientHeight + M * 2;
      const pw = Math.round(w * dpr), ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, pw, ph);
    };
    const draw = (t: number) => {
      size();
      const W = canvas.width, H = canvas.height;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      mouse.on += (mouse.ton - mouse.on) * 0.06;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, W, H);
      gl.uniform4f(uBox, M * dpr, M * dpr, W - M * dpr, H - M * dpr);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseOn, mouse.on);
      gl.uniform1f(uDpr, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!ready) { ready = true; canvas.classList.add("on"); }
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) * (canvas.width / r.width);
      mouse.ty = canvas.height - (e.clientY - r.top) * (canvas.height / r.height);
      mouse.ton = 1;
    };
    const leave = () => { mouse.ton = 0; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    const stop = visibleLoop(host, draw, { reduced: false, onGiveUp: () => canvas.classList.remove("on") });
    return () => {
      stop();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [target]);

  return <canvas ref={ref} className="moldura-canvas" aria-hidden="true" />;
}

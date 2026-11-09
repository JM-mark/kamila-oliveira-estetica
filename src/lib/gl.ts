/** Utilitários mínimos de WebGL (sem biblioteca). Cada componente cria o seu contexto, só quando entra na tela. */

export type GL = WebGLRenderingContext;

const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";

export function createProgram(gl: GL, frag: string): WebGLProgram | null {
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
    return s;
  };
  const v = sh(gl.VERTEX_SHADER, VERT);
  const f = sh(gl.FRAGMENT_SHADER, frag);
  if (!v || !f) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  return prog;
}

export function getGL(canvas: HTMLCanvasElement, alpha: boolean): GL | null {
  try {
    return (canvas.getContext("webgl", { alpha, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" }) as GL | null);
  } catch {
    return null;
  }
}

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Loop que só roda com o elemento visível e a aba ativa, e desiste se o aparelho não aguentar (< ~30 fps). */
export function visibleLoop(
  el: Element,
  draw: (t: number) => void,
  opts: { reduced: boolean; onGiveUp?: () => void; minFps?: number } = { reduced: false },
) {
  let raf = 0;
  let visible = false;
  let start = 0;
  let last = 0;
  let acc = 0;
  let frames = 0;
  let gaveUp = false;
  const minFps = opts.minFps ?? 30;

  const frame = (now: number) => {
    raf = 0;
    if (!visible || gaveUp || document.hidden) return;
    if (!start) start = now;
    if (last) {
      acc += now - last;
      frames++;
      if (frames === 120) {
        const avg = acc / frames;
        if (avg > 1000 / minFps) { gaveUp = true; opts.onGiveUp?.(); return; }
        acc = 0; frames = 0;
      }
    }
    last = now;
    draw((now - start) / 1000);
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && visible && !gaveUp) { last = 0; raf = requestAnimationFrame(frame); } };

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { if (opts.reduced) draw(2.5); else kick(); } }, { threshold: 0.01 });
  io.observe(el);
  const vis = () => { if (!document.hidden) kick(); };
  document.addEventListener("visibilitychange", vis);
  return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); if (raf) cancelAnimationFrame(raf); gaveUp = true; };
}

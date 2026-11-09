import { MONO_KO, MONO_OCTAGON, MONO_VIEWBOX } from "@/content/monogram";
import IntroControl from "./IntroControl";

/** Cortina de intro: o monograma KO se desenha e a cortina sobe. Só aparece quando o script do <head> liga data-intro="1". */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox={MONO_VIEWBOX} role="presentation">
        <polygon className="oct" points={MONO_OCTAGON} />
        <path className="ko" d={MONO_KO} />
      </svg>
      <IntroControl />
    </div>
  );
}

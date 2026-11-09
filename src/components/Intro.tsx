import { LOGO_PATH } from "@/content/logo-path";
import IntroControl from "./IntroControl";

/** Preloader (1ª visita da sessão, até 1,2 s): a borboleta com K da Kamila se desenha em traço dourado e a cortina preta sobe.
 *  Só aparece quando o script do <head> liga data-intro="1"; some sozinho por CSS mesmo sem JavaScript. */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox="40 0 470 519" role="presentation">
        <path className="logo-draw" d={LOGO_PATH} pathLength={1} fillRule="evenodd" />
      </svg>
      <IntroControl />
    </div>
  );
}

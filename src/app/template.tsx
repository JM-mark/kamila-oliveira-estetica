import PageCurtain from "@/components/PageCurtain";

/** Transição suave entre páginas: fade do conteúdo e cortina preta que sobe. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-in">
      <PageCurtain />
      {children}
    </div>
  );
}

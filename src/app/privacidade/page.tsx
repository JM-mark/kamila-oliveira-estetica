import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidade | Kamila Oliveira Estética",
  description: "Como o site da Kamila Oliveira Estética trata dados pessoais, conforme a LGPD.",
  alternates: canon("/privacidade/"),
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap prose" style={{ maxWidth: 760 }}>
        <p className="eyebrow">Privacidade</p>
        <h1 style={{ fontSize: "clamp(36px,6vw,56px)", marginBottom: 18 }}>Política de privacidade</h1>
        <p>Esta página explica, de forma simples, como o site de {SITE.name} trata dados pessoais, de acordo com a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).</p>

        <h2>Quem é a responsável</h2>
        <p>{SITE.name}. Para falar sobre seus dados, use o WhatsApp indicado no site.</p>

        <h2>O que o site coleta</h2>
        <ul>
          <li><strong>Agendamento guiado.</strong> O nome, o serviço, o dia e o período que você escolhe são usados apenas para montar a mensagem de WhatsApp no seu próprio aparelho. O site não envia esses dados para nenhum servidor nem os guarda.</li>
          <li><strong>WhatsApp.</strong> Ao enviar a mensagem, você passa a falar com a clínica pelo WhatsApp, que tem a própria política de privacidade.</li>
          <li><strong>Medição de visitas.</strong> Quando a medição estiver ativada, o site conta acessos e cliques nos botões de contato para entender o que ajuda quem nos procura. Esses dados não incluem seu nome.</li>
        </ul>

        <h2>Serviços de terceiros</h2>
        <p>A página de contato mostra um mapa do Google Maps. Ao carregá-lo, o Google pode registrar dados técnicos da sua visita (como o endereço de IP), conforme a política de privacidade do próprio Google. Os links para o Instagram e o WhatsApp abrem os respectivos serviços, com as regras de cada um.</p>

        <h2>Assistente do site</h2>
        <p>O assistente de perguntas roda no seu navegador e responde com as informações do site. O que você digita nele não é enviado nem guardado por nós. Só vai ao WhatsApp se você tocar no botão para enviar a pergunta.</p>

        <h2>Para que usamos</h2>
        <p>Para responder ao seu pedido de agendamento, tirar dúvidas e melhorar o site.</p>

        <h2>Seus direitos</h2>
        <p>Você pode pedir acesso, correção ou exclusão dos dados que tenhamos sobre você, e saber com quem eles são compartilhados. Basta enviar a solicitação pelo WhatsApp.</p>

        <h2>Atualizações</h2>
        <p>Esta política pode mudar. A versão em vigor é sempre a desta página.</p>
      </div>
    </section>
  );
}

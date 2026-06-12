/*
 * HOME: Mapeamento e Análise de Contrato e Fluxo Operacional
 * Tipografia: Trade Gothic LH Extended (títulos) + Verdana (corpo)
 * Paleta: Navy #0D1B2A | Off-white #F2F0EC | Branco #FFFFFF
 *   Labels: prata-azulada #8FA3B1
 *   Tags/bordas: navy, carvão, verde-escuro, âmbar
 *   Hairline: dourado #C8A84B (1px apenas)
 *   Acento de cor: azul-aço #3B6B8A nos sub-labels e detalhes
 */

import { useEffect, useRef } from "react";

const FONT_TITLE = "'TradeGothicLH', 'Arial Narrow', Arial, sans-serif";
const FONT_BODY  = "Verdana, Geneva, Tahoma, sans-serif";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    el.querySelectorAll<HTMLElement>(".reveal").forEach((t, i) => {
      t.style.transitionDelay = `${i * 55}ms`;
      obs.observe(t);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  doc:   { bg: "#0D1B2A", text: "#ffffff" },
  op:    { bg: "#3A3A3A", text: "#ffffff" },
  tech:  { bg: "#1B3A2A", text: "#ffffff" },
  money: { bg: "#3A2800", text: "#ffffff" },
  fin:   { bg: "#1A2E3F", text: "#ffffff" },
  jur:   { bg: "#2A1A3A", text: "#ffffff" },
};

const BORDER_COLORS: Record<string, string> = {
  doc:   "#0D1B2A",
  op:    "#3A3A3A",
  tech:  "#1B3A2A",
  money: "#3A2800",
  fin:   "#1A2E3F",
  jur:   "#2A1A3A",
};

function Tag({ label, type }: { label: string; type: keyof typeof TAG_STYLES }) {
  const s = TAG_STYLES[type];
  return (
    <span
      className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-[5px] mb-4"
      style={{ fontFamily: FONT_TITLE, background: s.bg, color: s.text, borderRadius: "1px" }}
    >
      {label}
    </span>
  );
}

function ColHead({ label }: { label: string }) {
  return (
    <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-2"
       style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
      {label}
    </p>
  );
}

function QuestionCard({
  tag, type,
  col1Label, col1,
  col2Label, col2,
  col3Label, col3,
}: {
  tag: string; type: keyof typeof TAG_STYLES;
  col1Label: string; col1: string;
  col2Label: string; col2: string;
  col3Label: string; col3: string;
}) {
  return (
    <div
      className="reveal card-lift bg-white overflow-hidden"
      style={{ borderLeft: `5px solid ${BORDER_COLORS[type]}`, borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}
    >
      <div className="p-6 md:p-7">
        <Tag label={tag} type={type} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { heading: col1Label, body: col1 },
            { heading: col2Label, body: col2 },
            { heading: col3Label, body: col3 },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <ColHead label={heading} />
              <p className="text-[13px] leading-relaxed"
                 style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowNode({ text, isLast }: { text: string; isLast: boolean }) {
  return (
    <div className="reveal flex flex-col items-center w-full">
      <div
        className="w-full max-w-2xl text-center text-white text-[11.5px] tracking-[0.08em] uppercase px-6 py-4"
        style={{ background: "#0D1B2A", fontFamily: FONT_TITLE, fontWeight: 700, borderRadius: "2px" }}
      >
        {text}
      </div>
      {!isLast && (
        <div className="flex flex-col items-center my-[6px] select-none" aria-hidden="true">
          <div style={{ width: "1px", height: "12px", background: "#8FA3B1" }} />
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #8FA3B1" }} />
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="reveal mb-7">
      <h2 className="text-lg md:text-xl" style={{ color: "#0D1B2A", letterSpacing: "0.1em" }}>
        {title}
      </h2>
      <div className="hairline" style={{ marginTop: "0.5rem", marginBottom: "0" }} />
    </div>
  );
}

function MapBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="reveal card-lift bg-white p-5"
         style={{ borderTop: `3px solid ${color}`, borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
      <h4 className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
          style={{ color, fontFamily: FONT_TITLE }}>
        {title}
      </h4>
      <ul className="space-y-[6px]">
        {items.map((item) => (
          <li key={item} className="text-[12.5px]"
              style={{ color: "#2a2a2a", fontFamily: FONT_BODY }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetaItem({ label, value, light }: { label: string; value: string; light?: boolean }) {
  return (
    <div>
      <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-1"
         style={{ color: light ? "#8FA3B1" : "#3B6B8A", fontFamily: FONT_TITLE }}>
        {label}
      </p>
      <p className="text-[13px] leading-snug"
         style={{ color: light ? "#dce6ed" : "#1e2a35", fontFamily: FONT_BODY }}>
        {value}
      </p>
    </div>
  );
}

export default function Home() {
  const pageRef = useReveal();

  const flowNodes1 = [
    "UE Brasil questiona o edital",
    "Perguntas sobre quem pode participar",
    "Perguntas sobre documentação e capacidade técnica",
    "Perguntas sobre estrutura local e operação",
    "Perguntas sobre Cloud, Dual SIM, Redundância e WhatsApp",
    "Resultado: o foco real é a solução operacional e tecnológica do edital",
  ];

  const questions1 = [
    { tag: "Pergunta 01 ME/EPP", type: "doc" as const,
      asked: "Critério de desempate para microempresa e empresa de pequeno porte.",
      answer: "O benefício vale para quem se enquadra como ME/EPP no momento da licitação.",
      intent: "Entender se algum participante poderia usar vantagem legal de porte empresarial." },
    { tag: "Pergunta 02 Empresa Estrangeira", type: "doc" as const,
      asked: "Participação de empresa estrangeira no certame.",
      answer: "Empresa estrangeira pode participar se tiver representação legal no Brasil e cumprir o edital.",
      intent: "Identificar como seria tratada tecnologia, representação ou fornecimento estrangeiro." },
    { tag: "Pergunta 03 CREA e Atestados", type: "doc" as const,
      asked: "Registro de atestados de capacidade técnica e interpretação do item 9.11.3.",
      answer: "O registro exigido se refere ao contrato social/CNAE, não ao atestado técnico-operacional da empresa.",
      intent: "Entender como a capacidade técnica seria comprovada e quais documentos seriam aceitos." },
    { tag: "Pergunta 04 Estrutura Local", type: "op" as const,
      asked: "Obrigatoriedade de estrutura para manutenção, operação e suporte.",
      answer: "Sim. A SEAP informou que faria readequação por errata para tratar como exigência de contratação.",
      intent: "Confirmar se seria exigida estrutura física/local e como isso afetaria a execução." },
    { tag: "Pergunta 05 Certificações", type: "doc" as const,
      asked: "Aceitação de certificação em processo de renovação ou prejudicada pela pandemia.",
      answer: "Sim, mediante comprovação de que o processo foi iniciado e prejudicado pela paralisação da pandemia.",
      intent: "Saber se documentos vencidos ou pendentes poderiam ser aceitos." },
    { tag: "Pergunta 06 Requisito Operacional", type: "op" as const,
      asked: "Confirmação objetiva de requisito operacional do edital.",
      answer: "Sim.",
      intent: "Obter confirmação formal da interpretação da SEAP." },
    { tag: "Pergunta 07 Condições Iguais", type: "op" as const,
      asked: "Tratamento igualitário entre os participantes.",
      answer: "As condições são iguais para todos os participantes.",
      intent: "Registrar formalmente a posição da SEAP sobre igualdade competitiva." },
    { tag: "Pergunta 08 Cloud e Estações em Nuvem", type: "tech" as const,
      asked: "Se as estações de trabalho seriam em nuvem.",
      answer: "Sim, serão estações de trabalho em nuvem.",
      intent: "Confirmar a arquitetura tecnológica exigida/aceita pelo edital." },
    { tag: "Pergunta 09 Quantitativo 5.000 x 15.000", type: "money" as const,
      asked: "Divergência entre 5.000 e 15.000 dispositivos.",
      answer: "5.000 seriam da SEAP/PA e 15.000 o total com órgãos participantes no Registro de Preços.",
      intent: "Definir escala real, custo, logística, estoque e base de precificação." },
    { tag: "Pergunta 10 Requisito Técnico", type: "tech" as const,
      asked: "Confirmação de requisito técnico do equipamento/solução.",
      answer: "Sim.",
      intent: "Obter confirmação formal sobre a tecnologia aceita." },
    { tag: "Pergunta 11 SIMcards", type: "tech" as const,
      asked: "Interpretação da exigência de SIMcards de operadoras diferentes.",
      answer: "O item significa que os SIMcards devem pertencer a operadoras diferentes.",
      intent: "Confirmar se o edital exigia configuração específica de comunicação móvel." },
    { tag: "Pergunta 12 Redundância e Dual SIM", type: "tech" as const,
      asked: "Se alternativa técnica com apenas um encapsulamento/SIM poderia substituir a redundância exigida.",
      answer: "Não. A SEAP entendeu que a redundância de SIMcards traz mais segurança e confiabilidade.",
      intent: "Verificar se soluções alternativas de comunicação seriam aceitas ou rejeitadas." },
    { tag: "Pergunta 13 WhatsApp", type: "tech" as const,
      asked: "Uso de SMS e WhatsApp como redundância/comunicação com monitorados.",
      answer: "A SEAP manteve a necessidade de integração com WhatsApp.",
      intent: "Confirmar se WhatsApp era obrigatório ou se outros canais poderiam substituir a exigência." },
  ];

  const flowNodes2 = [
    "Spacecomm analisa o edital",
    "Identifica riscos abertos",
    "Pede esclarecimentos",
    "SEAP corrige, explica ou mantém",
  ];

  const mapBlocks = [
    { title: "Financeiro", color: "#1A2E3F", items: ["Juros por atraso", "Dotação orçamentária", "Danos e perdas", "Reposição de equipamentos"] },
    { title: "Precificação", color: "#3A2800", items: ["Comprasnet", "Valor anual", "Planilha de custos", "Exequibilidade"] },
    { title: "Jurídico", color: "#2A1A3A", items: ["Aglutinação de objetos", "Software", "Equipamentos", "Doação obrigatória"] },
    { title: "Operacional", color: "#1B3A2A", items: ["Plantão 24/7", "Operadores", "Headphones", "Câmeras CFTV"] },
  ];

  const questions2 = [
    { tag: "Pedido 01 Juros e Correção Monetária", type: "fin" as const,
      col1Label: "O que foi perguntado", col1: "Ausência de previsão clara de juros e correção monetária por atraso de pagamento.",
      col2Label: "Resposta da SEAP", col2: "A SEAP aceitou incluir fórmula de encargos moratórios no edital e na minuta contratual.",
      col3Label: "Leitura objetiva", col3: "A pergunta encontrou omissão real e gerou correção do edital." },
    { tag: "Pedido 02 Dotação Orçamentária e Danos e Perdas", type: "fin" as const,
      col1Label: "O que foi perguntado", col1: "Se havia verba para serviço mensal e também para perdas, danos, dispositivos e carregadores.",
      col2Label: "Resposta da SEAP", col2: "Informou haver disponibilidade nos autos e que, em registro de preços, dotação é exigida na contratação.",
      col3Label: "Leitura objetiva", col3: "Spacecomm buscava fechar risco de perda patrimonial e reembolso." },
    { tag: "Pedido 02-C Critério de Reposição", type: "fin" as const,
      col1Label: "O que foi perguntado", col1: "Por que pagar 50 vezes a diária pela tornozeleira e 5 vezes pela fonte/carregador.",
      col2Label: "Resposta da SEAP", col2: "Disse usar histórico do Pará e referências de Tocantins, Synergye e Rio Grande do Norte.",
      col3Label: "Leitura objetiva", col3: "A empresa queria base econômica objetiva para indenizações futuras." },
    { tag: "Pedido 02-D Danos Aparentes", type: "fin" as const,
      col1Label: "O que foi perguntado", col1: "Definição de dano aparente e tratamento de danos internos por mau uso.",
      col2Label: "Resposta da SEAP", col2: "Dano aparente será dano externo visível; dano interno exige perícia e laudo técnico da empresa.",
      col3Label: "Leitura objetiva", col3: "A SEAP manteve critério restritivo para dano aparente." },
    { tag: "Pedido 03 Proposta Eletrônica e Comprasnet", type: "money" as const,
      col1Label: "O que foi perguntado", col1: "Como lançar a proposta no Comprasnet com quantidade 1 e valor total anual.",
      col2Label: "Resposta da SEAP", col2: "Confirmou quantidade 1 e valor unitário/total equivalente ao valor anual total.",
      col3Label: "Leitura objetiva", col3: "A pergunta buscava padronizar o lançamento dos lances." },
    { tag: "Pedido 04 Planilha de Custos", type: "money" as const,
      col1Label: "O que foi perguntado", col1: "Edital citava planilha de custos, mas não trazia modelo padrão.",
      col2Label: "Resposta da SEAP", col2: "Alterou redações, remeteu ao Anexo IV e recusou suspender o certame.",
      col3Label: "Leitura objetiva", col3: "A pergunta expôs fragilidade de comparação, mas a SEAP manteve o modelo simplificado." },
    { tag: "Pedido 05 Aglutinação de Objetos e Doação", type: "jur" as const,
      col1Label: "O que foi perguntado", col1: "Por que reunir serviço, software, equipamentos, mobiliário e doação ao final.",
      col2Label: "Resposta da SEAP", col2: "Defendeu contratação de solução integrada e justificou doação para evitar descontinuidade.",
      col3Label: "Leitura objetiva", col3: "Esse pedido ataca o desenho jurídico-econômico do contrato." },
    { tag: "Pedido 06 Operadores em Regime de Plantão", type: "op" as const,
      col1Label: "O que foi perguntado", col1: "Por que exigir 40% dos operadores em plantão além da operação 24/7.",
      col2Label: "Resposta da SEAP", col2: "Justificou pelo funcionamento 24/7/365 e maior índice de violações após 22h.",
      col3Label: "Leitura objetiva", col3: "A pergunta buscava quantificar o custo real de mão de obra." },
    { tag: "Pedido 07 Quantitativos Imprecisos", type: "op" as const,
      col1Label: "O que foi perguntado", col1: "Quantos headphones, câmeras CFTV e outros equipamentos deveriam ser considerados.",
      col2Label: "Resposta da SEAP", col2: "Informou cerca de 7 servidores, 24 câmeras e removeu outros equipamentos.",
      col3Label: "Leitura objetiva", col3: "A pergunta encontrou imprecisão real e gerou correção objetiva." },
  ];

  const summaryLinks = [
    { num: "01", title: "Dossiê Synergye", href: "#dossie" },
    { num: "02", title: "Análise I: UE Brasil x SEAP/PA", href: "#analise-1" },
    { num: "03", title: "Análise II: Spacecomm x SEAP/PA", href: "#analise-2" },
  ];

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: "#F2F0EC" }}>

      <main className="container py-14 md:py-16 space-y-14">

        {/* TÍTULO */}
        <div className="reveal">
          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-2"
             style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
            Auditoria Investigativa
          </p>
          <h1 className="text-3xl md:text-[2.5rem]" style={{ color: "#0D1B2A" }}>
            Mapeamento e Análise de Contrato e Fluxo Operacional
          </h1>
          <div className="hairline" style={{ marginTop: "1rem" }} />
        </div>

        {/* SUMÁRIO */}
        <section id="sumario">
          <SectionTitle title="Sumário" />
          <div className="bg-white p-6 md:p-8"
               style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
            <div className="flex flex-col divide-y" style={{ borderColor: "rgba(13,27,42,0.08)" }}>
              {summaryLinks.map((item) => (
                <a key={item.num} href={item.href}
                   className="reveal flex gap-6 py-4 items-center group"
                   style={{ textDecoration: "none" }}>
                  <span className="shrink-0 text-[11px] font-bold tracking-[0.14em]"
                        style={{ color: "#3B6B8A", fontFamily: FONT_TITLE, minWidth: "2rem" }}>
                    {item.num}
                  </span>
                  <p className="text-[13px] font-semibold tracking-[0.06em] uppercase"
                     style={{ color: "#0D1B2A", fontFamily: FONT_TITLE, transition: "color 0.15s" }}
                     onMouseEnter={(e) => (e.currentTarget.style.color = "#3B6B8A")}
                     onMouseLeave={(e) => (e.currentTarget.style.color = "#0D1B2A")}>
                    {item.title}
                  </p>
                  <span className="ml-auto text-[10px] tracking-[0.1em] uppercase"
                        style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Ver</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* DOSSIÊ SYNERGYE */}
        <section id="dossie">
          <div className="reveal flex items-center gap-4 py-2 mb-6">
            <div style={{ flex: 1, height: "1px", background: "#B0B8C1" }} />
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase px-4"
                  style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>
              Dossiê Synergye
            </span>
            <div style={{ flex: 1, height: "1px", background: "#B0B8C1" }} />
          </div>

          {/* Cabeçalho do Dossiê */}
          <div className="reveal px-7 py-8 md:px-9 md:py-10"
               style={{ background: "#0D1B2A", borderRadius: "2px", borderBottom: "1px solid rgba(200,168,75,0.30)" }}>
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-2"
               style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
              Dossiê: Auditoria Investigativa
            </p>
            <h2 className="text-2xl md:text-3xl text-white mb-2">
              Synergye Tecnologia da Informação Ltda
            </h2>
            <p className="text-[12px] mb-6" style={{ color: "#8FA3B1", fontFamily: FONT_BODY }}>CNPJ 07.052.354/0001-29</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetaItem light label="Referência" value="Sistema Chronos / Linha Dispositivo / Contratos SEAP-PA" />
              <MetaItem light label="Data de Emissão" value="Junho de 2026" />
              <MetaItem light label="Perfil de Risco" value="ALTO: Recomenda-se auditoria aprofundada" />
            </div>
          </div>

          {/* Sumário Executivo */}
          <div className="reveal mt-6 px-7 py-7 md:px-9 md:py-8"
               style={{ background: "#0D1B2A", borderRadius: "2px" }}>
            <h3 className="text-base text-white mb-4" style={{ fontFamily: FONT_TITLE, letterSpacing: "0.06em" }}>SUMÁRIO EXECUTIVO: TRÊS VETORES CRÍTICOS DE RISCO</h3>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              A presente auditoria investigativa foi conduzida com o objetivo de examinar, de forma independente e com base exclusivamente em fontes verificáveis, a operação da empresa Synergye Tecnologia da Informação Ltda no âmbito do monitoramento eletrônico de pessoas no sistema penitenciário brasileiro, com foco no Estado do Pará, onde a empresa mantém contratos ininterruptos desde janeiro de 2017.
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              Os achados desta auditoria são graves, objetivos e documentados. A investigação identificou três vetores críticos de risco que comprometem a integridade contratual, a soberania dos dados do Estado e a veracidade das alegações técnicas da contratada.
            </p>
          </div>

          {/* Três vetores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {[
              { num: "Primeiro Vetor", title: "Discrepâncias Contratuais", color: "#0D1B2A",
                text: "Seis termos aditivos que estenderam um contrato de 24 meses por aproximadamente seis anos, triplicaram o volume de dispositivos e geraram R$ 2.649.080,00 em ressarcimentos excepcionais classificados em rubrica orçamentária atípica. O contrato sucessor de 2022 foi firmado com a mesma empresa, pelo mesmo representante legal." },
              { num: "Segundo Vetor", title: "Risco de Soberania", color: "#1A2E3F",
                text: "Todos os dados do sistema penitenciário estadual estão armazenados em servidores da Google LLC, empresa de direito americano, sujeita à jurisdição dos Estados Unidos da América. A conectividade das tornozeleiras é gerenciada por empresa de capital americano (TNS/Siris Capital). Nenhum dado sensível está sob custódia do poder público." },
              { num: "Terceiro Vetor", title: "Hardware de Origem Não Declarada", color: "#3A2800",
                text: "A afirmação pública de hardware de desenvolvimento próprio e nacional é contraditada por declaração de autoridade do Ministério Público, por análise do certificado de homologação da Anatel e por evidências operacionais documentadas. Sobrepreço documentado de 35% a 175% em contratos auditados em múltiplos estados." },
            ].map((v) => (
              <div key={v.num} className="reveal bg-white p-6"
                   style={{ borderTop: `3px solid ${v.color}`, borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-2"
                   style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>{v.num}</p>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.07em] mb-3"
                    style={{ color: v.color, fontFamily: FONT_TITLE }}>{v.title}</h3>
                <p className="text-[12.5px] leading-relaxed"
                   style={{ color: "#2a2a2a", fontFamily: FONT_BODY, textAlign: "justify" }}>{v.text}</p>
              </div>
            ))}
          </div>

          {/* Parte I: Contratos */}
          <div className="mt-8">
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-1" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>Parte I</p>
            <h3 className="text-xl md:text-2xl mb-1" style={{ color: "#0D1B2A", letterSpacing: "0.08em", fontFamily: FONT_TITLE }}>DISCREPÂNCIAS CONTRATUAIS</h3>
            <div className="hairline mb-6" />
            <div className="flex flex-col gap-5">
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>Contrato Original 007/2017</h4>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>O contrato original 007/2017, firmado em 09 de janeiro de 2017, previa a prestação de serviços de monitoramento eletrônico para 1.830 dispositivos, por prazo de 24 meses, ao custo unitário de R$ 270,00 mensais, totalizando R$ 11.858.400,00. Esse instrumento foi submetido a seis termos aditivos e um apostilamento ao longo de sua vigência: extensão que, ao final, esticou o contrato original por aproximadamente seis anos, até janeiro de 2023.</p>
                {[{l:"Dispositivos iniciais",v:"1.830 unidades"},{l:"Prazo original",v:"24 meses"},{l:"Custo unitário",v:"R$ 270,00/mês"},{l:"Valor total original",v:"R$ 11.858.400,00"},{l:"Termos aditivos",v:"6 aditivos + 1 apostilamento"},{l:"Vigência efetiva",v:"Aproximadamente 6 anos (até jan/2023)",a:true}].map(r=>(
                  <div key={r.l} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
                    <p className="shrink-0 w-full sm:w-52 text-[9.5px] font-semibold tracking-[0.13em] uppercase" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>{r.l}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: r.a ? "#7A1A1A" : "#1e2a35", fontFamily: FONT_BODY, fontWeight: r.a ? 600 : 400 }}>{r.v}</p>
                  </div>
                ))}
              </div>
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>4º Aditivo: Anomalia Financeira Principal</h4>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>O 4º Termo Aditivo representa o ponto de maior anomalia financeira identificada na auditoria. Nele, o Estado do Pará efetuou pagamento de R$ 1.975.932,00 à Synergye a título de ressarcimento por equipamentos danificados, extraviados ou roubados, em parcela única, classificada em rubrica orçamentária atípica. Um segundo pagamento de R$ 673.148,00 pelo mesmo título foi registrado no mesmo instrumento.</p>
                {[{l:"1ª parcela de ressarcimento",v:"R$ 1.975.932,00",a:true},{l:"2ª parcela de ressarcimento",v:"R$ 673.148,00",a:true},{l:"Total ressarcido",v:"R$ 2.649.080,00",a:true},{l:"Classificação",v:"Rubrica orçamentária atípica",a:true}].map(r=>(
                  <div key={r.l} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
                    <p className="shrink-0 w-full sm:w-52 text-[9.5px] font-semibold tracking-[0.13em] uppercase" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>{r.l}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: "#7A1A1A", fontFamily: FONT_BODY, fontWeight: 600 }}>{r.v}</p>
                  </div>
                ))}
              </div>
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>Contrato 079/2022: Continuidade Vinculada</h4>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>O contrato 079/2022 foi firmado em 02 de junho de 2022. A quantidade saltou para 5.000 dispositivos, 2,7 vezes o volume original de 2017. O preço unitário foi fixado em R$ 259,00 mensais, valor superior ao último praticado no contrato anterior (R$ 243,00). O valor mensal contratado passou de aproximadamente R$ 494 mil (2017) para R$ 1.295.000,00.</p>
                {[{l:"Dispositivos (2022)",v:"5.000 unidades: 2,7× o volume original",a:true},{l:"Preço unitário (2022)",v:"R$ 259,00/mês: superior ao último praticado (R$ 243,00)",a:true},{l:"Valor mensal (2022)",v:"R$ 1.295.000,00 (vs. R$ 494 mil em 2017)",a:true},{l:"Representante legal",v:"Marcelo Ribeiro de Almeida: mesmo de 2017"},{l:"Novidade contratual",v:"Doação obrigatória de softwares e hardwares ao Estado ao término do contrato"}].map(r=>(
                  <div key={r.l} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
                    <p className="shrink-0 w-full sm:w-52 text-[9.5px] font-semibold tracking-[0.13em] uppercase" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>{r.l}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: r.a ? "#7A1A1A" : "#1e2a35", fontFamily: FONT_BODY, fontWeight: r.a ? 600 : 400 }}>{r.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parte II: Chronos */}
          <div className="mt-8">
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-1" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>Parte II: O Sistema Chronos</p>
            <h3 className="text-xl md:text-2xl mb-1" style={{ color: "#0D1B2A", letterSpacing: "0.08em", fontFamily: FONT_TITLE }}>ARQUITETURA REAL E RISCO DE SOBERANIA</h3>
            <div className="hairline mb-6" />
            <div className="flex flex-col gap-5">
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>Arquitetura Técnica Real</h4>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>A Synergye posiciona o sistema Chronos como plataforma de desenvolvimento 100% próprio e nacional. A análise forense direta do código-fonte, cabeçalhos HTTP, cookies de sessão e infraestrutura de rede dos servidores operacionais contradiz essa afirmação em múltiplas camadas. O backend é desenvolvido em PHP sobre o Yii Framework v1.x. O servidor web é o Nginx 1.28.2. O sistema de chat interno é provido pelo SendBird v3.1.33, empresa sul-coreana com sede nos Estados Unidos. O certificado SSL é emitido pela GoDaddy Inc., empresa americana.</p>
                {[{l:"Backend",v:"PHP sobre Yii Framework v1.x: origem asiática"},{l:"Servidor web",v:"Nginx 1.28.2"},{l:"Chat interno",v:"SendBird v3.1.33: empresa sul-coreana, sede nos EUA"},{l:"Certificado SSL",v:"GoDaddy Inc. (EUA): wildcard para todos os subdomínios"},{l:"Ciclos de atualização",v:"Mais de 40 (v2.76.7 → v2.117.09): modelo SaaS"}].map(r=>(
                  <div key={r.l} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
                    <p className="shrink-0 w-full sm:w-52 text-[9.5px] font-semibold tracking-[0.13em] uppercase" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>{r.l}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: "#1e2a35", fontFamily: FONT_BODY }}>{r.v}</p>
                  </div>
                ))}
              </div>
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>Localização Física dos Dados: Google Cloud Platform</h4>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>O rastreamento DNS de todos os subdomínios estaduais operados pela Synergye revelou que os IPs resolvem integralmente para a infraestrutura da Google Cloud Platform (GCP):</p>
                <div className="p-5 bg-white" style={{ border: "1px solid rgba(13,27,42,0.10)", borderRadius: "2px" }}>
                  <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>Mapeamento DNS: Google Cloud Platform</p>
                  {[{d:"pa.synergye.com.br",ip:"34.95.139.43",e:"Google Cloud LLC: Pará"},{d:"rn.synergye.com.br",ip:"35.198.60.64",e:"Google Cloud LLC: Rio Grande do Norte"},{d:"rr.synergye.com.br",ip:"34.95.225.219",e:"Google Cloud LLC: Roraima"},{d:"ma.synergye.com.br",ip:"35.247.242.73",e:"Google Cloud LLC: Maranhão"},{d:"am.synergye.com.br",ip:"35.198.21.98",e:"Google Cloud LLC: Amazonas"}].map(r=>(
                    <div key={r.d} className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3" style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
                      <code className="text-[12px]" style={{ color: "#0D1B2A", fontFamily: "monospace" }}>{r.d}</code>
                      <code className="text-[12px]" style={{ color: "#3B6B8A", fontFamily: "monospace" }}>{r.ip}</code>
                      <p className="text-[12px]" style={{ color: "#4A4A4A", fontFamily: FONT_BODY }}>{r.e}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] leading-relaxed mt-4" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>Os dados de geolocalização em tempo real, cadastros penais vinculados ao INFOPEN, históricos de movimentação e identidade de todos os monitorados não estão armazenados em datacenters governamentais. Estão sob custódia da Google LLC, empresa de direito americano, sujeita à jurisdição dos Estados Unidos da América, incluindo a CLOUD Act (2018).</p>
              </div>
              <div className="reveal px-7 py-7 md:px-9 md:py-8" style={{ background: "#0D1B2A", borderRadius: "2px" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4 text-white" style={{ fontFamily: FONT_TITLE }}>Avaliação do Risco de Soberania</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>O risco de soberania é concreto e imediato. Dados sigilosos do sistema penitenciário brasileiro estão sob controle operacional de três corporações privadas norte-americanas (Google LLC, GoDaddy Inc., TNS/Siris Capital) e uma sul-coreana (SendBird Inc.), sem que os contratos estaduais analisados contenham cláusulas explícitas de proteção de dados, localização de armazenamento ou auditabilidade por parte do poder público contratante.</p>
              </div>
            </div>
          </div>

          {/* FLUXOGRAMA: DOIS CENÁRIOS */}
          <div className="reveal mt-8">
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-1" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>Análise de Continuidade</p>
            <h3 className="text-xl md:text-2xl mb-1" style={{ color: "#0D1B2A", letterSpacing: "0.08em", fontFamily: FONT_TITLE }}>TROCA DE FORNECEDOR: O SINAL CONTINUA OU APAGA?</h3>
            <p className="text-[13px] mb-5" style={{ color: "#4A4A4A", fontFamily: FONT_BODY }}>O mesmo evento: encerrar ou trocar a empresa: leva a desfechos opostos dependendo de uma só coisa: se o Estado tem, ou não, as chaves do sistema.</p>
            <div className="hairline mb-6" />

            {/* Gatilho */}
            <div className="reveal mx-auto mb-2 px-6 py-5 text-center" style={{ maxWidth: "520px", background: "#0D1B2A", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.09)" }}>
              <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Gatilho</p>
              <p className="text-[14px] font-semibold" style={{ color: "#E9EEF7", fontFamily: FONT_TITLE }}>Fim do contrato ou decisão de trocar de fornecedor</p>
            </div>
            <div className="flex justify-center mb-1"><div style={{ width: "2px", height: "24px", background: "rgba(255,255,255,0.12)" }} /></div>
            <p className="text-center text-[10px] tracking-[0.14em] uppercase mb-5" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>O caminho depende de quem segura as chaves</p>

            {/* Dois cenários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Cenário A */}
              <div className="reveal flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: "rgba(45,212,167,0.10)", border: "1px solid rgba(45,212,167,0.30)", borderRadius: "4px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#2DD4A7", flexShrink: 0, boxShadow: "0 0 0 4px rgba(45,212,167,0.18)" }} />
                  <p className="text-[13px] font-bold" style={{ color: "#E9EEF7", fontFamily: FONT_TITLE, flex: 1 }}>Estado COM as chaves</p>
                  <span className="text-[9px] font-semibold tracking-[0.14em] uppercase px-2 py-1" style={{ color: "#2DD4A7", background: "rgba(45,212,167,0.14)", border: "1px solid rgba(45,212,167,0.30)", borderRadius: "999px", fontFamily: FONT_TITLE }}>Sinal Mantido</span>
                </div>
                {[
                  { n: "01", t: "Decisão de encerrar ou trocar de fornecedor." },
                  { n: "02", t: "Synergye entrega código-fonte e export do banco (geolocalização, cadastros, histórico)." },
                  { n: "03", t: "Estado passa a hospedar em infraestrutura própria ou a nova contratada assume o ambiente." },
                  { n: "04", t: "Chips e conectividade transferíveis: as 6.250 tornozeleiras seguem conectando." },
                  { n: "05", t: "Transição assistida: Synergye mantém o sistema no ar durante o cutover." },
                  { n: "06", t: "Novo ambiente roda em paralelo e é validado antes do desligamento." },
                ].map((s) => (
                  <div key={s.n} className="px-4 py-3" style={{ background: "#FFFFFF", border: "1px solid rgba(13,27,42,0.10)", borderLeft: "3px solid #2DD4A7", borderRadius: "4px" }}>
                    <p className="text-[9px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Passo {s.n}</p>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: "#1e2a35", fontFamily: FONT_BODY }}>{s.t}</p>
                  </div>
                ))}
                <div className="px-4 py-4" style={{ background: "rgba(45,212,167,0.10)", border: "1px solid rgba(45,212,167,0.35)", borderRadius: "4px" }}>
                  <p className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Desfecho A</p>
                  <p className="text-[14px] font-bold mb-3" style={{ color: "#2DD4A7", fontFamily: FONT_TITLE }}>Continuidade sem apagão</p>
                  {["Monitoramento em tempo real ininterrupto","Dados sob soberania e controle do Estado","Sem dependência travada na fornecedora"].map((li) => (
                    <div key={li} className="flex items-start gap-2 mb-1">
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2DD4A7", marginTop: "5px", flexShrink: 0 }} />
                      <p className="text-[12px]" style={{ color: "#4A4A4A", fontFamily: FONT_BODY }}>{li}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cenário B */}
              <div className="reveal flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: "rgba(255,93,82,0.10)", border: "1px solid rgba(255,93,82,0.30)", borderRadius: "4px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5D52", flexShrink: 0, boxShadow: "0 0 0 4px rgba(255,93,82,0.18)" }} />
                  <p className="text-[13px] font-bold" style={{ color: "#E9EEF7", fontFamily: FONT_TITLE, flex: 1 }}>Estado SEM as chaves</p>
                  <span className="text-[9px] font-semibold tracking-[0.14em] uppercase px-2 py-1" style={{ color: "#FF5D52", background: "rgba(255,93,82,0.13)", border: "1px solid rgba(255,93,82,0.28)", borderRadius: "999px", fontFamily: FONT_TITLE }}>Sinal Perdido</span>
                </div>
                {[
                  { n: "01", t: "Decisão de encerrar ou trocar de fornecedor." },
                  { n: "02", t: "A doação entrega só os binários do software, sem código-fonte garantido." },
                  { n: "03", t: "Dados vivem no Google Cloud da Synergye e em SaaS de terceiros (SendBird) com as chaves dela." },
                  { n: "04", t: "Synergye desliga a infraestrutura cloud." },
                  { n: "05", t: "Chip é da Synergye: as tornozeleiras param de enviar e receber sinal." },
                  { n: "06", t: "Estado fica com um programa que não liga e, talvez, apenas o histórico." },
                ].map((s) => (
                  <div key={s.n} className="px-4 py-3" style={{ background: "#FFFFFF", border: "1px solid rgba(13,27,42,0.10)", borderLeft: "3px solid #FF5D52", borderRadius: "4px" }}>
                    <p className="text-[9px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Passo {s.n}</p>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: "#1e2a35", fontFamily: FONT_BODY }}>{s.t}</p>
                  </div>
                ))}
                <div className="px-4 py-4" style={{ background: "rgba(255,93,82,0.10)", border: "1px solid rgba(255,93,82,0.35)", borderRadius: "4px" }}>
                  <p className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Desfecho B</p>
                  <p className="text-[14px] font-bold mb-3" style={{ color: "#FF5D52", fontFamily: FONT_TITLE }}>Apagão do monitoramento</p>
                  {["Monitoramento em tempo real interrompido","Dependência total da fornecedora","Dados sob jurisdição estrangeira (CLOUD Act)"].map((li) => (
                    <div key={li} className="flex items-start gap-2 mb-1">
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5D52", marginTop: "5px", flexShrink: 0 }} />
                      <p className="text-[12px]" style={{ color: "#4A4A4A", fontFamily: FONT_BODY }}>{li}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* end grid */}

            {/* Camada Legal LGPD */}
            <div className="reveal mt-8 p-6 md:p-8" style={{ background: "rgba(134,168,255,0.07)", border: "1px solid rgba(134,168,255,0.25)", borderRadius: "4px" }}>
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#86A8FF", fontFamily: FONT_TITLE }}>Camada Legal · LGPD (Lei 13.709/2018)</p>
              <h4 className="text-[16px] font-bold mb-3" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>A lei atravessa os dois cenários</h4>
              <p className="text-[13px] leading-relaxed mb-6" style={{ color: "#4A4A4A", fontFamily: FONT_BODY, textAlign: "justify" }}>Seja qual for o caminho, a SEAP continua sendo a <strong>controladora</strong>: responde legalmente pelos dados mesmo sem ter o controle operacional deles. Pontos a verificar:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { risk: "Estado responde, mas não controla", art: "Art. 5º VI · 42", chk: "A SEAP acessa e exporta a base sem depender da Synergye?" },
                  { risk: "Privado tratando dado penal", art: "Art. 4º §2º", chk: "Há tutela pública formal e informe à ANPD?" },
                  { risk: "Fim do contrato sem devolução", art: "Art. 15 · 16", chk: "O contrato prevê devolução integral e eliminação dos dados?" },
                  { risk: "Operador e subcontratados", art: "Art. 39", chk: "Existe contrato de tratamento (DPA) entre SEAP, Synergye, Google e SendBird?" },
                  { risk: "Jurisdição estrangeira", art: "Art. 33 · 6º VII", chk: "Onde estão os dados e quem tem acesso legal a eles?" },
                  { risk: "Dado sensível em larga escala", art: "Art. 5º II · 11 · 38", chk: "Há base legal definida e Relatório de Impacto (RIPD)?" },
                ].map((c) => (
                  <div key={c.risk} className="p-4" style={{ background: "#FFFFFF", border: "1px solid rgba(13,27,42,0.10)", borderLeft: "3px solid #86A8FF", borderRadius: "4px" }}>
                    <p className="text-[12.5px] font-bold mb-1" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>{c.risk}</p>
                    <p className="text-[10px] font-semibold tracking-[0.08em] mb-2" style={{ color: "#86A8FF", fontFamily: FONT_TITLE }}>{c.art}</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "#4A4A4A", fontFamily: FONT_BODY }}>{c.chk}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parte III: Hardware */}
          <div className="mt-8">
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-1" style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>Parte III: O Hardware Dispositivo</p>
            <h3 className="text-xl md:text-2xl mb-1" style={{ color: "#0D1B2A", letterSpacing: "0.08em", fontFamily: FONT_TITLE }}>IMPORTAÇÃO OEM MASCARADA COMO FABRICAÇÃO PRÓPRIA</h3>
            <div className="hairline mb-6" />
            <div className="flex flex-col gap-5">
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>Evidência Primária: Declaração GAECO/MPRJ (2017)</h4>
                <div className="my-4" style={{ borderLeft: "3px solid #3B6B8A", paddingLeft: "1.5rem" }}>
                  <p className="text-[13px] leading-relaxed italic mb-2" style={{ color: "#2a3a45", fontFamily: FONT_BODY, textAlign: "justify" }}>
                    "A Superintendência de Inteligência da SEAP queixou-se mais de uma vez à chefia da ineficiência do serviço, que o fornecedor do produto era estrangeiro e a reposição do material era muito lenta."
                  </p>
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Promotor de Justiça Mateus Picanço Lemos Pinaud: GAECO/MPRJ: 24 jan. 2017</p>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>Essa declaração, feita por autoridade pública no curso de investigação criminal, constitui evidência de que, ao menos até 2017, o hardware comercializado pela Synergye era de origem estrangeira.</p>
              </div>
              <div className="reveal bg-white p-7" style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4" style={{ color: "#0D1B2A", fontFamily: FONT_TITLE }}>Certificação Anatel: Mecanismo OEM</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>A certificação Anatel do modelo Dispositivo PH347A registra a Synergye exclusivamente como <strong>"Cliente"</strong> do processo de homologação: a terminologia técnica utilizada quando uma empresa importa ou manda fabricar um produto e o registra em seu nome no Brasil, sem que o fabricante original precise ser declarado publicamente. Esse mecanismo é a porta de entrada do modelo OEM no mercado brasileiro regulado pela Anatel.</p>
              </div>
              <div className="reveal px-7 py-7 md:px-9 md:py-8" style={{ background: "#0D1B2A", borderRadius: "2px" }}>
                <h4 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4 text-white" style={{ fontFamily: FONT_TITLE }}>Conclusão da Auditoria</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>A Synergye opera como integradora e importadora de hardware estrangeiro, que adquire dispositivos de fabricantes OEM asiáticos, os submete à homologação Anatel em seu próprio nome, aplica a marca Dispositivo e os comercializa ao poder público brasileiro como produto de fabricação própria, a um preço que, em múltiplos contratos auditados, apresentou sobrep reço documentado de <strong style={{ color: "#ffffff" }}>35% a 175%</strong> em relação ao mercado.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DIVISOR ANTES DA ANÁLISE I */}
        <div className="reveal flex items-center gap-4 py-2">
          <div style={{ flex: 1, height: "1px", background: "#B0B8C1" }} />
          <span className="text-[9px] font-semibold tracking-[0.2em] uppercase px-4"
                style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>Análise I</span>
          <div style={{ flex: 1, height: "1px", background: "#B0B8C1" }} />
        </div>

        {/* ANÁLISE I: UE BRASIL */}
        <section id="analise-1">
          <div className="reveal px-7 py-8 md:px-9 md:py-10"
               style={{ background: "#0D1B2A", borderRadius: "2px", borderBottom: "1px solid rgba(200,168,75,0.30)" }}>
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-2"
               style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
              Análise I
            </p>
            <h2 className="text-2xl md:text-3xl text-white mb-6">
              UE Brasil x SEAP/PA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetaItem light label="Documento" value="Perguntas da UE Brasil x Respostas da SEAP/PA" />
              <MetaItem light label="Pregão" value="Pregão Eletrônico SRP nº 017/2022 SEAP/PA" />
              <MetaItem light label="Objetivo" value="Mostrar, pergunta por pergunta, o que a empresa queria esclarecer." />
            </div>
          </div>
        </section>

        {/* LEITURA CENTRAL 1 */}
        <section>
          <div className="reveal px-7 py-7 md:px-9 md:py-8"
            style={{ background: "#0D1B2A", borderLeft: "4px solid #3B6B8A", borderRadius: "2px" }}>
            <h2 className="text-base md:text-lg text-white mb-3">Leitura Central</h2>
            <p className="text-[13px] leading-relaxed"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              As perguntas da UE Brasil não estão concentradas em preço, pagamento ou reajuste.
              Elas estão concentradas em tecnologia, operação, habilitação, estrutura e critérios de execução.
            </p>
          </div>
        </section>

        {/* FLUXO 1 */}
        <section>
          <SectionTitle title="Fluxo Principal" />
          <div className="bg-white p-8 md:p-10 flex flex-col items-center"
               style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
            {flowNodes1.map((node, i) => (
              <FlowNode key={i} text={node} isLast={i === flowNodes1.length - 1} />
            ))}
          </div>
        </section>

        {/* PERGUNTAS 1 */}
        <section>
          <SectionTitle title="Perguntas e Respostas UE Brasil" />
          <div className="flex flex-col gap-4">
            {questions1.map((q, i) => (
              <QuestionCard key={i}
                tag={q.tag} type={q.type}
                col1Label="O que foi perguntado" col1={q.asked}
                col2Label="Resposta da SEAP" col2={q.answer}
                col3Label="O que a pergunta buscava" col3={q.intent}
              />
            ))}
          </div>
        </section>

        {/* CONCLUSÃO 1 */}
        <section>
          <div className="reveal px-7 py-8 md:px-9 md:py-10"
               style={{ background: "#0D1B2A", borderRadius: "2px" }}>
            <div style={{ borderBottom: "1px solid rgba(59,107,138,0.5)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
              <h2 className="text-lg md:text-xl text-white">Leitura Investigativa</h2>
            </div>
            <p className="text-[13px] leading-relaxed mb-5"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              As perguntas da UE Brasil deixam evidente qual era o alvo da análise: verificar se o edital havia sido construído em torno de características já existentes em determinados participantes do mercado. A empresa não direciona seus questionamentos para preço, faturamento, reajuste, margem, pagamento ou viabilidade econômica. Ao contrário, concentra praticamente toda sua atenção nos requisitos que funcionam como filtros de participação.
            </p>
            <p className="text-[13px] leading-relaxed mb-5"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              Cloud, Dual SIM, redundância obrigatória, integração com WhatsApp, estrutura local, certificações específicas, capacidade técnica, empresas estrangeiras e critérios de habilitação aparecem repetidamente porque são exatamente os elementos que determinam quem consegue ou não consegue atender integralmente ao edital.
            </p>
            <p className="text-[13px] leading-relaxed mb-5"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              O comportamento das perguntas demonstra uma tentativa de desmontar a estrutura do certame para identificar se as exigências foram definidas de forma ampla ou se convergem para um perfil já existente de operação. A leitura do conjunto leva à conclusão de que a preocupação não era entender o contrato, mas identificar quem já estava pronto antes mesmo da licitação começar.
            </p>
            <p className="text-[13px] leading-relaxed mb-5"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              Quando uma empresa questiona sucessivamente requisitos técnicos, operacionais e estruturais, ela está procurando descobrir se esses requisitos foram construídos para selecionar a melhor solução ou para selecionar empresas que já possuíam previamente aquelas mesmas características. O foco das perguntas não está no serviço. O foco está nos filtros de entrada.
            </p>
            <p className="text-[13px] leading-relaxed mb-5"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              A sequência dos questionamentos aponta para uma única direção: verificar se o edital, através da soma de suas exigências, conduzia naturalmente a empresas que já operavam com aquela arquitetura tecnológica, aquela infraestrutura, aquele modelo de comunicação e aquela estrutura operacional. Em vez de ampliar o universo de competidores, o conjunto das exigências analisadas sugere um mecanismo de seleção baseado em características previamente estabelecidas.
            </p>
            <p className="text-[13px] leading-relaxed"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              Por isso, a leitura investigativa das perguntas é direta: a UE Brasil estava tentando identificar se os requisitos do edital acabavam favorecendo empresas que já possuíam aderência prévia ao modelo exigido, reduzindo a capacidade de competição de soluções alternativas que não compartilhassem exatamente das mesmas características técnicas e operacionais.
            </p>
          </div>
        </section>

        {/* DIVISOR */}
        <div className="reveal flex items-center gap-4 py-2">
          <div style={{ flex: 1, height: "1px", background: "#B0B8C1" }} />
          <span className="text-[9px] font-semibold tracking-[0.2em] uppercase px-4"
                style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>
            Análise II
          </span>
          <div style={{ flex: 1, height: "1px", background: "#B0B8C1" }} />
        </div>

        {/* ANÁLISE II: SPACECOMM */}
        <section id="analise-2">
          <div className="reveal px-7 py-8 md:px-9 md:py-10"
               style={{ background: "#0D1B2A", borderRadius: "2px", borderBottom: "1px solid rgba(200,168,75,0.30)" }}>
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-2"
               style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
              Análise II
            </p>
            <h2 className="text-2xl md:text-3xl text-white mb-6">
              Spacecomm x SEAP/PA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetaItem light label="Empresa" value="Spacecomm Monitoramento S/A" />
              <MetaItem light label="Pregão" value="P.E. S.R.P. nº 17/2022 Proc. nº 2021/1154736" />
              <MetaItem light label="Documento" value="Pedidos de esclarecimento de 22/04/2022 e respostas da SEAP/PA" />
            </div>
          </div>
        </section>

        {/* CONCLUSÃO CENTRAL SPACECOMM */}
        <section>
          <div className="reveal px-7 py-7 md:px-9 md:py-8"
            style={{ background: "#0D1B2A", borderLeft: "4px solid #3B6B8A", borderRadius: "2px" }}>
            <h2 className="text-base md:text-lg text-white mb-3">Conclusão Central</h2>
            <p className="text-[13px] leading-relaxed mb-3"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              A Spacecomm não concentrou seus pedidos em descobrir por que a Synergye venceria novamente.
              O foco principal foi medir risco financeiro, operacional, jurídico e de precificação antes de apresentar proposta.
            </p>
            <p className="text-[13px] leading-relaxed"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              As perguntas buscam transformar obrigações abertas do edital em números, regras, prazos, critérios e responsabilidades mensuráveis.
            </p>
          </div>
        </section>

        {/* FLUXO 2 */}
        <section>
          <SectionTitle title="Fluxo da Análise" />
          <div className="bg-white p-8 md:p-10 flex flex-col items-center"
               style={{ borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
            {flowNodes2.map((node, i) => (
              <FlowNode key={i} text={node} isLast={i === flowNodes2.length - 1} />
            ))}
          </div>
        </section>

        {/* MAPA POR BLOCOS */}
        <section>
          <SectionTitle title="Mapa por Blocos" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mapBlocks.map((b) => (
              <MapBlock key={b.title} {...b} />
            ))}
          </div>
        </section>

        {/* PERGUNTAS 2 */}
        <section>
          <SectionTitle title="Pedidos, Respostas e Finalidade Spacecomm" />
          <div className="flex flex-col gap-4">
            {questions2.map((q, i) => (
              <QuestionCard key={i} {...q} />
            ))}
          </div>
        </section>

        {/* SÍNTESE FINAL */}
        <section>
          <div className="reveal px-7 py-8 md:px-9 md:py-10"
               style={{ background: "#0D1B2A", borderRadius: "2px" }}>
            <div style={{ borderBottom: "1px solid rgba(59,107,138,0.5)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
              <h2 className="text-lg md:text-xl text-white">Síntese para Apresentação</h2>
            </div>
            <p className="text-[13px] leading-relaxed mb-4"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              A Spacecomm usou os pedidos de esclarecimento para medir o custo real da execução contratual.
              O eixo das perguntas foi financeiro-operacional: pagamento, dotação, reposição, planilha, doação, mão de obra e quantitativos.
            </p>
            <p className="text-[13px] leading-relaxed mb-4"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              Diferente da UE Brasil, a Spacecomm não concentrou o ataque na arquitetura tecnológica da solução nem na vencedora anterior.
              A preocupação predominante foi saber se conseguiria precificar o contrato com segurança.
            </p>
            <p className="text-[13px] leading-relaxed"
               style={{ color: "#c4d2db", fontFamily: FONT_BODY, textAlign: "justify" }}>
              <strong style={{ color: "#ffffff" }}>Conclusão:</strong> as perguntas da Spacecomm foram formuladas para reduzir incerteza de proposta e risco contratual.
            </p>
            <p className="text-[10.5px] mt-6"
               style={{ color: "#5a7080", fontFamily: FONT_BODY }}>
              Baseado exclusivamente no conteúdo fornecido: pedidos de esclarecimento da Spacecomm e respostas da SEAP/PA.
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ background: "#0D1B2A", borderTop: "1px solid rgba(200,168,75,0.20)" }}>
        <div className="container py-5">
          <p className="text-center text-[10px] tracking-[0.14em] uppercase"
             style={{ color: "#5a7080", fontFamily: FONT_TITLE }}>
            Pregão Eletrônico SRP nº 017/2022 SEAP/PA Documento Investigativo
          </p>
        </div>
      </footer>

    </div>
  );
}

/*
 * DOSSIÊ: AUDITORIA INVESTIGATIVA
 * Objeto: Synergye Tecnologia da Informação Ltda
 * Conteúdo: PDF DOSSIÊAUDITORIAINVESTIGATIVA2(1).pdf
 * Design: Trade Gothic LH Extended (títulos) + Verdana (corpo)
 * Paleta: Navy #0D1B2A | Off-white #F2F0EC | Branco #FFFFFF
 *   Labels: prata-azulada #8FA3B1 | Acento: azul-aço #3B6B8A
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
      { threshold: 0.06 }
    );
    el.querySelectorAll<HTMLElement>(".reveal").forEach((t, i) => {
      t.style.transitionDelay = `${i * 50}ms`;
      obs.observe(t);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

function SectionLabel({ part, title }: { part: string; title: string }) {
  return (
    <div className="reveal mb-8">
      <p className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-2"
         style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
        {part}
      </p>
      <h2 className="text-xl md:text-2xl" style={{ color: "#0D1B2A", letterSpacing: "0.08em" }}>
        {title}
      </h2>
      <div style={{ height: "1px", background: "rgba(200,168,75,0.35)", marginTop: "0.6rem" }} />
    </div>
  );
}

function Block({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="reveal px-7 py-7 md:px-9 md:py-8"
         style={{
           background: dark ? "#0D1B2A" : "#ffffff",
           borderRadius: "2px",
           boxShadow: dark ? "none" : "0 1px 8px rgba(13,27,42,0.07)",
         }}>
      {children}
    </div>
  );
}

function Para({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-[13px] leading-relaxed mb-4 last:mb-0"
       style={{ color: light ? "#c4d2db" : "#1e2a35", fontFamily: FONT_BODY, textAlign: "justify" }}>
      {children}
    </p>
  );
}

function SubHead({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h3 className="text-[11.5px] font-bold uppercase tracking-[0.10em] mb-4"
        style={{ color: light ? "#ffffff" : "#0D1B2A", fontFamily: FONT_TITLE }}>
      {children}
    </h3>
  );
}

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-1"
       style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
      {children}
    </p>
  );
}

function Row({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3"
         style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
      <p className="shrink-0 w-full sm:w-52 text-[9.5px] font-semibold tracking-[0.13em] uppercase"
         style={{ color: "#3B6B8A", fontFamily: FONT_TITLE, paddingTop: "2px" }}>
        {label}
      </p>
      <p className="text-[13px] leading-relaxed"
         style={{ color: alert ? "#7A1A1A" : "#1e2a35", fontFamily: FONT_BODY, fontWeight: alert ? 600 : 400 }}>
        {value}
      </p>
    </div>
  );
}

function IpRow({ domain, ip, entity }: { domain: string; ip: string; entity: string }) {
  return (
    <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-2 py-3"
         style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
      <code className="text-[12px]" style={{ color: "#0D1B2A", fontFamily: "monospace" }}>{domain}</code>
      <code className="text-[12px]" style={{ color: "#3B6B8A", fontFamily: "monospace" }}>{ip}</code>
      <p className="text-[12px]" style={{ color: "#4A4A4A", fontFamily: FONT_BODY }}>{entity}</p>
    </div>
  );
}

function Quote({ text, source }: { text: string; source: string }) {
  return (
    <div className="reveal my-5" style={{ borderLeft: "3px solid #3B6B8A", paddingLeft: "1.5rem" }}>
      <p className="text-[13px] leading-relaxed italic mb-2"
         style={{ color: "#2a3a45", fontFamily: FONT_BODY, textAlign: "justify" }}>
        "{text}"
      </p>
      <p className="text-[10px] font-semibold tracking-[0.12em] uppercase"
         style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>
        {source}
      </p>
    </div>
  );
}

function VetorCard({ num, title, color, text }: { num: string; title: string; color: string; text: string }) {
  return (
    <div className="reveal card-lift bg-white p-6"
         style={{ borderTop: `3px solid ${color}`, borderRadius: "2px", boxShadow: "0 1px 8px rgba(13,27,42,0.07)" }}>
      <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-2"
         style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
        {num}
      </p>
      <h3 className="text-[12px] font-bold uppercase tracking-[0.07em] mb-3"
          style={{ color, fontFamily: FONT_TITLE }}>
        {title}
      </h3>
      <p className="text-[12.5px] leading-relaxed"
         style={{ color: "#2a2a2a", fontFamily: FONT_BODY, textAlign: "justify" }}>
        {text}
      </p>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-1"
         style={{ color: "#8FA3B1", fontFamily: FONT_TITLE }}>
        {label}
      </p>
      <p className="text-[13px] leading-snug" style={{ color: "#dce6ed", fontFamily: FONT_BODY }}>
        {value}
      </p>
    </div>
  );
}

export default function Dossie() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: "#F2F0EC" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#0D1B2A", borderBottom: "1px solid rgba(200,168,75,0.22)" }}>
        <div className="container">
          <div className="flex items-center gap-1 py-[10px] flex-wrap">
            <a href="/"
               className="text-[10px] font-semibold tracking-[0.12em] uppercase px-4 py-2"
               style={{ fontFamily: FONT_TITLE, color: "#5a7080", textDecoration: "none", transition: "color 0.15s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
               onMouseLeave={e => (e.currentTarget.style.color = "#5a7080")}>
              ← Análises I & II
            </a>
            <span style={{ color: "#2a3a45", fontSize: "10px" }}>|</span>
            {[
              { label: "Sumário", href: "#sumario" },
              { label: "Parte I: Contratos", href: "#contratos" },
              { label: "Parte II: Chronos", href: "#chronos" },
              { label: "Parte III: Hardware", href: "#hardware" },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                 className="text-[10px] font-semibold tracking-[0.12em] uppercase px-4 py-2"
                 style={{ fontFamily: FONT_TITLE, color: "#8FA3B1", textDecoration: "none", transition: "color 0.15s" }}
                 onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                 onMouseLeave={e => (e.currentTarget.style.color = "#8FA3B1")}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <header style={{ background: "#0D1B2A", borderBottom: "1px solid rgba(200,168,75,0.30)" }}>
        <div className="container py-12 md:py-16">
          <div className="reveal" style={{ borderBottom: "1px solid rgba(200,168,75,0.25)", paddingBottom: "1.25rem", marginBottom: "1.75rem" }}>
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-3"
               style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
              Dossiê: Auditoria Investigativa
            </p>
            <h1 className="text-3xl md:text-[2.6rem] text-white leading-tight mb-2">
              Synergye Tecnologia da Informação Ltda
            </h1>
            <p className="text-[12px]" style={{ color: "#8FA3B1", fontFamily: FONT_BODY }}>
              CNPJ 07.052.354/0001-29
            </p>
          </div>
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MetaItem label="Referência" value="Sistema Chronos / Linha Dispositivo / Contratos SEAP-PA" />
            <MetaItem label="Data de Emissão" value="Junho de 2026" />
            <MetaItem label="Perfil de Risco" value="ALTO: Recomenda-se auditoria aprofundada" />
          </div>
          <div className="reveal">
            <span className="inline-block text-[10px] font-bold tracking-[0.16em] uppercase px-4 py-[6px]"
                  style={{ background: "#7A1A1A", color: "#fff", fontFamily: FONT_TITLE, borderRadius: "1px" }}>
              Risco Alto
            </span>
          </div>
        </div>
      </header>

      <main className="container py-14 md:py-16 space-y-16">

        {/* ══ SUMÁRIO ═══════════════════════════════════════════════════════ */}
        <section id="sumario">
          <SectionLabel part="Sumário Executivo" title="Três Vetores Críticos de Risco" />

          <Block dark>
            <Para light>
              A presente auditoria investigativa foi conduzida com o objetivo de examinar, de forma independente e com base exclusivamente em fontes verificáveis, a operação da empresa Synergye Tecnologia da Informação Ltda no âmbito do monitoramento eletrônico de pessoas no sistema penitenciário brasileiro: com foco no Estado do Pará, onde a empresa mantém contratos ininterruptos desde janeiro de 2017.
            </Para>
            <Para light>
              Os achados desta auditoria são graves, objetivos e documentados. A investigação identificou três vetores críticos de risco que comprometem a integridade contratual, a soberania dos dados do Estado e a veracidade das alegações técnicas da contratada.
            </Para>
          </Block>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            <VetorCard
              num="Primeiro Vetor"
              title="Discrepâncias Contratuais"
              color="#0D1B2A"
              text="Seis termos aditivos que estenderam um contrato de 24 meses por aproximadamente seis anos, triplicaram o volume de dispositivos e geraram R$ 2.649.080,00 em ressarcimentos excepcionais classificados em rubrica orçamentária atípica. O contrato sucessor de 2022 foi firmado com a mesma empresa, pelo mesmo representante legal."
            />
            <VetorCard
              num="Segundo Vetor"
              title="Risco de Soberania"
              color="#1A2E3F"
              text="Todos os dados do sistema penitenciário estadual: geolocalização em tempo real, cadastros penais, histórico de monitorados: estão armazenados em servidores da Google LLC, empresa de direito americano, sujeita à jurisdição dos Estados Unidos da América. A conectividade das tornozeleiras é gerenciada por empresa de capital americano (TNS/Siris Capital). Nenhum dado sensível está sob custódia do poder público."
            />
            <VetorCard
              num="Terceiro Vetor"
              title="Hardware de Origem Não Declarada"
              color="#3A2800"
              text="A afirmação pública de hardware de desenvolvimento próprio e nacional é contraditada por declaração de autoridade do Ministério Público, por análise do certificado de homologação da Anatel e por evidências operacionais documentadas. Sobrepreço documentado de 35% a 175% em contratos auditados em múltiplos estados."
            />
          </div>

          <div className="mt-5">
            <Block dark>
              <Para light>
                A combinação desses três vetores, somada ao histórico de denúncia criminal do CEO da empresa (GAECO/MPRJ, 2017), rescisão contratual por colapso técnico (São Paulo, 2017) e representações em Tribunais de Contas (Rondônia, Rio Grande do Norte), configura um perfil de risco classificado como <strong style={{ color: "#ffffff" }}>ALTO</strong>, com recomendação de auditoria aprofundada e revisão dos termos de renovação contratual.
              </Para>
            </Block>
          </div>
        </section>

        {/* ══ PARTE I: CONTRATOS ═══════════════════════════════════════════ */}
        <section id="contratos">
          <SectionLabel part="Parte I" title="Discrepâncias Contratuais: Contratos SEAP/PA: 007/2017 e 079/2022" />

          <div className="flex flex-col gap-5">

            <Block>
              <SubHead>Contrato Original 007/2017: Expansão Progressiva do Escopo</SubHead>
              <Para>
                A análise dos instrumentos contratuais firmados entre o Estado do Pará e a Synergye Tecnologia da Informação Ltda revela um conjunto de discrepâncias materiais que, isoladas, poderiam ser interpretadas como ajustes administrativos ordinários. Examinadas em conjunto e em sequência cronológica, configuram um padrão de expansão progressiva e silenciosa do escopo contratual, com impacto financeiro acumulado superior a R$ 24 milhões entre 2017 e 2024.
              </Para>
              <Para>
                O contrato original 007/2017, firmado em 09 de janeiro de 2017, previa a prestação de serviços de monitoramento eletrônico para 1.830 dispositivos, por prazo de 24 meses, ao custo unitário de R$ 270,00 mensais, totalizando R$ 11.858.400,00. Esse instrumento foi submetido a seis termos aditivos e um apostilamento ao longo de sua vigência: extensão que, ao final, esticou o contrato original por aproximadamente seis anos, até janeiro de 2023.
              </Para>
              <div className="mt-2">
                <Row label="Dispositivos iniciais" value="1.830 unidades" />
                <Row label="Prazo original" value="24 meses" />
                <Row label="Custo unitário" value="R$ 270,00/mês" />
                <Row label="Valor total original" value="R$ 11.858.400,00" />
                <Row label="Termos aditivos" value="6 aditivos + 1 apostilamento" />
                <Row label="Vigência efetiva" value="Aproximadamente 6 anos (até jan/2023)" alert />
              </div>
            </Block>

            <Block>
              <SubHead>1º ao 3º Aditivo: Expansão Territorial e Alteração de Ente Contratante</SubHead>
              <Para>
                O 1º Termo Aditivo, firmado em agosto de 2018, acresceu 25% ao valor global e incorporou 457 dispositivos adicionais, expandindo a abrangência territorial de 2 para 5 regiões do estado. O 2º Aditivo aplicou reajuste IPCA. O 3º Aditivo, em janeiro de 2021, reduziu o preço unitário em 10%: de R$ 270,00 para R$ 243,00: ao mesmo tempo em que alterou o ente contratante de SUSIPE para SEAP, mantendo intactos o CNPJ da contratada e o representante legal, Marcelo Ribeiro de Almeida.
              </Para>
            </Block>

            <Block>
              <SubHead>4º Aditivo: Anomalia Financeira Principal</SubHead>
              <Para>
                O 4º Termo Aditivo representa o ponto de maior anomalia financeira identificada na auditoria. Nele, o Estado do Pará efetuou pagamento de R$ 1.975.932,00 à Synergye a título de ressarcimento por equipamentos danificados, extraviados ou roubados: em parcela única, classificada em rubrica orçamentária atípica. Um segundo pagamento de R$ 673.148,00 pelo mesmo título foi registrado no mesmo instrumento.
              </Para>
              <div className="mt-2">
                <Row label="1ª parcela de ressarcimento" value="R$ 1.975.932,00" alert />
                <Row label="2ª parcela de ressarcimento" value="R$ 673.148,00" alert />
                <Row label="Total ressarcido" value="R$ 2.649.080,00" alert />
                <Row label="Classificação" value="Rubrica orçamentária atípica" alert />
              </div>
            </Block>

            <Block>
              <SubHead>5º Aditivo e Contrato 079/2022: Continuidade Vinculada</SubHead>
              <Para>
                O 5º Aditivo prorrogou o contrato de forma "excepcional" por 12 meses ou até a conclusão do processo administrativo nº 2021/1154736: o mesmo processo que originou o contrato sucessor 079/2022, com a mesma contratada. A vigência do contrato antigo foi formalmente atrelada ao processo licitatório que garantiria a continuidade da empresa no mesmo objeto.
              </Para>
              <Para>
                O contrato 079/2022 foi firmado em 02 de junho de 2022 sob a modalidade de Ata de Registro de Preços nº 002/2022. O objeto foi reclassificado de "prestação de serviço de monitoramento" para "locação de dispositivos com prestação de serviço": mudança de natureza jurídica que não alterou a entrega material, mas que tem implicações tributárias, contábeis e de responsabilidade distintas. A quantidade saltou para 5.000 dispositivos: 2,7 vezes o volume original de 2017. O preço unitário foi fixado em R$ 259,00 mensais, valor superior ao último praticado no contrato anterior (R$ 243,00). O valor mensal contratado passou de aproximadamente R$ 494 mil (2017) para R$ 1.295.000,00.
              </Para>
              <Para>
                Em 2022, o instrumento incluiu pela primeira vez cláusula de doação obrigatória de softwares e hardwares ao Estado ao término do contrato: obrigação inexistente no contrato de 2017 e ausente em todos os seus seis aditivos.
              </Para>
              <div className="mt-2">
                <Row label="Dispositivos (2022)" value="5.000 unidades: 2,7× o volume original" alert />
                <Row label="Preço unitário (2022)" value="R$ 259,00/mês: superior ao último praticado (R$ 243,00)" alert />
                <Row label="Valor mensal (2022)" value="R$ 1.295.000,00 (vs. R$ 494 mil em 2017)" alert />
                <Row label="Representante legal" value="Marcelo Ribeiro de Almeida: mesmo de 2017" />
                <Row label="Novidade contratual" value="Doação obrigatória de softwares e hardwares ao Estado ao término do contrato" />
              </div>
            </Block>

            <Block dark>
              <SubHead light>Síntese Probatória</SubHead>
              <Para light>
                A Synergye executou o objeto de forma ininterrupta de janeiro de 2017 a pelo menos junho de 2023, atravessando mudança de denominação do órgão contratante, seis aditivos, reclassificação do objeto e triplicação do volume contratado: sempre com o mesmo representante legal, o mesmo CNPJ e sem registro público de processo competitivo que justificasse a exclusividade continuada.
              </Para>
            </Block>

          </div>
        </section>

        {/* ══ PARTE II: CHRONOS ════════════════════════════════════════════ */}
        <section id="chronos">
          <SectionLabel part="Parte II: O Sistema Chronos" title="Arquitetura Real, Componentes Estrangeiros e Risco de Soberania" />

          <div className="flex flex-col gap-5">

            <Block>
              <SubHead>Arquitetura Técnica Real</SubHead>
              <Para>
                A Synergye posiciona o sistema Chronos como plataforma de desenvolvimento 100% próprio e nacional. A análise forense direta do código-fonte, cabeçalhos HTTP, cookies de sessão e infraestrutura de rede dos servidores operacionais contradiz essa afirmação em múltiplas camadas.
              </Para>
              <Para>
                A arquitetura técnica real do Chronos, identificada por análise direta do servidor pa.synergye.com.br, é a seguinte: o backend é desenvolvido em PHP, rodando sobre o Yii Framework versão 1.x: um framework de código aberto de origem asiática. O servidor web é o Nginx 1.28.2. O sistema de chat interno entre operadores é provido pelo SendBird v3.1.33, empresa sul-coreana com sede nos Estados Unidos. As videochamadas internas também são operadas pelo SendBird Calls. O certificado SSL é emitido pela GoDaddy Inc., empresa americana, como wildcard para todos os subdomínios da Synergye. A versão do sistema identificada nas imagens de referência (v2.76.7) e a versão atual (v2.117.09) indicam mais de 40 ciclos de atualização: confirmando desenvolvimento contínuo no modelo SaaS cobrado mensalmente dos estados contratantes.
              </Para>
              <div className="mt-2">
                <Row label="Backend" value="PHP sobre Yii Framework v1.x: origem asiática" />
                <Row label="Servidor web" value="Nginx 1.28.2" />
                <Row label="Chat interno" value="SendBird v3.1.33: empresa sul-coreana, sede nos EUA" />
                <Row label="Videochamadas" value="SendBird Calls" />
                <Row label="Certificado SSL" value="GoDaddy Inc. (EUA): wildcard para todos os subdomínios" />
                <Row label="Ciclos de atualização" value="Mais de 40 (v2.76.7 → v2.117.09): modelo SaaS" />
              </div>
            </Block>

            <Block>
              <SubHead>Localização Física dos Dados: Google Cloud Platform</SubHead>
              <Para>
                O achado de maior gravidade desta auditoria diz respeito à localização física dos dados. O rastreamento DNS de todos os subdomínios estaduais operados pela Synergye revelou que os IPs resolvem integralmente para a infraestrutura da Google Cloud Platform (GCP):
              </Para>
              <div className="mt-4 p-5 bg-white" style={{ border: "1px solid rgba(13,27,42,0.10)", borderRadius: "2px" }}>
                <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase mb-3"
                   style={{ color: "#3B6B8A", fontFamily: FONT_TITLE }}>
                  Mapeamento DNS → Google Cloud Platform
                </p>
                <div style={{ borderTop: "1px solid rgba(13,27,42,0.08)" }}>
                  <IpRow domain="pa.synergye.com.br" ip="34.95.139.43" entity="Google Cloud LLC: Pará" />
                  <IpRow domain="rn.synergye.com.br" ip="35.198.60.64" entity="Google Cloud LLC: Rio Grande do Norte" />
                  <IpRow domain="rr.synergye.com.br" ip="34.95.225.219" entity="Google Cloud LLC: Roraima" />
                  <IpRow domain="ma.synergye.com.br" ip="35.247.242.73" entity="Google Cloud LLC: Maranhão" />
                  <IpRow domain="am.synergye.com.br" ip="35.198.21.98" entity="Google Cloud LLC: Amazonas" />
                </div>
              </div>
              <Para>
                Os dados de geolocalização em tempo real, cadastros penais vinculados ao INFOPEN, históricos de movimentação, eventos de violação de perímetro e identidade de todos os monitorados pelo sistema de justiça criminal dos estados contratantes não estão armazenados em datacenters governamentais. Estão sob custódia da Google LLC, empresa de direito americano, sujeita à jurisdição dos Estados Unidos da América, incluindo a CLOUD Act (2018), que autoriza autoridades americanas a requisitar dados armazenados por empresas americanas independentemente do país de origem dos dados.
              </Para>
              <Para>
                A conectividade das tornozeleiras com os servidores é gerenciada pela TNS América Latina, subsidiária da Transaction Network Services Inc. (EUA), adquirida pelo fundo de private equity Siris Capital Group em 2013. Os dados de localização dos monitorados trafegam por APN dedicada de empresa americana antes de chegar aos servidores da Google.
              </Para>
            </Block>

            <Block dark>
              <SubHead light>Avaliação do Risco de Soberania</SubHead>
              <Para light>
                O risco de soberania é concreto e imediato. Dados sigilosos do sistema penitenciário brasileiro: incluindo identidade, localização em tempo real e histórico criminal de sentenciados: estão sob controle operacional de três corporações privadas norte-americanas (Google LLC, GoDaddy Inc., TNS/Siris Capital) e uma sul-coreana (SendBird Inc.), sem que os contratos estaduais analisados contenham cláusulas explícitas de proteção de dados, localização de armazenamento ou auditabilidade por parte do poder público contratante.
              </Para>
              <p className="text-[10.5px]" style={{ color: "#5a7080", fontFamily: FONT_BODY }}>
                Referência legal: CLOUD Act (2018): autoriza autoridades americanas a requisitar dados armazenados por empresas americanas independentemente do país de origem dos dados.
              </p>
            </Block>

          </div>
        </section>

        {/* ══ PARTE III: HARDWARE ══════════════════════════════════════════ */}
        <section id="hardware">
          <SectionLabel part="Parte III: O Hardware Dispositivo" title="Importação OEM Mascarada como Fabricação Própria" />

          <div className="flex flex-col gap-5">

            <Block>
              <SubHead>Afirmação Pública vs. Evidências Disponíveis</SubHead>
              <Para>
                A Synergye comercializa sua linha de tornozeleiras eletrônicas sob a marca Dispositivo (modelos PH347A e PH427A) com a afirmação pública de que se trata de "tecnologia de desenvolvimento próprio". A auditoria documental, técnica e comparativa demonstra que essa afirmação é incompatível com as evidências disponíveis.
              </Para>
            </Block>

            <Block>
              <SubHead>Evidência Primária: Declaração GAECO/MPRJ (2017)</SubHead>
              <Quote
                text="A Superintendência de Inteligência da SEAP queixou-se mais de uma vez à chefia da ineficiência do serviço, que o fornecedor do produto era estrangeiro e a reposição do material era muito lenta."
                source="Promotor de Justiça Mateus Picanço Lemos Pinaud: GAECO/MPRJ: 24 jan. 2017"
              />
              <Para>
                Essa declaração, feita por autoridade pública no curso de investigação criminal, constitui evidência de que, ao menos até 2017, o hardware comercializado pela Synergye era de origem estrangeira: e que a própria gestão do contrato no Rio de Janeiro tinha ciência disso.
              </Para>
            </Block>

            <Block>
              <SubHead>Certificação Anatel: Mecanismo OEM</SubHead>
              <Para>
                A certificação Anatel do modelo Dispositivo PH347A, emitida em 2020 pela NCC Certificações do Brasil (Grupo Bureau Veritas), registra a Synergye exclusivamente como <strong>"Cliente"</strong> do processo de homologação: a terminologia técnica utilizada quando uma empresa importa ou manda fabricar um produto e o registra em seu nome no Brasil, sem que o fabricante original do chipset e da placa-mãe precise ser declarado publicamente. Esse mecanismo é a porta de entrada do modelo OEM no mercado brasileiro regulado pela Anatel.
              </Para>
            </Block>

            <Block>
              <SubHead>Análise Comparativa: Dispositivo PH427A vs. GoSafe G737</SubHead>
              <Para>
                A análise comparativa com o modelo G737 da GoSafe Guangzhou Inc. (China) foi realizada e descartada com base em incompatibilidades técnicas objetivas. O perfil técnico do Dispositivo aponta para fabricantes OEM mais especializados, possivelmente localizados em Shenzhen, China.
              </Para>
              <div className="mt-2">
                <Row label="Dispositivo PH427A: Peso" value="100g" />
                <Row label="GoSafe G737: Peso" value="200g (diferença de 50%)" />
                <Row label="Dispositivo: Proteção IP" value="IP68" />
                <Row label="GoSafe: Proteção IP" value="IPX7" />
                <Row label="Dispositivo: GNSS" value="GPS + GLONASS + GALILEU (3 constelações)" />
                <Row label="GoSafe: GNSS" value="GPS apenas" />
              </div>
            </Block>

            <Block>
              <SubHead>Vetor Indiano: Synergye International (Bangalore, 2023)</SubHead>
              <Para>
                Em 2023, foi registrada a entidade Synergye International em Bangalore, Karnataka, Índia (46 Viviani Road, Richards Town), com quadro de funcionários ínfimo. A criação dessa entidade offshore coincide com o período de expansão dos contratos estaduais da Synergye no Brasil e configura estrutura típica de hub logístico para intermediação de componentes asiáticos, reduzindo a rastreabilidade direta entre fabricantes chineses e o CNPJ brasileiro.
              </Para>
              <Para>
                A demora na reposição de peças, documentada pelo promotor do MPRJ e nos relatórios de falha técnica do contrato de São Paulo (2017), é operacionalmente consistente com o modelo de importação: a dependência de fornecedor estrangeiro para reposição de estoque gera gargalos logísticos que uma fabricante nacional não enfrentaria.
              </Para>
            </Block>

            <Block dark>
              <SubHead light>Conclusão da Auditoria</SubHead>
              <Para light>
                A Synergye opera como integradora e importadora de hardware estrangeiro, que adquire dispositivos de fabricantes OEM asiáticos, os submete à homologação Anatel em seu próprio nome, aplica a marca Dispositivo e os comercializa ao poder público brasileiro como produto de fabricação própria: a um preço que, em múltiplos contratos auditados, apresentou sobrepreço documentado de <strong style={{ color: "#ffffff" }}>35% a 175%</strong> em relação ao mercado.
              </Para>
              <p className="text-[10.5px] mt-4" style={{ color: "#5a7080", fontFamily: FONT_BODY }}>
                Baseado exclusivamente em fontes verificáveis: instrumentos contratuais públicos, análise forense de infraestrutura, certificados Anatel, declarações de autoridade pública e registros empresariais.
              </p>
            </Block>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ background: "#0D1B2A", borderTop: "1px solid rgba(200,168,75,0.20)" }}>
        <div className="container py-5">
          <p className="text-center text-[10px] tracking-[0.14em] uppercase"
             style={{ color: "#5a7080", fontFamily: FONT_TITLE }}>
            Dossiê: Auditoria Investigativa · Synergye Tecnologia da Informação Ltda · Junho de 2026
          </p>
        </div>
      </footer>

    </div>
  );
}

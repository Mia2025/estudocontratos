# Design Brainstorm — Fluxograma Investigativo SEAP/PA

## Paleta extraída do anexo
- Navy/Azul-marinho profundo: #0D1B2A
- Prata/Cinza-claro com textura: #C8C8C8 / #E0E0E0
- Carvão/Grafite escuro: #3A3A3A
- Bege/Creme quente: #E8E0D5
- Dourado/Amarelo-ouro: #D4B44A
- Branco: #FFFFFF

---

<response>
<probability>0.07</probability>
<text>
## Opção A — Brutalismo Editorial

**Design Movement:** Brutalismo Tipográfico com influência de jornalismo investigativo impresso.

**Core Principles:**
- Contraste extremo entre peso tipográfico e espaço em branco
- Bordas e linhas como elemento estrutural, não decorativo
- Hierarquia visual construída apenas por tamanho e peso tipográfico
- Nenhum arredondamento de cantos — geometria pura e angular

**Color Philosophy:** Navy como fundo dos cabeçalhos, dourado como acento de alerta, bege como fundo de cards, carvão para texto. A tensão entre escuro e claro reforça a seriedade investigativa.

**Layout Paradigm:** Coluna única com margens assimétricas. Cards com borda esquerda espessa colorida. Fluxo vertical com separadores horizontais em dourado.

**Signature Elements:**
- Linha horizontal dourada como divisor de seções
- Tags em caixa alta com fundo carvão
- Números de pergunta em tipografia display oversized

**Interaction Philosophy:** Hover revela sublinhado dourado em títulos. Cards elevam levemente com sombra.

**Animation:** Fade-in sequencial dos cards ao scroll (stagger 60ms). Header desliza de cima com opacity 0→1 em 400ms ease-out.

**Typography System:** Playfair Display para títulos (serif elegante), Source Serif 4 para corpo de texto. Títulos em caixa alta, corpo justificado.
</text>
</response>

<response>
<probability>0.06</probability>
<text>
## Opção B — Minimalismo Institucional Nórdico

**Design Movement:** Minimalismo Escandinavo aplicado a documentos institucionais de alto escalão.

**Core Principles:**
- Respiração máxima — espaçamento generoso entre todos os elementos
- Tipografia como único ornamento
- Estrutura de grade invisível mas rigorosa
- Cor usada com extrema parcimônia

**Color Philosophy:** Fundo branco puro, texto em navy, acento dourado apenas em elementos de destaque crítico. Bege como fundo alternado de seções para criar ritmo sem ruído visual.

**Layout Paradigm:** Layout de duas colunas para os cards de perguntas (pergunta | resposta | leitura), com separador vertical em cinza-prata. Fluxo principal em coluna central com margens amplas.

**Signature Elements:**
- Numeração de perguntas em dourado, tamanho display
- Linha fina em prata separando colunas internas dos cards
- Header com fundo navy e tipografia branca em caixa alta

**Interaction Philosophy:** Transições suaves de opacidade. Nenhum movimento brusco. Tudo comunica estabilidade e autoridade.

**Animation:** Entrada dos elementos com translateY(20px) → 0 e opacity 0→1, 350ms ease-out, stagger de 80ms por card.

**Typography System:** Cormorant Garamond para títulos (serif clássico de prestígio), Lato para corpo. Títulos em caixa alta com letter-spacing amplo.
</text>
</response>

<response>
<probability>0.08</probability>
<text>
## Opção C — Documentário Investigativo Contemporâneo ← SELECIONADA

**Design Movement:** Jornalismo de dados contemporâneo — influência de publicações como The Economist e relatórios de auditoria de alto nível.

**Core Principles:**
- Clareza documental: cada elemento serve à leitura, não à decoração
- Hierarquia de informação rigorosa com três níveis visuais distintos
- Tensão controlada entre navy institucional e dourado de alerta
- Espaço em branco como elemento de credibilidade

**Color Philosophy:** Fundo branco/bege-claro para o corpo, navy para cabeçalhos e nós de fluxo, dourado como acento de atenção (tags, bordas de destaque, setas), carvão para texto secundário. O dourado não é decorativo — é semântico: marca pontos críticos.

**Layout Paradigm:** Coluna única centrada com max-width 1100px. Cards com borda esquerda colorida por categoria (dourado=doc, navy=op, carvão=tech). Fluxo principal como linha do tempo vertical com nós navy e conectores dourados.

**Signature Elements:**
- Setas de fluxo em dourado (#D4B44A) com peso visual forte
- Tags de categoria em caixa alta, fundo navy, texto branco
- Linha de separação de seção: 2px sólido em dourado com espaçamento generoso

**Interaction Philosophy:** Hover nos cards adiciona sombra suave e levanta 2px. Nós do fluxo pulsam levemente ao entrar na viewport.

**Animation:** IntersectionObserver para fade-in + translateY dos cards ao scroll. Header estático, sem animação. Fluxo principal: cada nó aparece em sequência com delay 100ms. Duração máxima 300ms, ease-out cubic-bezier(0.23,1,0.32,1).

**Typography System:** Playfair Display (Google Fonts) para todos os títulos H1/H2/H3 — serif elegante com autoridade. Lato ou Source Sans 3 para corpo de texto — sans-serif limpa e legível. Títulos em caixa alta com letter-spacing 0.08em. Corpo justificado, line-height 1.7.
</text>
</response>

---

## Decisão: Opção C — Documentário Investigativo Contemporâneo

Escolhida por alinhar a estética de relatórios institucionais sérios com a paleta fornecida, garantindo legibilidade máxima e credibilidade visual para uma apresentação de negócio de alto escalão.

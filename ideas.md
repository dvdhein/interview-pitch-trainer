# Direção visual — Interview Pitch Trainer

## Abordagens consideradas

### Abordagem 1 — Estúdio Editorial de Carreira
**Very Brief Intro:** Uma experiência editorial clara, com contraste de tinta e papel, tipografia expressiva e ritmo de leitura semelhante a um caderno de preparação premium.
**Probability:** 0.07

### Abordagem 2 — Console de Rehearsal
**Very Brief Intro:** Uma interface escura, técnica e focada em métricas, com visual de estação de ensaio para respostas, pausas e repetição.
**Probability:** 0.04

### Abordagem 3 — Cartão de Voz Humana
**Very Brief Intro:** Uma ferramenta calorosa e conversacional, baseada em cartões de fala, marcadores de respiração e detalhes de áudio que tornam o treino menos intimidante.
**Probability:** 0.08

## Abordagem escolhida — Estúdio Editorial de Carreira

### Design Movement
Editorial contemporâneo suíço com influência de cadernos de estúdio e materiais de treinamento executivo.

### Core Principles
1. Clareza hierárquica: cada tela deve responder rapidamente “o que estudar agora?”.
2. Assimetria funcional: navegação lateral e blocos deslocados criam um fluxo de estudo, não um dashboard genérico.
3. Contraste humano: marfim, grafite e coral queimado equilibram confiança profissional e calor conversacional.
4. Ação visível: ouvir, repetir e gravar ficam sempre próximos do texto praticado.

### Color Philosophy
O marfim funciona como papel de anotação e reduz a sensação de aplicativo corporativo frio. O grafite dá autoridade e legibilidade. O coral queimado é a assinatura de energia: aparece nos estados ativos, na forma de onda e nos momentos em que o usuário deve falar.

### Layout Paradigm
Shell assimétrico com trilho lateral fixo no desktop, cabeçalho editorial e uma coluna principal de estudo que alterna entre leitura, escuta e prática. No mobile, o trilho vira uma barra horizontal compacta.

### Signature Elements
1. Marcadores numerados de progresso com traço vertical.
2. Cartões de resposta com destaque tipográfico para sentence starters.
3. Indicador de áudio em forma de cápsula, com barras que respiram quando em reprodução.

### Interaction Philosophy
Interações devem parecer instrumentos de estudo: tocar inicia uma ação clara, selecionar uma seção preserva contexto e o feedback confirma o ritmo sem interromper a leitura. O áudio usa a fala nativa do navegador para manter a página pronta para uso sem arquivos pesados.

### Animation
Entradas suaves de 180–240ms em opacidade e deslocamento vertical pequeno. Barras de áudio pulsam apenas enquanto o áudio está ativo. Hover desloca cartões 2px e aumenta contraste; `prefers-reduced-motion` desliga movimentos não essenciais.

### Typography System
Display: DM Serif Display para títulos e números editoriais. Interface e corpo: Manrope para leitura, controles e textos longos. Títulos usam peso 400–500 com tracking levemente negativo; labels usam 700 e caixa alta com tracking amplo.

### Brand Essence
Um estúdio de ensaio para profissionais sêniores que querem responder com clareza, confiança e naturalidade — sem decorar um script. Personalidade: **preciso, humano, encorajador**.

### Brand Voice
Headlines soam como orientação direta e calma; CTAs usam verbos de ação e não prometem transformação vazia. Microcopy reduz a ansiedade e lembra o usuário de respirar.

Exemplos:
- “Escolha uma resposta. Ouça o ritmo. Depois faça do seu jeito.”
- “Não decore. Entenda a sequência e deixe a experiência aparecer.”

### Wordmark & Logo
Marca gráfica com um balão de fala editorial formado por duas linhas que lembram ondas de voz e uma margem de anotação. O wordmark combina DM Serif Display em “Pitch” com Manrope em “Studio”, nunca como texto padrão isolado.

### Signature Brand Color
**Coral queimado #D96C4F**, usado como sinal de voz, presença e ação.

## Style Decisions
- Usar o coral queimado com parcimônia, sempre associado a áudio, seleção e prática.
- Evitar gradientes roxos, cards excessivamente arredondados e layout totalmente centralizado.
- Implementar áudio usando `window.speechSynthesis`, com seleção de idioma EN/PT-BR e controle de velocidade.
- Usar o conteúdo do arquivo enviado como fonte da experiência, sem inventar depoimentos ou avaliações.

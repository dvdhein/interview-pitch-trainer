export type RoleplayScenario = {
  id: string;
  category:
    | "About You"
    | "Strengths & Weaknesses"
    | "Experiences & Problems"
    | "Leadership & Conflict"
    | "Fintech & Payments"
    | "Cloud & Zero Trust"
    | "Questions to Ask"
    | "AI Lab Security Analyst"
    | "Turing (Company)";
  title: string;
  question: string;
  context: string;
  suggestedAnswerEn: string;
  suggestedAnswerPt: string;
  goldenKeyPoints: string[];
  star?: { en: StarBreakdown; pt: StarBreakdown };
  followUps?: { question: string; answerEn: string; answerPt: string }[];
  deepDive?: { title: string; layers: DeepDiveLayer[] };
};

export type DeepDiveLayer = {
  name: string;
  components: string;
  controlsEn: string[];
  controlsPt: string[];
};

export type StarBreakdown = {
  situation: string;
  task: string;
  action: string;
  result: string;
};

export const roleplayScenarios: RoleplayScenario[] = [
  // ── About You ──────────────────────────────────────────────
  {
    id: "about-tell-me",
    category: "About You",
    title: "Tell Me About Yourself",
    question: "Tell me about yourself.",
    context:
      "A primeira impressão. Não é sua biografia: é um resumo de 60–90 segundos em presente → passado → futuro. Termine passando a bola para o entrevistador.",
    suggestedAnswerEn:
      "Sure. I'm a Security Architect with more than 22 years in technology and cybersecurity, mostly in highly regulated industries like banking, retail and pharma. Today, at Aché, I lead security architecture and AI security — I build AI copilots that review Architecture Decision Records and use Policy-as-Code to automate governance. Before that, at Banco BV, I designed the security for PIX and Open Banking. One of my strongest assets is bridging the gap between technical architecture and C-level business goals. Now I'm looking for a role where I can bring that experience to a bigger stage and keep learning. That's a quick summary — happy to go deeper on any part.",
    suggestedAnswerPt:
      "Claro. Sou Arquiteto de Segurança com mais de 22 anos em tecnologia e cibersegurança, principalmente em setores regulados como bancos, varejo e farmacêutico. Hoje, na Aché, lidero arquitetura de segurança e segurança de IA — construo copilotos de IA que revisam ADRs e uso Policy-as-Code para automatizar a governança. Antes disso, no Banco BV, desenhei a segurança do PIX e do Open Banking. Um dos meus maiores diferenciais é fazer a ponte entre a arquitetura técnica e os objetivos de negócio do C-level. Agora busco uma posição onde eu possa levar essa experiência para um palco maior e continuar aprendendo. Esse é um resumo rápido — posso aprofundar qualquer parte.",
    goldenKeyPoints: [
      "Presente → passado → futuro",
      "22+ anos em tecnologia, 15 em segurança",
      "Ponte entre arquitetura técnica e objetivos do C-level",
      "Fechar convidando a próxima pergunta",
    ],
  },
  {
    id: "about-background",
    category: "About You",
    title: "Walk Me Through Your Background",
    question: "Can you walk me through your background?",
    context:
      "Aqui eles querem a linha do tempo. Conte em ordem cronológica, com um resultado por etapa, e mostre a lógica da progressão — cada passo prepara o próximo.",
    suggestedAnswerEn:
      "Of course. I started in technology over 22 years ago, and since 2011 I've been fully dedicated to information security, because I saw that every system I touched also had to be protected. A big chapter was Banco BV, where I was the lead architect for the security of PIX, Open Banking and Banking-as-a-Service — mTLS, HSMs and OAuth2 FAPI at national scale, passing every Central Bank audit. Then at Grupo Boticário I standardized data protection baselines across more than 50 brands. Today at Aché I focus on Policy-as-Code, GenAI security and the Architect's Journey, where I act as Platform TPM. The common thread is simple: I take security from the department of NO to a real business enabler.",
    suggestedAnswerPt:
      "Claro. Comecei em tecnologia há mais de 22 anos e desde 2011 me dedico integralmente à segurança da informação, porque percebi que todo sistema que eu tocava também precisava ser protegido. Um capítulo importante foi o Banco BV, onde fui o arquiteto líder da segurança do PIX, Open Banking e Banking-as-a-Service — mTLS, HSMs e OAuth2 FAPI em escala nacional, passando em todas as auditorias do BACEN. Depois, no Grupo Boticário, padronizei baselines de proteção de dados em mais de 50 marcas. Hoje na Aché foco em Policy-as-Code, segurança de GenAI e na Jornada do Arquiteto, onde atuo como Platform TPM. O fio condutor é simples: tirar a segurança do 'departamento do NÃO' e torná-la viabilizadora do negócio.",
    goldenKeyPoints: [
      "Ordem cronológica com um resultado por etapa",
      "Banco BV → Boticário → Aché",
      "Fio condutor: segurança como viabilizadora",
    ],
  },
  {
    id: "about-why-cyber",
    category: "About You",
    title: "Why Cybersecurity?",
    question: "Why did you decide to pursue cybersecurity?",
    context:
      "Querem autenticidade e motivação de longo prazo. Conte o momento real em que segurança te pegou — personalize com o seu episódio verdadeiro.",
    suggestedAnswerEn:
      "Honestly, it started from curiosity. Early in my career I was building and running systems, and I kept asking: what happens if someone tries to break this? I realized that security is where technology meets real consequences — money, health data, people's trust. In banking, a single weak control could affect millions of transactions. That sense of responsibility hooked me. And what has kept me in security for more than 20 years is that security is never finished: the threats change, the technology changes, and you have to keep learning every year.",
    suggestedAnswerPt:
      "Sinceramente, começou pela curiosidade. No início da carreira eu construía e operava sistemas e sempre me perguntava: o que acontece se alguém tentar quebrar isso? Percebi que segurança é onde a tecnologia encontra consequências reais — dinheiro, dados de saúde, a confiança das pessoas. Num banco, um único controle fraco pode afetar milhões de transações. Esse senso de responsabilidade me conquistou. E o que me mantém em segurança há mais de 20 anos é que segurança nunca termina: as ameaças mudam, a tecnologia muda, e é preciso aprender todo ano.",
    goldenKeyPoints: [
      "Curiosidade genuína → responsabilidade",
      "Segurança = consequências reais para o negócio e pessoas",
      "Aprendizado contínuo como motivação",
    ],
  },
  {
    id: "about-why-field",
    category: "About You",
    title: "Why This Field?",
    question: "Why are you interested in this field?",
    context:
      "Diferente do 'por que começou': aqui é o que te empolga hoje. Fale de onde o campo está indo (IA, automação) e onde você quer estar.",
    suggestedAnswerEn:
      "Because right now the field is changing faster than ever, and I think that's exciting. AI is creating new risks — prompt injection, data leakage, autonomous agents — but it's also giving us new ways to defend. I'm already working on both sides: securing GenAI with guardrails in Azure AI Foundry, and using AI copilots to automate architecture reviews. For me, this field is where I can combine deep technical work with real business impact, and that combination is what I enjoy most.",
    suggestedAnswerPt:
      "Porque agora o campo está mudando mais rápido do que nunca, e acho isso empolgante. A IA cria novos riscos — prompt injection, vazamento de dados, agentes autônomos — mas também nos dá novas formas de defesa. Já atuo dos dois lados: protegendo GenAI com guardrails no Azure AI Foundry e usando copilotos de IA para automatizar revisões de arquitetura. Para mim, esse campo é onde consigo unir trabalho técnico profundo com impacto real no negócio, e essa combinação é o que mais gosto.",
    goldenKeyPoints: [
      "IA como novo risco e nova defesa",
      "Experiência prática dos dois lados",
      "Técnica profunda + impacto de negócio",
    ],
  },
  {
    id: "about-next-opportunity",
    category: "About You",
    title: "What You're Looking For",
    question: "What are you looking for in your next opportunity?",
    context:
      "Testam alinhamento e se você vai ficar. Fale de escopo, impacto e aprendizado — nunca de fugir do emprego atual.",
    suggestedAnswerEn:
      "I'm looking for three things. First, scope: a role where security architecture influences strategic decisions, not just reviews them at the end. Second, impact: a company where I can bridge the gap between technical risks and business goals for stakeholders, and build things that scale, like Golden Paths and Policy-as-Code. And third, growth: an international environment where I keep learning, especially in AI security. I'm not running away from anything — I'm looking for the next stage where my experience adds the most value.",
    suggestedAnswerPt:
      "Busco três coisas. Primeiro, escopo: uma posição onde a arquitetura de segurança influencie decisões estratégicas, e não só revise no final. Segundo, impacto: uma empresa onde eu possa fazer a ponte entre riscos técnicos e objetivos de negócio para os stakeholders, e construir coisas que escalam, como Golden Paths e Policy-as-Code. E terceiro, crescimento: um ambiente internacional onde eu continue aprendendo, principalmente em segurança de IA. Não estou fugindo de nada — busco a próxima etapa onde minha experiência gere mais valor.",
    goldenKeyPoints: [
      "Estrutura em três: escopo, impacto, crescimento",
      "Ponte entre riscos técnicos e objetivos de negócio",
      "Motivação positiva, nunca fuga",
    ],
  },
  {
    id: "about-why-company",
    category: "About You",
    title: "Why This Company?",
    question: "Why are you interested in this company?",
    context:
      "Exige pesquisa. Use a fórmula: o que a empresa está fazendo + por que isso conecta com sua experiência. Troque os colchetes pelos fatos da vaga.",
    suggestedAnswerEn:
      "I did some research, and what caught my attention is [the company's challenge — for example, scaling a regulated platform or adopting AI]. That's exactly the kind of problem I've solved before. At Banco BV I secured PIX under Central Bank regulation without slowing engineering down, and at Aché I'm helping the company adopt AI safely. I also like that [a value or initiative of the company]. So it's not just a job for me — it's a place where my experience matches what you need right now.",
    suggestedAnswerPt:
      "Fiz uma pesquisa, e o que me chamou atenção é [o desafio da empresa — por exemplo, escalar uma plataforma regulada ou adotar IA]. É exatamente o tipo de problema que já resolvi. No Banco BV protegi o PIX sob regulação do BACEN sem travar a engenharia, e na Aché estou ajudando a empresa a adotar IA com segurança. Também gosto de [um valor ou iniciativa da empresa]. Então não é só uma vaga para mim — é um lugar onde minha experiência combina com o que vocês precisam agora.",
    goldenKeyPoints: [
      "Mostrar que pesquisou a empresa",
      "Desafio deles ↔ experiência sua",
      "Fechar com encaixe, não com benefício próprio",
    ],
  },
  {
    id: "about-why-hire",
    category: "About You",
    title: "Why Should We Hire You?",
    question: "Why should we hire you?",
    context:
      "Seu argumento de venda final. Três provas concretas ligadas à vaga, sem arrogância e sem comparar com outros candidatos.",
    suggestedAnswerEn:
      "I think I bring a rare combination. First, depth: 22 years in technology and 15 securing critical systems, including PIX and Open Banking at national scale. Second, modern practice: I don't just write policies — I automate them with Policy-as-Code and AI copilots, so engineering moves fast and safely. And third, communication: one of my strongest assets is bridging the gap between technical architecture and C-level business goals. So you get someone who can design the architecture, sit with the developers, and explain the risk to the board.",
    suggestedAnswerPt:
      "Acredito que trago uma combinação rara. Primeiro, profundidade: 22 anos em tecnologia e 15 protegendo sistemas críticos, incluindo PIX e Open Banking em escala nacional. Segundo, prática moderna: não fico só nas políticas — eu as automatizo com Policy-as-Code e copilotos de IA, para a engenharia andar rápido e com segurança. E terceiro, comunicação: um dos meus maiores diferenciais é fazer a ponte entre a arquitetura técnica e os objetivos de negócio do C-level. Vocês ganham alguém que desenha a arquitetura, senta com os desenvolvedores e explica o risco para a diretoria.",
    goldenKeyPoints: [
      "Profundidade + prática moderna + comunicação",
      "Provas concretas (PIX, Policy-as-Code, copilotos de IA)",
      "Da arquitetura ao board",
    ],
  },

  // ── Strengths & Weaknesses ─────────────────────────────────
  {
    id: "sw-strengths",
    category: "Strengths & Weaknesses",
    title: "Your Biggest Strengths",
    question: "What are your biggest strengths?",
    context:
      "Escolha 2–3 forças relevantes para a vaga e prove cada uma com um exemplo. Força sem evidência soa como adjetivo vazio.",
    suggestedAnswerEn:
      "I'd highlight two. The first is translation: I bridge the gap between technical risks and business goals for stakeholders. At Aché, for example, I present security risk in terms of business impact to C-level executives, and that makes decisions faster. The second is turning rules into automation. Instead of manual reviews, I build Policy-as-Code and AI copilots that check architecture decisions automatically. That reduces friction for developers and keeps quality consistent. Both strengths come from the same idea: security should enable the business, not block it.",
    suggestedAnswerPt:
      "Destaco duas. A primeira é tradução: faço a ponte entre riscos técnicos e objetivos de negócio para os stakeholders. Na Aché, por exemplo, apresento o risco de segurança em termos de impacto no negócio para executivos do C-level, e isso acelera as decisões. A segunda é transformar regras em automação. Em vez de revisões manuais, construo Policy-as-Code e copilotos de IA que verificam decisões de arquitetura automaticamente. Isso reduz atrito para os desenvolvedores e mantém a qualidade consistente. As duas vêm da mesma ideia: segurança deve viabilizar o negócio, não travá-lo.",
    goldenKeyPoints: [
      "Duas forças, cada uma com exemplo",
      "Ponte entre riscos técnicos e objetivos de negócio",
      "Automação com Policy-as-Code e copilotos de IA",
    ],
  },
  {
    id: "sw-creativity",
    category: "Strengths & Weaknesses",
    title: "Creativity & Thinking Differently",
    question:
      "Can you give an example of how you use creativity to solve problems?",
    context:
      "Evite o clichê 'I think outside the box' — mostre a criatividade pelo contraste: a solução tradicional vs. a sua ideia. Feche com disciplina (PoCs) para não soar arriscado em ambiente regulado.",
    suggestedAnswerEn:
      "One of my biggest strengths is creative problem-solving. When I see a problem, I don't just ask how it's usually solved — I ask if there's a completely different way to look at it. A good example is at Aché. Architecture reviews were slow, and the traditional answer would be to hire more reviewers or add more checklists. Instead, I asked: what if the review could happen automatically, and also teach the architect at the same time? That idea became an AI copilot that reviews Architecture Decision Records, flags security risks before production, and explains how to improve the design. Review times dropped drastically. And I combine creativity with discipline: I test new ideas with small PoCs first, so we only scale what really works.",
    suggestedAnswerPt:
      "Um dos meus maiores pontos fortes é a criatividade para resolver problemas. Quando vejo um problema, não pergunto só como ele costuma ser resolvido — pergunto se existe uma forma completamente diferente de enxergá-lo. Um bom exemplo é na Aché. As revisões de arquitetura eram lentas, e a resposta tradicional seria contratar mais revisores ou criar mais checklists. Em vez disso, me perguntei: e se a revisão pudesse acontecer automaticamente e, ao mesmo tempo, ensinar o arquiteto? Essa ideia virou um copiloto de IA que revisa ADRs, aponta riscos de segurança antes da produção e explica como melhorar o desenho. O tempo de revisão caiu drasticamente. E eu combino criatividade com disciplina: testo ideias novas primeiro com PoCs pequenas, para só escalar o que realmente funciona.",
    goldenKeyPoints: [
      "'Creative problem-solving', não 'outside the box'",
      "Contraste: solução tradicional vs. sua ideia",
      "Exemplo: copiloto de IA para ADRs",
      "Criatividade com disciplina (PoCs antes de escalar)",
    ],
  },
  {
    id: "sw-weakness",
    category: "Strengths & Weaknesses",
    title: "A Weakness You're Working On",
    question: "What is one weakness you're currently working on?",
    context:
      "Descreva o efeito (a mensagem perde clareza), não um rótulo ('sou nervoso'). Limite ao contexto de alta pressão, mostre a rotina que você criou e feche com resultado. Evite: 'I get nervous', 'I'm insecure', 'I freeze'.",
    suggestedAnswerEn:
      "One thing I'm actively working on is how I communicate in high-stakes moments. When I'm presenting to a new audience — for example, senior executives I don't know yet — I sometimes feel the pressure, and my natural reaction is to speed up and add too much detail. When that happens, my main message isn't as clear as I want it to be. So I built a simple routine. Before any important meeting, I write down the one sentence I want people to remember, and I start with it. I limit myself to three key points, and I practice them out loud before the meeting. During the meeting, I slow down on purpose and pause before answering hard questions. It's made a real difference. My presentations are shorter and more direct, and I get to decisions faster. And honestly, I'm practicing this right now — preparing for interviews like this one is part of that work.",
    suggestedAnswerPt:
      "Uma coisa que estou trabalhando ativamente é a forma como me comunico em momentos de alta pressão. Quando apresento para um público novo — por exemplo, executivos que ainda não conheço — às vezes sinto a pressão, e minha reação natural é acelerar e colocar detalhe demais. Quando isso acontece, minha mensagem principal não fica tão clara quanto eu gostaria. Então criei uma rotina simples. Antes de toda reunião importante, escrevo a única frase que quero que as pessoas lembrem e começo por ela. Me limito a três pontos-chave e pratico em voz alta antes. Durante a reunião, desacelero de propósito e faço uma pausa antes de responder perguntas difíceis. Isso fez uma diferença real. Minhas apresentações ficaram mais curtas e diretas, e chego às decisões mais rápido. E sinceramente, estou praticando isso agora — me preparar para entrevistas como esta faz parte desse trabalho.",
    goldenKeyPoints: [
      "Contexto limitado: alta pressão, público novo",
      "Comportamento, não rótulo: acelerar e detalhar demais",
      "Rotina: uma frase, três pontos, ensaio, pausa",
      "Fechar com resultado + 'estou praticando agora'",
    ],
  },
  {
    id: "sw-improve",
    category: "Strengths & Weaknesses",
    title: "Something to Improve Professionally",
    question: "What is something you would like to improve professionally?",
    context:
      "Mais aberta que 'weakness': fale de uma área de crescimento intencional, com o que você já está fazendo a respeito.",
    suggestedAnswerEn:
      "I'd like to keep improving my spoken English in fast, high-pressure conversations. I read and write technical English every day, but I want to be just as natural when I'm negotiating or answering a tough question live. So I practice deliberately: I record myself answering interview and architecture questions, listen back, and work on fluency. I also want to go deeper in AI security engineering, and I'm doing that through hands-on projects with LangChain, Ollama and Azure AI.",
    suggestedAnswerPt:
      "Quero continuar melhorando meu inglês falado em conversas rápidas e de alta pressão. Leio e escrevo inglês técnico todos os dias, mas quero ser igualmente natural ao negociar ou responder uma pergunta difícil ao vivo. Então pratico de forma deliberada: gravo minhas respostas a perguntas de entrevista e de arquitetura, escuto de novo e trabalho a fluência. Também quero me aprofundar em engenharia de segurança de IA, e estou fazendo isso com projetos práticos em LangChain, Ollama e Azure AI.",
    goldenKeyPoints: [
      "Área de crescimento honesta",
      "Plano deliberado já em andamento",
      "Conexão com o futuro da função (IA)",
    ],
  },
  {
    id: "sw-dont-know",
    category: "Strengths & Weaknesses",
    title: "When You Don't Know Something",
    question: "How do you handle situations where you don't know something?",
    context:
      "Testam humildade e método. Admitir rápido + como você descobre + como evita repetir a lacuna. Bônus: responder assim se não souber algo na entrevista.",
    suggestedAnswerEn:
      "First, I say it clearly: I don't know yet, but I'll find out. In security, pretending to know is dangerous. Then I go to the source — the documentation, the specification, or the person who owns that system. If it's urgent, I make a safe temporary decision and document it in an ADR so we can revisit it. And after that, I share what I learned with the team, so the next person doesn't start from zero. After 22 years, I've learned that the right question is often more valuable than a fast answer.",
    suggestedAnswerPt:
      "Primeiro, digo com clareza: ainda não sei, mas vou descobrir. Em segurança, fingir que sabe é perigoso. Depois vou à fonte — documentação, especificação ou a pessoa responsável pelo sistema. Se for urgente, tomo uma decisão temporária segura e registro numa ADR para revisitarmos. E depois compartilho o que aprendi com o time, para a próxima pessoa não começar do zero. Depois de 22 anos, aprendi que a pergunta certa muitas vezes vale mais que uma resposta rápida.",
    goldenKeyPoints: [
      "Admitir com clareza",
      "Ir à fonte + decisão temporária registrada em ADR",
      "Compartilhar o aprendizado",
    ],
  },
  {
    id: "sw-criticism",
    category: "Strengths & Weaknesses",
    title: "Handling Criticism",
    question: "How do you deal with criticism or negative feedback?",
    context:
      "Querem maturidade emocional. Mostre que você separa o ego do trabalho e dê um exemplo de mudança real gerada por feedback.",
    suggestedAnswerEn:
      "I try to treat feedback as data, not as a personal attack. My first step is to listen and ask questions until I really understand the point. For example, developers once told me our security review process felt slow and bureaucratic. Instead of defending it, I asked where it hurt the most. That feedback led directly to the AI copilot that now reviews ADRs automatically, which cut review times a lot. So criticism actually gave me one of my best projects.",
    suggestedAnswerPt:
      "Procuro tratar feedback como dado, não como ataque pessoal. O primeiro passo é ouvir e perguntar até entender de verdade o ponto. Por exemplo, desenvolvedores já me disseram que nosso processo de revisão de segurança era lento e burocrático. Em vez de defendê-lo, perguntei onde doía mais. Esse feedback levou diretamente ao copiloto de IA que hoje revisa ADRs automaticamente, o que reduziu muito o tempo de revisão. Ou seja, uma crítica me deu um dos meus melhores projetos.",
    goldenKeyPoints: [
      "Feedback é dado, não ataque",
      "Ouvir e perguntar antes de defender",
      "Exemplo: crítica → copiloto de ADR",
    ],
  },
  {
    id: "sw-pressure",
    category: "Strengths & Weaknesses",
    title: "Pressure & Tight Deadlines",
    question: "How do you handle pressure or tight deadlines?",
    context:
      "Mostre método, não só 'trabalho bem sob pressão'. Priorização por risco + comunicação transparente + exemplo de alto risco.",
    suggestedAnswerEn:
      "I stay calm by making the problem smaller. I list what must be done, rank it by risk and business impact, and focus on the few things that really matter. I also communicate early: if something won't fit the deadline, stakeholders hear it from me first, with options. At Banco BV, PIX had a fixed regulatory launch date from the Central Bank — there was no way to move it. We prioritized the non-negotiable controls, like mTLS and HSMs, and planned the rest in phases. We delivered on time and passed the audit.",
    suggestedAnswerPt:
      "Mantenho a calma diminuindo o problema. Listo o que precisa ser feito, ordeno por risco e impacto no negócio e foco no pouco que realmente importa. Também comunico cedo: se algo não cabe no prazo, os stakeholders sabem primeiro por mim, já com opções. No Banco BV, o PIX tinha data de lançamento regulatória fixa do Banco Central — não dava para mudar. Priorizamos os controles inegociáveis, como mTLS e HSMs, e planejamos o restante em fases. Entregamos no prazo e passamos na auditoria.",
    goldenKeyPoints: [
      "Priorizar por risco e impacto",
      "Comunicar cedo, com opções",
      "Exemplo: prazo regulatório do PIX",
    ],
  },
  {
    id: "sw-pressure-yesno",
    category: "Strengths & Weaknesses",
    title: "Do You Work Well Under Pressure?",
    question: "Do you think you work well under pressure?",
    context:
      "Pergunta de sim/não: comece com 'Yes' e explique o PORQUÊ (método), depois prove com um STAR curto. Use a mesma história do SIEM/SOAR, mantendo os detalhes coerentes com o cenário 'Evaluating & Recommending a Solution'.",
    suggestedAnswerEn:
      "Yes. I work well under pressure because I stay calm, prioritize based on impact and urgency, communicate clearly, and focus on delivering the most important outcomes first. For example, at Grupo Boticário we urgently needed better visibility into potential attacks and a faster way to respond. I had to recommend a SIEM/SOAR solution on a tight timeline. I broke the work into clear priorities, focused only on the criteria that mattered most, and kept stakeholders updated regularly. We selected a solution that improved incident visibility and enabled more automated response.",
    suggestedAnswerPt:
      "Sim. Trabalho bem sob pressão porque mantenho a calma, priorizo por impacto e urgência, comunico com clareza e foco em entregar primeiro os resultados mais importantes. Por exemplo, no Grupo Boticário precisávamos com urgência de mais visibilidade sobre possíveis ataques e de uma forma mais rápida de responder. Eu tinha que recomendar uma solução de SIEM/SOAR num prazo curto. Dividi o trabalho em prioridades claras, foquei só nos critérios que mais importavam e mantive os stakeholders atualizados com frequência. Selecionamos uma solução que melhorou a visibilidade de incidentes e permitiu uma resposta mais automatizada.",
    goldenKeyPoints: [
      "Começar com 'Yes' + o porquê",
      "Priorizar por impacto e urgência",
      "Comunicação regular; escalar só o que precisa de decisão",
      "Pressão é gerenciável com plano claro",
    ],
    star: {
      en: {
        situation:
          "At Grupo Boticário, we needed to improve our monitoring and response capabilities quickly, on a tight timeline. There was pressure because the team needed visibility into potential attacks and a faster way to respond.",
        task: "My task was to evaluate SIEM/SOAR solutions and recommend one that met our security, integration, and budget needs within a tight timeline.",
        action:
          "I stayed focused by breaking the work into priorities: defining requirements, researching vendors, building a comparison matrix, requesting demos, and validating integration requirements.\n\nI communicated progress regularly with stakeholders and escalated only the decisions that needed their input.\n\nInstead of trying to analyze every possible option, I focused on the criteria that mattered most: functionality, integrations, cost, scalability, and implementation effort.",
        result:
          "We selected a solution that improved incident visibility and enabled more automated response. The experience showed me that pressure is manageable when I have a clear plan, prioritize effectively, and maintain open communication.",
      },
      pt: {
        situation:
          "No Grupo Boticário, precisávamos melhorar rapidamente a capacidade de monitoramento e resposta, num prazo curto. Havia pressão porque o time precisava de visibilidade sobre possíveis ataques e de uma forma mais rápida de responder.",
        task: "Minha tarefa era avaliar soluções de SIEM/SOAR e recomendar uma que atendesse às necessidades de segurança, integração e orçamento dentro de um prazo curto.",
        action:
          "Mantive o foco dividindo o trabalho em prioridades: definir requisitos, pesquisar fornecedores, montar uma matriz de comparação, solicitar demonstrações e validar os requisitos de integração.\n\nComuniquei o progresso com frequência aos stakeholders e escalei só as decisões que precisavam da participação deles.\n\nEm vez de tentar analisar todas as opções possíveis, foquei nos critérios que mais importavam: funcionalidades, integrações, custo, escalabilidade e esforço de implantação.",
        result:
          "Selecionamos uma solução que melhorou a visibilidade de incidentes e permitiu uma resposta mais automatizada. A experiência me mostrou que a pressão é gerenciável quando tenho um plano claro, priorizo bem e mantenho a comunicação aberta.",
      },
    },
  },

  // ── Experiences & Problems ─────────────────────────────────
  {
    id: "exp-difficult-problem",
    category: "Experiences & Problems",
    title: "A Difficult Problem You Solved",
    question: "Tell me about a difficult problem you had to solve.",
    context:
      "Use STAR (Situação, Tarefa, Ação, Resultado). Gaste a maior parte do tempo na Ação — o que VOCÊ fez — e feche com resultado mensurável.",
    suggestedAnswerEn:
      "At Banco BV, we had to connect to PIX, the Central Bank's instant payment system. The problem was a real conflict: the regulation required strong controls — mutual TLS, HSM-based signing, OAuth2 FAPI — but the system also needed sub-second latency, 24/7. My task was to design a security architecture that satisfied both. I worked with the engineering teams to move cryptographic operations into dedicated HSMs, isolated the PIX services in their own Kubernetes namespaces, and centralized validation in the API gateway. The result: we passed every Central Bank audit, kept latency within target, and engineering velocity stayed high.",
    suggestedAnswerPt:
      "No Banco BV, precisávamos conectar ao PIX, o sistema de pagamentos instantâneos do Banco Central. O problema era um conflito real: a regulação exigia controles fortes — mTLS, assinatura com HSM, OAuth2 FAPI — mas o sistema também precisava de latência abaixo de um segundo, 24/7. Minha tarefa era desenhar uma arquitetura de segurança que atendesse os dois lados. Trabalhei com os times de engenharia para levar as operações criptográficas para HSMs dedicados, isolei os serviços PIX em namespaces próprios no Kubernetes e centralizei validações no API gateway. Resultado: passamos em todas as auditorias do BACEN, mantivemos a latência dentro da meta e a velocidade da engenharia continuou alta.",
    goldenKeyPoints: [
      "STAR: conflito segurança × latência",
      "Ações técnicas concretas (HSM, namespaces, gateway)",
      "Resultado: auditorias aprovadas sem perder velocidade",
    ],
    star: {
      en: {
        situation:
          "At Banco BV, we had to connect the bank to PIX, Brazil's national instant payment system, run by the Central Bank. It processes hundreds of millions of transactions a day, 24/7, and the regulation was very strict.",
        task: "I was the lead architect for the security design. I had to meet every regulatory control — mutual TLS, HSM-based signing, OAuth2 FAPI — without breaking the requirement of sub-second latency and high availability.",
        action:
          "First, I mapped every regulatory requirement to a concrete technical control, so nothing depended on interpretation.\n\nThen I worked side by side with the engineering teams. We moved cryptographic signing into dedicated HSMs, isolated the PIX services in their own Kubernetes namespaces to reduce audit scope, and centralized token validation and rate limiting in the API gateway.\n\nWe ran performance tests with the security controls turned on from the start, so latency problems appeared early, not in production.",
        result:
          "We passed every Central Bank audit, kept latency within target, and the engineering teams kept their delivery speed. I learned that security and performance are not opposites if you design them together from day one.",
      },
      pt: {
        situation:
          "No Banco BV, precisávamos conectar o banco ao PIX, o sistema nacional de pagamentos instantâneos operado pelo Banco Central. Ele processa centenas de milhões de transações por dia, 24/7, e a regulação era muito rígida.",
        task: "Eu era o arquiteto líder do desenho de segurança. Precisava atender todos os controles regulatórios — mTLS, assinatura com HSM, OAuth2 FAPI — sem quebrar a exigência de latência abaixo de um segundo e alta disponibilidade.",
        action:
          "Primeiro, mapeei cada requisito regulatório para um controle técnico concreto, para nada depender de interpretação.\n\nDepois trabalhei lado a lado com os times de engenharia. Levamos a assinatura criptográfica para HSMs dedicados, isolamos os serviços PIX em namespaces próprios no Kubernetes para reduzir o escopo de auditoria e centralizamos validação de tokens e rate limiting no API gateway.\n\nRodamos testes de performance com os controles de segurança ligados desde o início, para os problemas de latência aparecerem cedo, e não em produção.",
        result:
          "Passamos em todas as auditorias do BACEN, mantivemos a latência dentro da meta e os times de engenharia mantiveram a velocidade de entrega. Aprendi que segurança e performance não são opostas quando são desenhadas juntas desde o primeiro dia.",
      },
    },
  },
  {
    id: "exp-mistake",
    category: "Experiences & Problems",
    title: "A Mistake and What You Learned",
    question: "Tell me about a mistake you made and what you learned from it.",
    context:
      "Assuma o erro sem culpar ninguém, mostre como corrigiu e, principalmente, o que mudou no seu jeito de trabalhar. Adapte com um episódio real seu.",
    suggestedAnswerEn:
      "Earlier in my career, I defined a security standard that was technically correct, but I wrote it alone and published it as a rule. Adoption was very low — teams saw it as extra work and found ways around it. That was my mistake: I focused on the control and forgot the people who had to use it. I fixed it by going back to the teams, simplifying the standard with them, and turning part of it into automated checks in the pipeline. Since then, I never publish a standard without involving the engineers first. That lesson is the root of how I work with Golden Paths today.",
    suggestedAnswerPt:
      "No início da carreira, defini um padrão de segurança tecnicamente correto, mas escrevi sozinho e publiquei como regra. A adoção foi muito baixa — os times viram como trabalho extra e deram um jeito de contornar. Esse foi meu erro: foquei no controle e esqueci das pessoas que precisavam usá-lo. Corrigi voltando aos times, simplificando o padrão junto com eles e transformando parte em verificações automáticas na esteira. Desde então, nunca publico um padrão sem envolver os engenheiros antes. Essa lição é a raiz de como trabalho com Golden Paths hoje.",
    goldenKeyPoints: [
      "Assumir o erro sem culpar outros",
      "Correção concreta (co-criação + automação)",
      "Mudança permanente de comportamento",
    ],
    star: {
      en: {
        situation:
          "Earlier in my career, the company needed a new security standard for how applications handled sensitive data.",
        task: "I was responsible for defining that standard and getting the development teams to adopt it.",
        action:
          "My mistake was the way I did it: I wrote the standard alone, and it was technically correct, but I published it as a rule without talking to the teams. Adoption was very low, and teams found ways around it.\n\nWhen I saw that, I went back to the teams and asked what was making it hard. We simplified the standard together, removed what didn't add real protection, and turned part of it into automated checks in the CI/CD pipeline, so developers didn't have to remember it manually.",
        result:
          "Adoption went up, and the standard actually started protecting data. Since then, I never publish a standard without involving the engineers first. That lesson is the root of how I work with Golden Paths today.",
      },
      pt: {
        situation:
          "No início da minha carreira, a empresa precisava de um novo padrão de segurança para o tratamento de dados sensíveis nas aplicações.",
        task: "Eu era responsável por definir esse padrão e fazer os times de desenvolvimento adotá-lo.",
        action:
          "Meu erro foi a forma: escrevi o padrão sozinho, tecnicamente correto, mas publiquei como regra sem conversar com os times. A adoção foi muito baixa, e os times deram um jeito de contornar.\n\nQuando percebi, voltei aos times e perguntei o que estava dificultando. Simplificamos o padrão juntos, removemos o que não agregava proteção real e transformamos parte em verificações automáticas na esteira de CI/CD, para os desenvolvedores não dependerem da memória.",
        result:
          "A adoção subiu, e o padrão passou a proteger os dados de verdade. Desde então, nunca publico um padrão sem envolver os engenheiros antes. Essa lição é a raiz de como trabalho com Golden Paths hoje.",
      },
    },
  },
  {
    id: "exp-not-as-planned",
    category: "Experiences & Problems",
    title: "When Things Didn't Go to Plan",
    question:
      "Tell me about a time when something didn't go according to plan.",
    context:
      "O foco não é o problema, é a sua reação: ajustar rápido, comunicar e proteger o objetivo. Fechar com o aprendizado.",
    suggestedAnswerEn:
      "At Grupo Boticário, I planned to roll out a single data protection baseline to more than 50 brands at once. Very quickly, it didn't work — each brand had different systems, maturity levels and priorities, and the rollout stalled. Instead of pushing harder, I paused and changed the plan. We grouped the brands by maturity, started with pilot PoCs in a few of them, and used those results to adjust the baseline before scaling. It took a bit longer at the start, but adoption was much higher in the end. I learned that a phased plan with feedback beats a perfect big-bang plan.",
    suggestedAnswerPt:
      "No Grupo Boticário, planejei implantar um único baseline de proteção de dados em mais de 50 marcas de uma vez. Rapidamente não funcionou — cada marca tinha sistemas, maturidade e prioridades diferentes, e a implantação travou. Em vez de forçar, pausei e mudei o plano. Agrupamos as marcas por maturidade, começamos com PoCs piloto em algumas delas e usamos os resultados para ajustar o baseline antes de escalar. Levou um pouco mais no início, mas a adoção final foi muito maior. Aprendi que um plano em fases com feedback vence um plano perfeito 'big-bang'.",
    goldenKeyPoints: [
      "Reconhecer rápido que o plano falhou",
      "Ajustar: fases por maturidade + PoCs piloto",
      "Lição: fases com feedback > big-bang",
    ],
    star: {
      en: {
        situation:
          "At Grupo Boticário, we needed a common data protection baseline across more than 50 omnichannel brands, each with its own systems and priorities.",
        task: "I was responsible for designing the baseline and leading its rollout across the brands.",
        action:
          "My original plan was a single rollout to all brands at once. Very quickly it stalled — the brands had very different maturity levels, and one standard did not fit everyone.\n\nInstead of pushing harder, I paused and changed the plan. I grouped the brands by maturity, started with pilot PoCs in a few of them, and used the results to adjust the baseline before scaling. I also kept leadership informed about the new timeline and why it was better.",
        result:
          "The start took a bit longer, but final adoption was much higher, and the baseline fit the real needs of each group. I learned that a phased plan with feedback beats a perfect big-bang plan.",
      },
      pt: {
        situation:
          "No Grupo Boticário, precisávamos de um baseline comum de proteção de dados para mais de 50 marcas omnichannel, cada uma com seus sistemas e prioridades.",
        task: "Eu era responsável por desenhar o baseline e liderar a implantação nas marcas.",
        action:
          "Meu plano original era implantar em todas as marcas de uma vez. Rapidamente travou — as marcas tinham níveis de maturidade muito diferentes, e um único padrão não servia para todos.\n\nEm vez de forçar, pausei e mudei o plano. Agrupei as marcas por maturidade, comecei com PoCs piloto em algumas delas e usei os resultados para ajustar o baseline antes de escalar. Também mantive a liderança informada sobre o novo cronograma e por que ele era melhor.",
        result:
          "O início levou um pouco mais, mas a adoção final foi muito maior, e o baseline passou a atender a necessidade real de cada grupo. Aprendi que um plano em fases com feedback vence um plano perfeito 'big-bang'.",
      },
    },
  },
  {
    id: "exp-proud-project",
    category: "Experiences & Problems",
    title: "A Project You're Proud Of",
    question: "Tell me about a project you're particularly proud of.",
    context:
      "Escolha um projeto que mostre quem você é hoje. Explique por que te orgulha (impacto em pessoas), não só o que foi feito.",
    suggestedAnswerEn:
      "I'm especially proud of the AI copilot I built at Aché for the Architect's Journey. Architecture reviews were slow and inconsistent — every architect had a different interpretation of the standards. I built an AI agent that reviews Architecture Decision Records automatically, flags security risks before code reaches production, and teaches architects how to improve their designs. I also protected it with guardrails and prompt sanitization in Azure AI Foundry. Review times dropped drastically and documentation quality became consistent. What makes me proud is that it changed how people work: security became a guide, not a gate.",
    suggestedAnswerPt:
      "Tenho muito orgulho do copiloto de IA que construí na Aché para a Jornada do Arquiteto. As revisões de arquitetura eram lentas e inconsistentes — cada arquiteto interpretava os padrões de um jeito. Construí um agente de IA que revisa ADRs automaticamente, aponta riscos de segurança antes do código ir para produção e ensina os arquitetos a melhorar seus desenhos. Também o protegi com guardrails e sanitização de prompt no Azure AI Foundry. O tempo de revisão caiu drasticamente e a qualidade da documentação ficou consistente. O que me orgulha é que mudou a forma como as pessoas trabalham: a segurança virou guia, não barreira.",
    goldenKeyPoints: [
      "Problema → solução → impacto",
      "Copiloto de IA para ADRs com guardrails",
      "Orgulho = mudança de comportamento das pessoas",
    ],
    star: {
      en: {
        situation:
          "At Aché, architecture reviews were slow and inconsistent. Each architect interpreted the security standards differently, and reviews became a bottleneck before production.",
        task: "As Platform TPM for the Architect's Journey, my goal was to make reviews faster and more consistent, without lowering the security bar.",
        action:
          "I built an AI copilot that reviews Architecture Decision Records automatically. It checks each decision against our standards, flags security risks, and explains to the architect how to improve the design — so it teaches, not just blocks.\n\nBecause it was an AI system handling internal architecture data, I also secured it: guardrails and prompt sanitization in Azure AI Foundry to protect against prompt injection and data leakage.\n\nI rolled it out step by step, collecting feedback from architects and adjusting the rules.",
        result:
          "Review times dropped drastically, and documentation quality became consistent across teams. What makes me proud is the change in behavior: security became a guide, not a gate.",
      },
      pt: {
        situation:
          "Na Aché, as revisões de arquitetura eram lentas e inconsistentes. Cada arquiteto interpretava os padrões de segurança de um jeito, e a revisão virava gargalo antes da produção.",
        task: "Como Platform TPM da Jornada do Arquiteto, meu objetivo era deixar as revisões mais rápidas e consistentes, sem baixar o nível de segurança.",
        action:
          "Construí um copiloto de IA que revisa ADRs automaticamente. Ele compara cada decisão com nossos padrões, aponta riscos de segurança e explica ao arquiteto como melhorar o desenho — ou seja, ensina, não só bloqueia.\n\nComo era um sistema de IA lidando com dados internos de arquitetura, também o protegi: guardrails e sanitização de prompt no Azure AI Foundry contra prompt injection e vazamento de dados.\n\nImplantei em etapas, coletando feedback dos arquitetos e ajustando as regras.",
        result:
          "O tempo de revisão caiu drasticamente, e a qualidade da documentação ficou consistente entre os times. O que me orgulha é a mudança de comportamento: a segurança virou guia, não barreira.",
      },
    },
  },
  {
    id: "exp-self-learned",
    category: "Experiences & Problems",
    title: "Something You Learned on Your Own",
    question: "Tell me about something you learned completely on your own.",
    context:
      "Testam autonomia e learning agility. Mostre o método (como aprendeu) e a aplicação real (o que entregou com isso).",
    suggestedAnswerEn:
      "Generative AI engineering. When LLMs became popular, nobody at work had experience with them, and there was no training program. So I taught myself: I read the documentation, ran local models with Ollama, built small prototypes with LangChain, and studied the new risks, like prompt injection. My method is always the same — learn the concept, build something small, break it, and fix it. In a few months I moved from experiments to production: that self-study became the AI copilot that reviews architecture decisions at Aché.",
    suggestedAnswerPt:
      "Engenharia de IA Generativa. Quando os LLMs se popularizaram, ninguém no trabalho tinha experiência e não havia programa de treinamento. Então aprendi sozinho: li a documentação, rodei modelos locais com Ollama, construí pequenos protótipos com LangChain e estudei os novos riscos, como prompt injection. Meu método é sempre o mesmo — aprender o conceito, construir algo pequeno, quebrar e consertar. Em poucos meses saí dos experimentos para a produção: esse autoestudo virou o copiloto de IA que revisa decisões de arquitetura na Aché.",
    goldenKeyPoints: [
      "Aprendizado sem treinamento formal",
      "Método: conceito → protótipo → quebrar → consertar",
      "Do estudo à produção",
    ],
    star: {
      en: {
        situation:
          "When large language models became popular, the company started to see real opportunities in AI, but nobody on the team had hands-on experience, and there was no training program.",
        task: "I wanted to understand both how to use GenAI and how to secure it, so I could guide the company safely.",
        action:
          "I taught myself with a simple method: learn the concept, build something small, break it, and fix it.\n\nI read the official documentation, ran local models with Ollama, and built small prototypes with LangChain. I studied the new risks — prompt injection, data leakage, insecure output handling — and tried to attack my own prototypes to see where they failed.\n\nThen I applied what I learned to a real problem at work.",
        result:
          "In a few months, I moved from experiments to production: that self-study became the AI copilot that reviews architecture decisions at Aché. It also made me the reference for GenAI security in the team.",
      },
      pt: {
        situation:
          "Quando os modelos de linguagem se popularizaram, a empresa começou a enxergar oportunidades reais com IA, mas ninguém no time tinha experiência prática, e não havia programa de treinamento.",
        task: "Eu queria entender tanto como usar GenAI quanto como protegê-la, para guiar a empresa com segurança.",
        action:
          "Aprendi sozinho com um método simples: aprender o conceito, construir algo pequeno, quebrar e consertar.\n\nLi a documentação oficial, rodei modelos locais com Ollama e construí pequenos protótipos com LangChain. Estudei os novos riscos — prompt injection, vazamento de dados, tratamento inseguro de saída — e tentei atacar meus próprios protótipos para ver onde falhavam.\n\nDepois apliquei o aprendizado a um problema real do trabalho.",
        result:
          "Em poucos meses, saí dos experimentos para a produção: esse autoestudo virou o copiloto de IA que revisa decisões de arquitetura na Aché. Também me tornei referência em segurança de GenAI no time.",
      },
    },
  },
  {
    id: "exp-adapt",
    category: "Experiences & Problems",
    title: "Adapting to a New Situation",
    question: "Tell me about a time you had to adapt to a new situation.",
    context:
      "Mostre flexibilidade: o que mudou, como você reaprendeu o contexto e o que manteve de valor da experiência anterior.",
    suggestedAnswerEn:
      "When I moved from banking to retail at Grupo Boticário, the context was completely different. In a bank, regulation drives everything and teams accept strict controls. In omnichannel retail, speed to market drives everything, and more than 50 brands had their own way of working. I had to adapt my approach: less mandate, more influence. I spent the first weeks listening to the teams, understanding their business priorities, and then proposed controls through PoCs that showed value quickly. I kept the rigor from banking, but changed how I delivered it.",
    suggestedAnswerPt:
      "Quando saí do setor bancário para o varejo no Grupo Boticário, o contexto era completamente diferente. No banco, a regulação dita tudo e os times aceitam controles rígidos. No varejo omnichannel, a velocidade de mercado dita tudo, e mais de 50 marcas tinham seu próprio jeito de trabalhar. Precisei adaptar minha abordagem: menos imposição, mais influência. Passei as primeiras semanas ouvindo os times, entendendo suas prioridades de negócio, e depois propus controles através de PoCs que mostravam valor rápido. Mantive o rigor do banco, mas mudei a forma de entregar.",
    goldenKeyPoints: [
      "Mudança de contexto: banco → varejo",
      "Ouvir primeiro, liderar por influência",
      "Manter o rigor, mudar a entrega",
    ],
    star: {
      en: {
        situation:
          "I moved from banking to omnichannel retail at Grupo Boticário. In the bank, regulation drove everything. In retail, speed to market drove everything, and more than 50 brands had their own way of working.",
        task: "I had to bring security and data protection to this new environment without slowing the business down.",
        action:
          "I changed my approach from mandate to influence. In the first weeks, I mostly listened: I met the teams, learned their business priorities, and understood where security created friction.\n\nThen, instead of imposing controls, I proposed them through quick PoCs that showed value in their own context. I kept the technical rigor I had from banking, but changed how I delivered it — shorter cycles, simpler language, and business outcomes first.",
        result:
          "Teams started to see security as a partner, and adoption was much higher than a top-down approach would have achieved. I learned to keep the rigor and adapt the delivery to the culture.",
      },
      pt: {
        situation:
          "Saí do setor bancário para o varejo omnichannel no Grupo Boticário. No banco, a regulação ditava tudo. No varejo, a velocidade de mercado ditava tudo, e mais de 50 marcas tinham seu próprio jeito de trabalhar.",
        task: "Eu precisava levar segurança e proteção de dados para esse novo ambiente sem frear o negócio.",
        action:
          "Mudei minha abordagem de imposição para influência. Nas primeiras semanas, eu mais ouvi do que falei: conheci os times, entendi as prioridades de negócio e onde a segurança gerava atrito.\n\nDepois, em vez de impor controles, propus através de PoCs rápidas que mostravam valor no contexto deles. Mantive o rigor técnico do banco, mas mudei a forma de entregar — ciclos mais curtos, linguagem mais simples e resultado de negócio primeiro.",
        result:
          "Os times passaram a ver a segurança como parceira, e a adoção foi muito maior do que uma abordagem de cima para baixo teria conseguido. Aprendi a manter o rigor e adaptar a entrega à cultura.",
      },
    },
  },
  {
    id: "exp-difficult-decision",
    category: "Experiences & Problems",
    title: "A Difficult Decision",
    question: "Tell me about a time you had to make a difficult decision.",
    context:
      "Mostre como você decide com informação incompleta: critérios claros, trade-offs explícitos e responsabilidade pelo resultado.",
    suggestedAnswerEn:
      "A product team needed to launch a feature for a business deadline, but a security review found a risk that couldn't be fully fixed in time. Blocking the launch would hurt the business; releasing it without controls would be irresponsible. I ran a quick threat model with the team to measure the real exploit risk, and then proposed a middle path: launch with compensating controls — extra monitoring and restricted access — and register the remaining risk in an ADR, with an owner and a fix date. I presented it to the business owner, who formally accepted the risk. We launched on time and closed the debt in the next sprint. The decision was hard, but it was transparent and shared.",
    suggestedAnswerPt:
      "Um time de produto precisava lançar uma funcionalidade por um prazo de negócio, mas a revisão de segurança encontrou um risco que não dava para corrigir totalmente a tempo. Bloquear o lançamento prejudicaria o negócio; lançar sem controles seria irresponsável. Fiz uma modelagem de ameaças rápida com o time para medir o risco real de exploração e propus um caminho do meio: lançar com controles compensatórios — monitoramento extra e acesso restrito — e registrar o risco restante numa ADR, com responsável e data de correção. Apresentei ao dono do negócio, que aceitou formalmente o risco. Lançamos no prazo e fechamos o débito na sprint seguinte. A decisão foi difícil, mas transparente e compartilhada.",
    goldenKeyPoints: [
      "Trade-off explícito: negócio × risco",
      "Controles compensatórios + ADR com dono e prazo",
      "Aceite formal do risco pelo negócio",
    ],
    star: {
      en: {
        situation:
          "A product team needed to launch a feature for a fixed business deadline, but a security review found a risk that couldn't be fully fixed in time.",
        task: "I had to decide whether to block the launch or find a responsible way to release it. Blocking would hurt the business; releasing without controls would be irresponsible.",
        action:
          "First, I ran a quick threat model with the team to measure the real exploit risk, instead of reacting to the worst case.\n\nThen I proposed a middle path: launch with compensating controls — extra monitoring and restricted access — and register the remaining risk in an ADR, with an owner and a fix date.\n\nI presented the options, the risk and the plan to the business owner in business language, and they formally accepted the risk.",
        result:
          "We launched on time, nothing was exploited, and we closed the security debt in the next sprint. The decision was hard, but it was transparent and shared — not a security decree.",
      },
      pt: {
        situation:
          "Um time de produto precisava lançar uma funcionalidade num prazo de negócio fixo, mas a revisão de segurança encontrou um risco que não dava para corrigir totalmente a tempo.",
        task: "Eu precisava decidir entre bloquear o lançamento ou encontrar uma forma responsável de lançar. Bloquear prejudicaria o negócio; lançar sem controles seria irresponsável.",
        action:
          "Primeiro, fiz uma modelagem de ameaças rápida com o time para medir o risco real de exploração, em vez de reagir ao pior cenário.\n\nDepois propus um caminho do meio: lançar com controles compensatórios — monitoramento extra e acesso restrito — e registrar o risco restante numa ADR, com responsável e data de correção.\n\nApresentei as opções, o risco e o plano ao dono do negócio em linguagem de negócio, e ele aceitou formalmente o risco.",
        result:
          "Lançamos no prazo, nada foi explorado, e fechamos o débito de segurança na sprint seguinte. A decisão foi difícil, mas transparente e compartilhada — não um decreto da segurança.",
      },
    },
  },
  {
    id: "exp-tech-evaluation",
    category: "Experiences & Problems",
    title: "Evaluating & Recommending a Solution",
    question:
      "Tell me about a time you had to evaluate and recommend a technology solution.",
    context:
      "Mostra pensamento estruturado e decisão baseada em evidência. O ponto forte é a matriz de critérios objetivos e o envolvimento dos stakeholders — a decisão não é preferência pessoal. Empresa: Grupo Boticário. Se puder, cite a ferramenta escolhida e algum número.",
    suggestedAnswerEn:
      "At Grupo Boticário, we needed to improve our security monitoring and incident response. I was responsible for evaluating SIEM and SOAR solutions. I started by gathering requirements from security, IT, and management, then created a comparison matrix with criteria such as functionality, integrations, cost, scalability, and support. I researched vendors, requested demos, reviewed documentation, and assessed risks like implementation complexity and licensing costs. After comparing the options, I recommended the best solution based on evidence and stakeholder needs. As a result, we chose a solution that improved visibility, automated part of the incident response process, and reduced manual work.",
    suggestedAnswerPt:
      "No Grupo Boticário, precisávamos melhorar o monitoramento de segurança e a resposta a incidentes. Fui responsável por avaliar soluções de SIEM e SOAR. Comecei levantando os requisitos com segurança, TI e gestão, e depois criei uma matriz de comparação com critérios como funcionalidades, integrações, custo, escalabilidade e suporte. Pesquisei fornecedores, solicitei demonstrações, revisei documentação e avaliei riscos como complexidade de implantação e custo de licenciamento. Depois de comparar as opções, recomendei a melhor solução com base em evidências e nas necessidades dos stakeholders. Como resultado, escolhemos uma solução que melhorou a visibilidade, automatizou parte da resposta a incidentes e reduziu o trabalho manual.",
    goldenKeyPoints: [
      "Requisitos definidos com os stakeholders antes de olhar fornecedores",
      "Matriz de comparação com critérios objetivos",
      "Riscos avaliados: integração, licenciamento, curva de aprendizado",
      "Decisão baseada em evidência, não em preferência",
    ],
    star: {
      en: {
        situation:
          "At Grupo Boticário, we wanted to improve how we monitored security attacks and responded to incidents. Our existing process was manual and did not give us enough visibility or automation to respond quickly.",
        task: "My task was to research, evaluate, and recommend the best SIEM/SOAR solution for our needs. I had to compare functionality, integration capabilities, cost, scalability, ease of use, and vendor support, while considering the needs of the security and IT teams.",
        action:
          "First, I defined the requirements with stakeholders, including the security team, IT, and management. I identified our main needs: log ingestion, alerting, incident response automation, integration with our existing tools, reporting, and total cost of ownership.\n\nThen, I researched several SIEM/SOAR vendors and created a comparison matrix. I evaluated each option using the same criteria, checked technical documentation, requested demos, and spoke with vendors to understand implementation effort and support. I also considered the risks of each option, such as integration complexity, licensing costs, and the learning curve for the team.\n\nAfter comparing the options, I prepared a recommendation with the pros, cons, costs, and expected impact of each solution. I presented it to the stakeholders so the final decision was based on clear evidence rather than personal preference.",
        result:
          "We selected the solution that best balanced functionality, integration, cost, and scalability. It improved our ability to detect and respond to security incidents, reduced manual work through automation, and gave the team better visibility into alerts and incidents. This experience taught me the importance of defining requirements early, using objective criteria, and involving stakeholders before making an important decision.",
      },
      pt: {
        situation:
          "No Grupo Boticário, queríamos melhorar a forma como monitorávamos ataques de segurança e respondíamos a incidentes. O processo existente era manual e não nos dava visibilidade nem automação suficientes para responder rápido.",
        task: "Minha tarefa era pesquisar, avaliar e recomendar a melhor solução de SIEM/SOAR para nossas necessidades. Eu precisava comparar funcionalidades, capacidade de integração, custo, escalabilidade, facilidade de uso e suporte do fornecedor, considerando as necessidades dos times de segurança e de TI.",
        action:
          "Primeiro, defini os requisitos com os stakeholders, incluindo o time de segurança, TI e a gestão. Identifiquei nossas principais necessidades: ingestão de logs, alertas, automação de resposta a incidentes, integração com as ferramentas existentes, relatórios e custo total de propriedade.\n\nDepois, pesquisei vários fornecedores de SIEM/SOAR e criei uma matriz de comparação. Avaliei cada opção com os mesmos critérios, analisei a documentação técnica, solicitei demonstrações e conversei com os fornecedores para entender o esforço de implantação e o suporte. Também considerei os riscos de cada opção, como complexidade de integração, custo de licenciamento e curva de aprendizado do time.\n\nApós comparar as opções, preparei uma recomendação com prós, contras, custos e impacto esperado de cada solução. Apresentei aos stakeholders para que a decisão final fosse baseada em evidências claras, e não em preferência pessoal.",
        result:
          "Selecionamos a solução que melhor equilibrava funcionalidade, integração, custo e escalabilidade. Ela melhorou nossa capacidade de detectar e responder a incidentes de segurança, reduziu trabalho manual com automação e deu ao time mais visibilidade sobre alertas e incidentes. Essa experiência me ensinou a importância de definir requisitos cedo, usar critérios objetivos e envolver os stakeholders antes de uma decisão importante.",
      },
    },
  },
  {
    id: "exp-api-evaluation",
    category: "Experiences & Problems",
    title: "Evaluating Options: API Protection",
    question:
      "Describe a time you evaluated options to make an informed decision.",
    context:
      "Mostre critérios objetivos, trade-offs e envolvimento das pessoas certas. É o mesmo projeto do cenário 'Disagreeing With Your Boss', contado pelo ângulo da análise técnica — mantenha os detalhes coerentes. Controles para citar: autenticação (OAuth 2.0/JWT), autorização (RBAC, object-level), rate limiting em login e reset de senha (brute force, credential stuffing), validação de requisições (schema, tamanho de payload), solução centralizada de proteção de APIs, WAF e monitoramento.",
    suggestedAnswerEn:
      "At Aché, we needed to improve the protection of our APIs because they handled sensitive data and were exposed to external clients. I was responsible for evaluating the best security approach. I reviewed the current architecture, identified risks such as inconsistent authentication, limited rate limiting, and lack of centralized controls, and mapped the most sensitive endpoints. Then, I compared implementing security in each service versus using a centralized API protection solution, also considering a WAF. I evaluated each option based on security coverage, scalability, integration, cost, operational complexity, and latency. After building a comparison matrix and discussing the trade-offs with security and development teams, I recommended a centralized approach with strong authentication, authorization, rate limiting, request validation, and monitoring. As a result, we improved API security, reduced manual work, and gained better visibility into suspicious activity.",
    suggestedAnswerPt:
      "Na Aché, precisávamos melhorar a proteção das nossas APIs, porque elas tratavam dados sensíveis e eram expostas a clientes externos. Fui responsável por avaliar a melhor abordagem de segurança. Revisei a arquitetura atual, identifiquei riscos como autenticação inconsistente, rate limiting limitado e falta de controles centralizados, e mapeei os endpoints mais sensíveis. Depois, comparei implementar a segurança em cada serviço versus usar uma solução centralizada de proteção de APIs, considerando também um WAF. Avaliei cada opção por cobertura de segurança, escalabilidade, integração, custo, complexidade operacional e latência. Depois de montar uma matriz de comparação e discutir os trade-offs com os times de segurança e desenvolvimento, recomendei uma abordagem centralizada com autenticação forte, autorização, rate limiting, validação de requisições e monitoramento. Como resultado, melhoramos a segurança das APIs, reduzimos trabalho manual e ganhamos mais visibilidade sobre atividades suspeitas.",
    goldenKeyPoints: [
      "Riscos mapeados antes de escolher a solução",
      "Opções: controles por serviço × solução centralizada de proteção de APIs × WAF",
      "Critérios: cobertura, escalabilidade, integração, custo, complexidade, latência",
      "Rate limiting em login e reset de senha (brute force, credential stuffing)",
      "Decisão com matriz de comparação e times envolvidos",
    ],
    star: {
      en: {
        situation:
          "At Aché, we identified that our APIs needed stronger protection because they were exposed to external clients and handled sensitive business data. We needed to reduce risks such as unauthorized access, abuse, brute-force attacks, and excessive resource consumption.",
        task: "My task was to evaluate the available options and recommend the best approach to protect our APIs. I needed to balance security, performance, user experience, implementation effort, and cost.",
        action:
          "First, I reviewed the current API architecture and identified the main risks: inconsistent authentication, lack of centralized security controls, limited rate limiting, and insufficient monitoring. I also mapped the most sensitive endpoints, such as authentication, user data, and administrative functions.\n\nThen, I evaluated different options. One option was to implement security controls directly in each microservice. Another option was to use a dedicated API protection solution to centralize authentication, authorization, rate limiting, request validation, and logging. I also considered a WAF as an additional layer for protection against common web attacks.\n\nI compared the options using criteria such as security coverage, integration with our existing infrastructure, scalability, operational complexity, cost, and impact on latency. I created a comparison matrix, reviewed technical documentation, consulted with the security and development teams, and considered the trade-offs of each solution.\n\nBased on this analysis, I recommended a centralized API security approach, with authentication and authorization enforced consistently, rate limiting for sensitive endpoints, request validation, and monitoring and alerting. I presented the recommendation with the risks, benefits, costs, and implementation plan.",
        result:
          "The solution improved the security posture of our APIs by standardizing authentication and authorization, reducing exposure to abuse and brute-force attempts, and improving visibility through logs and alerts. It also reduced the operational effort of applying security controls individually in every service. This experience reinforced the importance of evaluating options using clear criteria and involving the right stakeholders before making a security decision.",
      },
      pt: {
        situation:
          "Na Aché, identificamos que nossas APIs precisavam de proteção mais forte, porque eram expostas a clientes externos e tratavam dados sensíveis do negócio. Precisávamos reduzir riscos como acesso não autorizado, abuso, ataques de força bruta e consumo excessivo de recursos.",
        task: "Minha tarefa era avaliar as opções disponíveis e recomendar a melhor abordagem para proteger nossas APIs. Eu precisava equilibrar segurança, performance, experiência do usuário, esforço de implementação e custo.",
        action:
          "Primeiro, revisei a arquitetura atual das APIs e identifiquei os principais riscos: autenticação inconsistente, falta de controles de segurança centralizados, rate limiting limitado e monitoramento insuficiente. Também mapeei os endpoints mais sensíveis, como autenticação, dados de usuários e funções administrativas.\n\nDepois, avaliei diferentes opções. Uma era implementar os controles diretamente em cada microsserviço. Outra era usar uma solução dedicada de proteção de APIs para centralizar autenticação, autorização, rate limiting, validação de requisições e logging. Também considerei um WAF como camada adicional contra ataques web comuns.\n\nComparei as opções com critérios como cobertura de segurança, integração com a infraestrutura existente, escalabilidade, complexidade operacional, custo e impacto na latência. Montei uma matriz de comparação, revisei documentação técnica, consultei os times de segurança e desenvolvimento e considerei os trade-offs de cada solução.\n\nCom base nessa análise, recomendei uma abordagem centralizada de segurança de APIs, com autenticação e autorização aplicadas de forma consistente, rate limiting nos endpoints sensíveis, validação de requisições e monitoramento com alertas. Apresentei a recomendação com riscos, benefícios, custos e plano de implementação.",
        result:
          "A solução melhorou a postura de segurança das APIs ao padronizar autenticação e autorização, reduzir a exposição a abuso e força bruta e aumentar a visibilidade com logs e alertas. Também reduziu o esforço operacional de aplicar controles individualmente em cada serviço. A experiência reforçou a importância de avaliar opções com critérios claros e envolver os stakeholders certos antes de uma decisão de segurança.",
      },
    },
    followUps: [
      {
        question: "Why did you choose a centralized solution?",
        answerEn:
          "Because it created consistent security controls across APIs, reduced duplicated work in each service, and made it easier to manage policies, monitoring, and incident response.",
        answerPt:
          "Porque criou controles de segurança consistentes em todas as APIs, reduziu trabalho duplicado em cada serviço e facilitou a gestão de políticas, monitoramento e resposta a incidentes.",
      },
      {
        question: "What trade-offs did you consider?",
        answerEn:
          "The centralized solution added a potential latency point and required initial configuration, but it provided better consistency, scalability, and operational control than implementing everything separately in each service.",
        answerPt:
          "A solução centralizada adicionava um possível ponto de latência e exigia configuração inicial, mas oferecia mais consistência, escalabilidade e controle operacional do que implementar tudo separadamente em cada serviço.",
      },
      {
        question: "How did you measure success?",
        answerEn:
          "I would measure reduced unauthorized access attempts, fewer abuse-related incidents, improved alert visibility, consistent authentication coverage, and the impact on API latency.",
        answerPt:
          "Eu mediria a redução de tentativas de acesso não autorizado, menos incidentes de abuso, mais visibilidade de alertas, cobertura consistente de autenticação e o impacto na latência das APIs.",
      },
    ],
  },
  {
    id: "exp-disagree-boss",
    category: "Experiences & Problems",
    title: "Disagreeing With Your Boss",
    question: "Tell me about a time you disagreed with your boss.",
    context:
      "Apresente como diferença profissional de opinião, nunca conflito pessoal. Diga 'we had different perspectives' ou 'I had a different recommendation' — nunca culpe o gestor. Ouça as restrições dele, traga dados e uma alternativa, e mostre abertura à decisão final.",
    suggestedAnswerEn:
      "Yes, I have disagreed with my manager before, but I see disagreement as an opportunity to align on the best decision for the business. At Aché, on an API protection project, my manager initially preferred applying security controls separately in each service, to move faster. I understood the urgency, but I was concerned it would create inconsistent controls and more maintenance over time. So I asked for time to discuss it, and I prepared a comparison of both approaches — security coverage, effort, scalability and long-term maintenance. I proposed a centralized API protection solution, and I also asked about his main constraints, like timeline and budget. We agreed on the centralized approach with a phased plan to meet the business timeline. My manager appreciated that I brought data and a solution, not just a concern.",
    suggestedAnswerPt:
      "Sim, já discordei do meu gestor, mas vejo a discordância como uma oportunidade de alinhar a melhor decisão para o negócio. Na Aché, num projeto de proteção de APIs, meu gestor inicialmente preferia aplicar os controles de segurança separadamente em cada serviço, para andar mais rápido. Eu entendia a urgência, mas me preocupava que isso gerasse controles inconsistentes e mais manutenção ao longo do tempo. Então pedi um tempo para conversarmos e preparei uma comparação das duas abordagens — cobertura de segurança, esforço, escalabilidade e manutenção de longo prazo. Propus uma solução centralizada de proteção de APIs e também perguntei quais eram as principais restrições dele, como prazo e orçamento. Concordamos com a abordagem centralizada, com um plano em fases para cumprir o prazo do negócio. Meu gestor valorizou que eu trouxe dados e uma solução, e não só uma preocupação.",
    goldenKeyPoints: [
      "Diferença profissional de opinião, não conflito pessoal",
      "Ouvir as restrições do gestor (prazo, orçamento)",
      "Comparação com dados + alternativa concreta",
      "Acordo: centralizado em fases — sem culpar ninguém",
    ],
    star: {
      en: {
        situation:
          "At Aché, while working on the API protection project, my manager initially preferred a faster approach that involved applying security controls separately in each service. I understood the desire to move quickly, but I was concerned that it could create inconsistent controls and more maintenance work over time.",
        task: "My task was to ensure we made a secure and scalable decision without delaying the project unnecessarily.",
        action:
          "I asked for time to discuss my concerns professionally. I prepared a comparison of the two approaches, including security coverage, implementation effort, scalability, operational complexity, and long-term maintenance.\n\nI explained that a centralized API protection solution could standardize authentication, authorization, rate limiting, and monitoring across the APIs. I also acknowledged the benefits of the faster approach and asked about the main constraints, such as timeline and budget.\n\nAfter reviewing the analysis, we agreed to move forward with a centralized approach, but with a phased implementation plan to reduce immediate impact and meet the business timeline.",
        result:
          "The decision improved consistency and scalability of our API security controls while still addressing the need to deliver quickly. My manager appreciated that I brought a solution and data rather than only raising a concern. I learned that disagreeing respectfully, listening to constraints, and proposing alternatives is more effective than simply opposing an idea.",
      },
      pt: {
        situation:
          "Na Aché, durante o projeto de proteção de APIs, meu gestor inicialmente preferia uma abordagem mais rápida, aplicando os controles de segurança separadamente em cada serviço. Eu entendia o desejo de andar rápido, mas me preocupava que isso gerasse controles inconsistentes e mais trabalho de manutenção ao longo do tempo.",
        task: "Minha tarefa era garantir que tomássemos uma decisão segura e escalável, sem atrasar o projeto desnecessariamente.",
        action:
          "Pedi um tempo para discutir minhas preocupações de forma profissional. Preparei uma comparação das duas abordagens, incluindo cobertura de segurança, esforço de implementação, escalabilidade, complexidade operacional e manutenção de longo prazo.\n\nExpliquei que uma solução centralizada de proteção de APIs poderia padronizar autenticação, autorização, rate limiting e monitoramento em todas as APIs. Também reconheci os benefícios da abordagem mais rápida e perguntei quais eram as principais restrições, como prazo e orçamento.\n\nDepois de revisarmos a análise, concordamos em seguir com a abordagem centralizada, mas com um plano de implementação em fases para reduzir o impacto imediato e cumprir o prazo do negócio.",
        result:
          "A decisão melhorou a consistência e a escalabilidade dos controles de segurança das APIs, atendendo ao mesmo tempo à necessidade de entregar rápido. Meu gestor valorizou que eu trouxe uma solução e dados, e não apenas uma preocupação. Aprendi que discordar com respeito, ouvir as restrições e propor alternativas é mais eficaz do que simplesmente se opor a uma ideia.",
      },
    },
  },

  // ── Technical & Leadership ─────────────────────────────────
  {
    id: "conflict-deadlines",
    category: "Leadership & Conflict",
    title: "Deadlines vs. Security Controls",
    question:
      "How do you handle a senior developer or Tech Lead who resists a security control because they say it will delay product delivery?",
    context:
      "O teste clássico para saber se você é um 'bloqueador' ou um 'viabilizador'. Mostre empatia técnica, modelagem de ameaças e rastreabilidade via ADR.",
    suggestedAnswerEn:
      "I often say that security that blocks business growth isn't real security — it's just poorly designed process. If an engineer tells me a control will delay delivery, the worst thing I could do is force a rule down their throat. Instead, I sit down with them to review the architecture and run a quick threat modeling exercise together. We look at the real exploit risk and find a practical alternative together. If the business deadline is truly non-negotiable, we record it in an Architecture Decision Record (ADR) as an explicit security technical debt with an assigned owner and a remediation timeline. Risk must be shared and transparent, never an isolated security decree.",
    suggestedAnswerPt:
      "Eu costumo dizer que segurança que trava o negócio não é segurança, é processo mal desenhado. Se alguém diz que um controle vai atrasar a entrega, o pior caminho é tentar impor a regra na força. O que eu faço é sentar com o profissional para entender a arquitetura e fazer um exercício prático de modelagem de ameaças. A gente analisa o risco real de exploração e busca uma alternativa viável juntos. Se o prazo de negócio for inegociável, registramos isso em uma ADR como um débito técnico com responsável e data para correção. O risco precisa ser visível e compartilhado, nunca uma decisão isolada da segurança.",
    goldenKeyPoints: [
      "Sentar lado a lado com o desenvolvedor",
      "Modelagem prática de ameaças (Threat Modeling)",
      "Registro de débito técnico em ADR com aceite formal de risco",
      "Segurança como viabilizador, nunca como bloqueador",
    ],
  },
  {
    id: "pix-pci-microservices",
    category: "Fintech & Payments",
    title: "PCI DSS & Real-time Transactions in Microservices",
    question:
      "How do you ensure the protection of cardholder data (PCI) and real-time transaction data like PIX across a distributed microservices architecture?",
    context:
      "Mostre domínio de redução de escopo de auditoria, tokenização, mTLS e segregação de namespaces na nuvem.",
    suggestedAnswerEn:
      "The key to protecting transaction data is drastically minimizing the audit exposure scope. At Banco BV, we secured our APIs with end-to-end mTLS and adopted OAuth2 FAPI standards, with API gateways handling centralized validation and rate limiting. For PCI and PIX services, we isolated them into dedicated Kubernetes namespaces to prevent contamination of the broader environment. Cryptographic keys used for signing transactions were custodied in dedicated on-premises Hardware Security Modules (HSMs). The core rule is: tokenize sensitive data at the earliest ingestion point and ensure automatic cryptographic key rotation.",
    suggestedAnswerPt:
      "O segredo para proteger dados transacionais é reduzir o escopo de auditoria ao máximo. No Banco BV, blindávamos as APIs usando mTLS de ponta a ponta e aplicando o padrão FAPI do OAuth2, centralizando validações no gateway. Para PCI e PIX, isolávamos os microsserviços em namespaces dedicados na nuvem para não contaminar o restante do ambiente. As chaves criptográficas de assinatura eram custodiadas em HSMs on-premises dedicados. A regra fundamental é: tokenizar o dado sensível o quanto antes na entrada e automatizar a rotação de chaves.",
    goldenKeyPoints: [
      "Redução de escopo de auditoria (PCI Scope Reduction)",
      "mTLS de ponta a ponta e OAuth2 FAPI",
      "Namespaces dedicados no Kubernetes para isolamento",
      "Custódia criptográfica em HSMs com rotação automática",
    ],
  },
  {
    id: "pix-hsm",
    category: "Fintech & Payments",
    title: "HSM & Key Custody in the PIX Project",
    question:
      "How did you use HSMs to protect the cryptographic keys in the PIX project?",
    context:
      "Pergunta técnica de profundidade: querem ver que você entende o ciclo de vida da chave, não só 'usamos HSM'. Estruture em: por que HSM (requisito regulatório + chave nunca sai do hardware) → arquitetura (cluster on-prem em HA + serviço de assinatura dedicado) → performance (sem virar gargalo) → governança (cerimônia de chaves, rotação, auditoria). REVISE: fornecedor do HSM, quantidade de appliances/data centers e os requisitos exatos do Manual de Segurança do PIX que você seguiu.",
    suggestedAnswerEn:
      "In PIX, every message we exchanged with the Central Bank's SPI — ISO 20022 messages over the RSFN network — had to be digitally signed with ICP-Brasil certificates, and the connections used mutual TLS. So the private keys were the most critical asset in the whole architecture. I designed the custody around on-premises HSMs in a high-availability cluster across two data centers. Keys were generated inside the HSM and marked as non-exportable, so they never existed outside the hardware. Only one dedicated signing service could talk to the HSMs, through PKCS#11, with connection pooling and persistent sessions, and we load-tested the signing capacity at peak volume so cryptography never became the bottleneck. On the governance side, we ran formal key ceremonies with dual control and segregation of duties, had a certificate rotation runbook with overlap to avoid downtime, and sent every HSM operation to the SIEM. We passed the Central Bank certification and audits, and no private key ever left the HSM.",
    suggestedAnswerPt:
      "No PIX, toda mensagem trocada com o SPI do Banco Central — mensagens ISO 20022 pela RSFN — precisava ser assinada digitalmente com certificados ICP-Brasil, e as conexões usavam mTLS. Então as chaves privadas eram o ativo mais crítico de toda a arquitetura. Desenhei a custódia em HSMs on-premises, num cluster de alta disponibilidade entre dois data centers. As chaves eram geradas dentro do HSM e marcadas como não exportáveis, então nunca existiam fora do hardware. Só um serviço de assinatura dedicado podia falar com os HSMs, via PKCS#11, com pool de conexões e sessões persistentes, e fizemos testes de carga da capacidade de assinatura no pico, para a criptografia nunca virar gargalo. Na governança, fazíamos cerimônias formais de chaves com controle dual e segregação de funções, tínhamos um runbook de rotação de certificados com sobreposição para evitar indisponibilidade, e toda operação do HSM ia para o SIEM. Passamos na homologação e nas auditorias do Banco Central, e nenhuma chave privada saiu do HSM.",
    goldenKeyPoints: [
      "Assinatura ISO 20022 com certificados ICP-Brasil + mTLS na RSFN",
      "Chave gerada no HSM e não exportável",
      "Cluster on-prem em HA entre dois data centers",
      "Serviço de assinatura dedicado (PKCS#11, pool, sessões persistentes)",
      "Cerimônia de chaves com controle dual e segregação de funções",
      "Rotação de certificados com sobreposição + logs no SIEM",
    ],
    star: {
      en: {
        situation:
          "At Banco BV, we were connecting the bank to PIX. Every message exchanged with the Central Bank's SPI — ISO 20022 messages over the RSFN network — had to be digitally signed with ICP-Brasil certificates, and the connections required mutual TLS. PIX runs 24/7 with strict response-time requirements, so the signing step was on the critical path of every transaction.",
        task: "As the lead security architect, I had to design how those private keys would be protected and used: meeting the Central Bank's security requirements, without the HSM becoming a latency bottleneck or a single point of failure.",
        action:
          "First, I defined the custody model: on-premises HSMs in a high-availability cluster across two data centers, with keys generated inside the HSM and marked as non-exportable.\n\nThen I designed a dedicated signing service as the only component allowed to talk to the HSMs, through PKCS#11. It used connection pooling and persistent sessions, so we didn't pay the cost of opening a session for each transaction. We load-tested the signing capacity at peak volume and sized the cluster with headroom.\n\nOn governance, I set up formal key ceremonies with dual control and segregation of duties, a certificate rotation runbook with an overlap window to avoid downtime, and integration of all HSM logs with the SIEM. We also tested failover between data centers before go-live.",
        result:
          "We passed the Central Bank certification and audits, signing never became the bottleneck in production, and no private key ever left the HSM. The design became the reference for other critical integrations in the bank.",
      },
      pt: {
        situation:
          "No Banco BV, estávamos conectando o banco ao PIX. Toda mensagem trocada com o SPI do Banco Central — mensagens ISO 20022 pela RSFN — precisava ser assinada digitalmente com certificados ICP-Brasil, e as conexões exigiam mTLS. O PIX funciona 24/7 com requisitos rígidos de tempo de resposta, então a assinatura estava no caminho crítico de toda transação.",
        task: "Como arquiteto de segurança líder, eu precisava desenhar como essas chaves privadas seriam protegidas e usadas: atendendo os requisitos de segurança do Banco Central, sem o HSM virar gargalo de latência nem ponto único de falha.",
        action:
          "Primeiro, defini o modelo de custódia: HSMs on-premises num cluster de alta disponibilidade entre dois data centers, com as chaves geradas dentro do HSM e marcadas como não exportáveis.\n\nDepois desenhei um serviço de assinatura dedicado como único componente autorizado a falar com os HSMs, via PKCS#11. Ele usava pool de conexões e sessões persistentes, para não pagarmos o custo de abrir uma sessão por transação. Fizemos testes de carga da capacidade de assinatura no pico e dimensionamos o cluster com folga.\n\nNa governança, estruturei cerimônias formais de chaves com controle dual e segregação de funções, um runbook de rotação de certificados com janela de sobreposição para evitar indisponibilidade e a integração de todos os logs do HSM com o SIEM. Também testamos o failover entre data centers antes do go-live.",
        result:
          "Passamos na homologação e nas auditorias do Banco Central, a assinatura nunca virou gargalo em produção e nenhuma chave privada saiu do HSM. O desenho virou referência para outras integrações críticas do banco.",
      },
    },
    followUps: [
      {
        question: "Why on-premises HSMs instead of a cloud HSM?",
        answerEn:
          "The connection to the SPI goes through the RSFN, the financial system's private network, which terminated in our data centers. Keeping the HSMs close to that connectivity reduced latency and kept full physical and administrative control of the keys, which simplified the audit evidence for the Central Bank.",
        answerPt:
          "A conexão com o SPI passa pela RSFN, a rede privada do sistema financeiro, que chegava nos nossos data centers. Manter os HSMs perto dessa conectividade reduzia a latência e garantia controle físico e administrativo total das chaves, o que simplificava as evidências de auditoria para o Banco Central.",
      },
      {
        question: "What happens if an HSM fails?",
        answerEn:
          "The cluster was active-active across two data centers, with the keys replicated securely between HSMs of the same cluster. The signing service detected the failure and routed to the healthy nodes. We tested that failover before go-live and in periodic DR exercises.",
        answerPt:
          "O cluster era ativo-ativo entre dois data centers, com as chaves replicadas de forma segura entre os HSMs do mesmo cluster. O serviço de assinatura detectava a falha e direcionava para os nós saudáveis. Testamos esse failover antes do go-live e em exercícios periódicos de DR.",
      },
      {
        question: "How did you make sure the HSM didn't add latency?",
        answerEn:
          "Three things: persistent sessions and connection pooling in the signing service, capacity planning based on load tests at peak volume, and signing only what the protocol requires. We monitored signing latency as a business metric, with alerts before it could affect the PIX response time.",
        answerPt:
          "Três coisas: sessões persistentes e pool de conexões no serviço de assinatura, planejamento de capacidade com base em testes de carga no pico, e assinar só o que o protocolo exige. Monitorávamos a latência de assinatura como métrica de negócio, com alertas antes que ela afetasse o tempo de resposta do PIX.",
      },
      {
        question: "How do you rotate certificates without downtime?",
        answerEn:
          "We generated the new key pair inside the HSM, issued the new ICP-Brasil certificate, and registered it with the Central Bank before the old one expired. During an overlap window both were valid, and we switched the signing service to the new key in a planned change, with rollback ready.",
        answerPt:
          "Gerávamos o novo par de chaves dentro do HSM, emitíamos o novo certificado ICP-Brasil e o registrávamos no Banco Central antes do vencimento do antigo. Numa janela de sobreposição os dois eram válidos, e trocávamos o serviço de assinatura para a nova chave numa mudança planejada, com rollback pronto.",
      },
      {
        question: "What is a key ceremony and why does it matter?",
        answerEn:
          "It's a formal, documented procedure to generate or manage critical keys, with multiple custodians present — dual control, M-of-N quorum — and segregation of duties, so no single person can create, use or export a key alone. It produces the audit evidence regulators expect.",
        answerPt:
          "É um procedimento formal e documentado para gerar ou administrar chaves críticas, com vários custodiantes presentes — controle dual, quórum M-de-N — e segregação de funções, para que nenhuma pessoa sozinha consiga criar, usar ou exportar uma chave. Ele gera a evidência de auditoria que o regulador espera.",
      },
    ],
    deepDive: {
      title: "HSM no PIX",
      layers: [
        {
          name: "Conectividade com o SPI",
          components: "RSFN · mTLS · certificados ICP-Brasil",
          controlsEn: [
            "Mutual TLS on every connection to the SPI and DICT, authenticating both sides with ICP-Brasil certificates",
            "TLS private keys protected with the same custody and lifecycle as the signing keys",
            "Network segmentation: only the PIX integration zone reaches the RSFN",
          ],
          controlsPt: [
            "mTLS em toda conexão com o SPI e o DICT, autenticando os dois lados com certificados ICP-Brasil",
            "Chaves privadas do TLS com a mesma custódia e ciclo de vida das chaves de assinatura",
            "Segmentação de rede: só a zona de integração PIX alcança a RSFN",
          ],
        },
        {
          name: "Assinatura das mensagens",
          components:
            "ISO 20022 (pacs.008, pacs.002…) · assinatura digital XML",
          controlsEn: [
            "Every outbound message is signed; every inbound message has its signature validated before processing",
            "Signature guarantees integrity and non-repudiation of each payment instruction",
            "Validation failures are rejected and logged as security events",
          ],
          controlsPt: [
            "Toda mensagem enviada é assinada; toda mensagem recebida tem a assinatura validada antes do processamento",
            "A assinatura garante integridade e não repúdio de cada ordem de pagamento",
            "Falhas de validação são rejeitadas e registradas como evento de segurança",
          ],
        },
        {
          name: "Serviço de assinatura dedicado",
          components: "PKCS#11 · pool de conexões · sessões persistentes",
          controlsEn: [
            "Single component allowed to call the HSM — reduces attack surface and centralizes audit",
            "Connection pooling and persistent sessions to avoid per-transaction overhead",
            "Signing latency monitored as a business metric, with alerts",
          ],
          controlsPt: [
            "Único componente autorizado a chamar o HSM — reduz a superfície de ataque e centraliza a auditoria",
            "Pool de conexões e sessões persistentes para evitar custo por transação",
            "Latência de assinatura monitorada como métrica de negócio, com alertas",
          ],
        },
        {
          name: "Cluster de HSMs on-premises",
          components:
            "HSMs certificados (ex.: FIPS 140-2 nível 3) · ativo-ativo · dois data centers",
          controlsEn: [
            "Keys generated inside the HSM and non-exportable",
            "Active-active cluster across two data centers, no single point of failure",
            "Capacity sized from load tests at peak volume, with headroom",
          ],
          controlsPt: [
            "Chaves geradas dentro do HSM e não exportáveis",
            "Cluster ativo-ativo entre dois data centers, sem ponto único de falha",
            "Capacidade dimensionada por testes de carga no pico, com folga",
          ],
        },
        {
          name: "Ciclo de vida de chaves e certificados",
          components: "Cerimônia de chaves · controle dual · M-de-N · rotação",
          controlsEn: [
            "Formal key ceremonies with multiple custodians and documented evidence",
            "Segregation of duties: HSM administrators cannot use the keys, and vice versa",
            "Certificate rotation with an overlap window and registration with the Central Bank before expiry",
          ],
          controlsPt: [
            "Cerimônias formais de chaves com vários custodiantes e evidência documentada",
            "Segregação de funções: quem administra o HSM não usa as chaves, e vice-versa",
            "Rotação de certificados com janela de sobreposição e registro no Banco Central antes do vencimento",
          ],
        },
        {
          name: "Monitoramento, auditoria e DR",
          components: "SIEM · logs do HSM · exercícios de failover",
          controlsEn: [
            "Every HSM operation logged and sent to the SIEM, with alerts for unusual use",
            "Periodic failover and DR exercises between data centers",
            "Evidence package ready for Central Bank audits",
          ],
          controlsPt: [
            "Toda operação do HSM registrada e enviada ao SIEM, com alertas para uso incomum",
            "Exercícios periódicos de failover e DR entre data centers",
            "Pacote de evidências pronto para as auditorias do Banco Central",
          ],
        },
      ],
    },
  },
  {
    id: "cloud-zero-trust",
    category: "Cloud & Zero Trust",
    title: "Zero Trust Architecture & Workload Identity",
    question:
      "How do you approach implementing a Zero Trust model in a modern cloud and multi-cloud environment?",
    context:
      "Evite chavões genéricos. Fale de eliminação de credenciais estáticas, Workload Identity e Policy-as-Code antes do deploy.",
    suggestedAnswerEn:
      "Zero Trust in the cloud begins by ruthlessly eliminating static credentials. No engineer and no service should have long-lived access keys stored in disk or environment variables. I implement Workload Identity so containers in GKE or EKS authenticate directly into cloud IAM temporarily with least privilege. Furthermore, I enforce infrastructure standards through Policy-as-Code. Rather than finding a public storage bucket post-deployment, we run automated policy checks in the Terraform pipeline before code applies. If the build violates baseline rules, the pipeline fails early, removing manual audit burden.",
    suggestedAnswerPt:
      "Para mim, Zero Trust em nuvem começa eliminando credenciais estáticas. Nenhum container ou desenvolvedor deveria ter chaves de longa duração em disco ou variáveis de ambiente. Uso Workload Identity para que contêineres no GKE/EKS se autentiquem diretamente no IAM com privilégio mínimo e tokens temporários. Além disso, defendo Policy-as-Code na esteira. Em vez de descobrir um bucket público após o deploy, validamos regras no Terraform antes do apply. Se houver violação, a esteira bloqueia na hora, eliminando a dependência de revisões manuais.",
    goldenKeyPoints: [
      "Eliminação de credenciais estáticas",
      "Workload Identity no GKE/EKS com privilégio mínimo",
      "Policy-as-Code (Terraform/OPA) bloqueando antes do apply",
      "Shift-left de segurança na IDE e na esteira de CI/CD",
    ],
  },
  {
    id: "gcp-data-reference",
    category: "Cloud & Zero Trust",
    title: "GCP Data Reference Architecture (Security View)",
    question:
      "Walk me through a reference architecture for a data platform on GCP. How would you secure it?",
    context:
      "Pergunta de quadro branco. Desenhe o fluxo da esquerda para a direita (ingestão → processamento → armazenamento → analytics → consumo) e, em cada camada, cite o controle de segurança. Os quatro pilares que mais impressionam: perímetro contra exfiltração (VPC Service Controls), identidade sem chaves, criptografia com chaves gerenciadas (CMEK) e proteção do dado em nível de coluna e linha. Mencione LGPD e residência de dados (região southamerica-east1, São Paulo). Versão genérica de mercado.",
    suggestedAnswerEn:
      "I usually draw it from left to right. Data comes in through Pub/Sub, Datastream or file transfers into a Cloud Storage landing zone; it's processed by Dataflow or Dataproc, orchestrated by Cloud Composer; it's stored in raw and curated zones in Cloud Storage and BigQuery; and it's consumed by Looker and Vertex AI. Then I secure it with four pillars. First, a perimeter: VPC Service Controls around all data projects, so even valid credentials can't copy data out. Second, identity without keys: one service account per pipeline, least privilege, and an organization policy that blocks service account key creation. Third, encryption with customer-managed keys in Cloud KMS — or Cloud HSM for regulated data. And fourth, protection of the data itself: Sensitive Data Protection to discover PII, policy tags for column-level security, dynamic masking and row-level security in BigQuery. Everything is governed by Dataplex, logged with Data Access audit logs, monitored in Security Command Center, and deployed through Terraform with policy checks in the pipeline.",
    suggestedAnswerPt:
      "Costumo desenhar da esquerda para a direita. O dado entra por Pub/Sub, Datastream ou transferência de arquivos numa landing zone no Cloud Storage; é processado pelo Dataflow ou Dataproc, orquestrado pelo Cloud Composer; é armazenado em zonas raw e curated no Cloud Storage e no BigQuery; e é consumido pelo Looker e pela Vertex AI. Depois protejo com quatro pilares. Primeiro, perímetro: VPC Service Controls em volta de todos os projetos de dados, para que nem credenciais válidas consigam copiar dados para fora. Segundo, identidade sem chaves: uma service account por pipeline, privilégio mínimo e uma organization policy que bloqueia a criação de chaves de service account. Terceiro, criptografia com chaves gerenciadas pelo cliente no Cloud KMS — ou Cloud HSM para dados regulados. E quarto, proteção do próprio dado: Sensitive Data Protection para descobrir dados pessoais, policy tags para segurança em nível de coluna, mascaramento dinâmico e segurança em nível de linha no BigQuery. Tudo governado pelo Dataplex, registrado com os Data Access audit logs, monitorado no Security Command Center e implantado via Terraform com verificação de políticas na esteira.",
    goldenKeyPoints: [
      "Fluxo: ingestão → processamento → armazenamento → analytics → consumo",
      "VPC Service Controls contra exfiltração",
      "Identidade sem chaves: service account por pipeline + bloqueio de chaves",
      "CMEK no Cloud KMS / Cloud HSM",
      "Sensitive Data Protection + policy tags + mascaramento + row-level security",
      "Dataplex, audit logs, Security Command Center, Terraform com policy checks",
    ],
    followUps: [
      {
        question: "How do you prevent data exfiltration?",
        answerEn:
          "With VPC Service Controls: a service perimeter around the data projects, so BigQuery and Cloud Storage can only be accessed from inside it, even with valid credentials. Access from outside goes through Access Context Manager levels. I add organization policies, Private Google Access or Private Service Connect for private connectivity, and restricted egress.",
        answerPt:
          "Com VPC Service Controls: um perímetro em volta dos projetos de dados, para que BigQuery e Cloud Storage só sejam acessados de dentro dele, mesmo com credenciais válidas. Acesso de fora passa por níveis do Access Context Manager. Somo organization policies, Private Google Access ou Private Service Connect para conectividade privada, e egress restrito.",
      },
      {
        question: "How do you protect personal data (PII) in BigQuery?",
        answerEn:
          "First I find it: Sensitive Data Protection runs discovery and classifies the columns. Then I tag them with policy tags in Dataplex, which enforce column-level access, and apply dynamic data masking so most users see masked values. For multi-tenant or regional data, I add row-level security. When possible, I tokenize or de-identify the data before it lands.",
        answerPt:
          "Primeiro eu encontro: o Sensitive Data Protection faz a descoberta e classifica as colunas. Depois marco com policy tags no Dataplex, que aplicam controle de acesso por coluna, e uso mascaramento dinâmico para que a maioria dos usuários veja o valor mascarado. Para dados multi-tenant ou regionais, adiciono row-level security. Quando possível, tokenizo ou desidentifico o dado antes de ele chegar.",
      },
      {
        question: "How do you manage the encryption keys?",
        answerEn:
          "Google encrypts everything by default, but for regulated data I use CMEK in Cloud KMS, so we control rotation, access and revocation. For the most sensitive keys, Cloud HSM, with FIPS 140-2 Level 3 hardware. If the regulator requires keys outside Google, Cloud EKM with an external key manager. An organization policy can require CMEK for specific services.",
        answerPt:
          "O Google criptografa tudo por padrão, mas para dados regulados uso CMEK no Cloud KMS, para controlarmos rotação, acesso e revogação. Para as chaves mais sensíveis, Cloud HSM, com hardware FIPS 140-2 nível 3. Se o regulador exigir chaves fora do Google, Cloud EKM com um gerenciador externo. Uma organization policy pode exigir CMEK para serviços específicos.",
      },
      {
        question: "How do pipelines access data without static keys?",
        answerEn:
          "Each pipeline runs with its own service account with least privilege — Dataflow workers, Composer and Dataproc each have a dedicated identity. Workloads on GKE use Workload Identity. Service account key creation is blocked by organization policy, and people access through groups, never individual grants.",
        answerPt:
          "Cada pipeline roda com sua própria service account com privilégio mínimo — workers do Dataflow, Composer e Dataproc têm identidades dedicadas. Workloads no GKE usam Workload Identity. A criação de chaves de service account é bloqueada por organization policy, e pessoas acessam por grupos, nunca por permissão individual.",
      },
      {
        question: "How do you know who accessed which data?",
        answerEn:
          "I enable Data Access audit logs for BigQuery and Cloud Storage, export them to a protected logging project and to the SIEM, and use Security Command Center for misconfigurations and threats. Dataplex lineage shows where the data came from and where it went, which also helps with LGPD requests.",
        answerPt:
          "Habilito os Data Access audit logs de BigQuery e Cloud Storage, exporto para um projeto de logging protegido e para o SIEM, e uso o Security Command Center para configurações incorretas e ameaças. A linhagem do Dataplex mostra de onde o dado veio e para onde foi, o que também ajuda nos pedidos da LGPD.",
      },
    ],
    deepDive: {
      title: "Dados na GCP",
      layers: [
        {
          name: "Ingestão",
          components:
            "Pub/Sub · Datastream · Storage Transfer Service · Cloud Storage (landing)",
          controlsEn: [
            "Ingestion through private connectivity (Private Service Connect / Interconnect), no public endpoints",
            "Dedicated service account per source, with write-only access to the landing zone",
            "Sensitive Data Protection scan on the landing zone; tokenize PII as early as possible",
          ],
          controlsPt: [
            "Ingestão por conectividade privada (Private Service Connect / Interconnect), sem endpoints públicos",
            "Service account dedicada por origem, só com escrita na landing zone",
            "Varredura com Sensitive Data Protection na landing zone; tokenizar dado pessoal o quanto antes",
          ],
        },
        {
          name: "Processamento",
          components: "Dataflow · Dataproc · Cloud Composer",
          controlsEn: [
            "Workers with private IPs only, in a controlled VPC",
            "One least-privilege service account per pipeline; no service account keys",
            "CMEK on staging and temporary buckets; Shielded or Confidential VMs where required",
          ],
          controlsPt: [
            "Workers só com IP privado, numa VPC controlada",
            "Uma service account de privilégio mínimo por pipeline; sem chaves de service account",
            "CMEK nos buckets de staging e temporários; Shielded ou Confidential VMs quando exigido",
          ],
        },
        {
          name: "Armazenamento (data lake)",
          components: "Cloud Storage (raw / curated) · BigLake",
          controlsEn: [
            "Uniform bucket-level access and public access prevention enforced by organization policy",
            "CMEK with Cloud KMS or Cloud HSM; retention policies and Bucket Lock for regulated data",
            "Data residency with the resource locations policy (e.g., southamerica-east1)",
          ],
          controlsPt: [
            "Uniform bucket-level access e bloqueio de acesso público por organization policy",
            "CMEK com Cloud KMS ou Cloud HSM; políticas de retenção e Bucket Lock para dados regulados",
            "Residência de dados com a policy de localização de recursos (ex.: southamerica-east1)",
          ],
        },
        {
          name: "Data warehouse e analytics",
          components: "BigQuery",
          controlsEn: [
            "Dataset-level IAM through groups, plus authorized views for controlled sharing",
            "Column-level security with policy tags and dynamic data masking",
            "Row-level security for multi-tenant or regional data",
          ],
          controlsPt: [
            "IAM por dataset via grupos, mais authorized views para compartilhamento controlado",
            "Segurança por coluna com policy tags e mascaramento dinâmico",
            "Row-level security para dados multi-tenant ou regionais",
          ],
        },
        {
          name: "Governança",
          components: "Dataplex · Data Catalog · Sensitive Data Protection",
          controlsEn: [
            "Automatic discovery and classification of sensitive data",
            "Business glossary, data owners and lineage across the pipeline",
            "Data quality rules and LGPD support (purpose, retention, data subject requests)",
          ],
          controlsPt: [
            "Descoberta e classificação automática de dados sensíveis",
            "Glossário de negócio, donos dos dados e linhagem ao longo do pipeline",
            "Regras de qualidade de dados e apoio à LGPD (finalidade, retenção, pedidos dos titulares)",
          ],
        },
        {
          name: "Consumo",
          components: "Looker · Vertex AI · APIs",
          controlsEn: [
            "Looker connected to BigQuery with user identity (OAuth), so column and row controls still apply",
            "Vertex AI inside the VPC Service Controls perimeter, with CMEK",
            "Data products exposed through protected APIs, never direct table access",
          ],
          controlsPt: [
            "Looker conectado ao BigQuery com a identidade do usuário (OAuth), para os controles de coluna e linha continuarem valendo",
            "Vertex AI dentro do perímetro do VPC Service Controls, com CMEK",
            "Produtos de dados expostos por APIs protegidas, nunca acesso direto às tabelas",
          ],
        },
        {
          name: "Controles transversais",
          components:
            "VPC Service Controls · Organization Policy · Cloud KMS/HSM/EKM · Audit Logs · Security Command Center · Terraform",
          controlsEn: [
            "VPC Service Controls perimeter around all data projects against exfiltration",
            "Organization policies: block service account keys, enforce CMEK, restrict locations",
            "Data Access audit logs to a protected project and the SIEM; Security Command Center for posture",
            "Infrastructure as Code with Terraform and policy-as-code checks before apply",
          ],
          controlsPt: [
            "Perímetro do VPC Service Controls em volta de todos os projetos de dados contra exfiltração",
            "Organization policies: bloquear chaves de service account, exigir CMEK, restringir localização",
            "Data Access audit logs para um projeto protegido e para o SIEM; Security Command Center para postura",
            "Infraestrutura como código com Terraform e verificação de policy-as-code antes do apply",
          ],
        },
      ],
    },
  },
  {
    id: "questions-for-interviewer",
    category: "Questions to Ask",
    title: "High-Maturity Questions for the Candidate to Ask",
    question:
      "Questions that position you as a strategic Tech Lead at the end of the interview",
    context:
      "Perguntas de alto nível demonstram que você já está pensando como líder técnico e avaliando a cultura da empresa.",
    suggestedAnswerEn:
      "1. How do your Information Security and Software Engineering teams collaborate today? Do you have an active Security Champions program, or do teams still operate in silos?\n2. What are the biggest compliance or regulatory challenges your team needs to address in the next 6 to 12 months?\n3. What is the single most critical technical challenge the person stepping into this role must solve in their first 90 days?",
    suggestedAnswerPt:
      "1. Como funciona a colaboração entre Segurança e Engenharia de Software no dia a dia? Vocês já possuem um programa de Security Champions ou os times ainda atuam isolados?\n2. Quais são as principais dores regulatórias ou de conformidade que o time precisa sanar no curto prazo?\n3. Qual é o maior desafio técnico que a pessoa que assumir esta posição precisa destravar nos primeiros 90 dias?",
    goldenKeyPoints: [
      "Demonstra visão de liderança e cultura organizacional",
      "Avalia a maturidade de DevSecOps da empresa",
      "Foco em entregas claras nos primeiros 90 dias",
    ],
  },

  // ── AI Lab Security Analyst (vaga: Cybersecurity Analyst para AI lab) ──
  {
    id: "ailab-overqualified",
    category: "AI Lab Security Analyst",
    title: "You Look Overqualified",
    question:
      "You have more than 22 years of experience. This role is for early-career analysts. Why do you want it?",
    context:
      "A pergunta mais provável da triagem. O medo deles: você vai se entediar, sair rápido ou não aceitar feedback de um Senior mais novo. Responda com interesse real no trabalho, humildade com o processo e sem se desculpar.",
    suggestedAnswerEn:
      "That's a fair question. What attracts me is the work itself: how AI models handle security questions. In my current role I design LLM architectures, and I see that models can sound very confident and still be wrong or unsafe. Labeling and evaluating that data is a direct way to make models better, and I want to be part of that. My experience is an advantage here: I can recognize a wrong CVE, a bad severity rating or an unsafe exploit answer quickly. And I'm comfortable with the process: following guidelines, asking a senior when a case is unclear, and applying feedback. I'm not looking for a title; I'm looking for meaningful work in AI security.",
    suggestedAnswerPt:
      "É uma pergunta justa. O que me atrai é o trabalho em si: como modelos de IA lidam com perguntas de segurança. No meu papel atual desenho arquiteturas de LLM e vejo que os modelos podem soar muito confiantes e ainda assim estar errados ou inseguros. Rotular e avaliar esses dados é um jeito direto de melhorar os modelos, e quero fazer parte disso. Minha experiência é uma vantagem: reconheço rápido um CVE errado, uma severidade mal classificada ou uma resposta de exploit insegura. E fico confortável com o processo: seguir diretrizes, perguntar a um sênior quando o caso não está claro e aplicar o feedback. Não estou atrás de um cargo; estou atrás de um trabalho com sentido em segurança de IA.",
    goldenKeyPoints: [
      "Interesse genuíno: como LLMs erram em segurança",
      "Experiência = velocidade e precisão, não arrogância",
      "Aceita diretrizes, escala dúvidas e aplica feedback",
      "Opcional: perguntar sobre trilha de Senior reviewer / QA",
    ],
    followUps: [
      {
        question: "Will you be comfortable receiving feedback from a Senior who has less experience than you?",
        answerEn:
          "Yes. In this work the Senior owns the guidelines and the calibration. My job is to be consistent with them. If I disagree, I explain my reasoning once, in writing, and then I follow the decision. Consistency across the team matters more than my personal opinion.",
        answerPt:
          "Sim. Neste trabalho o Sênior é dono das diretrizes e da calibração. Meu papel é ser consistente com elas. Se eu discordar, explico meu raciocínio uma vez, por escrito, e sigo a decisão. A consistência do time importa mais que minha opinião pessoal.",
      },
    ],
  },
  {
    id: "ailab-availability",
    category: "AI Lab Security Analyst",
    title: "Full-Time Availability",
    question:
      "This role is full-time, with no competing full-time commitments. What is your current situation?",
    context:
      "A vaga pede explicitamente 'no competing full-time commitments'. Não afirme nada que não seja verdade. Estratégia honesta: dizer a situação atual e perguntar o modelo real (contrato por hora? meta semanal de horas? horário fixo?). Muitas vagas desse tipo (via plataformas de contratação) são contratos por hora e flexíveis.",
    suggestedAnswerEn:
      "I'm currently employed full-time as an Information Security Architect. Before I answer, could you clarify how the role works in practice? Is it a contractor role with a weekly hours commitment, or fixed hours in a specific time zone? Is it measured by hours or by throughput and quality? With that, I can tell you exactly how many hours I can commit and when I could start.",
    suggestedAnswerPt:
      "Hoje estou empregado em tempo integral como Arquiteto de Segurança da Informação. Antes de responder, você pode esclarecer como a vaga funciona na prática? É um contrato com compromisso semanal de horas, ou horário fixo em um fuso específico? É medida por horas ou por volume e qualidade? Com isso consigo dizer exatamente quantas horas posso me comprometer e quando posso começar.",
    goldenKeyPoints: [
      "Não mentir sobre o emprego atual",
      "Perguntar o modelo real: contrato, horas, fuso, métrica",
      "Comprometer só as horas que você consegue cumprir",
      "Conhecer seus compromissos contratuais antes da entrevista",
    ],
  },
  {
    id: "ailab-llm-use",
    category: "AI Lab Security Analyst",
    title: "How Do You Use LLMs?",
    question:
      "How do you use LLMs in your technical work, and what interests you about how they handle security questions?",
    context:
      "Requisito explícito da vaga. Mostre uso real (Claude, ChatGPT, Gemini, Ollama, agentes, RAG) e um olhar crítico: onde os modelos erram.",
    suggestedAnswerEn:
      "I use Claude, ChatGPT, Gemini and local models with Ollama. At work I designed multi-provider AI architectures with fallback, and I built AI agents that help review security documentation. I also work with RAG architectures and Python. What interests me is that models are often fluent but not always correct. On security, a model can invent CVE numbers, mix up OWASP categories, or give exploit details without any context. They can also be too cautious and refuse a normal defensive question. Both are problems: one is about accuracy, the other is about helpfulness. That balance is exactly what I want to help evaluate.",
    suggestedAnswerPt:
      "Uso Claude, ChatGPT, Gemini e modelos locais com Ollama. No trabalho desenhei arquiteturas de IA multi-provedor com fallback e construí agentes de IA que ajudam a revisar documentação de segurança. Também trabalho com arquiteturas RAG e Python. O que me interessa é que os modelos costumam ser fluentes, mas nem sempre corretos. Em segurança, um modelo pode inventar números de CVE, confundir categorias do OWASP ou dar detalhes de exploit sem nenhum contexto. Também podem ser cautelosos demais e recusar uma pergunta defensiva normal. Os dois são problemas: um é de precisão, o outro de utilidade. Esse equilíbrio é exatamente o que quero ajudar a avaliar.",
    goldenKeyPoints: [
      "Ferramentas reais: Claude, ChatGPT, Gemini, Ollama, agentes, RAG, Python",
      "Erros típicos: CVE inventado, categoria errada, excesso de detalhe perigoso",
      "Over-refusal também é falha (utilidade)",
      "Equilíbrio precisão × segurança × utilidade",
    ],
  },
  {
    id: "ailab-rate-response",
    category: "AI Lab Security Analyst",
    title: "Rate an AI Model's Security Answer",
    question:
      "A user asks a model: 'How do I test my login page for SQL injection?' The model gives a correct explanation plus a ready-to-use payload list to dump the whole database. How would you rate accuracy and safety?",
    context:
      "Simula o trabalho do dia a dia. Separe as dimensões (precisão vs. segurança), cite a diretriz e escreva uma justificativa curta. Não existe 'resposta única': mostre o raciocínio.",
    suggestedAnswerEn:
      "I would rate the two dimensions separately. Accuracy: if the explanation and the payloads are technically correct, accuracy is high. Safety depends on the guidelines, but my reasoning would be: testing your own login page is a legitimate defensive request, so explaining SQL injection, parameterized queries and how to test with tools like Burp Suite or sqlmap in an authorized environment is fine. A list of payloads built to extract the whole database goes beyond what the user needed. So I would mark it as accurate but with a safety concern, and write a short rationale: 'Correct technical content. The request is defensive, but the full extraction payloads exceed the stated need. A safer answer would explain detection and remediation and point to authorized testing tools.' If the guideline was unclear on this case, I would raise it with a Senior.",
    suggestedAnswerPt:
      "Eu avaliaria as duas dimensões separadamente. Precisão: se a explicação e os payloads estão tecnicamente corretos, a precisão é alta. A segurança depende das diretrizes, mas meu raciocínio seria: testar a própria página de login é um pedido defensivo legítimo, então explicar SQL injection, queries parametrizadas e como testar com ferramentas como Burp Suite ou sqlmap em ambiente autorizado está ok. Uma lista de payloads feita para extrair o banco inteiro vai além do que o usuário precisava. Então eu marcaria como preciso, mas com uma ressalva de segurança, e escreveria uma justificativa curta: 'Conteúdo técnico correto. O pedido é defensivo, mas os payloads de extração completa excedem a necessidade declarada. Uma resposta mais segura explicaria detecção e correção e indicaria ferramentas de teste autorizado.' Se a diretriz não fosse clara para esse caso, eu levaria a um Sênior.",
    goldenKeyPoints: [
      "Avaliar precisão e segurança separadamente",
      "Intenção do usuário + necessidade declarada",
      "Justificativa curta e objetiva",
      "Na dúvida: seguir a diretriz e escalar ao Sênior",
    ],
  },
  {
    id: "ailab-classify-vuln",
    category: "AI Lab Security Analyst",
    title: "Classify a Vulnerability in Code",
    question:
      "Look at this Python code: query = \"SELECT * FROM users WHERE name = '\" + username + \"'\". How would you classify the issue?",
    context:
      "Classificação é o coração da vaga. Dê: nome da falha, CWE, categoria OWASP, impacto, severidade aproximada e correção. Fale devagar e em ordem.",
    suggestedAnswerEn:
      "This is SQL injection. The user input is concatenated directly into the query. The weakness is CWE-89, and in the OWASP Top 10 2021 it falls under A03, Injection. The impact depends on the context: an attacker could bypass login, read or change data, or in some databases go further. Severity would usually be high or critical, but I would confirm with CVSS based on the real context, for example whether authentication is required. The fix is to use parameterized queries, for example cursor.execute with a placeholder and the username as a parameter, plus input validation and least privilege on the database account.",
    suggestedAnswerPt:
      "É SQL injection. A entrada do usuário é concatenada direto na query. A fraqueza é a CWE-89 e, no OWASP Top 10 2021, entra em A03, Injection. O impacto depende do contexto: o atacante pode burlar o login, ler ou alterar dados ou, em alguns bancos, ir além. A severidade normalmente seria alta ou crítica, mas eu confirmaria com CVSS considerando o contexto real, por exemplo se exige autenticação. A correção é usar queries parametrizadas, como cursor.execute com placeholder e o username como parâmetro, além de validação de entrada e menor privilégio na conta do banco.",
    goldenKeyPoints: [
      "SQL injection → CWE-89 → OWASP A03:2021 Injection",
      "Impacto depende do contexto",
      "Severidade via CVSS, não 'no chute'",
      "Correção: query parametrizada + menor privilégio",
    ],
    followUps: [
      {
        question: "And if the code was: return f\"<p>Hello {name}</p>\" in a web page?",
        answerEn:
          "That is cross-site scripting, reflected or stored depending on where 'name' comes from. It is CWE-79, also under A03 Injection in OWASP 2021. The fix is output encoding, or using a template engine with auto-escaping, plus a Content Security Policy as defense in depth.",
        answerPt:
          "Isso é cross-site scripting, refletido ou armazenado dependendo de onde vem o 'name'. É a CWE-79, também em A03 Injection no OWASP 2021. A correção é encoding na saída, ou usar um template engine com auto-escape, mais uma Content Security Policy como defesa em profundidade.",
      },
    ],
  },
  {
    id: "ailab-cve-cvss",
    category: "AI Lab Security Analyst",
    title: "CVE, CWE and CVSS",
    question:
      "What is the difference between a CVE, a CWE and a CVSS score? How do you confirm a CVE a model mentions?",
    context:
      "Fundamento que eles vão checar. Modelos inventam CVEs com frequência — mostre como você verifica.",
    suggestedAnswerEn:
      "A CVE is an identifier for one specific vulnerability in a specific product, like CVE-2021-44228, Log4Shell. A CWE is the type of weakness, like CWE-89 for SQL injection. CVSS is the scoring system for severity, from 0 to 10, based on things like attack vector, complexity, privileges and impact. When a model mentions a CVE, I check it in the NVD or on cve.org: does the ID exist, is it the right product and version, and does the description match what the model said? Models sometimes invent CVE numbers or attach a real ID to the wrong product, so I never accept one without checking.",
    suggestedAnswerPt:
      "Um CVE é o identificador de uma vulnerabilidade específica em um produto específico, como CVE-2021-44228, o Log4Shell. Uma CWE é o tipo de fraqueza, como a CWE-89 para SQL injection. CVSS é o sistema de pontuação de severidade, de 0 a 10, baseado em vetor de ataque, complexidade, privilégios e impacto. Quando um modelo cita um CVE, eu verifico no NVD ou no cve.org: o ID existe, é o produto e a versão certos, e a descrição bate com o que o modelo disse? Modelos às vezes inventam números de CVE ou ligam um ID real ao produto errado, então nunca aceito sem checar.",
    goldenKeyPoints: [
      "CVE = instância; CWE = tipo; CVSS = severidade 0–10",
      "Exemplo: CVE-2021-44228 (Log4Shell)",
      "Verificar no NVD / cve.org: existe, produto, versão, descrição",
      "Modelos alucinam CVEs",
    ],
  },
  {
    id: "ailab-mitre",
    category: "AI Lab Security Analyst",
    title: "Map Behavior to MITRE ATT&CK",
    question:
      "An attacker sends a phishing email, the user runs a PowerShell script, and then the attacker dumps credentials from memory. How would you map this to MITRE ATT&CK?",
    context:
      "Você mapeou cobertura no ATT&CK no Boticário. Mostre tática → técnica e diga que confere os IDs na base oficial.",
    suggestedAnswerEn:
      "I would map it by tactic and technique. The phishing email is Initial Access, technique T1566, Phishing, with a sub-technique depending on whether it was an attachment or a link. Running the PowerShell script is Execution, T1059, Command and Scripting Interpreter, sub-technique PowerShell. Dumping credentials from memory is Credential Access, T1003, OS Credential Dumping, for example LSASS memory. In practice I would always confirm the exact IDs and sub-techniques on attack.mitre.org before writing the label. At Grupo Boticário I used ATT&CK to map the detection coverage of SIEM and EDR solutions, so I'm used to thinking in this structure.",
    suggestedAnswerPt:
      "Eu mapearia por tática e técnica. O e-mail de phishing é Initial Access, técnica T1566, Phishing, com sub-técnica dependendo se foi anexo ou link. Executar o script PowerShell é Execution, T1059, Command and Scripting Interpreter, sub-técnica PowerShell. Extrair credenciais da memória é Credential Access, T1003, OS Credential Dumping, por exemplo memória do LSASS. Na prática eu sempre confirmaria os IDs e sub-técnicas exatos no attack.mitre.org antes de escrever o rótulo. No Grupo Boticário usei o ATT&CK para mapear a cobertura de detecção de soluções de SIEM e EDR, então estou acostumado a pensar nessa estrutura.",
    goldenKeyPoints: [
      "Tática → técnica → sub-técnica",
      "T1566 Phishing · T1059 (.001 PowerShell) · T1003 Credential Dumping",
      "Confirmar IDs no attack.mitre.org",
      "Experiência real: cobertura SIEM/EDR no Boticário",
    ],
  },
  {
    id: "ailab-verify-exploit",
    category: "AI Lab Security Analyst",
    title: "Does This Exploit Work as Described?",
    question:
      "A model claims a public exploit works against a specific software version. How would you check it?",
    context:
      "A vaga diz: 'check whether an exploit or technique works as described'. Mostre método, ambiente isolado e ética.",
    suggestedAnswerEn:
      "First I read before I run. I check the CVE and the vendor advisory: which versions are affected and what the preconditions are. Then I read the exploit code to understand what it really does, and to make sure it is not doing something else, like opening a backdoor on my machine. If testing is needed and allowed by the guidelines, I use an isolated lab, for example a VM with the exact vulnerable version, never a real system. I run it, with Metasploit if there is a module, and compare the result with the claim: does it work, only partly, or only with conditions the model didn't mention? Then I write a short rationale with what I verified and where.",
    suggestedAnswerPt:
      "Primeiro eu leio antes de executar. Verifico o CVE e o advisory do fabricante: quais versões são afetadas e quais as pré-condições. Depois leio o código do exploit para entender o que ele realmente faz, e garantir que não faz outra coisa, como abrir um backdoor na minha máquina. Se o teste for necessário e permitido pelas diretrizes, uso um laboratório isolado, por exemplo uma VM com a versão vulnerável exata, nunca um sistema real. Executo, com Metasploit se houver módulo, e comparo o resultado com a afirmação: funciona, funciona em parte, ou só com condições que o modelo não citou? Então escrevo uma justificativa curta com o que verifiquei e onde.",
    goldenKeyPoints: [
      "Ler antes de rodar (advisory, versões, pré-condições, código)",
      "Laboratório isolado com a versão exata",
      "Comparar resultado com a afirmação do modelo",
      "Justificativa com a evidência",
    ],
  },
  {
    id: "ailab-auth-flaws",
    category: "AI Lab Security Analyst",
    title: "Authentication & Access Flaws",
    question: "Give me some examples of common authentication and access control flaws.",
    context:
      "Requisito explícito (authentication flaws). Você conhece OAuth2, SAML, SSO e IAM de arquitetura — use isso.",
    suggestedAnswerEn:
      "Some common ones: weak or missing brute-force protection and no MFA; session tokens that don't expire or are not invalidated on logout; JWT problems, like accepting the 'none' algorithm or not validating the signature; OAuth misconfigurations, like a redirect URI that is not strictly validated, which can leak authorization codes. On access control, the classic is IDOR: changing an ID in the URL and seeing another user's data. In the OWASP Top 10 2021, access control is A01, Broken Access Control, and authentication is A07, Identification and Authentication Failures.",
    suggestedAnswerPt:
      "Alguns comuns: proteção fraca ou inexistente contra força bruta e ausência de MFA; tokens de sessão que não expiram ou não são invalidados no logout; problemas com JWT, como aceitar o algoritmo 'none' ou não validar a assinatura; má configuração de OAuth, como redirect URI sem validação estrita, que pode vazar authorization codes. Em controle de acesso, o clássico é o IDOR: mudar um ID na URL e ver dados de outro usuário. No OWASP Top 10 2021, controle de acesso é A01, Broken Access Control, e autenticação é A07, Identification and Authentication Failures.",
    goldenKeyPoints: [
      "Força bruta / sem MFA · sessão · JWT 'none' · OAuth redirect_uri",
      "IDOR = controle de acesso",
      "OWASP 2021: A01 Broken Access Control · A07 Auth Failures",
    ],
  },
  {
    id: "ailab-memory-corruption",
    category: "AI Lab Security Analyst",
    title: "Memory Corruption Basics",
    question: "Can you explain the basics of memory corruption vulnerabilities?",
    context:
      "Não é sua especialidade e não está no CV. Explique o básico com segurança e seja honesto — isso pontua mais que fingir.",
    suggestedAnswerEn:
      "Memory corruption happens when a program writes or reads memory it shouldn't, usually in languages like C and C++. The classic example is a buffer overflow: copying more data into a buffer than it can hold, which can overwrite the return address on the stack and change the program flow. Other types are use-after-free, where memory is used after it was released, and format string bugs. Modern mitigations include stack canaries, DEP or NX, which blocks code execution on the stack, and ASLR, which randomizes addresses. To be transparent, this is not my main hands-on area, but I understand the concepts and I can classify these cases correctly.",
    suggestedAnswerPt:
      "Corrupção de memória acontece quando um programa escreve ou lê memória que não deveria, geralmente em linguagens como C e C++. O exemplo clássico é o buffer overflow: copiar mais dados para um buffer do que ele comporta, o que pode sobrescrever o endereço de retorno na pilha e mudar o fluxo do programa. Outros tipos são use-after-free, quando a memória é usada depois de liberada, e format string. Mitigações modernas incluem stack canaries, DEP ou NX, que bloqueia execução de código na pilha, e ASLR, que randomiza endereços. Sendo transparente, essa não é minha principal área prática, mas entendo os conceitos e consigo classificar esses casos corretamente.",
    goldenKeyPoints: [
      "Buffer overflow · use-after-free · format string",
      "Mitigações: canaries, DEP/NX, ASLR",
      "Honestidade: conceito sim, especialidade não",
    ],
  },
  {
    id: "ailab-read-logs",
    category: "AI Lab Security Analyst",
    title: "Read a Log Line",
    question:
      "You see this in a web server log: GET /products?id=1' OR '1'='1 HTTP/1.1 200. What does it tell you?",
    context:
      "Leitura de logs é parte da vaga, e você fez isso nas investigações da Atento. Diga o que é, o que confirmar e o que NÃO concluir cedo demais.",
    suggestedAnswerEn:
      "It looks like a SQL injection attempt: the classic ' OR '1'='1 payload in the id parameter. The 200 status means the server answered, but it does not prove the attack worked. To confirm, I would check the response size compared to normal requests, other requests from the same IP, for example automated scanning patterns, and the application or database logs for errors. In my fraud and incident investigations at Atento, the main lesson was this: build the timeline first, then conclude. One log line is a signal, not a verdict.",
    suggestedAnswerPt:
      "Parece uma tentativa de SQL injection: o payload clássico ' OR '1'='1 no parâmetro id. O status 200 significa que o servidor respondeu, mas não prova que o ataque funcionou. Para confirmar, eu olharia o tamanho da resposta comparado às requisições normais, outras requisições do mesmo IP, como padrões de varredura automatizada, e os logs da aplicação ou do banco em busca de erros. Nas minhas investigações de fraude e incidentes na Atento, a lição principal foi esta: montar a linha do tempo primeiro, depois concluir. Uma linha de log é um sinal, não um veredito.",
    goldenKeyPoints: [
      "Identificar o padrão (SQLi)",
      "200 ≠ sucesso do ataque",
      "Correlacionar: tamanho da resposta, IP, logs da aplicação",
      "Experiência real: investigações na Atento",
    ],
  },
  {
    id: "ailab-tools",
    category: "AI Lab Security Analyst",
    title: "Security Tools You Have Used",
    question: "Which security tools have you used, and for what?",
    context:
      "Seja específico e honesto sobre quando (LSITEC 2011–2014). Não cite Ghidra nem SIEM operacional — você não usou.",
    suggestedAnswerEn:
      "At LSITEC I used Nmap for network discovery and port scanning, Nessus for vulnerability scanning, Burp Suite as a proxy to intercept and modify web requests during application tests, Metasploit to validate vulnerabilities with exploits, and Wireshark to analyze network traffic, including in wireless tests. I also used SQL and Bash. That hands-on work was some years ago. Today my technical work is with Python and LLMs. With SIEM, SOAR and EDR, my experience is on the selection side: at Grupo Boticário I evaluated and selected these solutions through PoCs.",
    suggestedAnswerPt:
      "Na LSITEC usei Nmap para descoberta de rede e varredura de portas, Nessus para varredura de vulnerabilidades, Burp Suite como proxy para interceptar e modificar requisições web nos testes de aplicação, Metasploit para validar vulnerabilidades com exploits e Wireshark para analisar tráfego de rede, inclusive nos testes wireless. Também usei SQL e Bash. Esse trabalho prático foi há alguns anos. Hoje meu trabalho técnico é com Python e LLMs. Com SIEM, SOAR e EDR, minha experiência é do lado da seleção: no Grupo Boticário avaliei e selecionei essas soluções por meio de PoCs.",
    goldenKeyPoints: [
      "Cada ferramenta com seu uso concreto",
      "Período honesto (LSITEC 2011–2014)",
      "SIEM/SOAR/EDR = seleção, não operação",
      "Hoje: Python e LLMs",
    ],
  },
  {
    id: "ailab-rationale",
    category: "AI Lab Security Analyst",
    title: "Write a Short Rationale",
    question: "How do you write a good rationale for a label? Give me an example.",
    context:
      "A vaga pede 'short, clear rationales'. Use sua experiência com ADRs: decisão + motivo + evidência, em 2–3 frases.",
    suggestedAnswerEn:
      "A good rationale has three parts: the decision, the main reason, and the evidence, in two or three sentences. Someone who reads it should be able to check it without asking me. For example: 'Label: inaccurate. The response says CVE-2021-44228 affects Log4j 1.x, but the advisory lists Log4j 2.0-beta9 to 2.14.1. Source: NVD and Apache advisory.' I practice this with Architecture Decision Records, where each decision must show its reason and its trade-offs in a short and traceable way.",
    suggestedAnswerPt:
      "Uma boa justificativa tem três partes: a decisão, o motivo principal e a evidência, em duas ou três frases. Quem ler deve conseguir verificar sem precisar me perguntar. Por exemplo: 'Rótulo: impreciso. A resposta diz que o CVE-2021-44228 afeta o Log4j 1.x, mas o advisory lista Log4j 2.0-beta9 a 2.14.1. Fonte: NVD e advisory da Apache.' Pratico isso com Architecture Decision Records, onde cada decisão precisa mostrar o motivo e os trade-offs de forma curta e rastreável.",
    goldenKeyPoints: [
      "Decisão + motivo + evidência",
      "2–3 frases, verificável por outra pessoa",
      "Ponte com ADRs",
    ],
  },
  {
    id: "ailab-unclear-case",
    category: "AI Lab Security Analyst",
    title: "Unclear Case: Guess or Escalate?",
    question:
      "What do you do when a case is not covered clearly by the guidelines?",
    context:
      "A vaga diz literalmente: 'Raise unclear cases with Seniors instead of guessing'. Mostre que você não vai 'achar' pela sua experiência.",
    suggestedAnswerEn:
      "I don't guess, even when I have an opinion. First I check the guidelines and previous examples again. If it's still unclear, I write down the specific question, the options I see and which one I would choose and why, and I raise it with a Senior. That makes the answer fast for them. When I get the answer, I apply it to the similar cases that come after, and I keep a small note so I stay consistent. One unclear case is often a sign of a gap in the guidelines, so flagging it helps the whole team.",
    suggestedAnswerPt:
      "Eu não chuto, mesmo quando tenho uma opinião. Primeiro reviso as diretrizes e exemplos anteriores. Se continuar incerto, anoto a pergunta específica, as opções que vejo e qual eu escolheria e por quê, e levo a um Sênior. Isso torna a resposta rápida para ele. Quando recebo a resposta, aplico aos casos parecidos que vierem depois e mantenho uma anotação para ficar consistente. Um caso incerto muitas vezes indica uma lacuna nas diretrizes, então sinalizar ajuda o time todo.",
    goldenKeyPoints: [
      "Não chutar — mesmo com 22 anos de experiência",
      "Pergunta específica + opções + recomendação",
      "Aplicar o feedback aos próximos casos",
      "Caso incerto = possível lacuna na diretriz",
    ],
  },
  {
    id: "ailab-throughput",
    category: "AI Lab Security Analyst",
    title: "Throughput vs. Quality",
    question:
      "You'll have daily throughput and quality targets. How do you keep both, especially over long task sets?",
    context:
      "Eles querem consistência por horas. Mostre método: escopo certo da investigação, pausas, checagem própria, feedback.",
    suggestedAnswerEn:
      "The key is to investigate each case enough to answer the question, and not more. I define what I need to confirm, check it, write the rationale and move on. To stay consistent over long sessions, I work in blocks with short breaks, and I re-read my label and rationale before submitting. I also review my quality feedback regularly to see if I'm making the same mistake. If my speed drops because many cases are unclear, I raise it early, because that usually means the guidelines need an update.",
    suggestedAnswerPt:
      "O segredo é investigar cada caso o suficiente para responder a pergunta, e não mais. Defino o que preciso confirmar, verifico, escrevo a justificativa e sigo. Para manter consistência em sessões longas, trabalho em blocos com pausas curtas e releio meu rótulo e justificativa antes de enviar. Também reviso meu feedback de qualidade com frequência para ver se repito o mesmo erro. Se minha velocidade cai porque muitos casos estão incertos, aviso cedo, porque normalmente isso indica que as diretrizes precisam de ajuste.",
    goldenKeyPoints: [
      "Investigar o suficiente, não tudo",
      "Blocos + pausas + autorrevisão",
      "Usar o feedback de qualidade",
      "Sinalizar cedo quando a diretriz trava a produtividade",
    ],
  },
  {
    id: "ailab-questions-to-ask",
    category: "AI Lab Security Analyst",
    title: "Questions to Ask Them",
    question: "Do you have any questions for us?",
    context:
      "Perguntas que mostram interesse no trabalho real e abrem a porta para a trilha sênior.",
    suggestedAnswerEn:
      "Yes, a few. How are the guidelines calibrated, and how often do they change? How is quality measured, and how is feedback shared with analysts? What does a typical task look like: more vulnerability classification, or more evaluation of model answers? Do analysts have a lab environment to validate exploits safely? And is there a path to Senior reviewer or QA roles for analysts who perform well?",
    suggestedAnswerPt:
      "Sim, algumas. Como as diretrizes são calibradas e com que frequência mudam? Como a qualidade é medida e como o feedback chega aos analistas? Como é uma tarefa típica: mais classificação de vulnerabilidades ou mais avaliação de respostas de modelos? Os analistas têm um ambiente de laboratório para validar exploits com segurança? E existe caminho para Senior reviewer ou QA para analistas com bom desempenho?",
    goldenKeyPoints: [
      "Calibração das diretrizes e feedback",
      "Natureza das tarefas",
      "Ambiente de laboratório seguro",
      "Trilha para Senior reviewer / QA",
    ],
  },

  // ── Turing (Company) — conhecer a empresa (dados públicos de 2025–2026; confira antes da entrevista) ──
  {
    id: "turing-what-you-know",
    category: "Turing (Company)",
    title: "What Do You Know About Turing?",
    question: "What do you know about Turing?",
    context:
      "FATOS PARA MEMORIZAR — Fundada em 2018, CEO Jonathan Siddharth, sede em San Francisco (EUA). Missão oficial: 'to accelerate superintelligence to drive real economic progress'. Em 2022 a OpenAI contratou a Turing para fornecer dados de código para o ChatGPT. Rede de 4+ milhões de engenheiros, cientistas de dados e PhDs. Começou como plataforma de contratação de engenheiros remotos e virou fornecedora de dados e pesquisa para laboratórios de IA de fronteira (pós-treino: SFT, RLHF, ambientes de RL, avaliações e benchmarks). Três linhas: AGI Advancement (dados para labs), Turing Intelligence (modelos/sistemas de IA para empresas) e Turing Talent (talentos de IA). Plataforma interna: ALAN. Março/2025: Série E de US$ 111M a US$ 2,2 bi de valuation (liderada pela Khazanah), ~US$ 300M de receita anualizada. Abril/2026: lançou a Turing Frontier, que conecta labs a especialistas de domínio verificados. Diz-se 'neutra' — atende vários labs ao mesmo tempo. Imprensa cita OpenAI, Google, Anthropic e Meta como clientes (não confirmado pela própria Turing).",
    suggestedAnswerEn:
      "Turing started in 2018 as a platform to hire remote software engineers, and it evolved into one of the main data and research partners for frontier AI labs. Today the core is post-training: supervised fine-tuning data, RLHF, reinforcement learning environments, and model evaluations and benchmarks, especially in coding and reasoning. It also builds AI systems for enterprises and provides AI talent. What I find interesting is the model behind it: a large network of vetted engineers and domain experts who create and check the data that makes models better. And this year Turing launched Turing Frontier, to connect labs with verified domain experts. A cybersecurity analyst role fits exactly there: experts who can say if a model's security answer is correct and safe.",
    suggestedAnswerPt:
      "A Turing começou em 2018 como uma plataforma para contratar engenheiros de software remotos e evoluiu para um dos principais parceiros de dados e pesquisa dos laboratórios de IA de fronteira. Hoje o núcleo é o pós-treino: dados de fine-tuning supervisionado, RLHF, ambientes de aprendizado por reforço e avaliações e benchmarks de modelos, principalmente em código e raciocínio. Ela também constrói sistemas de IA para empresas e fornece talentos de IA. O que acho interessante é o modelo por trás: uma grande rede de engenheiros e especialistas de domínio verificados que criam e conferem os dados que melhoram os modelos. E este ano a Turing lançou a Turing Frontier, para conectar labs a especialistas de domínio verificados. Uma vaga de analista de cibersegurança se encaixa exatamente aí: especialistas que dizem se a resposta de segurança de um modelo está correta e segura.",
    goldenKeyPoints: [
      "Missão: 'accelerate superintelligence to drive real economic progress'",
      "2018 · Jonathan Siddharth (CEO) · de contratação remota → dados para labs",
      "2022: dados de código para o ChatGPT (OpenAI)",
      "Pós-treino: SFT, RLHF, ambientes de RL, avaliações",
      "AGI Advancement · Turing Intelligence · Turing Talent",
      "Turing Frontier (abr/2026): especialistas de domínio para labs",
      "Ligar com a vaga: especialista que avalia respostas de segurança",
    ],
  },
  {
    id: "turing-why-turing",
    category: "Turing (Company)",
    title: "Why Turing?",
    question: "Why do you want to work with Turing?",
    context:
      "Conecte três coisas: o que a Turing faz (dados de pós-treino), o seu interesse (como LLMs erram em segurança) e a sua experiência (arquitetura de LLMs + pentest + fraude).",
    suggestedAnswerEn:
      "Three reasons. First, the mission: Turing works on the part of AI that I care about most, making models more accurate and safer through better data and evaluations. Second, the fit: I design LLM architectures and protect them against prompt injection, and I have a hands-on background in pentest and fraud investigation. That combination is useful to judge security answers from models. Third, the model of work: being part of an expert network that works with several frontier labs means I can learn fast and see how different models behave. I want my security experience to have a direct impact on how AI handles security.",
    suggestedAnswerPt:
      "Três motivos. Primeiro, a missão: a Turing trabalha na parte da IA que mais me interessa, tornar os modelos mais precisos e seguros com dados e avaliações melhores. Segundo, o encaixe: desenho arquiteturas de LLM e as protejo contra prompt injection, e tenho experiência prática em pentest e investigação de fraudes. Essa combinação é útil para julgar respostas de segurança de modelos. Terceiro, o modelo de trabalho: fazer parte de uma rede de especialistas que atende vários laboratórios de fronteira me permite aprender rápido e ver como modelos diferentes se comportam. Quero que minha experiência em segurança tenha impacto direto em como a IA lida com segurança.",
    goldenKeyPoints: [
      "Missão: modelos mais precisos e seguros",
      "Encaixe: LLM + pentest + fraude",
      "Rede de especialistas + vários labs = aprendizado",
    ],
  },
  {
    id: "turing-how-data-helps",
    category: "Turing (Company)",
    title: "How Does Your Work Improve a Model?",
    question:
      "How do you think your labels and evaluations actually help improve an AI model?",
    context:
      "Mostre que entende o pós-treino sem exagerar: SFT (exemplos bons), RLHF / preferências (qual resposta é melhor), avaliações (medir o progresso).",
    suggestedAnswerEn:
      "After pre-training, models learn a lot from expert data. In supervised fine-tuning, they learn from good example answers. In RLHF or preference training, experts compare or rate answers, and the model learns which behavior is better. And evaluations measure if the model is really improving, for example if it still invents CVEs or gives unsafe exploit details. So a careful label with a clear rationale is a training signal. If my labels are inconsistent, the model learns noise. That's why consistency and following the guidelines matter so much in this work.",
    suggestedAnswerPt:
      "Depois do pré-treino, os modelos aprendem muito com dados de especialistas. No fine-tuning supervisionado, aprendem com exemplos de boas respostas. No RLHF ou treino por preferência, especialistas comparam ou avaliam respostas, e o modelo aprende qual comportamento é melhor. E as avaliações medem se o modelo está realmente melhorando, por exemplo se ainda inventa CVEs ou dá detalhes inseguros de exploit. Então um rótulo cuidadoso com justificativa clara é um sinal de treino. Se meus rótulos forem inconsistentes, o modelo aprende ruído. Por isso consistência e seguir as diretrizes importam tanto neste trabalho.",
    goldenKeyPoints: [
      "SFT = exemplos bons · RLHF = preferências · Evals = medição",
      "Rótulo = sinal de treino",
      "Inconsistência = ruído no modelo",
    ],
  },
  {
    id: "turing-confidentiality",
    category: "Turing (Company)",
    title: "Confidentiality & Neutrality",
    question:
      "You may work on projects for different AI labs. How do you handle confidentiality?",
    context:
      "A Turing se posiciona como parceira neutra de vários labs. Confidencialidade é crítica: dados de um cliente nunca vão para outro, nem para ferramentas externas.",
    suggestedAnswerEn:
      "I treat each project as confidential by default. I don't share tasks, prompts, model outputs or guidelines outside the project, and I don't paste client data into external tools, including other AI assistants, unless the project explicitly allows it. I keep the information of one lab separate from the others. I've worked for years in regulated environments, banking and pharma, with LGPD, PCI DSS and ISO 27001, so following strict data handling rules is normal for me.",
    suggestedAnswerPt:
      "Trato cada projeto como confidencial por padrão. Não compartilho tarefas, prompts, respostas de modelos ou diretrizes fora do projeto, e não colo dados do cliente em ferramentas externas, inclusive outros assistentes de IA, a não ser que o projeto permita explicitamente. Mantenho as informações de um laboratório separadas das dos outros. Trabalhei anos em ambientes regulados, bancos e farma, com LGPD, PCI DSS e ISO 27001, então seguir regras rígidas de tratamento de dados é normal para mim.",
    goldenKeyPoints: [
      "Confidencial por padrão",
      "Nada de dados do cliente em ferramentas externas",
      "Separação entre labs (neutralidade)",
      "Experiência com LGPD, PCI DSS, ISO 27001",
    ],
  },
  {
    id: "turing-process",
    category: "Turing (Company)",
    title: "Turing's Hiring Process (What to Expect)",
    question: "Walk me through what happens next in our process.",
    context:
      "ESTUDO (fonte: help.turing.com) — Candidatura em work.turing.com/jobs; não dá para retirar depois de enviada; após reprovação, 3 meses para reaplicar. Etapas: revisão/shortlist → triagem (call ou assessment) → entrevistas técnicas (algumas vagas têm entrevista com IA) → avaliação final com referências → oferta. O CLIENTE faz a escolha final. Prazo: de 48h até 6 semanas (sênior/especializado: 3–4+ semanas); só quem avança é contatado. ASSESSMENTS: computador desktop, sem aba anônima, compartilhamento de tela inteira, internet ≥ 4 Mbps, extensões desligadas (Grammarly, assistentes de código); só 2–4 pausas na gravação antes de reprovar; desafio não pode ser refeito; resultado vale 90 dias. ONBOARDING: Termos de Serviço → verificação de ID (só passaporte ou CNH; rejeição final é irreversível) → W-8BEN (não residente nos EUA) e dados bancários (conta no seu nome legal, em moeda local) → Scope of Work. Pagamento em carteira Airwallex em USD, até o 5º dia útil do mês seguinte, após o gestor aprovar as horas; horas registradas no Jibble. A maioria das vagas é full-time (~40h/semana); algumas são part-time — confira na vaga.",
    suggestedAnswerEn:
      "From what I read in your help center, after the application there is a screening, which can be a call or an assessment, then a technical or role-specific interview, and a final evaluation. The client makes the final selection. Then onboarding: terms of service, ID verification, tax and payment details, and the scope of work. Could you confirm which assessment applies to this role, and the expected timeline?",
    suggestedAnswerPt:
      "Pelo que li na central de ajuda de vocês, depois da candidatura há uma triagem, que pode ser uma call ou um assessment, depois uma entrevista técnica ou específica da vaga e uma avaliação final. O cliente faz a escolha final. Depois vem o onboarding: termos de serviço, verificação de identidade, dados fiscais e de pagamento e o escopo de trabalho. Você pode confirmar qual assessment se aplica a esta vaga e o prazo esperado?",
    goldenKeyPoints: [
      "Mostrar que leu o help center",
      "Assessment: desktop, tela inteira, sem Grammarly, poucas pausas",
      "Cliente decide no final",
      "Horas no Jibble, aprovadas pelo gestor; pagamento em USD (Airwallex)",
      "Confirmar se a vaga é full-time (40h) ou part-time",
    ],
  },
  {
    id: "turing-questions",
    category: "Turing (Company)",
    title: "Questions to Ask Turing",
    question: "Do you have any questions about Turing or the project?",
    context:
      "Perguntas que mostram que você estudou a empresa e que esclarecem o modelo de contrato (horas, fuso, métrica) sem precisar falar de outros vínculos.",
    suggestedAnswerEn:
      "Yes. Is this project part of AGI Advancement or connected to Turing Frontier? Is it a contractor engagement, and how are hours and time zones organized? How are quality and throughput measured, and how often do analysts receive feedback? What does onboarding and calibration look like in the first weeks? And for analysts who perform well, are there paths to reviewer or project lead roles?",
    suggestedAnswerPt:
      "Sim. Este projeto faz parte do AGI Advancement ou está ligado à Turing Frontier? É um contrato de prestação de serviços, e como são organizados horas e fuso horário? Como qualidade e volume são medidos, e com que frequência os analistas recebem feedback? Como funcionam o onboarding e a calibração nas primeiras semanas? E, para analistas com bom desempenho, existem caminhos para revisor ou líder de projeto?",
    goldenKeyPoints: [
      "Mostrar que conhece AGI Advancement / Turing Frontier",
      "Esclarecer contrato, horas e fuso",
      "Métricas, feedback e calibração",
      "Caminho para reviewer / lead",
    ],
  },
];

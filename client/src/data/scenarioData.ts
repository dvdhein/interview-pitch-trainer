export type RoleplayScenario = {
  id: string;
  category:
    | "About You"
    | "Strengths & Weaknesses"
    | "Experiences & Problems"
    | "Leadership & Conflict"
    | "Fintech & Payments"
    | "Cloud & Zero Trust"
    | "Questions to Ask";
  title: string;
  question: string;
  context: string;
  suggestedAnswerEn: string;
  suggestedAnswerPt: string;
  goldenKeyPoints: string[];
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
      "22+ anos em setores regulados",
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
      "Of course. I started in technology over 22 years ago, and very early I moved into security, because I saw that every system I touched also had to be protected. A big chapter was Banco BV, where I was the lead architect for the security of PIX, Open Banking and Banking-as-a-Service — mTLS, HSMs and OAuth2 FAPI at national scale, passing every Central Bank audit. Then at Grupo Boticário I standardized data protection baselines across more than 50 brands. Today at Aché I focus on Policy-as-Code, GenAI security and the Architect's Journey, where I act as Platform TPM. The common thread is simple: I take security from the department of NO to a real business enabler.",
    suggestedAnswerPt:
      "Claro. Comecei em tecnologia há mais de 22 anos e cedo migrei para segurança, porque percebi que todo sistema que eu tocava também precisava ser protegido. Um capítulo importante foi o Banco BV, onde fui o arquiteto líder da segurança do PIX, Open Banking e Banking-as-a-Service — mTLS, HSMs e OAuth2 FAPI em escala nacional, passando em todas as auditorias do BACEN. Depois, no Grupo Boticário, padronizei baselines de proteção de dados em mais de 50 marcas. Hoje na Aché foco em Policy-as-Code, segurança de GenAI e na Jornada do Arquiteto, onde atuo como Platform TPM. O fio condutor é simples: tirar a segurança do 'departamento do NÃO' e torná-la viabilizadora do negócio.",
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
      "Honestly, it started from curiosity. Early in my career I was building and running systems, and I kept asking: what happens if someone tries to break this? I realized that security is where technology meets real consequences — money, health data, people's trust. In banking, a single weak control could affect millions of transactions. That sense of responsibility hooked me. And what kept me here for more than 22 years is that security is never finished: the threats change, the technology changes, and you have to keep learning every year.",
    suggestedAnswerPt:
      "Sinceramente, começou pela curiosidade. No início da carreira eu construía e operava sistemas e sempre me perguntava: o que acontece se alguém tentar quebrar isso? Percebi que segurança é onde a tecnologia encontra consequências reais — dinheiro, dados de saúde, a confiança das pessoas. Num banco, um único controle fraco pode afetar milhões de transações. Esse senso de responsabilidade me conquistou. E o que me mantém aqui há mais de 22 anos é que segurança nunca termina: as ameaças mudam, a tecnologia muda, e é preciso aprender todo ano.",
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
      "I think I bring a rare combination. First, depth: more than 22 years securing critical systems, including PIX and Open Banking at national scale. Second, modern practice: I don't just write policies — I automate them with Policy-as-Code and AI copilots, so engineering moves fast and safely. And third, communication: one of my strongest assets is bridging the gap between technical architecture and C-level business goals. So you get someone who can design the architecture, sit with the developers, and explain the risk to the board.",
    suggestedAnswerPt:
      "Acredito que trago uma combinação rara. Primeiro, profundidade: mais de 22 anos protegendo sistemas críticos, incluindo PIX e Open Banking em escala nacional. Segundo, prática moderna: não fico só nas políticas — eu as automatizo com Policy-as-Code e copilotos de IA, para a engenharia andar rápido e com segurança. E terceiro, comunicação: um dos meus maiores diferenciais é fazer a ponte entre a arquitetura técnica e os objetivos de negócio do C-level. Vocês ganham alguém que desenha a arquitetura, senta com os desenvolvedores e explica o risco para a diretoria.",
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
      "The key to protecting transaction data is drastically minimizing the audit exposure scope. At Banco BV, we secured our APIs with end-to-end mTLS and adopted OAuth2 FAPI standards, with API gateways handling centralized validation and rate limiting. For PCI and PIX services, we isolated them into dedicated Kubernetes namespaces to prevent contamination of the broader environment. Cryptographic keys used for signing transactions were protected inside KMS backed by dedicated Hardware Security Modules (HSMs). The core rule is: tokenize sensitive data at the earliest ingestion point and ensure automatic cryptographic key rotation.",
    suggestedAnswerPt:
      "O segredo para proteger dados transacionais é reduzir o escopo de auditoria ao máximo. No Banco BV, blindávamos as APIs usando mTLS de ponta a ponta e aplicando o padrão FAPI do OAuth2, centralizando validações no gateway. Para PCI e PIX, isolávamos os microsserviços em namespaces dedicados na nuvem para não contaminar o restante do ambiente. As chaves criptográficas de assinatura eram gerenciadas em KMS integrado a HSM. A regra fundamental é: tokenizar o dado sensível o quanto antes na entrada e automatizar a rotação de chaves.",
    goldenKeyPoints: [
      "Redução de escopo de auditoria (PCI Scope Reduction)",
      "mTLS de ponta a ponta e OAuth2 FAPI",
      "Namespaces dedicados no Kubernetes para isolamento",
      "Custódia criptográfica em HSMs com rotação automática",
    ],
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
];

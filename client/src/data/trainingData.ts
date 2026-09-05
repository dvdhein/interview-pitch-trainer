export type ExerciseItem =
  | { t: "note"; title: string; body: string; rule?: boolean }
  | { t: "fill"; q: string; a: string[]; ph?: string; ptq?: boolean }
  | { t: "mc"; q: string; opts: string[]; a: number }
  | { t: "ord"; q: string; a: string }
  | { t: "say"; q: string; starter: string }
  | { t: "read"; title: string; paras: string[] };

export type TrainingModule = {
  id: string;
  min: number;
  tag: string;
  title: string;
  sub: string;
  why: string;
  items: ExerciseItem[];
};

export const trainingModules: TrainingModule[] = [
  {
    id: "m1",
    min: 15,
    tag: "Vocabulary",
    title: "Tech Lead Vocabulary & Starters",
    sub: "Practice key words and how to start sentences",
    why: "It is crucial to sound confident and use the right terminology in interviews.",
    items: [
      {
        t: "note",
        rule: false,
        title: "Sentence Starters",
        body: "In my current role, I... / One of my responsibilities is... / The biggest challenge is... / What I enjoy the most is... / I work closely with...",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: Eu trabalho próximo da equipe.",
        a: ["i work closely with the team", "i work closely with my team"],
        ph: "em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: O maior desafio é...",
        a: ["the biggest challenge is"],
        ph: "em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: No meu papel atual, eu...",
        a: ["in my current role i"],
        ph: "em inglês",
      },
      {
        t: "note",
        rule: false,
        title: "Key Vocabulary",
        body: "stakeholder (business decision-maker) / deployment (releasing software) / vulnerability (security weakness) / automate (make automatic) / compliance (following rules)",
      },
      {
        t: "mc",
        q: "Business decision-maker",
        opts: ["stakeholder", "deployment", "compliance"],
        a: 0,
      },
      {
        t: "mc",
        q: "Following regulations",
        opts: ["vulnerability", "automate", "compliance"],
        a: 2,
      },
      {
        t: "mc",
        q: "Security weakness",
        opts: ["vulnerability", "scalable", "reliable"],
        a: 0,
      },
      {
        t: "mc",
        q: "Releasing software",
        opts: ["architecture", "deployment", "integrate"],
        a: 1,
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "I regularly communicate with stakeholders.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "The deployment went smoothly.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "We fixed several vulnerabilities.",
      },
      {
        t: "say",
        q: "Say out loud: three sentence starters you can use to explain your role.",
        starter:
          "In my current role, I... One of my responsibilities is... What sets me apart is...",
      },
      {
        t: "say",
        q: "Explain what a stakeholder is and give an example of how you interact with them.",
        starter:
          "A stakeholder is a business decision-maker. I communicate with them to translate technical risks into business ROI.",
      },
    ],
  },
  {
    id: "m2",
    min: 20,
    tag: "Connect the Dots",
    title: "Explaining Your Experience",
    sub: "Linking starters with vocabulary based on your CV",
    why: "You need to connect abstract concepts to your real-world experience at Aché, Banco BV, and Boticário.",
    items: [
      {
        t: "note",
        rule: false,
        title: "Connecting the dots",
        body: "Use starters and vocabulary together: 'In my current role, I regularly communicate with stakeholders.'",
      },
      {
        t: "fill",
        q: "____ (No meu papel atual), I regularly communicate with stakeholders.",
        a: ["in my current role"],
        ph: "starter",
      },
      {
        t: "fill",
        q: "____ (Uma das minhas responsabilidades) is ensuring the secure architecture.",
        a: ["one of my responsibilities"],
        ph: "starter",
      },
      {
        t: "fill",
        q: "____ (Da minha experiência), creating efficient processes reduces debt.",
        a: ["from my experience"],
        ph: "starter",
      },
      {
        t: "fill",
        q: "____ (O principal objetivo) is to build scalable and secure solutions.",
        a: ["the main goal"],
        ph: "starter",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "I work closely with development teams.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "The main goal is to build scalable solutions.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "We automate threat modeling pipelines.",
      },
      {
        t: "read",
        title: "Real Experience Example",
        paras: [
          "In my current role, I regularly communicate with stakeholders, like C-Level executives, to present security risk reports at Aché.",
          "One of my responsibilities is ensuring the secure architecture of Generative AI applications and mitigating prompt injection risks.",
          "From my experience, creating efficient processes through Policy-as-Code significantly reduces architectural debt.",
        ],
      },
      {
        t: "say",
        q: "Explain your current role at Aché using 'In my current role...' and 'One of my responsibilities...'",
        starter:
          "In my current role at Aché, one of my responsibilities is modernizing our security architecture pipeline...",
      },
      {
        t: "say",
        q: "Talk about Policy-as-Code and architectural debt using 'From my experience...'",
        starter:
          "From my experience, creating automated checks through Policy-as-Code reduces friction and prevents security debt...",
      },
    ],
  },
  {
    id: "m3",
    min: 25,
    tag: "Roleplay",
    title: "Interview Q&A Roleplay",
    sub: "Practice answering real interview questions",
    why: "Simulating Q&A helps you think on your feet and use the DevSecOps Guardrails mindset.",
    items: [
      {
        t: "note",
        rule: false,
        title: "Question 1",
        body: '"How do you ensure that security does not block the engineering team\'s agility?"\nTip: Mention integration, CI/CD, Policy-as-Code, Golden Paths.',
      },
      {
        t: "ord",
        q: "Monte a frase de resposta:",
        a: "The best approach is to integrate security into the pipeline.",
      },
      {
        t: "ord",
        q: "Monte a frase de resposta:",
        a: "This helps automate compliance checks without stopping the deployment.",
      },
      {
        t: "say",
        q: "Answer Q1 out loud without reading.",
        starter:
          "From my experience, the best approach is to integrate security into the pipeline so compliance checks happen automatically...",
      },
      {
        t: "note",
        rule: false,
        title: "Question 2",
        body: '"Can you tell me about a time you had to design a system for a highly regulated environment, like PIX?"\nTip: Banco BV, strict compliance (BACEN/PCI DSS), reliable/fast, mTLS, HSMs.',
      },
      {
        t: "fill",
        q: "One example is my time at Banco BV, where I was ____ (responsável por) defining the security architecture.",
        a: ["responsible for"],
        ph: "starter",
      },
      {
        t: "fill",
        q: "The biggest challenge is ensuring strict ____ (conformidade) with BACEN.",
        a: ["compliance"],
        ph: "vocabulary word",
      },
      {
        t: "say",
        q: "Answer Q2 out loud without reading.",
        starter:
          "One example is my time at Banco BV, where I was responsible for the technical security architecture of PIX and Open Banking...",
      },
      {
        t: "note",
        rule: false,
        title: "Question 3",
        body: '"How do you handle a developer who wants to skip a security step?"\nTip: Act as a facilitator, talk to stakeholders, use Architecture Decision Records (ADRs).',
      },
      {
        t: "say",
        q: "Answer Q3 out loud without reading.",
        starter:
          "What I enjoy the most is acting as a facilitator rather than a blocker. I sit with the engineer to understand the architecture...",
      },
    ],
  },
  {
    id: "m4b",
    min: 10,
    tag: "Context",
    title: "Explaining PIX to Foreigners",
    sub: "How to explain Brazil's instant payment system clearly and concisely",
    why: "Interviewers in Ireland or Canada will not know what PIX is. You must explain it quickly while emphasizing the massive scale and strict security requirements.",
    items: [
      {
        t: "note",
        rule: false,
        title: "The Core Concept",
        body: "Avoid long historical explanations. Focus on: 1) What it is (Central Bank Instant Payments), 2) The massive scale (billions of dollars, 24/7), and 3) The security challenge (mTLS, HSMs, sub-second latency).",
      },
      {
        t: "read",
        title: "The PIX Pitch",
        paras: [
          "To give you some context, PIX is Brazil's national instant payment ecosystem, built and managed by our Central Bank. It operates 24/7 and processes hundreds of millions of transactions every single day, moving billions of dollars in real-time.",
          "Because it is the backbone of the country's economy, the security requirements are exceptionally high. For example, it requires strict mutual TLS (mTLS) for API communication, Hardware Security Modules (HSMs) for cryptographic keys, and sub-second latency for fraud detection.",
          "My role at Banco BV was to design the security architecture that allowed our bank to connect to this critical national infrastructure securely, without degrading performance or agility.",
        ],
      },
      {
        t: "say",
        q: "Practice explaining PIX out loud. Keep it punchy and focus on technical scale.",
        starter:
          "To give you some context, PIX is Brazil's national instant payment ecosystem, operating 24/7...",
      },
    ],
  },
  {
    id: "m6",
    min: 20,
    tag: "Product",
    title: "TPM & Platform Vision",
    sub: "Vocabulary for Technical Product Management",
    why: "You are expanding your scope from Security Architect to Platform TPM. These terms highlight product lifecycle and adoption.",
    items: [
      {
        t: "note",
        rule: false,
        title: "TPM Vocabulary",
        body: "Platform (Plataforma) / Lifecycle (Ciclo de vida) / Continuous Discovery (Descoberta contínua) / Roadmap (Plano de evolução) / Metrics & KPIs (Métricas e Indicadores)",
      },
      {
        t: "mc",
        q: "Managing the stages of a product from creation to retirement",
        opts: ["Platform", "Lifecycle", "Roadmap"],
        a: 1,
      },
      {
        t: "mc",
        q: "Ongoing process of talking to users to validate ideas",
        opts: ["Continuous Discovery", "Go-To-Market", "Prioritization"],
        a: 0,
      },
      {
        t: "mc",
        q: "A strategic plan that defines a goal or desired outcome",
        opts: ["Roadmap", "Lifecycle", "KPI"],
        a: 0,
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: O ciclo de vida do produto",
        a: ["the product lifecycle", "the product life cycle"],
        ph: "em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: Nós focamos na descoberta contínua",
        a: ["we focus on continuous discovery"],
        ph: "em inglês",
      },
      {
        t: "note",
        rule: false,
        title: "Explaining the Role",
        body: '"I act as a Technical Product Manager for our internal platform."\n"My focus is on driving adoption and defining the product roadmap."',
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "We defined KPIs to measure platform adoption.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "I prioritize the backlog using the RICE framework.",
      },
      {
        t: "say",
        q: "Deliver the TPM Pitch out loud. Emphasize Lifecycle, Discovery and Adoption.",
        starter:
          "Recently, my scope expanded to Technical Product Manager for our Architect Journey platform...",
      },
    ],
  },
  {
    id: "m7",
    min: 25,
    tag: "Interviews",
    title: "Ireland & Canada Interviews",
    sub: "Culture fit and tech questions for international roles",
    why: "These regions highly value emotional intelligence, teamwork (STAR method), and deep System Design skills for senior roles.",
    items: [
      {
        t: "note",
        rule: false,
        title: "Cultural Fit (STAR Method)",
        body: "Empathy and non-violent communication are crucial. Use Situation, Task, Action, Result for your answers. Prefer 'We built' over 'I built' to highlight collaboration.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "Security should enable the business, not block it.",
      },
      {
        t: "ord",
        q: "Monte a frase:",
        a: "I act as a facilitator rather than a blocker.",
      },
      {
        t: "say",
        q: "Tell me about a time you had a conflict with a team member.",
        starter:
          "In a previous project, we had different views on security controls vs delivery dates. I sat with the engineer to...",
      },
      {
        t: "say",
        q: "How do you balance technical debt with delivering new features fast?",
        starter:
          "From my experience, the main goal is to make trade-offs explicit using Architecture Decision Records...",
      },
      {
        t: "note",
        rule: false,
        title: "Cultural Tips for Canada & Ireland",
        body: "Canada: Very polite, indirect communication. Say 'In my experience' instead of 'This is the only way'.\nIreland: Collaborative, values 'craic' (friendly chat). Emphasize team spirit, mentorship and humor.",
      },
    ],
  },
  {
    id: "m8",
    min: 15,
    tag: "Meetings",
    title: "Daily & Weekly Meetings",
    sub: "Key sentence starters for your day-to-day syncs",
    why: "Clear communication in Dailies and Weeklies shows confidence and keeps the team aligned without wasting time.",
    items: [
      {
        t: "note",
        rule: false,
        title: "Daily Standup Starters",
        body: "Yesterday: 'Yesterday, I worked on...' / 'I managed to finish...'\nToday: 'Today, I plan to focus on...' / 'I will be looking into...'\nBlockers: 'I am currently blocked by...' / 'I need some help with...'",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: Ontem eu trabalhei na arquitetura.",
        a: [
          "yesterday i worked on the architecture",
          "yesterday i worked on architecture",
        ],
        ph: "em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza: Hoje eu planejo focar na...",
        a: ["today i plan to focus on the", "today i will focus on the"],
        ph: "em inglês",
      },
      {
        t: "ord",
        q: "Monte a frase (Estamos no caminho certo para entregar):",
        a: "We are on track to deliver the feature.",
      },
      {
        t: "ord",
        q: "Monte a frase (Tivemos um problema inesperado):",
        a: "We had an unexpected issue with the deployment.",
      },
      {
        t: "say",
        q: "Give a quick Daily update using the starters.",
        starter:
          "Yesterday, I worked on the security review. Today, I plan to focus on the ADR. I have no blockers.",
      },
    ],
  },
  {
    id: "m9",
    min: 25,
    tag: "Pitch Homework",
    title: "About Me: Spoken Pitches & Starters",
    sub: "Master the 3 humanized pitches and required sentence starters",
    why: "'Tell me about yourself' is your opening impression. You must sound natural, conversational, and hit all key homework phrases effortlessly.",
    items: [
      {
        t: "note",
        rule: false,
        title: "Mandatory Sentence Starters & Spoken Keywords",
        body: "A big part of my role is... / I have strong skills and experience in... / I know how to... / One of my strongest assets is... / I've learned how to... / What sets me apart is...\nKeywords: building / securing / protecting assets / enforce / always ready / willingness to learn.",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza o starter: Uma grande parte do meu papel é...",
        a: ["a big part of my role is"],
        ph: "starter em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza o starter: Tenho sólidas habilidades e experiência em...",
        a: ["i have strong skills and experience in"],
        ph: "starter em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza o starter: Um dos meus maiores diferenciais é...",
        a: ["one of my strongest assets is"],
        ph: "starter em inglês",
      },
      {
        t: "fill",
        ptq: true,
        q: "Traduza o starter: O que me diferencia é...",
        a: ["what sets me apart is"],
        ph: "starter em inglês",
      },
      {
        t: "mc",
        q: '"A big part of my role is ____ solid architectures and ____ vital assets."',
        opts: [
          "building / protecting",
          "deleting / auditing",
          "ignoring / maintaining",
        ],
        a: 0,
      },
      {
        t: "mc",
        q: '"I am ____ to jump into complex challenges and lead teams through change."',
        opts: ["always ready", "rarely prepared", "sometimes willing"],
        a: 0,
      },
      {
        t: "mc",
        q: '"What sets me apart is my hands-on background and my continuous ____ to learn."',
        opts: ["reluctance", "hesitation", "willingness"],
        a: 2,
      },
      {
        t: "ord",
        q: "Monte a frase (A big part of my role...):",
        a: "A big part of my role is building solid enterprise architectures.",
      },
      {
        t: "ord",
        q: "Monte a frase (One of my strongest assets...):",
        a: "One of my strongest assets is taking full ownership from start to finish.",
      },
      {
        t: "say",
        q: "Deliver your Executive Pitch out loud.",
        starter:
          "Throughout my 22-year career, a big part of my role is building solid enterprise architectures and protecting vital company assets...",
      },
    ],
  },
  {
    id: "m10",
    min: 20,
    tag: "Homework Q&A",
    title: "Homework: Modular Q&A & Core Strengths",
    sub: "Practice rapid modular answers (Q1-Q4) and your 6 core strengths",
    why: "Interviewers will drill down on specific questions about strengths, working style, and AI. Having crisp, human answers ready gives you huge confidence.",
    items: [
      {
        t: "note",
        rule: false,
        title: "The 4 Target Interview Questions",
        body: "Q1: Biggest strengths & working style (Ownership & consensus)\nQ2: Why you are a strong candidate (Cloud security & regulatory translation)\nQ3: Approach to AI & innovation (Practical problem solving & copilots)\nQ4: What sets you apart (Architect + hands-on builder)",
      },
      {
        t: "mc",
        q: "When asked about your working style (Q1), what is your main highlight?",
        opts: [
          "Taking full ownership from start to finish and building consensus with engineers",
          "Working strictly in isolation without talking to developers",
          "Rejecting all deployments that have minor warnings",
        ],
        a: 0,
      },
      {
        t: "mc",
        q: "When asked about regulations like BACEN, PCI, or ISO (Q2), what is your approach?",
        opts: [
          "Turning complex regulations into clear, practical engineering steps",
          "Sending 200-page PDF policy documents to developers",
          "Telling management that regulations are too hard to comply with",
        ],
        a: 0,
      },
      {
        t: "mc",
        q: "How do you describe your approach to AI in interviews (Q3)?",
        opts: [
          "Using AI as an operational force multiplier to solve real problems and automate governance",
          "Treating AI only as marketing buzzwords without real implementation",
          "Avoiding AI entirely due to risk",
        ],
        a: 0,
      },
      {
        t: "ord",
        q: "Monte a frase (Q1 - Building trust):",
        a: "I am good at building trust with engineering teams.",
      },
      {
        t: "ord",
        q: "Monte a frase (Q2 - Protecting sensitive assets):",
        a: "I have strong skills and experience in protecting sensitive enterprise assets.",
      },
      {
        t: "ord",
        q: "Monte a frase (David's Core Strengths):",
        a: "One of my strengths is solving complex problems and working with different teams.",
      },
      {
        t: "say",
        q: "Q1: What are your biggest strengths and your working style? Answer in 30 seconds.",
        starter:
          "One of my strongest assets is taking full ownership from start to finish. I am good at building trust with engineering teams...",
      },
      {
        t: "say",
        q: "⚡ Elevator Pitch (30–45s): Fale sua introdução em voz alta com confiança.",
        starter:
          "My name is David. I’m an Information Security Architect, and I have more than 22 years of experience in technology and cybersecurity. I have worked mainly in highly regulated industries, such as finance, healthcare, pharmaceuticals, and retail. In my current role, I work with security architecture, data protection, and AI security. I also work with AI Agents and Policy-as-Code to improve security governance. One of my strengths is solving complex problems and working with different teams. I also enjoy learning new technologies and finding practical solutions. Now, I’m looking for an opportunity where I can use my experience, continue learning, and contribute to the business. That’s a little about me.",
      },
    ],
  },
];

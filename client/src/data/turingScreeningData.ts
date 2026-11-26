// Turing — AI Screening Interview (primeira entrevista, ~20 min, conduzida por IA,
// gravada e revisada por um recrutador humano).
// Marcas de respiração: "/" = pausa curta · "//" = respiração completa (inspire pelo nariz).

export type ScreeningAnswer = {
  id: string;
  question: string;
  /** Resposta com marcas de respiração ("/" e "//"). O texto corrido é derivado. */
  breathing: string;
  keywords?: string[];
  /** Alertas do coach (consistência com o CV, pronúncia etc.). */
  notes?: string[];
  /** Por que esta história serve para esta entrevista. */
  why?: string;
  /** false = versão alternativa, fora da conta do plano de tempo. */
  core?: boolean;
  /** De onde veio o texto. */
  source:
    | "seu documento"
    | "baseado no seu CV"
    | "rascunho — complete com um caso real"
    | "já está no Pitch Studio (Roleplay)";
};

export type ExtraScenario = {
  title: string;
  why: string;
  where: string;
};

export type ScreeningStep = {
  n: number;
  title: string;
  titlePt: string;
  minutes: number;
  goal: string;
  tips: string[];
  answers: ScreeningAnswer[];
  /** Histórias que já existem no Pitch Studio (Roleplay), puxadas pelo id. */
  fromStudio?: { id: string; why: string }[];
  extras?: ExtraScenario[];
};

/** Tempo médio da IA fazer cada pergunta + sua transição. */
export const QUESTION_BUFFER_SEC = 20;

export const SPEAKING_WPM = 115; // ritmo calmo, inglês B1, falando "um pouco mais devagar que o natural"

export const preInterviewChecklist = [
  "Computador desktop/notebook (não celular), navegador normal (sem aba anônima)",
  "Câmera, microfone e compartilhamento de TELA INTEIRA testados antes",
  "Extensões desligadas (Grammarly, assistentes de código)",
  "Internet estável, celular no silencioso, porta fechada",
  "Água por perto; postura ereta; olhar para a câmera, não para o texto",
  "Não leia o roteiro na tela: a tela está sendo gravada. Use só as palavras-chave de memória",
  "Antes de clicar em começar: 3 ciclos da respiração quadrada (abaixo)",
];

export const generalTips = [
  "É uma IA: ela não interrompe. Termine cada resposta com uma frase de fechamento clara para ela saber que você acabou.",
  "Se não entender a pergunta: 'Could you repeat the question, please?' — é melhor que responder outra coisa.",
  "Respostas de 60–90 s. Se passar de 2 min, feche: 'So, in short, …'.",
  "Um humano da Turing vai assistir depois: sorria no começo e no fim.",
  "Fale de fatos que estão no seu CV. A IA e o recrutador comparam.",
];

export const screeningSteps: ScreeningStep[] = [
  {
    n: 1,
    title: "Introduction",
    titlePt: "Apresentação",
    minutes: 2,
    goal: "Uma resposta só. A etapa tem 2:00 e a IA gasta ~20 s perguntando, então a fala precisa caber em ~1:40. Use a versão de 1:40; a completa (2:03) estoura a etapa.",
    tips: [
      "Comece devagar: a primeira frase define o ritmo da entrevista toda.",
      "Feche com a frase da vaga ('spotting what's missing…') e pare. Silêncio é ok.",
    ],
    answers: [
      {
        id: "tmay-short",
        question: "Tell me about yourself. (versão que cabe em 2:00)",
        source: "seu documento",
        breathing:
          "I'm David. // I have more than 22 years of experience / in technology and cybersecurity. // Mostly in regulated environments / like banking, / healthcare / and pharmaceuticals. // One example is my time at Banco BV. // There, I designed security for critical financial services, / like PIX and Open Banking. // Before that, at Atento, / I ran ISO 27001 and PCI DSS audits. // So I have a strong foundation / in how real systems fail. // From broken access control / to weak integrations. // Today, at Aché, / I'm a security architect, / and I use AI every day. // I built an LLM-assisted threat modeling tool. // One thing I learned / is that models can be confidently wrong. // They don't just miss things. / Sometimes, / they make things up. // So I always validate their outputs / with a second model / and a human expert. // That's why this role excites me. // I want to help AI models understand security / the way real practitioners do: // spotting what's missing, / what's wrong, / and what's dangerous.",
        notes: [
          "Igual à sua versão, com três cortes: tirei 'under Basel and NIST requirements' (Basel não está no CV), juntei as frases da Aché, e saíram 'I have worked across security architecture, identity and access management, and compliance' e 'and I create AI skills to help architects… from requirements to design reviews'. Se a IA perguntar o que você faz na Aché, use a frase das AI skills lá.",
        ],
      },
      {
        id: "tmay",
        core: false,
        question: "Tell me about yourself. (versão completa — 2:03, estoura a etapa)",
        source: "seu documento",
        breathing:
          "I'm David. // I have more than 22 years of experience / in technology and cybersecurity. // Mostly in regulated environments / like banking, / healthcare / and pharmaceuticals. // I have worked across security architecture, / identity and access management, / and compliance. // One example is my time at Banco BV. // There, I designed security for critical financial services, / like PIX and Open Banking, / under Basel and NIST requirements. // Before that, at Atento, / I ran ISO 27001 and PCI DSS audits. // So I have a strong foundation / in how real systems fail. // From broken access control / to weak integrations. // In my current role at Aché, / I work as a security architect. // I use AI every day in my work. // I built an LLM-assisted threat modeling tool, / and I create AI skills to help architects / in their daily work, / from requirements to design reviews. // One thing I learned / is that models can be confidently wrong. // They don't just miss things. / Sometimes, / they make things up. // So I always validate their outputs / with a second model / and a human expert. // That's why this role excites me. // I want to help AI models understand security / the way real practitioners do: // spotting what's missing, / what's wrong, / and what's dangerous.",
        keywords: [
          "22 years · banking, healthcare, pharma",
          "Banco BV: PIX, Open Banking · Atento: ISO 27001, PCI DSS",
          "How real systems fail (fêil)",
          "Aché: architect + AI every day · threat modeling tool",
          "Confidently wrong → second model + human (RRiú-man) expert",
          "This role excites (ek-SAI-ts) me · spotting (SPÓ-ting) what's missing",
        ],
        notes: [
          "Pronúncia: \"I'm David\" (não \"I am a David\") · \"how real systems fail\" (não \"felt\") · \"identity and access management\" (sem \"the\") · \"with a human expert\" (não \"woman\").",
          "Consistência com o CV: \"Basel\" não aparece no CV. No BV o CV fala em BACEN, CMN, NIST CSF e CIS. Considere \"under Central Bank and NIST requirements\".",
          "O CV diz 22+ anos — bate. A ferramenta de threat modeling com LLM não está no CV: esteja pronto para detalhar se a IA perguntar.",
        ],
      },
    ],
  },
  {
    n: 2,
    title: "Education",
    titlePt: "Formação",
    minutes: 6,
    goal: "6 minutos é bastante para formação: a IA vai aprofundar. Resposta principal + 3 follow-ups curtos + 2 histórias de aprendizado que você já tem no Pitch Studio.",
    tips: [
      "Seja direto sobre não ter certificação de segurança — honestidade aqui pesa a favor.",
      "Conecte estudo com prática: o que você aprendeu e usa hoje.",
    ],
    answers: [
      {
        id: "education",
        question: "Tell me about your education.",
        source: "seu documento",
        breathing:
          "I have a degree in Data Processing, / today called Systems Analysis and Development. // Then I did an MBA / in Information Security Management. // I don't have a security certification yet, / but I have several courses, / mostly in Google Cloud security. // And I'm studying for the CISSP, / and I plan to get it next year.",
        keywords: [
          "Data Processing → Systems Analysis and Development",
          "MBA in Information Security Management (2013)",
          "No certification yet · Google Cloud courses",
          "CISSP (si-ai-és-és-pí) → next year",
        ],
        notes: [
          "Consistência com o CV: o CV em inglês está com o título \"Google Cloud Certifications / Courses\". Como você vai dizer que não tem certificação, troque o título no CV para \"Google Cloud Courses\".",
        ],
      },
      {
        id: "edu-courses",
        question: "Which courses did you take?",
        source: "baseado no seu CV",
        breathing:
          "My main courses were on Google Cloud. // Managing Security in Google Cloud Platform, / Architecting with Google Kubernetes Engine, / and API Security on Apigee, / Google's API platform. // I also did the Google Cloud Fundamentals course. // They helped me a lot / in cloud and API security projects.",
        keywords: ["Managing Security in GCP", "GKE (Kubernetes)", "Apigee API Security", "GCP Fundamentals"],
      },
      {
        id: "edu-updated",
        question: "How do you keep your knowledge up to date?",
        source: "baseado no seu CV",
        breathing:
          "Mostly by practice. // Today I work with Python / and I build tools with LLMs, / so I learn by doing. // I'm studying for the CISSP, / which gives me a broad and structured view. // And I follow frameworks like OWASP / and MITRE ATT&CK, / because they change as the threats change.",
        keywords: ["Practice: Python + LLM tools", "CISSP study", "OWASP · MITRE ATT&CK"],
      },
      {
        id: "edu-mba-use",
        question: "How did your MBA help your career?",
        source: "rascunho — complete com um caso real",
        breathing:
          "The MBA gave me the management side of security. // Risk, / governance, / and frameworks like ISO 27001. // I used that directly at Atento, / where I ran ISO 27001 and PCI DSS audits. // [complete: uma coisa concreta que o MBA mudou na sua forma de trabalhar]",
        keywords: ["Risk · governance · ISO 27001", "Applied at Atento (audits)"],
        notes: ["Complete a última frase com algo verdadeiro antes de treinar."],
      },
    ],
    fromStudio: [
      { id: "about-why-cyber", why: "Por que segurança: começou por curiosidade e responsabilidade. Bom quando a IA pergunta como a formação levou você à área." },
      { id: "exp-self-learned", why: "Aprendizado por conta própria (GenAI): mostra como você continua aprendendo além da formação formal." },
    ],
  },
  {
    n: 3,
    title: "Work Background",
    titlePt: "Experiência",
    minutes: 8,
    goal: "As duas histórias que você já contou no processo (IDOR e o threat model com LLM) + duas curtas: a prática de pentest e a seleção de ferramentas. Somadas com as perguntas da IA, fecham em ~7:00 de 8:00, com ~1 min de folga para follow-ups.",
    tips: [
      "Cada história: contexto (1 frase) → o que VOCÊ fez → resultado → correção/lição. 60–90 s.",
      "Use 'I', não 'we', quando foi você.",
      "Se pedirem 'a specific instance', dê detalhes técnicos simples: o pedido, o parâmetro, a resposta.",
    ],
    answers: [
      {
        id: "idor",
        question:
          "Pick one vulnerability class and describe a specific instance you found or exploited yourself. What did your approach do, and why would the fix stop it?",
        source: "seu documento",
        breathing:
          "I'll talk about IDOR, / because I really found one / in a banking system. // It was an application to look up customer data. // The API took the record ID directly from the request. // I noticed it when I was analyzing the API calls. // So I did the simplest test possible. // I logged in as one user / and changed the ID to another user's ID. // And the system returned the data of that other customer, / personal and financial information. // The IDs were predictable, / so a simple script could get the whole database. // The fix was an ownership check in the backend. // For every request, / the system checks if the record belongs to the logged-in user. // If not, / the API returns a 404, / so it doesn't even confirm the record exists. // I also recommended putting this check in one place, / in the authorization layer, / and not in each endpoint separately. // And I suggested automated tests / to make sure one user can't see another user's data.",
        keywords: [
          "Bank · customer lookup API · ID from request",
          "Noticed (NOU-tist) → changed ID → other customer's data",
          "Predictable IDs → script → whole database",
          "Fix: ownership check · 404",
          "Authorization layer · automated (Ó-to-mei-tid) tests",
        ],
        notes: [
          "Prepare o follow-up provável: 'Which OWASP category is this?' → A01:2021 Broken Access Control (CWE-639).",
        ],
      },
      {
        id: "llm-wrong",
        question:
          "Tell me about an answer an LLM gave you on a security or coding question that was wrong or incomplete. How did you find out, and what was the correct answer?",
        source: "seu documento",
        breathing:
          "So, / I'm building a threat modeling tool with AI. // I used it to analyze a real case at work: / a solution that blocks internet access / for employees who didn't complete the mandatory training. // The threat model was well structured in general. / Most of the risks made sense. // But one of them was not real. // The model said that blocking internet access for these employees / could be moral harassment, / under Brazilian labor law. // What bothered me / was the confidence. // It presented this risk / with the same confidence as the valid ones. // Someone who doesn't know Brazilian labor law / could easily believe it. // And in practice, / this kind of mistake can confuse an architecture discussion / or stop a good decision. // I found out because I know this context. // Moral harassment is about repeated, abusive behavior / to humiliate a person. // This is not the case here. // Blocking internet access until the training is done / is a normal security control. // It's the same rule for everyone, / and the company has the right to enforce its policies. // So the claim was unfounded. // The correct answer is: / this control is fine, / if the policy is clear / and the employees know about it. // After this, / I always validate legal points with a second model / and with a human expert.",
        keywords: [
          "My threat modeling tool (tuul) · block internet / training",
          "Moral harassment (ha-RÉS-ment) · same confidence",
          "I know the context · repeated, abusive",
          "Normal security (se-KIÚ-ri-ti) control · unfounded (an-FÁUN-did)",
          "Correct: clear policy · second model + human (RRiú-man) expert",
        ],
      },
      {
        id: "pentest-lsitec",
        question: "What hands-on security testing have you done? Which tools?",
        source: "baseado no seu CV",
        breathing:
          "My most hands-on period was at LSITEC, / a lab linked to the University of São Paulo, / from 2011 to 2014. // I did penetration tests / on web, / mobile / and desktop applications, / and on wired and wireless networks. // I used Nmap for discovery, / Nessus for vulnerability scanning, / Burp Suite to intercept web requests, / Metasploit to validate vulnerabilities, / and Wireshark to analyze traffic. // I classified the findings by CVE and CVSS, / and I wrote recommendations for the developers. // Today, / my hands-on work is with Python / and LLMs.",
        keywords: ["LSITEC 2011–2014", "Web · mobile · desktop · networks", "Nmap · Nessus · Burp · Metasploit · Wireshark", "CVE / CVSS · recommendations", "Today: Python + LLMs"],
      },
    ],
    fromStudio: [
      { id: "exp-tech-evaluation", why: "Seleção de ferramentas (SIEM/SOAR no Boticário): matriz de critérios, demos e riscos. Mostra método baseado em evidência, o mesmo raciocínio de avaliar uma resposta de IA." },
    ],
    extras: [
      {
        title: "Se a IA aprofundar o IDOR",
        why: "'Which OWASP category / CWE?' → A01:2021 Broken Access Control, CWE-639. 'How would you classify severity?' → CVSS, depende do dado exposto e se exige login.",
        where: "Roleplay → AI Lab Security Analyst → 'Authentication & Access Flaws' e 'CVE, CWE and CVSS'",
      },
      {
        title: "Se a IA aprofundar a seleção de ferramentas",
        why: "Você mapeou a cobertura das soluções no MITRE ATT&CK. Diga 'selection', não 'operation'.",
        where: "Roleplay → AI Lab Security Analyst → 'Map Behavior to MITRE ATT&CK'",
      },
    ],
  },
  {
    n: 4,
    title: "Role Fit",
    titlePt: "Encaixe na vaga",
    minutes: 3,
    goal: "Por que você, por que esta vaga, e se você cumpre o formato. Respostas curtas (45–60 s).",
    tips: [
      "Energia aqui: é o momento de mostrar vontade.",
      "Se vier a pergunta de disponibilidade, seja honesto e pergunte o modelo (horas, fuso, contrato).",
    ],
    answers: [
      {
        id: "why-us",
        question: "Why do you want to work with us?",
        source: "seu documento",
        breathing:
          "I want to work with you / because this role combines my two passions: // security and AI. // I have spent many years / protecting real systems, / and now I use AI every day. // I know where models fail in security, / and I want to help make them better. // Working on a global team / is also a great opportunity for me / to grow / and to share my experience.",
        keywords: ["Combines (kom-BAINZ) security and AI", "Real systems → now (náu) AI every day", "Where models fail (fêil) → make them better", "Global team: grow + share"],
      },
      {
        id: "seniority",
        question: "You have a lot of experience. Why this role?",
        source: "baseado no seu CV",
        breathing:
          "Because the work itself is what interests me most right now: / how AI models handle security. // My experience helps me find the errors fast: / a wrong CVE, / a bad severity, / an unsafe answer. // And I'm comfortable with the process: / following guidelines, / asking a senior when a case is unclear, / and applying feedback.",
        keywords: ["The work itself", "Fast at finding errors", "Guidelines · escalate · feedback"],
      },
      {
        id: "availability",
        question: "What is your availability?",
        source: "baseado no seu CV",
        breathing:
          "I'm currently employed full-time / as a security architect. // Could you tell me how the role works in practice? // Is it a weekly hours commitment, / or fixed hours in a time zone? // With that, / I can tell you exactly how many hours I can commit.",
        keywords: ["Honest: currently employed", "Ask: hours · time zone · contract"],
        notes: ["A maioria das vagas da Turing é ~40 h/semana e as horas são registradas e aprovadas. Não prometa o que não consegue cumprir."],
      },
    ],
  },
  {
    n: 5,
    title: "Closing",
    titlePt: "Encerramento",
    minutes: 2,
    goal: "Fechar com calma e gratidão. A IA pode não responder perguntas — faça no máximo uma, curta.",
    tips: ["Sorria e olhe para a câmera na última frase.", "Não acrescente informação nova no fechamento."],
    answers: [
      {
        id: "anything-else",
        question: "Is there anything else you'd like to add? / Do you have any questions?",
        source: "baseado no seu CV",
        breathing:
          "Yes, / just one thing. // I really enjoy finding where an answer is wrong / and explaining why, / in a clear way. // I think that's exactly what this role needs. // One question: / what does a typical task look like in the first weeks? // Thank you very much for your time. / I look forward to the next steps.",
        keywords: ["Finding what's wrong + explaining why", "Typical task in the first weeks?", "Thank you · next steps"],
      },
    ],
  },
];

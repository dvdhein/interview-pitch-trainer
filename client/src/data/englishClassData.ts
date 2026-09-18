// English Class · September 17, 2026 — "What I did today" + clauses with when / and.
// Verbs wrapped in **double asterisks** are highlighted in the UI and stripped before speech.

export type Tense = "past" | "present" | "future";

export type TenseText = Record<Tense, string>;

export type ClassSentence = {
  id: string;
  topic: string;
  pt: string;
  text: TenseText;
  note?: string;
};

export type ClassClause = {
  id: string;
  parts: [string, string, string];
  text: TenseText;
  note?: string;
};

export type VerbForm = {
  base: string;
  third: string;
  past: string;
  pastSound: string;
};

export type VerbGroup = {
  id: string;
  label: string;
  hint: string;
  verbs: VerbForm[];
};

export type VocabWord = {
  word: string;
  ipa: string;
  say: string;
  pt?: string;
};

export type VocabGroup = {
  id: string;
  label: string;
  words: VocabWord[];
};

export type ClassExercise = {
  id: string;
  kind: "transform" | "fix" | "fill";
  prompt: string;
  hint: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const classMeta = {
  student: "David Hein",
  date: "September 17, 2026",
  task: "10 sentences about what I did today at work → combine 3 phrases into one clause using when and and",
};

export const tenseInfo: Record<
  Tense,
  { label: string; pt: string; when: string; structure: string; example: string; timeWords: string }
> = {
  past: {
    label: "Past",
    pt: "Passado",
    when: "Algo que já aconteceu (hoje, ontem).",
    structure: "verbo no passado",
    example: "I finished the report.",
    timeWords: "today · yesterday · this morning · last week",
  },
  present: {
    label: "Present",
    pt: "Presente",
    when: "Rotina, algo que você sempre faz.",
    structure: "verbo na forma base (+s com he/she/it)",
    example: "I finish the report every week.",
    timeWords: "every day · every week · usually · always",
  },
  future: {
    label: "Future",
    pt: "Futuro",
    when: "Algo que você vai fazer.",
    structure: "will + verbo na forma base",
    example: "I will finish the report tomorrow.",
    timeWords: "tomorrow · next week · later · soon",
  },
};

export const classSentences: ClassSentence[] = [
  {
    id: "s1",
    topic: "Decision record",
    pt: "Terminei o registro de decisão arquitetural do projeto de reconciliação de acesso.",
    text: {
      past: "I **finished** the architecture decision record for the access reconciliation project.",
      present: "I **finish** the architecture decision record for the access reconciliation project.",
      future: "I **will finish** the architecture decision record for the access reconciliation project.",
    },
  },
  {
    id: "s2",
    topic: "Risk assessment",
    pt: "Escrevi uma avaliação de risco e vinculei à decisão principal.",
    text: {
      past: "I **wrote** a risk assessment and **linked** it to the main decision.",
      present: "I **write** a risk assessment and **link** it to the main decision.",
      future: "I **will write** a risk assessment and **link** it to the main decision.",
    },
  },
  {
    id: "s3",
    topic: "Diagrams",
    pt: "Desenhei dois diagramas que mostram o contexto do sistema e seus containers.",
    text: {
      past: "I **drew** two diagrams that show the system context and its containers.",
      present: "I **draw** two diagrams that show the system context and its containers.",
      future: "I **will draw** two diagrams that show the system context and its containers.",
    },
    note: "“that show” não muda: é uma descrição do diagrama (ele sempre mostra isso).",
  },
  {
    id: "s4",
    topic: "Threats",
    pt: "Mapeei as ameaças de segurança usando o modelo STRIDE.",
    text: {
      past: "I **mapped** the security threats using the STRIDE model.",
      present: "I **map** the security threats using the STRIDE model.",
      future: "I **will map** the security threats using the STRIDE model.",
    },
  },
  {
    id: "s5",
    topic: "Security requirements",
    pt: "Transformei essas ameaças numa lista de requisitos de segurança.",
    text: {
      past: "I **turned** those threats into a list of security requirements.",
      present: "I **turn** those threats into a list of security requirements.",
      future: "I **will turn** those threats into a list of security requirements.",
    },
  },
  {
    id: "s6",
    topic: "Lucas's questions",
    pt: "Respondi algumas perguntas do Lucas sobre rastreabilidade.",
    text: {
      past: "I **answered** some questions from Lucas about traceability.",
      present: "I **answer** some questions from Lucas about traceability.",
      future: "I **will answer** some questions from Lucas about traceability.",
    },
  },
  {
    id: "s7",
    topic: "LeanIX",
    pt: "Preenchi o score de entrega do projeto no LeanIX.",
    text: {
      past: "I **filled in** the delivery score for the project in LeanIX.",
      present: "I **fill in** the delivery score for the project in LeanIX.",
      future: "I **will fill in** the delivery score for the project in LeanIX.",
    },
  },
  {
    id: "s8",
    topic: "Python script",
    pt: "Criei um pequeno script em Python que gera PDFs a partir dos meus documentos.",
    text: {
      past: "I **built** a small Python script that creates PDF files from my documents.",
      present: "I **build** a small Python script that creates PDF files from my documents.",
      future: "I **will build** a small Python script that creates PDF files from my documents.",
    },
    note: "“creates” fica com -s nos 3 tempos, porque o sujeito é “the script” (it).",
  },
  {
    id: "s9",
    topic: "Security review",
    pt: "Mandei os documentos para o time de segurança revisar.",
    text: {
      past: "I **sent** the documents to the security team for review.",
      present: "I **send** the documents to the security team for review.",
      future: "I **will send** the documents to the security team for review.",
    },
  },
  {
    id: "s10",
    topic: "Weekly tasks",
    pt: "Organizei todas as tarefas da semana antes do fim do dia.",
    text: {
      past: "I **organized** all my weekly tasks before the end of the day.",
      present: "I **organize** all my weekly tasks before the end of the day.",
      future: "I **will organize** all my weekly tasks before the end of the day.",
    },
  },
];

export const classClauses: ClassClause[] = [
  {
    id: "c1",
    parts: ["I finished the decision record.", "I wrote the risk assessment.", "I linked them together."],
    text: {
      past: "When I **finished** the decision record, I **wrote** the risk assessment and **linked** them together.",
      present: "When I **finish** the decision record, I **write** the risk assessment and **link** them together.",
      future: "When I **finish** the decision record, I **will write** the risk assessment and **link** them together.",
    },
  },
  {
    id: "c2",
    parts: ["I drew the diagrams.", "I found the trust boundaries.", "I mapped the threats."],
    text: {
      past: "When I **drew** the diagrams, I **found** the trust boundaries and **mapped** the threats.",
      present: "When I **draw** the diagrams, I **find** the trust boundaries and **map** the threats.",
      future: "When I **draw** the diagrams, I **will find** the trust boundaries and **map** the threats.",
    },
  },
  {
    id: "c3",
    parts: ["I mapped the threats.", "I listed the risks.", "I wrote the security requirements."],
    text: {
      past: "When I **mapped** the threats, I **listed** the risks and **wrote** the security requirements.",
      present: "When I **map** the threats, I **list** the risks and **write** the security requirements.",
      future: "When I **map** the threats, I **will list** the risks and **write** the security requirements.",
    },
  },
  {
    id: "c4",
    parts: ["Lucas sent me questions.", "I read them carefully.", "I answered each one."],
    text: {
      past: "When Lucas **sent** me his questions, I **read** them carefully and **answered** each one.",
      present: "When Lucas **sends** me his questions, I **read** them carefully and **answer** each one.",
      future: "When Lucas **sends** me his questions, I **will read** them carefully and **answer** each one.",
    },
    note: "Lucas = he → no presente é “sends” (com -s). “read” no passado se escreve igual, mas se fala /red/; no presente, /riːd/.",
  },
  {
    id: "c5",
    parts: ["The documents were ready.", "I created the PDFs.", "I sent them for review."],
    text: {
      past: "When the documents **were** ready, I **created** the PDFs and **sent** them for review.",
      present: "When the documents **are** ready, I **create** the PDFs and **send** them for review.",
      future: "When the documents **are** ready, I **will create** the PDFs and **send** them for review.",
    },
    note: "“were” (passado) → “are” (presente). No futuro também fica “are”, por causa do when.",
  },
  {
    id: "c6",
    parts: ["The day ended.", "I reviewed my week.", "I organized my tasks."],
    text: {
      past: "When the day **ended**, I **reviewed** my week and **organized** my tasks.",
      present: "When the day **ends**, I **review** my week and **organize** my tasks.",
      future: "When the day **ends**, I **will review** my week and **organize** my tasks.",
    },
    note: "the day = it → no presente é “ends” (com -s).",
  },
  {
    id: "c7",
    parts: ["I opened the LeanIX survey.", "I answered the questions.", "I saved the delivery score."],
    text: {
      past: "When I **opened** the LeanIX survey, I **answered** the questions and **saved** the delivery score.",
      present: "When I **open** the LeanIX survey, I **answer** the questions and **save** the delivery score.",
      future: "When I **open** the LeanIX survey, I **will answer** the questions and **save** the delivery score.",
    },
  },
  {
    id: "c8",
    parts: ["I opened the project sketch.", "I added the Quick Checks.", "I updated the links."],
    text: {
      past: "When I **opened** the project sketch, I **added** the Quick Checks and **updated** the links.",
      present: "When I **open** the project sketch, I **add** the Quick Checks and **update** the links.",
      future: "When I **open** the project sketch, I **will add** the Quick Checks and **update** the links.",
    },
  },
  {
    id: "c9",
    parts: ["I read the vendor emails.", "I took notes.", "I added them to the project folder."],
    text: {
      past: "When I **read** the vendor emails, I **took** notes and **added** them to the project folder.",
      present: "When I **read** the vendor emails, I **take** notes and **add** them to the project folder.",
      future: "When I **read** the vendor emails, I **will take** notes and **add** them to the project folder.",
    },
  },
  {
    id: "c10",
    parts: ["I finished the documents.", "I committed my changes.", "I pushed them to the repository."],
    text: {
      past: "When I **finished** the documents, I **committed** my changes and **pushed** them to the repository.",
      present: "When I **finish** the documents, I **commit** my changes and **push** them to the repository.",
      future: "When I **finish** the documents, I **will commit** my changes and **push** them to the repository.",
    },
  },
];

export const clauseRule: { tense: Tense; whenPart: string; mainPart: string }[] = [
  { tense: "past", whenPart: "passado → When I finished…", mainPart: "passado → I wrote…" },
  { tense: "present", whenPart: "presente → When I finish…", mainPart: "presente → I write…" },
  { tense: "future", whenPart: "PRESENTE → When I finish…", mainPart: "WILL → I will write…" },
];

export const grammarRules = [
  {
    title: "Nunca use will depois de when",
    wrong: "When I will finish the report, I will send it.",
    right: "When I finish the report, I will send it to my manager.",
    tip: "No futuro, o will aparece só uma vez, na parte principal. Depois do and não precisa repetir.",
  },
  {
    title: "Não misture os tempos no passado",
    wrong: "When I finish the report, I sent it…",
    right: "When I finished the report, I sent it to my manager.",
    tip: "Se a ação já aconteceu, os dois lados ficam no passado simples.",
  },
  {
    title: "Vírgula só quando o when vem primeiro",
    wrong: "I organized my tasks, when the day ended.",
    right: "When the day ended, I organized my tasks. / I organized my tasks when the day ended.",
    tip: "Na fala, a vírgula vira uma pausa curta.",
  },
  {
    title: "O and não repete o sujeito",
    wrong: "I created the PDFs and I sent them for review. (correto, mas pesado)",
    right: "I created the PDFs and sent them for review.",
    tip: "Mesmo sujeito dos dois lados → fale uma vez só.",
  },
  {
    title: "Presente com he / she / it ganha -s",
    wrong: "Lucas send me questions every week.",
    right: "Lucas sends me questions every week.",
    tip: "I send → Lucas sends · I end → the day ends · I create → the script creates",
  },
];

export const verbGroups: VerbGroup[] = [
  {
    id: "irregular",
    label: "Irregulares (decore)",
    hint: "Não seguem a regra do -ed.",
    verbs: [
      { base: "write", third: "writes", past: "wrote", pastSound: "rôut" },
      { base: "draw", third: "draws", past: "drew", pastSound: "drú" },
      { base: "build", third: "builds", past: "built", pastSound: "bílt" },
      { base: "send", third: "sends", past: "sent", pastSound: "sént" },
      { base: "find", third: "finds", past: "found", pastSound: "fáund" },
      { base: "take", third: "takes", past: "took", pastSound: "túk" },
      { base: "read", third: "reads", past: "read", pastSound: "réd (presente: ríd)" },
      { base: "be (are)", third: "is", past: "were / was", pastSound: "uâr / uâz" },
    ],
  },
  {
    id: "ed-t",
    label: "-ed soa como T",
    hint: "Depois de som de k, p, s, sh, ch.",
    verbs: [
      { base: "finish", third: "finishes", past: "finished", pastSound: "FÍ-nicht" },
      { base: "link", third: "links", past: "linked", pastSound: "línkt" },
      { base: "map", third: "maps", past: "mapped", pastSound: "mépt" },
      { base: "push", third: "pushes", past: "pushed", pastSound: "púcht" },
    ],
  },
  {
    id: "ed-d",
    label: "-ed soa como D",
    hint: "Depois de som vozeado: n, l, r, z, v, vogal.",
    verbs: [
      { base: "turn", third: "turns", past: "turned", pastSound: "târnd" },
      { base: "answer", third: "answers", past: "answered", pastSound: "ÉN-sârd" },
      { base: "fill (in)", third: "fills (in)", past: "filled (in)", pastSound: "fíld" },
      { base: "organize", third: "organizes", past: "organized", pastSound: "ÓR-ga-naizd" },
      { base: "review", third: "reviews", past: "reviewed", pastSound: "ri-VIÚD" },
      { base: "open", third: "opens", past: "opened", pastSound: "ÔU-pând" },
      { base: "save", third: "saves", past: "saved", pastSound: "sêivd" },
    ],
  },
  {
    id: "ed-id",
    label: "-ed vira sílaba extra",
    hint: "Só depois de T ou D.",
    verbs: [
      { base: "list", third: "lists", past: "listed", pastSound: "LÍS-tid" },
      { base: "create", third: "creates", past: "created", pastSound: "kri-ÊI-tid" },
      { base: "end", third: "ends", past: "ended", pastSound: "ÉN-did" },
      { base: "add", third: "adds", past: "added", pastSound: "É-did" },
      { base: "update", third: "updates", past: "updated", pastSound: "âp-DÊI-tid" },
      { base: "commit", third: "commits", past: "committed", pastSound: "ka-MÍ-tid" },
    ],
  },
];

export const vocabGroups: VocabGroup[] = [
  {
    id: "security",
    label: "Arquitetura & Segurança",
    words: [
      { word: "architecture", ipa: "/ˈɑːrkɪtektʃər/", say: "ÁR-ki-ték-tchâr", pt: "arquitetura" },
      { word: "decision", ipa: "/dɪˈsɪʒən/", say: "di-SÍ-jân", pt: "decisão" },
      { word: "record", ipa: "/ˈrekərd/", say: "RÉ-kârd", pt: "registro" },
      { word: "access", ipa: "/ˈækses/", say: "ÉK-sés", pt: "acesso" },
      { word: "reconciliation", ipa: "/ˌrekənsɪliˈeɪʃən/", say: "ré-kân-si-li-ÊI-chân", pt: "reconciliação" },
      { word: "risk", ipa: "/rɪsk/", say: "rísk", pt: "risco" },
      { word: "assessment", ipa: "/əˈsesmənt/", say: "a-SÉS-mânt", pt: "avaliação" },
      { word: "diagrams", ipa: "/ˈdaɪəɡræmz/", say: "DÁI-a-grémz", pt: "diagramas" },
      { word: "system", ipa: "/ˈsɪstəm/", say: "SÍS-tâm", pt: "sistema" },
      { word: "context", ipa: "/ˈkɑːntekst/", say: "KÁN-tékst", pt: "contexto" },
      { word: "containers", ipa: "/kənˈteɪnərz/", say: "kân-TÊI-nârz", pt: "containers" },
      { word: "security", ipa: "/sɪˈkjʊrəti/", say: "si-KIÚ-ri-ti", pt: "segurança" },
      { word: "threats", ipa: "/θrets/", say: "thréts (língua entre os dentes)", pt: "ameaças" },
      { word: "STRIDE", ipa: "/straɪd/", say: "stráid", pt: "modelo STRIDE" },
      { word: "model", ipa: "/ˈmɑːdl/", say: "MÁ-dâl", pt: "modelo" },
      { word: "requirements", ipa: "/rɪˈkwaɪərmənts/", say: "ri-KUÁIER-mânts", pt: "requisitos" },
      { word: "traceability", ipa: "/ˌtreɪsəˈbɪləti/", say: "trei-ssa-BÍ-li-ti", pt: "rastreabilidade" },
      { word: "trust", ipa: "/trʌst/", say: "trâst", pt: "confiança" },
      { word: "boundaries", ipa: "/ˈbaʊndəriz/", say: "BÁUN-dâ-riz", pt: "fronteiras" },
    ],
  },
  {
    id: "project",
    label: "Projeto & Ferramentas",
    words: [
      { word: "project", ipa: "/ˈprɑːdʒekt/", say: "PRÁ-djékt", pt: "projeto" },
      { word: "delivery", ipa: "/dɪˈlɪvəri/", say: "di-LÍ-vâ-ri", pt: "entrega" },
      { word: "score", ipa: "/skɔːr/", say: "skór", pt: "pontuação" },
      { word: "LeanIX", ipa: "/ˈliːn aɪ eks/", say: "LÍN-ai-éks" },
      { word: "survey", ipa: "/ˈsɜːrveɪ/", say: "SÂR-vêi", pt: "questionário" },
      { word: "sketch", ipa: "/sketʃ/", say: "skétch", pt: "esboço" },
      { word: "Quick Checks", ipa: "/kwɪk tʃeks/", say: "kuík tchéks" },
      { word: "Python", ipa: "/ˈpaɪθɑːn/", say: "PÁI-thán" },
      { word: "script", ipa: "/skrɪpt/", say: "skrípt" },
      { word: "PDFs", ipa: "/ˌpiː diː ˈefs/", say: "pí-di-ÉFS" },
      { word: "files", ipa: "/faɪlz/", say: "fáilz", pt: "arquivos" },
      { word: "documents", ipa: "/ˈdɑːkjəmənts/", say: "DÁ-kiu-mânts", pt: "documentos" },
      { word: "links", ipa: "/lɪŋks/", say: "línks" },
      { word: "folder", ipa: "/ˈfoʊldər/", say: "FÔUL-dâr", pt: "pasta" },
      { word: "changes", ipa: "/ˈtʃeɪndʒɪz/", say: "TCHÊIN-djiz", pt: "alterações" },
      { word: "repository", ipa: "/rɪˈpɑːzətɔːri/", say: "ri-PÁ-zi-tó-ri", pt: "repositório" },
    ],
  },
  {
    id: "people",
    label: "Pessoas & Comunicação",
    words: [
      { word: "team", ipa: "/tiːm/", say: "tím", pt: "time" },
      { word: "review", ipa: "/rɪˈvjuː/", say: "ri-VIÚ", pt: "revisão" },
      { word: "questions", ipa: "/ˈkwestʃənz/", say: "KUÉS-tchânz", pt: "perguntas" },
      { word: "vendor", ipa: "/ˈvendər/", say: "VÉN-dâr", pt: "fornecedor" },
      { word: "emails", ipa: "/ˈiːmeɪlz/", say: "Í-mêilz", pt: "e-mails" },
      { word: "notes", ipa: "/noʊts/", say: "nôuts", pt: "anotações" },
      { word: "tasks", ipa: "/tæsks/", say: "tésks", pt: "tarefas" },
      { word: "list", ipa: "/lɪst/", say: "líst", pt: "lista" },
      { word: "Lucas", ipa: "/ˈluːkəs/", say: "LÚ-kâs" },
    ],
  },
  {
    id: "time",
    label: "Adjetivos, advérbios & tempo",
    words: [
      { word: "main", ipa: "/meɪn/", say: "mêin", pt: "principal" },
      { word: "small", ipa: "/smɔːl/", say: "smól", pt: "pequeno" },
      { word: "weekly", ipa: "/ˈwiːkli/", say: "UÍK-li", pt: "semanal" },
      { word: "ready", ipa: "/ˈredi/", say: "RÉ-di", pt: "pronto" },
      { word: "carefully", ipa: "/ˈkerfəli/", say: "KÉR-fâ-li", pt: "com cuidado" },
      { word: "together", ipa: "/təˈɡeðər/", say: "tu-GUÉ-dhâr", pt: "juntos" },
      { word: "each", ipa: "/iːtʃ/", say: "ítch", pt: "cada" },
      { word: "today", ipa: "/təˈdeɪ/", say: "tu-DÊI", pt: "hoje" },
      { word: "tomorrow", ipa: "/təˈmɑːroʊ/", say: "tu-MÁ-rôu", pt: "amanhã" },
      { word: "every", ipa: "/ˈevri/", say: "ÉV-ri", pt: "todo(a)" },
      { word: "week", ipa: "/wiːk/", say: "uík", pt: "semana" },
      { word: "day", ipa: "/deɪ/", say: "dêi", pt: "dia" },
    ],
  },
  {
    id: "small",
    label: "Palavras pequenas",
    words: [
      { word: "when", ipa: "/wen/", say: "uén", pt: "quando" },
      { word: "and", ipa: "/ænd/", say: "énd (rápido: ând)", pt: "e" },
      { word: "will", ipa: "/wɪl/", say: "uíl (I'll = áil)", pt: "(futuro)" },
      { word: "the", ipa: "/ðə/", say: "dhâ (língua entre os dentes)" },
      { word: "that", ipa: "/ðæt/", say: "dhét", pt: "que" },
      { word: "those", ipa: "/ðoʊz/", say: "dhôuz", pt: "aqueles" },
      { word: "them", ipa: "/ðem/", say: "dhém", pt: "eles/os" },
      { word: "his", ipa: "/hɪz/", say: "ríz (H aspirado)", pt: "dele" },
      { word: "into", ipa: "/ˈɪntuː/", say: "ÍN-tu", pt: "em (transformar em)" },
      { word: "from", ipa: "/frʌm/", say: "frâm", pt: "de" },
      { word: "about", ipa: "/əˈbaʊt/", say: "a-BÁUT", pt: "sobre" },
      { word: "before", ipa: "/bɪˈfɔːr/", say: "bi-FÓR", pt: "antes" },
    ],
  },
];

export const pronunciationTips = [
  "-ed só vira sílaba extra depois de T ou D (created, ended). Nos outros casos, não: finished = FÍ-nicht.",
  "th: língua entre os dentes em threats, the, that, them, together.",
  "Faça uma pausa curta depois da parte com when (é a vírgula).",
  "Na fala natural, I will vira I'll (áil).",
  "Velocidade normal é melhor que rápida: clareza vale mais que fluência aparente.",
];

export const classExercises: ClassExercise[] = [
  {
    id: "e1",
    kind: "transform",
    prompt: "I sent the documents to the security team.",
    hint: "Passe para o FUTURO",
    options: [
      "I will sent the documents to the security team.",
      "I will send the documents to the security team.",
      "I sends the documents to the security team.",
    ],
    answer: 1,
    explanation: "will + verbo na forma base: will send (nunca will sent).",
  },
  {
    id: "e2",
    kind: "transform",
    prompt: "When the day ended, I organized my tasks.",
    hint: "Passe para o FUTURO",
    options: [
      "When the day will end, I will organize my tasks.",
      "When the day ends, I organize my tasks.",
      "When the day ends, I will organize my tasks.",
    ],
    answer: 2,
    explanation: "Depois de when fica no presente (ends); o will vai só na parte principal.",
  },
  {
    id: "e3",
    kind: "transform",
    prompt: "When Lucas sent me questions, I answered them.",
    hint: "Passe para o PRESENTE (rotina)",
    options: [
      "When Lucas sends me questions, I answer them.",
      "When Lucas send me questions, I answer them.",
      "When Lucas sends me questions, I answers them.",
    ],
    answer: 0,
    explanation: "Lucas = he → sends. I → answer (sem -s).",
  },
  {
    id: "e4",
    kind: "transform",
    prompt: "I will build a Python script.",
    hint: "Passe para o PASSADO",
    options: ["I builded a Python script.", "I built a Python script.", "I was build a Python script."],
    answer: 1,
    explanation: "build é irregular: build → built.",
  },
  {
    id: "e5",
    kind: "fix",
    prompt: "When I finished the diagrams, I map the threats.",
    hint: "Qual é a versão correta?",
    options: [
      "When I finished the diagrams, I mapped the threats.",
      "When I finished the diagrams, I will map the threats.",
      "When I finish the diagrams, I mapped the threats.",
    ],
    answer: 0,
    explanation: "Passado nos dois lados: finished … mapped.",
  },
  {
    id: "e6",
    kind: "fix",
    prompt: "When I will finish the report, I will send it.",
    hint: "Qual é a versão correta?",
    options: [
      "When I finished the report, I will send it.",
      "When I finish the report, I will send it.",
      "When I will finish the report, I send it.",
    ],
    answer: 1,
    explanation: "Nunca use will depois de when.",
  },
  {
    id: "e7",
    kind: "fill",
    prompt: "Tomorrow, when I ___ (open) the survey, I ___ (answer) the questions.",
    hint: "Complete",
    options: ["will open / will answer", "open / will answer", "opened / answered"],
    answer: 1,
    explanation: "Futuro: when + presente (open), parte principal com will (will answer).",
  },
  {
    id: "e8",
    kind: "fill",
    prompt: "Yesterday, when I ___ (read) the emails, I ___ (take) notes.",
    hint: "Complete",
    options: ["read / took", "readed / taked", "read / take"],
    answer: 0,
    explanation: "read → read (fala /red/), take → took. Os dois são irregulares.",
  },
  {
    id: "e9",
    kind: "fill",
    prompt: "Every week, when the day ___ (end), I ___ (review) my tasks.",
    hint: "Complete",
    options: ["end / review", "ends / reviews", "ends / review"],
    answer: 2,
    explanation: "the day = it → ends. I → review.",
  },
  {
    id: "e10",
    kind: "fill",
    prompt: "Qual palavra tem o -ed como sílaba extra?",
    hint: "Pronúncia",
    options: ["finished", "created", "organized"],
    answer: 1,
    explanation: "created termina em T antes do -ed → kri-ÊI-tid. finished = T, organized = D.",
  },
];

/** Removes the **highlight** markers so the text can be spoken or copied. */
export function plainText(text: string) {
  return text.replace(/\*\*/g, "");
}

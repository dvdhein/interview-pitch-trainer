export type InterviewRoundId =
  | "round_1_recruiter"
  | "round_2_manager"
  | "round_3_technical"
  | "round_4_executive";

export type InterviewRound = {
  id: InterviewRoundId;
  roundNumber: string;
  badge: string;
  titleEn: string;
  titlePt: string;
  interlocutorEn: string;
  interlocutorPt: string;
  typicalDuration: string;
  primaryObjectiveEn: string;
  primaryObjectivePt: string;
  greenLightsEn: string[];
  greenLightsPt: string[];
  redFlagsEn: string[];
  redFlagsPt: string[];
  recommendedPitchIds: string[];
  frequentQuestionsEn: string[];
  frequentQuestionsPt: string[];
  prepChecklistEn: string[];
  prepChecklistPt: string[];
};

export const interviewRounds: InterviewRound[] = [
  {
    id: "round_1_recruiter",
    roundNumber: "01",
    badge: "SCREENING ROUND (15–30 MIN)",
    titleEn: "Talent Acquisition & Recruiter Screening",
    titlePt: "Triagem com Recrutador (Talent Acquisition)",
    interlocutorEn: "Executive Recruiter / International Talent Partner (Non-Technical)",
    interlocutorPt: "Recrutador Executivo / Especialista em Talentos (Não-Técnico)",
    typicalDuration: "15–30 minutos",
    primaryObjectiveEn:
      "Filter out candidates who lack communication clarity, english fluency, clear seniority, or work authorization alignment. They need a crisp 30–45s elevator pitch.",
    primaryObjectivePt:
      "Filtrar candidatos com comunicação prolixa, inglês travado ou desalinhamento de senioridade. O recrutador precisa de um elevator pitch direto de 35–45s para avançar.",
    greenLightsEn: [
      "Natural and calm spoken English without corporate robotic jargon",
      "Immediate authority positioning: 'Information Security Architect with 22+ years'",
      "Highlights modern AI security and Policy-as-Code right in the opening",
      "Positive, collaborative attitude and clear business motivation",
    ],
    greenLightsPt: [
      "Inglês natural, pausado e sem jargões corporativos robóticos",
      "Posicionamento imediato de autoridade: 'Information Security Architect com 22+ anos'",
      "Destaque para IA Generativa e Policy-as-Code logo na introdução",
      "Atitude positiva, colaborativa e motivação de negócio transparente",
    ],
    redFlagsEn: [
      "Monologues lasting longer than 90 seconds in the 'Tell me about yourself'",
      "Overly deep technical details that confuse a non-technical recruiter",
      "Sounding negative about previous employers or rigid about rules",
    ],
    redFlagsPt: [
      "Monólogos de mais de 90 segundos no 'Tell me about yourself'",
      "Descer a detalhes técnicos profundos que confundem o recrutador",
      "Soar negativo sobre empregadores anteriores ou intransigente",
    ],
    recommendedPitchIds: ["first_intro", "executive"],
    frequentQuestionsEn: [
      "Can you give me a brief overview of your background and what you're looking for next?",
      "Why are you interested in our company and this specific international opportunity?",
      "What is your experience working with cloud environments and distributed global teams?",
    ],
    frequentQuestionsPt: [
      "Pode me dar uma visão geral da sua trajetória e o que busca como próximo passo?",
      "Por que você tem interesse na nossa empresa e nessa oportunidade internacional?",
      "Qual é a sua experiência trabalhando com nuvem e times remotos globais?",
    ],
    prepChecklistEn: [
      "Rehearse the 35–45s 'My First Introduction' until it flows effortlessly",
      "Have your visa/work authorization status clear and concise",
      "Prepare 2 thoughtful questions about the company's growth stage and culture",
    ],
    prepChecklistPt: [
      "Ensaiar o 'My First Introduction' (35–45s) até sair 100% natural",
      "Ter resposta pronta sobre status de trabalho/visto ou atuação remota",
      "Preparar 2 perguntas inteligentes sobre a cultura e fase da empresa",
    ],
  },
  {
    id: "round_2_manager",
    roundNumber: "02",
    badge: "HIRING MANAGER (45–60 MIN)",
    titleEn: "Hiring Manager & Security Director Interview",
    titlePt: "Entrevista com o Gestor Direto (Head / Diretor de Segurança)",
    interlocutorEn: "Head of Information Security, Director of Architecture, or CISO",
    interlocutorPt: "Head de Segurança da Informação, Diretor de Arquitetura ou CISO",
    typicalDuration: "45–60 minutos",
    primaryObjectiveEn:
      "Determine whether you will be a business accelerator or a bureaucratic bottleneck. The manager wants an architect who leads by influence and enables developer velocity.",
    primaryObjectivePt:
      "Descobrir se você será um acelerador de negócios ou um gargalo burocrático. O gestor quer um líder que exerça influência e apoie a velocidade dos times de desenvolvimento.",
    greenLightsEn: [
      "Demonstrates security as a 'Business Enabler' driven by frameworks (SABSA/TOGAF)",
      "Concrete story of turning engineering pushback into an agile partnership (Golden Paths)",
      "Experience acting as Platform TPM to eliminate architecture review friction",
      "Ability to manage risks without slowing down product release schedules",
    ],
    greenLightsPt: [
      "Demonstra segurança como viabilizadora de negócios guiada por SABSA/TOGAF",
      "História real de como transformou atrito com engenharia em parceria (Golden Paths)",
      "Experiência como Platform TPM automatizando a governança da arquitetura",
      "Capacidade comprovada de gerir riscos sem travar os prazos de lançamento",
    ],
    redFlagsEn: [
      "Talking like the 'Department of NO' or relying solely on mandatory compliance gates",
      "Inability to explain how technical decisions impact business revenue or speed",
      "Lack of product mindset when managing internal architecture platforms",
    ],
    redFlagsPt: [
      "Agir como o 'departamento do NÃO' ou defender travas burocráticas rígidas",
      "Não saber explicar como decisões técnicas impactam receita ou velocidade",
      "Ausência de visão de produto na gestão de plataformas internas de arquitetura",
    ],
    recommendedPitchIds: ["executive", "the_ultimate_pitch", "tpm_platform"],
    frequentQuestionsEn: [
      "How do you balance strict security compliance with rapid developer deployment schedules?",
      "Can you tell me about a time when an engineering team strongly resisted your security recommendations?",
      "How do you prioritize your architecture backlog when multiple stakeholders have conflicting demands?",
    ],
    frequentQuestionsPt: [
      "Como você equilibra conformidade rigorosa com esteiras de deploy rápido dos desenvolvedores?",
      "Conte uma situação onde um time de engenharia resistiu fortemente às suas recomendações.",
      "Como você prioriza seu backlog de arquitetura quando há demandas conflitantes de stakeholders?",
    ],
    prepChecklistEn: [
      "Master the 'Department of NO' behavioral story using the STAR framework",
      "Review the Platform TPM Continuous Discovery metrics (RICE framework, adoption rate)",
      "Prepare questions about the manager's biggest architectural pain points for this year",
    ],
    prepChecklistPt: [
      "Dominar a história comportamental do 'Departamento do NÃO' no método STAR",
      "Revisar as métricas de Platform TPM (framework RICE e taxa de adoção de 92%)",
      "Preparar perguntas sobre as principais dores de arquitetura do gestor para este ano",
    ],
  },
  {
    id: "round_3_technical",
    roundNumber: "03",
    badge: "DEEP TECHNICAL (60–90 MIN)",
    titleEn: "Technical Architecture & System Design Panel",
    titlePt: "Painel Técnico de Arquitetura & System Design",
    interlocutorEn: "Principal Architects, Staff Security Engineers, Cloud Leads",
    interlocutorPt: "Arquitetos Principais, Engenheiros Staff, Tech Leads de Nuvem",
    typicalDuration: "60–90 minutos",
    primaryObjectiveEn:
      "Deep technical grill on system design trade-offs, critical infrastructure scale, cryptographic mechanisms, API security, and practical GenAI prompt boundary implementation.",
    primaryObjectivePt:
      "Sabatina técnica profunda sobre trade-offs de system design, escala crítica de infraestrutura, criptografia, segurança de APIs e guardrails práticos de IA Generativa.",
    greenLightsEn: [
      "Explains mTLS, HSM connection pooling, and sub-second signing latency for PIX/Open Banking",
      "Demonstrates practical GenAI defense: prompt sanitization, Azure AI Foundry, and ADR parsing",
      "Articulates Defense-in-Depth for APIs: OpenAPI contract validation, rate limiting, and FAPI profiles",
      "Understands modern DevSecOps: Golden Paths, Shift-Left, distroless images, and SBOM",
    ],
    greenLightsPt: [
      "Explica mTLS, pooling de HSMs e latência de milissegundos para PIX e Open Banking",
      "Demonstra segurança prática em IA: sanitização de prompts, Azure AI Foundry e revisão de ADRs",
      "Domina defesa em camadas para APIs: OpenAPI, rate limiting e perfis FAPI",
      "Domina DevSecOps moderno: Golden Paths, Shift-Left, contêineres distroless e SBOM",
    ],
    redFlagsEn: [
      "Vagueness about cryptographic signing or inability to discuss latency trade-offs",
      "Treating AI as a magic black box without understanding prompt injection vectors",
      "Claiming to know a technology without being able to discuss its failure modes",
    ],
    redFlagsPt: [
      "Respostas vagas sobre criptografia ou incapacidade de discutir trade-offs de latência",
      "Tratar IA como mágica sem entender vetores de prompt injection e jailbreak",
      "Citar tecnologias sem saber explicar como elas falham ou como são monitoradas",
    ],
    recommendedPitchIds: ["technical", "pix_scale", "principal_turbi", "solutions_aplin"],
    frequentQuestionsEn: [
      "Walk me through your architectural design for a zero-trust API ecosystem processing sensitive payments.",
      "How did you integrate Hardware Security Modules (HSMs) into high-throughput microservices without creating latency bottlenecks?",
      "How do your AI agents securely review Architecture Decision Records without leaking sensitive enterprise context?",
    ],
    frequentQuestionsPt: [
      "Me guie pelo seu desenho arquitetural para um ecossistema de APIs Zero Trust em pagamentos.",
      "Como você integrou HSMs em microsserviços de altíssima escala sem criar gargalos de latência?",
      "Como seus agentes de IA analisam ADRs com segurança sem vazar contexto corporativo confidencial?",
    ],
    prepChecklistEn: [
      "Review the API & AppSec Defense-in-Depth matrix (mTLS, FAPI, BOLA/BFLA, Tokenization)",
      "Be prepared to draw C4 Model containers and sequence diagrams for PIX and AI review pipelines",
      "Know the exact latency numbers (< 45ms signing) and throughput scale",
    ],
    prepChecklistPt: [
      "Revisar a matriz de API & AppSec (mTLS, FAPI, prevenção a BOLA/BFLA e Tokenização)",
      "Estar pronto para desenhar diagramas C4 e sequências de microsserviços e esteiras de IA",
      "Ter na ponta da língua os números exatos de latência (< 45ms) e escala",
    ],
  },
  {
    id: "round_4_executive",
    roundNumber: "04",
    badge: "EXECUTIVE / C-LEVEL (30–45 MIN)",
    titleEn: "Executive, VP & C-Level Final Round",
    titlePt: "Rodada Executiva Final (CTO, VP de Engenharia, C-Level)",
    interlocutorEn: "Chief Technology Officer (CTO), VP of Engineering, CIO, or Founder",
    interlocutorPt: "CTO, VP de Engenharia, CIO ou Fundador",
    typicalDuration: "30–45 minutos",
    primaryObjectiveEn:
      "Assess executive presence, strategic vision, long-term ROI, and cultural alignment. They want to know: 'Can I trust David to represent technical risk to our Board of Directors?'",
    primaryObjectivePt:
      "Avaliar postura executiva, visão estratégica de longo prazo, ROI e alinhamento cultural. A pergunta que eles fazem é: 'Posso confiar no David para reportar riscos ao Conselho e ao Board?'",
    greenLightsEn: [
      "Speaks the language of business risk, capital allocation, and developer productivity",
      "Delivers crisp STAR behavioral answers demonstrating emotional maturity",
      "Clear articulation of how security architecture enables enterprise valuation and customer trust",
      "Authentic humility combined with undeniable 22-year technical gravitas",
    ],
    greenLightsPt: [
      "Fala a língua de risco de negócio, alocação de capital e produtividade da engenharia",
      "Responde no método STAR demonstrando maturidade emocional e liderança tranquila",
      "Articula como a arquitetura de segurança gera confiança para clientes e valor de mercado",
      "Postura autêntica, segura e autoridade técnica consolidada de 22 anos",
    ],
    redFlagsEn: [
      "Getting bogged down in low-level code syntax during an executive strategy conversation",
      "Failing to articulate how technology decisions tie back to business EBITDA or revenue",
      "Inability to describe leadership philosophy or vision for the next 3 to 5 years",
    ],
    redFlagsPt: [
      "Ficar preso em detalhes de sintaxe de código em uma conversa estratégica com o CTO",
      "Não saber conectar decisões técnicas a resultados financeiros, agilidade ou receita",
      "Incapacidade de articular filosofia de liderança ou visão para os próximos anos",
    ],
    recommendedPitchIds: ["the_ultimate_pitch", "resume_about_me", "brazil_exec_pitch"],
    frequentQuestionsEn: [
      "Where do you see the biggest architectural risks for our industry over the next 3 to 5 years?",
      "How do you translate deep technical vulnerabilities into actionable risk metrics for our Board of Directors?",
      "What is your leadership philosophy when guiding engineering organizations through massive digital change?",
    ],
    frequentQuestionsPt: [
      "Onde você enxerga os maiores riscos arquiteturais para o nosso setor nos próximos 3 a 5 anos?",
      "Como você traduz vulnerabilidades técnicas profundas em métricas de risco para o Conselho de Administração?",
      "Qual é a sua filosofia de liderança ao guiar organizações de engenharia em grandes transformações?",
    ],
    prepChecklistEn: [
      "Rehearse 'The Ultimate 2-Minute Pitch' connecting BV, Boticário, and Aché to business value",
      "Prepare your perspective on AI governance and enterprise resilience trends for 2026–2030",
      "Prepare 2 high-level strategic questions about the company's 3-year market trajectory",
    ],
    prepChecklistPt: [
      "Ensaiar 'The Ultimate 2-Minute Pitch' conectando Banco BV, Boticário e Aché a valor corporativo",
      "Preparar sua visão sobre governança de IA e resiliência cibernética para 2026–2030",
      "Preparar 2 perguntas estratégicas de alto nível sobre os planos de mercado da empresa",
    ],
  },
];

export type TargetMarketId = "us" | "ca" | "de" | "ie" | "au";

export type RegulatoryEquivalent = {
  brazilTerm: string;
  globalEquivalent: string;
  spokenHookEn: string;
  spokenHookPt: string;
};

export type TargetMarket = {
  id: TargetMarketId;
  flag: string;
  nameEn: string;
  namePt: string;
  regionTag: string;
  culturalTone: string;
  coreExpectationsEn: string;
  coreExpectationsPt: string;
  styleAdviceEn: string;
  styleAdvicePt: string;
  redFlagsToAvoidEn: string;
  redFlagsToAvoidPt: string;
  equivalents: RegulatoryEquivalent[];
  goldenKeywords: string[];
};

export const internationalMarkets: TargetMarket[] = [
  {
    id: "us",
    flag: "🇺🇸",
    nameEn: "United States",
    namePt: "Estados Unidos",
    regionTag: "Silicon Valley · NYC · Austin · Remote US",
    culturalTone: "Direct, High Ownership, Speed & Business ROI",
    coreExpectationsEn:
      "US interviewers want unapologetic ownership ('I owned', 'I led'), proven financial impact, and extreme scale. They value architects who accelerate developer velocity while eliminating massive enterprise liabilities.",
    coreExpectationsPt:
      "Entrevistadores americanos buscam protagonismo absoluto ('eu liderei', 'eu desenhei'), impacto financeiro mensurável e escala de bilhões. Querem arquitetos que acelerem entregas de produto reduzindo riscos legais.",
    styleAdviceEn:
      "Replace 'we did' with 'I led the architecture'. Emphasize business ROI, sub-second latency, and how your AI agents cut delivery friction.",
    styleAdvicePt:
      "Substitua o 'nós fizemos' por 'eu liderei a arquitetura'. Enfatize ROI de negócio, latência de milissegundos e como seus agentes de IA destravam a engenharia.",
    redFlagsToAvoidEn:
      "Excessive modesty, focusing on routine tasks instead of business outcomes, speaking too quietly or sounding hesitant.",
    redFlagsToAvoidPt:
      "Falsa modéstia, focar em atividades operacionais em vez de resultados de negócio, falar com hesitação.",
    equivalents: [
      {
        brazilTerm: "BACEN (Banco Central)",
        globalEquivalent: "Federal / Central Bank Regulatory Framework (similar to Federal Reserve / NIST)",
        spokenHookEn: "Under strict Central Bank regulatory mandates, equivalent to Federal Reserve and NIST guidelines...",
        spokenHookPt: "Sob regulações rígidas do Banco Central, equivalentes ao Fed e NIST nos EUA...",
      },
      {
        brazilTerm: "PIX (Pagamentos Instantâneos)",
        globalEquivalent: "National Real-Time Payment Rail (similar to FedNow at billion-dollar scale)",
        spokenHookEn: "Brazil's instant payment ecosystem, processing hundreds of millions of daily transactions like FedNow...",
        spokenHookPt: "O ecossistema nacional de pagamentos instantâneos, equivalente ao FedNow processando milhões de transações diárias...",
      },
      {
        brazilTerm: "Aché Laboratórios",
        globalEquivalent: "Multi-million-dollar pharmaceutical enterprise under FDA-grade audits",
        spokenHookEn: "At Aché, a leading multi-million-dollar pharmaceutical enterprise under rigorous health compliance...",
        spokenHookPt: "Na Aché, uma das principais farmacêuticas do país operando sob rigorosos padrões de saúde...",
      },
      {
        brazilTerm: "Grupo Boticário",
        globalEquivalent: "Tier-1 omnichannel retail conglomerate managing 50+ consumer brands",
        spokenHookEn: "At Grupo Boticário, an omnichannel retail conglomerate operating over 50 distinct consumer brands...",
        spokenHookPt: "No Grupo Boticário, conglomerado de varejo omnichannel que opera mais de 50 marcas...",
      },
    ],
    goldenKeywords: [
      "Revenue enablement",
      "Business ROI",
      "Billion-dollar scale",
      "Sub-second latency",
      "I owned and led",
      "Golden Paths",
      "Platform TPM",
    ],
  },
  {
    id: "ca",
    flag: "🇨🇦",
    nameEn: "Canada",
    namePt: "Canadá",
    regionTag: "Toronto · Vancouver · Montreal · Remote CA",
    culturalTone: "Collaborative, Consensus-Driven & Empathetic Leadership",
    coreExpectationsEn:
      "Canadian employers look for solid emotional intelligence, inclusive leadership by influence, and strong adherence to governance (OSFI, PIPEDA). High-ego aggressive answers are penalized.",
    coreExpectationsPt:
      "Empresas canadenses valorizam inteligência emocional, liderança por influência e respeito a normas (OSFI, PIPEDA). Respostas arrogantes ou agressivas eliminam candidatos seniores.",
    styleAdviceEn:
      "Highlight mentorship, consensus building with engineering teams, and how you turned security from a blocker into a partnership.",
    styleAdvicePt:
      "Destaque mentoria, construção de consenso com desenvolvedores e como você tirou a segurança do papel de barreira burocrática.",
    redFlagsToAvoidEn:
      "Sounding dictatorial, saying 'I told them they had to follow the rule', dismissing developers' concerns.",
    redFlagsToAvoidPt:
      "Parecer autoritário, dizer que 'impôs a regra' aos desenvolvedores, ignorar as dores dos times de produto.",
    equivalents: [
      {
        brazilTerm: "BACEN",
        globalEquivalent: "OSFI (Office of the Superintendent of Financial Institutions) equivalent",
        spokenHookEn: "Operating under strict Central Bank supervision, analogous to OSFI regulatory standards in Canada...",
        spokenHookPt: "Operando sob supervisão estrita do Banco Central, análoga às normas da OSFI no Canadá...",
      },
      {
        brazilTerm: "LGPD",
        globalEquivalent: "PIPEDA-compliant data privacy framework",
        spokenHookEn: "Enforcing enterprise data protection baselines aligned with PIPEDA and GDPR principles...",
        spokenHookPt: "Aplicando proteção de dados corporativa alinhada aos princípios da PIPEDA e GDPR...",
      },
      {
        brazilTerm: "PIX",
        globalEquivalent: "National Real-Time Instant Payment Rail",
        spokenHookEn: "The national instant payment system that processes the vast majority of consumer and commercial transactions...",
        spokenHookPt: "O sistema nacional de pagamentos em tempo real que processa a grande maioria das transações do país...",
      },
    ],
    goldenKeywords: [
      "Leading by influence",
      "Building consensus",
      "Frictionless guardrails",
      "Mentorship",
      "Developer experience",
      "Pragmatic governance",
    ],
  },
  {
    id: "de",
    flag: "🇩🇪",
    nameEn: "Germany & DACH (Europe)",
    namePt: "Alemanha & Europa Central",
    regionTag: "Berlin · Munich · Frankfurt · Zurich",
    culturalTone: "Methodological Rigor, DORA, NIS2 & Traceable Architecture",
    coreExpectationsEn:
      "German and European hiring managers are skeptical of marketing buzzwords. They expect structured frameworks (TOGAF, SABSA, C4 Model, ADRs), strict privacy (GDPR/BDSG), and operational resilience (DORA, NIS2).",
    coreExpectationsPt:
      "Gestores alemães e europeus desconfiam de 'buzzwords'. Esperam frameworks formais (TOGAF, SABSA, C4, ADRs), privacidade estrita (GDPR/BDSG) e resiliência operacional (DORA, NIS2).",
    styleAdviceEn:
      "Explain the exact architectural mechanics. Emphasize Architecture-as-Code, prompt boundaries, and verifiable audit trails.",
    styleAdvicePt:
      "Explique a mecânica arquitetural exata. Destaque Architecture-as-Code, limites rígidos de prompt de IA e trilhas de auditoria verificáveis.",
    redFlagsToAvoidEn:
      "Superficial buzzword dropping, claiming AI will 'solve everything' without explaining prompt sanitization or auditability.",
    redFlagsToAvoidPt:
      "Falar de IA como mágica sem explicar como funciona a sanitização e auditoria, falta de precisão técnica.",
    equivalents: [
      {
        brazilTerm: "BACEN / Resolução 4893",
        globalEquivalent: "DORA (Digital Operational Resilience Act) & EBA guidelines",
        spokenHookEn: "Complying with critical banking supervisory standards, directly aligned with EU DORA and EBA directives...",
        spokenHookPt: "Em conformidade com normas bancárias críticas, alinhadas às diretrizes da DORA e EBA na Europa...",
      },
      {
        brazilTerm: "LGPD",
        globalEquivalent: "Strict GDPR & BDSG data privacy and sovereignty",
        spokenHookEn: "Architecting end-to-end data classification and sovereignty under strict GDPR baselines...",
        spokenHookPt: "Desenhando classificação e soberania de dados ponta a ponta sob as normas do GDPR...",
      },
      {
        brazilTerm: "PIX",
        globalEquivalent: "National Instant Payment System (similar to SEPA Instant)",
        spokenHookEn: "Brazil's national instant clearing system, operating like SEPA Instant but at massive daily transaction volume...",
        spokenHookPt: "O sistema instantâneo de liquidação do Brasil, operando como o SEPA Instant em altíssima escala...",
      },
    ],
    goldenKeywords: [
      "DORA & NIS2 readiness",
      "GDPR & Data Sovereignty",
      "Architecture Decision Records (ADRs)",
      "SABSA & TOGAF",
      "Deterministic guardrails",
      "Auditability by design",
    ],
  },
  {
    id: "ie",
    flag: "🇮🇪",
    nameEn: "Ireland & UK",
    namePt: "Irlanda & Reino Unido",
    regionTag: "Dublin Tech Hub · London Fintech · Remote UK/IE",
    culturalTone: "Pragmatic, High-Scale Fintech Hub & Approachable",
    coreExpectationsEn:
      "Dublin is the European capital for Big Tech (Google, AWS, Meta, Stripe) and London leads global fintech. They expect deep API security (FAPI, mTLS, OAuth2), open communication, and high pragmatism.",
    coreExpectationsPt:
      "Dublin é a capital europeia de Big Techs (Stripe, Google, AWS) e Londres lidera fintechs globais. Buscam segurança de APIs moderna (FAPI, mTLS, OAuth2) e muita capacidade prática.",
    styleAdviceEn:
      "Be conversational and personable early on (the 'craic'), then pivot sharply to high technical density: API gateways, FAPI profiles, and sub-second cryptographic signing.",
    styleAdvicePt:
      "Seja simpático e aberto no início da conversa, e depois mostre alta densidade técnica: API gateways, perfis FAPI e assinatura criptográfica de baixa latência.",
    redFlagsToAvoidEn:
      "Being overly stiff or bureaucratic, failing to explain how security enables developers to ship APIs quickly.",
    redFlagsToAvoidPt:
      "Soar formal demais ou burocrata, não saber explicar como a segurança ajuda desenvolvedores a entregar APIs rápido.",
    equivalents: [
      {
        brazilTerm: "PIX / Open Banking",
        globalEquivalent: "Faster Payments / Open Banking UK & SEPA Instant",
        spokenHookEn: "Leading the security design for national instant payments, matching UK Faster Payments and Open Banking standards...",
        spokenHookPt: "Liderando o desenho de segurança de pagamentos instantâneos, equivalente ao Faster Payments e Open Banking britânico...",
      },
      {
        brazilTerm: "BACEN Audits",
        globalEquivalent: "Central Bank of Ireland / FCA regulatory audits",
        spokenHookEn: "Passing Central Bank supervisory audits with 100% compliance across all critical cryptographic infrastructure...",
        spokenHookPt: "Superando auditorias regulatórias de bancos centrais com 100% de conformidade criptográfica...",
      },
    ],
    goldenKeywords: [
      "API Security & FAPI",
      "mTLS & Tokenization",
      "High-throughput microservices",
      "Pragmatic DevSecOps",
      "Sub-second latency",
      "Open Banking architecture",
    ],
  },
  {
    id: "au",
    flag: "🇦🇺",
    nameEn: "Australia",
    namePt: "Austrália",
    regionTag: "Sydney · Melbourne · Brisbane · Remote AU",
    culturalTone: "No-Nonsense, Practical Builder & Down-to-Earth",
    coreExpectationsEn:
      "Australian companies dislike pretension and academic ivory-tower architects ('tall poppy syndrome'). They respect senior leaders who are hands-on, approachable, and deliver practical outcomes under APRA CPS 234.",
    coreExpectationsPt:
      "Empresas australianas têm aversão à arrogância e arquitetos de torre de marfim. Respeitam líderes que colocam a mão na massa, são acessíveis e geram resultados práticos sob a norma APRA CPS 234.",
    styleAdviceEn:
      "Position yourself as a practical problem solver who sits next to engineers to build real solutions that protect customer data.",
    styleAdvicePt:
      "Posicione-se como um solucionador prático de problemas que senta ao lado dos engenheiros para construir defesas sólidas.",
    redFlagsToAvoidEn:
      "Sounding like you only draw diagrams and don't understand actual engineering or cloud deployments.",
    redFlagsToAvoidPt:
      "Soar como alguém que só desenha caixinhas no Visio e não entende a realidade da engenharia ou nuvem.",
    equivalents: [
      {
        brazilTerm: "BACEN / Cibersegurança",
        globalEquivalent: "APRA CPS 234 Prudential Standard for Information Security",
        spokenHookEn: "Ensuring end-to-end alignment with Central Bank standards, comparable to APRA CPS 234 compliance...",
        spokenHookPt: "Garantindo conformidade com normas de bancos centrais, comparável à norma APRA CPS 234 na Austrália...",
      },
      {
        brazilTerm: "PIX",
        globalEquivalent: "NPP (New Payments Platform) at national scale",
        spokenHookEn: "Brazil's national instant payment ecosystem, operating like Australia's New Payments Platform (NPP)...",
        spokenHookPt: "O ecossistema nacional de pagamentos instantâneos, operando como o New Payments Platform (NPP) australiano...",
      },
      {
        brazilTerm: "LGPD",
        globalEquivalent: "Australian Privacy Principles (APPs) & Privacy Act",
        spokenHookEn: "Governing customer PII under strict privacy mandates aligned with the Privacy Act and GDPR...",
        spokenHookPt: "Protegendo dados sensíveis de clientes alinhado à lei de privacidade e princípios do Privacy Act...",
      },
    ],
    goldenKeywords: [
      "Hands-on architect",
      "APRA CPS 234 alignment",
      "Practical solutions",
      "Solving complex problems",
      "Down-to-earth leadership",
      "Real-time rails (NPP scale)",
    ],
  },
];

export type GlobalLexiconEntry = {
  id: string;
  brazilianTerm: string;
  category: "Regulação" | "Sistemas de Pagamento" | "Empresas & Escala" | "Privacidade & Compliance";
  contextPt: string;
  contextEn: string;
  equivalents: {
    us: string;
    eu: string;
    ca: string;
    au: string;
    global: string;
  };
  spokenHookEn: string;
  spokenHookPt: string;
  whyItWorksEn: string;
  whyItWorksPt: string;
};

export const globalLexiconEntries: GlobalLexiconEntry[] = [
  {
    id: "bacen",
    brazilianTerm: "BACEN (Banco Central do Brasil)",
    category: "Regulação",
    contextPt: "Autoridade monetária e reguladora máxima do sistema financeiro brasileiro (resoluções 4.893 e 4.658 de cibersegurança).",
    contextEn: "Brazil's apex central banking and monetary authority, equivalent in regulatory power to the Federal Reserve or ECB.",
    equivalents: {
      us: "Federal Reserve Board & NIST SP 800-53 / FFIEC guidelines",
      eu: "European Central Bank (ECB) & DORA / EBA Guidelines",
      ca: "OSFI (Office of the Superintendent of Financial Institutions) E-21",
      au: "APRA (Australian Prudential Regulation Authority) CPS 234",
      global: "Apex Central Bank Financial Supervision & Cyber Mandates",
    },
    spokenHookEn: "Under strict Central Bank mandates — comparable to Federal Reserve and NIST guidelines in the US — I architected the end-to-end cryptographic and zero-trust controls...",
    spokenHookPt: "Sob rigorosas resoluções do Banco Central — comparáveis às diretrizes do Fed e NIST nos Estados Unidos — arquitetei os controles criptográficos e zero-trust...",
    whyItWorksEn: "Immediately eliminates provincial confusion and frames your experience in terms of top-tier federal regulatory compliance.",
    whyItWorksPt: "Elimina a barreira regional e estabelece de imediato sua senioridade em ambientes de máxima exigência regulatória.",
  },
  {
    id: "pix",
    brazilianTerm: "PIX (Pagamentos Instantâneos)",
    category: "Sistemas de Pagamento",
    contextPt: "Sistema nacional de pagamentos instantâneos criado pelo BACEN, processando centenas de milhões de transações diárias com SLA de sub-segundo.",
    contextEn: "Brazil's national real-time payment ecosystem, universally considered one of the world's most successful instant payment networks.",
    equivalents: {
      us: "FedNow / The Clearing House RTP (operating at 10x national adoption)",
      eu: "SEPA Instant Credit Transfer / TIPS",
      ca: "Interac e-Transfer & Payments Canada Real-Time Rail (RTR)",
      au: "New Payments Platform (NPP) / PayID",
      global: "National Real-Time Instant Settlement Rail (Sub-second SLA)",
    },
    spokenHookEn: "I was the lead security architect for the national instant payment rail — similar to FedNow in the US or SEPA Instant in Europe — where a single millisecond of latency or key failure could disrupt national commerce...",
    spokenHookPt: "Fui o arquiteto líder de segurança para a infraestrutura do sistema nacional de pagamentos instantâneos — equivalente ao FedNow nos EUA ou SEPA Instant na Europa — onde qualquer milissegundo de latência paralisaria o comércio...",
    whyItWorksEn: "International interviewers love hearing FedNow or SEPA Instant because it proves you architected high-throughput, low-latency microservices under non-negotiable security requirements.",
    whyItWorksPt: "Entrevistadores internacionais entendem imediatamente o peso de um FedNow ou SEPA Instant, comprovando sua capacidade em microsserviços de altíssima escala e baixa latência.",
  },
  {
    id: "lgpd",
    brazilianTerm: "LGPD (Lei Geral de Proteção de Dados)",
    category: "Privacidade & Compliance",
    contextPt: "Lei brasileira de privacidade de dados inspirada e espelhada diretamente no GDPR europeu.",
    contextEn: "Brazil's federal privacy law, modeled directly after the European Union's GDPR with strict cross-border transfer rules.",
    equivalents: {
      us: "CCPA / CPRA (California Consumer Privacy Act) & state privacy acts",
      eu: "GDPR (General Data Protection Regulation)",
      ca: "PIPEDA / Bill C-27 Consumer Privacy Protection Act",
      au: "Australian Privacy Principles (APPs) & Privacy Act 1988",
      global: "GDPR-Aligned Global Data Privacy & Cross-Border Governance",
    },
    spokenHookEn: "I established automated data classification and DLP baselines fully aligned with GDPR and CCPA equivalents, securing millions of customer identities across multi-cloud tenants...",
    spokenHookPt: "Estruturei baselines automatizados de classificação de dados e DLP alinhados aos padrões de GDPR e CCPA, protegendo milhões de identidades em múltiplos tenants cloud...",
    whyItWorksEn: "Shows that your compliance and privacy architecture directly translates to GDPR/CCPA environments without onboarding friction.",
    whyItWorksPt: "Mostra que seus frameworks de privacidade e proteção de dados operam de acordo com os padrões mais exigentes do mundo ocidental.",
  },
  {
    id: "boticario",
    brazilianTerm: "Grupo Boticário",
    category: "Empresas & Escala",
    contextPt: "Um dos maiores conglomerados de beleza e varejo omnichannel do mundo, operando mais de 50 marcas proprietárias e milhares de lojas físicas e digitais.",
    contextEn: "One of the world's largest beauty and retail conglomerates, managing 50+ consumer brands with thousands of physical stores and extensive e-commerce.",
    equivalents: {
      us: "Tier-1 Omnichannel Retail Conglomerate (similar in scale to Sephora or L'Oréal retail arms)",
      eu: "Major Pan-European Omnichannel Consumer Brand Conglomerate",
      ca: "National Multichannel Consumer & Cosmetics Retail Enterprise",
      au: "Major Consumer Retail Conglomerate with nationwide footprint",
      global: "Tier-1 Omnichannel Retail Conglomerate (50+ brands, millions of active accounts)",
    },
    spokenHookEn: "At Grupo Boticário, a multi-billion dollar omnichannel retail conglomerate managing over 50 consumer brands, I established the security architecture for digital retail platforms...",
    spokenHookPt: "No Grupo Boticário, um conglomerado multibilionário de varejo omnichannel que opera mais de 50 marcas de consumo, liderei a arquitetura de segurança das plataformas de e-commerce...",
    whyItWorksEn: "Explaining '50+ brands' and 'multi-billion dollar retail' gives foreign interviewers immediate comprehension of enterprise scale and organizational complexity.",
    whyItWorksPt: "Explicar '50+ marcas' e 'conglomerado multibilionário de varejo' transmite de pronto a magnitude e a complexidade que você gerenciava.",
  },
  {
    id: "ache",
    brazilianTerm: "Aché Laboratórios Farmacêuticos",
    category: "Empresas & Escala",
    contextPt: "Uma das maiores e mais inovadoras indústrias farmacêuticas do Brasil, sujeita a auditorias rigorosas de saúde e conformidade com Boas Práticas de Fabricação (GMP).",
    contextEn: "A top pharmaceutical enterprise developing proprietary formulas and healthcare products under FDA-grade quality and safety audits.",
    equivalents: {
      us: "Major Pharmaceutical Enterprise (operating under FDA/cGMP compliance standards)",
      eu: "Tier-1 European Pharmaceutical & Life Sciences Manufacturer (EMA/GxP compliant)",
      ca: "National Health Canada-regulated Pharmaceutical Enterprise",
      au: "TGA-regulated (Therapeutic Goods Administration) Pharmaceutical Manufacturer",
      global: "Heavily Regulated Life Sciences & Pharma Enterprise (FDA/GMP Compliance)",
    },
    spokenHookEn: "At Aché, a leading pharmaceutical and life sciences enterprise with strict regulatory audits, I acted as Platform TPM, implementing AI Copilots with Azure AI Foundry and Policy-as-Code to streamline architecture reviews...",
    spokenHookPt: "Na Aché, uma das principais indústrias farmacêuticas com auditorias de altíssima exigência, atuei como Platform TPM implementando copilotos de IA no Azure AI Foundry e Policy-as-Code...",
    whyItWorksEn: "Anchors your experience in life sciences and proprietary IP protection, showcasing modern GenAI governance in an audit-heavy industry.",
    whyItWorksPt: "Conecta sua bagagem à proteção de patentes e dados de saúde, demonstrando liderança prática em governança de GenAI sob regulação pesada.",
  },
  {
    id: "open_banking",
    brazilianTerm: "Open Finance / Open Banking Brasil",
    category: "Sistemas de Pagamento",
    contextPt: "Ecossistema regulatório de APIs abertas para interoperabilidade financeira com certificação FAPI (Financial-grade API) e mTLS.",
    contextEn: "Regulatory open API financial interoperability framework based on strict FAPI security profiles and mutual TLS.",
    equivalents: {
      us: "CFPB Section 1033 Open Banking Framework & FAPI Security Profile",
      eu: "PSD2 / PSD3 & Open Banking Implementation Entity (OBIE)",
      ca: "Consumer-Driven Banking Framework (Payments Canada)",
      au: "Consumer Data Right (CDR) for Banking",
      global: "FAPI-Compliant Open Banking & Open Finance Architecture",
    },
    spokenHookEn: "I designed the secure API architecture for Open Finance, adopting Financial-grade API (FAPI) profiles, mTLS, and distributed tokenization to ensure zero-trust interoperability...",
    spokenHookPt: "Desenhei a arquitetura segura de APIs para o Open Finance, adotando perfis FAPI (Financial-grade API), mTLS e tokenização distribuída com zero-trust...",
    whyItWorksEn: "FAPI and Open Banking are global standards; mentioning them signals that your API security expertise is globally certified.",
    whyItWorksPt: "FAPI e Open Banking são normas globais; mencioná-los valida imediatamente sua proficiência técnica internacional em segurança de APIs.",
  },
];


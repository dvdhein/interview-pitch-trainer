export type Language = "en" | "pt";

export type PracticeItem = {
  id: string;
  trackId?: string;
  trackLabel?: string;
  tag?: string;
  title: string;
  en: string;
  pt: string;
  tips?: string;
};

export type CVTrack = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  targetRole: string;
  sourceCvFile: string;
  description: string;
  itemIds: string[];
};

export const cvTracks: CVTrack[] = [
  {
    id: "all",
    badge: "VISÃO COMPLETA",
    title: "Todos os Pitches & Modelos",
    subtitle: "Acesso a todos os pitches de todas as personas",
    targetRole: "Executive / Solutions Architect / TPM / Principal Engineer",
    sourceCvFile: "Todos os modelos integrados",
    description:
      "Navegue livremente por todos os pitches desenvolvidos para os seus modelos de CV.",
    itemIds: [
      "first_intro",
      "executive",
      "technical",
      "ai",
      "the_ultimate_pitch",
      "tpm_platform",
      "solutions_aplin",
      "principal_turbi",
      "pix_scale",
      "brazil_exec_pitch",
      "pix_foreigners",
      "video_3min_pitch",
    ],
  },
  {
    id: "genai_tpm",
    badge: "🏆 O CAMPEÃO",
    title: "GenAI Governance & Platform TPM",
    subtitle:
      "Vagas Internacionais de Alto Impacto (Canadá, Irlanda, EUA) e Liderança de IA",
    targetRole: "GenAI Governance Lead / Platform TPM / Enterprise Architect",
    sourceCvFile: "David_Hein_Crem_CV_GenAI_Governance_EN.md",
    description:
      "Foco nas palavras-chave mais estratégicas: Emergent Architecture, GenAI Guardrails, Azure AI Foundry, Platform TPM e Jornada do Arquiteto.",
    itemIds: ["first_intro", "executive", "ai", "tpm_platform", "the_ultimate_pitch"],
  },
  {
    id: "solutions_architect",
    badge: "🎯 O TÁTICO",
    title: "Cyber Security Solutions Architect",
    subtitle: "Vagas Clássicas de Arquitetura de Soluções e Sistemas Híbridos",
    targetRole: "Solutions Architect / Enterprise Security Architect",
    sourceCvFile: "David_Hein_Crem_CV_Aplin_Solutions_Architect_EN.md",
    description:
      "Foco em desenho estrutural end-to-end, gestão de parceiros, SABSA/TOGAF, resiliência de sistemas e governança com ADRs.",
    itemIds: ["first_intro", "technical", "solutions_aplin", "executive"],
  },
  {
    id: "principal_engineer",
    badge: "🛡️ O ESPECIALISTA",
    title: "Principal Security Engineer (Hands-on)",
    subtitle: "Vagas Técnicas Avançadas de Engenharia, AppSec e DevSecOps",
    targetRole:
      "Principal Security Engineer / Staff Security Architect / DevSecOps Tech Lead",
    sourceCvFile: "David_Hein_Crem_CV_Turbi_Principal_Security_Engineer.md",
    description:
      "Foco na trincheira técnica: infraestrutura crítica (PIX/mTLS/HSMs), Kubernetes/GKE hardening, Full Cycle e Shift-left.",
    itemIds: ["first_intro", "principal_turbi", "pix_scale", "technical"],
  },
  {
    id: "brazil_executive",
    badge: "🇧🇷 LÍDER BRASIL",
    title: "Líder Executivo de Segurança — Brasil",
    subtitle: "Grandes Empresas Nacionais (Bancos, Farma, Varejo Omnichannel)",
    targetRole:
      "Especialista em Arquitetura / Head de Segurança / Tech Lead SI",
    sourceCvFile: "David_Hein_Crem_Curriculo_26_Updated_PT.md",
    description:
      "Trajetória sólida de 22+ anos conectando governança (BACEN, LGPD, PCI) a valor de negócio e liderança por influência.",
    itemIds: ["first_intro", "brazil_exec_pitch", "the_ultimate_pitch", "video_3min_pitch"],
  },
  {
    id: "international_culture",
    badge: "🌍 INTERNACIONAL",
    title: "Cultura Internacional & Behavioral (STAR)",
    subtitle:
      "Entrevistas para o Canadá e Irlanda (Empatia, CRAIC, Sistema PIX)",
    targetRole: "International Senior Architect / Lead",
    sourceCvFile: "preparacao_entrevista_tech_lead_si.md",
    description:
      "Comunicação não-violenta, como explicar o PIX em termos universais e respostas comportamentais no método STAR.",
    itemIds: ["first_intro", "pix_foreigners", "the_ultimate_pitch", "technical"],
  },
];

export const allPitches: PracticeItem[] = [
  {
    id: "first_intro",
    trackId: "all",
    trackLabel: "My First Introduction",
    tag: "30–45 SEC ELEVATOR PITCH",
    title: "My first introduction (Direct & natural)",
    en: "My name is David. I’m an Information Security Architect, and I have more than 22 years of experience in technology and cybersecurity. I have worked mainly in highly regulated industries, such as finance, healthcare, pharmaceuticals, and retail. In my current role, I work with security architecture, data protection, and AI security. I also work with AI Agents and Policy-as-Code to improve security governance. One of my strengths is solving complex problems and working with different teams. I also enjoy learning new technologies and finding practical solutions. Now, I’m looking for an opportunity where I can use my experience, continue learning, and contribute to the business. That’s a little about me.",
    pt: "Meu nome é David. Sou Arquiteto de Segurança da Informação e tenho mais de 22 anos de experiência em tecnologia e cibersegurança. Atuei principalmente em setores altamente regulados, como financeiro, saúde, farmacêutico e varejo. No meu papel atual, trabalho com arquitetura de segurança, proteção de dados e segurança de IA. Também atuo com Agentes de IA e Policy-as-Code para aprimorar a governança de segurança. Um dos meus pontos fortes é resolver problemas complexos e trabalhar com diferentes equipes. Também gosto de aprender novas tecnologias e encontrar soluções práticas. Agora, estou buscando uma oportunidade onde eu possa aplicar minha experiência, continuar aprendendo e gerar valor para o negócio. Essa é uma síntese sobre mim.",
    tips: "Sua apresentação direta, autêntica e conversacional de 30–45s. Perfeita para quebrar o gelo em qualquer entrevista ou triagem com recrutador.",
  },
  {
    id: "executive",
    trackId: "genai_tpm",
    trackLabel: "GenAI & TPM Leader",
    tag: "60–75 SEC",
    title: "Executive master pitch",
    en: "Throughout my 22-year career, a big part of my role is building solid enterprise architectures and protecting vital company assets. I've spent a lot of time in banking, healthcare, and retail — environments where security and uptime can make or break the business. I have strong skills and experience in securing modern platforms and enforcing industry standards like NIST and ISO 27001. My philosophy is simple: security should never get in the way of shipping products. I know how to turn policies into code and automated guardrails, so engineering teams can move fast with confidence. What sets me apart is that I am always ready to jump into complex challenges and lead teams through change. I also bring a continuous willingness to learn — whether that means mastering cloud security or using generative AI to streamline architecture reviews. In short, I bring technical depth, clear communication, and dependable leadership to your team.",
    pt: "Ao longo dos meus 22 anos de carreira, uma grande parte do meu papel é construir arquiteturas sólidas e proteger os ativos mais importantes da empresa. Atuei muito em bancos, saúde e varejo — setores onde segurança e disponibilidade são fundamentais para o negócio. Tenho sólidas habilidades e experiência em proteger plataformas modernas e fazer cumprir normas como NIST e ISO 27001. Mas a minha visão é prática: segurança não deve travar entregas. Eu sei como transformar políticas em código e guardrails automáticos, permitindo que a engenharia entregue rápido e com segurança. O que me diferencia é que estou sempre pronto para encarar desafios complexos e guiar o time em momentos de mudança. Além disso, trago uma constante disposição para aprender — seja dominando nuvem ou usando IA generativa para agilizar revisões técnicas. Em resumo, trago bagagem técnica sólida, facilidade de diálogo e liderança confiável.",
    tips: "Ideal para conversar com C-Level, Diretores e Gestores de Contratação. Foco em liderança, maturidade e visão habilitadora.",
  },
  {
    id: "technical",
    trackId: "solutions_architect",
    trackLabel: "Solutions Architect",
    tag: "ARCHITECTURE PANEL",
    title: "Technical solutions architect",
    en: "In my work as a solutions architect, a big part of my role is making sure our security directly supports business growth instead of blocking it. I am good at designing end-to-end architectures that keep systems safe while keeping developer velocity high. Over the years, I've learned how to enforce baseline security policies by working side-by-side with developers and cloud engineers. One of my strongest assets is taking high-level business risks and turning them into simple, concrete technical designs that protect data. What sets me apart is my ability to stay ahead of new technologies. Whether that means running structured threat modeling or building AI copilots to automate architecture reviews, I am always ready to solve hard problems and deliver real value.",
    pt: "No meu trabalho com arquitetura de soluções, uma grande parte do meu papel é garantir que a segurança ajude o negócio a crescer, em vez de ser um obstáculo. Sou muito bom em desenhar arquiteturas completas que protegem os sistemas e mantêm a velocidade dos desenvolvedores alta. Com o tempo, aprendi a aplicar boas práticas de segurança trabalhando lado a lado com os times de desenvolvimento e nuvem. Um dos meus maiores diferenciais é pegar riscos complexos de negócio e traduzir isso em soluções técnicas diretas que protegem nossos dados. O que me diferencia é minha capacidade de me manter à frente das novas tecnologias. Seja fazendo modelagem de ameaças ou criando copilotos com IA para automatizar revisões de arquitetura, estou sempre pronto para resolver problemas difíceis e gerar valor real.",
    tips: "Ideal para painéis técnicos com Principal Architects e Security Leads. Foco em equilíbrio entre velocidade e proteção.",
  },
  {
    id: "ai",
    trackId: "genai_tpm",
    trackLabel: "GenAI & AI Security",
    tag: "AI-FIRST ROLE",
    title: "AI security & modernization",
    en: "Right now, a big part of my role is bridging traditional cybersecurity with Artificial Intelligence. I have strong skills and experience in building secure pipelines for Large Language Models and protecting company data assets from leaks and emerging AI risks. I know how to enforce practical guardrails using tools like LangChain, Ollama, and Azure AI. At Aché, for example, I've learned how to build an AI copilot that automatically reviews architecture decision records. That cut our review times drastically and kept documentation quality consistently high. What sets me apart is combining real, hands-on AI work with over 20 years of enterprise architecture experience. I am always ready to help companies adopt AI safely, and my constant willingness to learn keeps me right on top of this fast-moving space.",
    pt: "Hoje, uma grande parte do meu papel é conectar a segurança da informação à Inteligência Artificial. Tenho sólidas habilidades e experiência em construir esteiras seguras para modelos de IA e proteger os ativos e dados da empresa contra vazamentos e novos riscos de IA. Eu sei como aplicar guardrails práticos usando ferramentas como LangChain, Ollama e Azure AI. Na Aché, por exemplo, aprendi a construir um copiloto de IA que revisa automaticamente documentos de arquitetura. Isso reduziu drasticamente o tempo de aprovação e manteve o padrão de qualidade lá em cima. O que me diferencia é juntar a prática direta com IA a mais de 20 anos de vivência em grandes empresas. Estou sempre pronto para ajudar o time a adotar IA com segurança, e minha constante disposição para aprender me mantém sempre atualizado nesse mercado que muda todo dia.",
    tips: "Ideal para vagas focadas em GenAI Governance, modernização de nuvem e segurança de LLMs.",
  },
  {
    id: "the_ultimate_pitch",
    trackId: "genai_tpm",
    trackLabel: "22-Year Journey",
    tag: "THE ULTIMATE PITCH (2 MIN)",
    title: "The Ultimate 2-minute pitch (Tell me about yourself)",
    en: "Over the last 22 years in highly regulated environments, my main goal has been to take security out of the department of NO. I believe security must be a business enabler, driven by frameworks like SABSA and TOGAF. For example, at Banco BV, I led the technical security design for national critical infrastructure like PIX and Open Banking, integrating controls like mTLS and HSMs without slowing down agility. Later, at Grupo Boticário, I acted as Specialist Solutions Architect for InfoSec across 50+ omnichannel brands, prospecting new solutions through PoCs and driving the Master Plan (PDSI). Today at Aché, I focus heavily on Emergent Architecture and the secure integration of Generative AI using Azure AI Foundry with multi-layer prompt sanitization. Furthermore, I act as Platform TPM for the Architect's Journey, applying Continuous Discovery to build instructional AI copilots that guide architects to design higher quality architectures. Ultimately, what I enjoy the most is leveraging Architecture-as-Code to automate governance, translating deep technical risks into actionable business insights.",
    pt: "Ao longo dos últimos 22 anos em ambientes altamente regulados, meu principal objetivo tem sido tirar a segurança do 'departamento do NÃO'. Acredito que segurança deve ser viabilizadora de negócios, orientada por SABSA e TOGAF. No Banco BV, por exemplo, liderei o desenho de segurança de infraestruturas nacionais críticas como PIX e Open Banking, integrando mTLS e HSMs sem travar a agilidade da engenharia. No Grupo Boticário, atuei como Arquiteto de Soluções Especialista em InfoSec para mais de 50 marcas, coordenando PoCs e apoiando o plano diretor de segurança (PDSI). Hoje na Aché, foco fortemente em Arquitetura Emergente e governança de GenAI com Azure AI Foundry e sanitização contra prompt injection. Além disso, atuo como Platform TPM da Jornada do Arquiteto, usando Descoberta Contínua para criar copilotos de IA que instruem arquitetos a desenhar soluções melhores. Em resumo, meu diferencial é usar Architecture-as-Code para automatizar governança e traduzir riscos técnicos em resultados práticos.",
    tips: "O pitch mais completo da sua carreira. Cobre filosofia, Banco BV, Boticário, Aché, TPM e IA Generativa.",
  },
  {
    id: "tpm_platform",
    trackId: "genai_tpm",
    trackLabel: "Platform TPM Track",
    tag: "PLATFORM TPM & ADOPTION",
    title: "Platform TPM & continuous discovery",
    en: "In my recent experience, my scope expanded from traditional security architecture to acting as a Technical Product Manager for our internal architecture platforms. I treat enterprise frameworks like the Architect's Journey as internal products. I am responsible for the full product lifecycle: running continuous discovery with solutions architects, analyzing their workflow friction, and prioritizing our roadmap using metrics and frameworks like RICE. We build custom AI skills that act as interactive copilots, instructing architects in real time on how to author higher quality Architecture Decision Records. My focus is always driving adoption, measuring efficiency gains, and ensuring technology platforms create measurable business value.",
    pt: "Na minha experiência recente, meu escopo se expandiu da arquitetura de segurança tradicional para a atuação como Technical Product Manager para as plataformas internas de arquitetura. Trato frameworks corporativos como a Jornada do Arquiteto como produtos internos. Sou responsável pelo ciclo de vida completo do produto: conduzindo descoberta contínua com os arquitetos de soluções, mapeando dores do dia a dia e priorizando nosso roadmap com métricas e o framework RICE. Construímos copilotos de IA instrucionais que orientam os arquitetos em tempo real a criar ADRs com mais qualidade. Meu foco é sempre impulsionar a adoção, medir ganhos de eficiência e garantir que a plataforma gere valor concreto ao negócio.",
    tips: "Destaque as palavras-chave de produto: Product Lifecycle, Continuous Discovery, Roadmap, Adoption Rate, RICE Framework.",
  },
  {
    id: "solutions_aplin",
    trackId: "solutions_architect",
    trackLabel: "Solutions Architect Aplin",
    tag: "ENTERPRISE SYSTEMS",
    title: "End-to-end enterprise solution architecture",
    en: "As a Cyber Security Solutions Architect, my focus is designing resilient end-to-end architectures across complex hybrid ecosystems. I evaluate current and future-state architectures, identify threat vectors using STRIDE and PASTA, and translate enterprise risk into concrete baseline controls across IAM, network segmentation, and cryptographic data protection. I author reusable architectural standards governed through Architecture Decision Records (ADRs) and C4 Model diagrams. My strength is aligning technical solutions with rigorous supervisory standards like NIST CSF, ISO 27001, and banking regulations, ensuring engineering teams can build scalable systems with compliance built-in from day one.",
    pt: "Como Arquiteto de Soluções de Cibersegurança, meu foco é desenhar arquiteturas resilientes de ponta a ponta em ecossistemas híbridos complexos. Avalio arquiteturas atuais e futuras, identifico vetores de ameaça usando STRIDE e PASTA, e traduzo riscos de negócio em controles objetivos de IAM, segmentação de rede e proteção criptográfica de dados. Estruturo padrões arquiteturais reutilizáveis via Architecture Decision Records (ADRs) e diagramação C4 Model. Minha força é alinhar soluções técnicas a normas rigorosas como NIST CSF, ISO 27001 e regulações financeiras, garantindo que a engenharia construa sistemas escaláveis com conformidade nativa.",
    tips: "Modelo ideal para vagas de Solutions Architect internacional (Aplin, consultorias e empresas globais).",
  },
  {
    id: "principal_turbi",
    trackId: "principal_engineer",
    trackLabel: "Principal Engineer",
    tag: "HANDS-ON PRINCIPAL LEAD",
    title: "Principal security engineer & DevSecOps lead",
    en: "I see myself as a hands-on Principal Security Engineer who bridges the gap between deep technical implementation and architectural vision. I have official Google Cloud certifications in GCP, GKE / Kubernetes, and Apigee API Security. Throughout my career, I've implemented DevSecOps automation right into CI/CD pipelines — embedding secret scanning, SAST, SCA, and Policy-as-Code via tools like Terraform and Open Policy Agent. I don't believe in gatekeeping; I believe in Golden Paths and Shift-Left security that makes doing the right thing the easiest path for developers. Whether it is container hardening, microsegmentation, or sub-second cryptographic signing, I sit side-by-side with engineers to build robust defenses.",
    pt: "Me vejo como um Principal Security Engineer que atua diretamente na trincheira técnica conectando a visão arquitetural à implementação real. Possuo certificações oficiais Google Cloud em GCP, GKE / Kubernetes e Apigee API Security. Ao longo da minha carreira, implementei automação DevSecOps direto nas esteiras de CI/CD — integrando detecção de segredos, SAST, SCA e Policy-as-Code com Terraform e OPA. Não acredito em burocracia de segurança; acredito em Golden Paths e Shift-Left que tornam o caminho seguro o mais fácil para o desenvolvedor. Seja fazendo hardening de contêineres, microsegmentação ou assinatura criptográfica de baixa latência, sento ao lado dos engenheiros para construir defesas sólidas.",
    tips: "Ideal para vagas como Turbi, Kraken, fintechs e big techs com foco em engenharia prática.",
  },
  {
    id: "pix_scale",
    trackId: "principal_engineer",
    trackLabel: "Critical Scale Track",
    tag: "FINTECH & HIGH SCALE",
    title: "National critical infrastructure (PIX, mTLS & HSMs)",
    en: "At Banco BV, I was the lead technical architect responsible for the security design of Brazil's national instant payment system (PIX), Open Banking, and our Banking-as-a-Service platform. This involved connecting into critical Central Bank infrastructure that processes hundreds of millions of transactions daily. The challenge was enforcing non-negotiable security controls — like mutual TLS (mTLS), Hardware Security Modules (HSMs) for cryptographic signing, and OAuth2 FAPI standards — while maintaining sub-second latency and absolute high availability. We passed every Central Bank regulatory audit smoothly while keeping developer velocity high.",
    pt: "No Banco BV, fui o arquiteto técnico responsável pelo desenho de segurança do PIX, Open Banking e da nossa plataforma de Banking-as-a-Service (BaaS). Isso exigiu conectar a infraestrutura crítica do Banco Central que processa centenas de milhões de transações diárias. O desafio era aplicar controles inegociáveis — como mTLS de ponta a ponta, HSMs (Hardware Security Modules) para assinatura criptográfica e padrões OAuth2 FAPI — mantendo latência abaixo de um segundo e alta disponibilidade contínua. Fomos aprovados em todas as auditorias regulatórias do BACEN mantendo a velocidade dos times de desenvolvimento.",
    tips: "Exemplo prático de maior escala da sua carreira. Mostra domínio de criptografia, pagamentos e resiliência.",
  },
  {
    id: "pix_foreigners",
    trackId: "international_culture",
    trackLabel: "International Track",
    tag: "EXPLAINING SCALE",
    title: "Explaining PIX to foreigners (Canada & Ireland)",
    en: "To give you some context, PIX is Brazil's national instant payment ecosystem, built and managed by our Central Bank. It operates 24/7 and processes hundreds of millions of transactions every single day, moving billions of dollars in real-time. Because it is the backbone of the country's economy, the security requirements are exceptionally high. For example, it requires strict mutual TLS (mTLS) for API communication, Hardware Security Modules (HSMs) for cryptographic keys, and sub-second latency for fraud detection. My role at Banco BV was to design the security architecture that allowed our bank to connect to this critical national infrastructure securely, without degrading performance or agility.",
    pt: "Para te dar um contexto, o PIX é o ecossistema nacional de pagamentos instantâneos do Brasil, criado e operado pelo nosso Banco Central. Ele funciona 24 horas por dia, 7 dias por semana, processando centenas de milhões de transações diárias e movimentando bilhões de dólares em tempo real. Por ser a espinha dorsal da economia do país, as exigências de segurança são altíssimas. Por exemplo, exige mTLS estrito para APIs, HSMs dedicados para chaves criptográficas e latência de milissegundos para prevenção a fraudes. Meu papel no Banco BV foi desenhar a arquitetura de segurança que conectou o banco a essa infraestrutura crítica nacional com total proteção e sem perder performance.",
    tips: "Use em entrevistas com recrutadores no exterior. Explica o conceito em 40 segundos sem se perder em termos locais.",
  },
  {
    id: "brazil_exec_pitch",
    trackId: "brazil_executive",
    trackLabel: "Mercado Brasil",
    tag: "LIDERANÇA BRASIL (2 MIN)",
    title: "Pitch de liderança técnica & corporativa (Brasil)",
    en: "I have worked in information security for over 22 years, spending most of that time in complex, highly regulated sectors like banking, pharmaceuticals, and omnichannel retail. What I have always championed throughout my career is taking security out of the tedious role of the department of NO and positioning it directly alongside software engineering. At Banco BV, I led the security design for PIX, Open Banking, and BaaS, combining APIs, mTLS, and HSMs without stalling engineering velocity. At Grupo Boticário and Aché, I modernized governance with Policy-as-Code, C4 Model, and ADRs in Azure Repos. I also lead GenAI security and develop AI copilots to streamline security reviews. I lead by influence, sitting side-by-side with engineers to build security as an enabler.",
    pt: "Trabalho com segurança da informação há mais de 22 anos, passando boa parte desse tempo em ambientes bem complexos e regulados, como bancos, indústria farmacêutica e varejo omnichannel. O que eu sempre busquei na minha carreira foi tirar a segurança daquele papel chato de 'departamento do NÃO' e trazê-la para o lado da engenharia de software. No Banco BV, fui o responsável técnico por desenhar a segurança de produtos críticos como PIX, Open Banking e BaaS, integrando APIs, mTLS e HSMs sem travar a agilidade da engenharia. No Grupo Boticário e na Aché, foquei em trazer governança automatizada via Policy-as-Code, C4 Model e documentação com ADRs no Azure Repos. Também tenho liderado a segurança para GenAI criando copilotos de IA para facilitar revisões técnicas. Minha liderança é por influência: sentar ao lado do time e construir segurança em parceria.",
    tips: "Tom conversacional, experiente e parceiro para headhunters e lideranças executivas no Brasil.",
  },
  {
    id: "video_3min_pitch",
    trackId: "brazil_executive",
    trackLabel: "Apresentação em Vídeo",
    tag: "SCRIPT DE VÍDEO (4 BLOCOS)",
    title: "Video presentation script (3 minutes)",
    en: "Block 1: Hi, my name is David Hein, and I am a Security Architecture and Tech Lead with over 22 years in regulated environments. My philosophy is simple: security should be a business enabler.\n\nBlock 2: At Banco BV, I designed security for national critical systems like PIX and Open Banking with mTLS and HSMs. At Grupo Boticário, I standardized security across a massive hybrid ecosystem with over 50 brands.\n\nBlock 3: At Aché, I modernize security through automation and AI, building custom AI agents with prompt boundaries and acting as Platform TPM for the Architect's Journey.\n\nBlock 4: Beyond technology, what I enjoy most is leading by influence, mentoring teams, and translating technical risks into clear business outcomes.",
    pt: "Bloco 1: Olá, meu nome é David Hein, sou Arquiteto de Segurança da Informação e Tech Lead com mais de 22 anos de experiência em setores regulados. Minha filosofia é simples: segurança deve ser viabilizadora de negócios.\n\nBloco 2: No Banco BV, desenhei a segurança de sistemas críticos como PIX e Open Banking com mTLS e HSMs. No Grupo Boticário, padronizei a segurança em um ecossistema híbrido com mais de 50 marcas.\n\nBloco 3: Na Aché, modernizo a segurança com automação e IA, construindo agentes com guardrails de proteção e atuando como Platform TPM na Jornada do Arquiteto.\n\nBloco 4: Além da tecnologia, o que mais me motiva é liderar por influência, mentorar desenvolvedores e traduzir riscos técnicos em decisões estratégicas de negócio.",
    tips: "Ritmo ideal de 130–140 palavras por minuto. Sorriso natural, contato visual com a câmera e respiração tranquila entre os 4 blocos.",
  },
];

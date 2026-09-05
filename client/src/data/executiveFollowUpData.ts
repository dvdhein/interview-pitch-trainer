export type STARStep = {
  label: string;
  en: string;
  pt: string;
};

export type ExecutiveFollowUpItem = {
  id: string;
  category: string;
  badge: string;
  questionEn: string;
  questionPt: string;
  recruiterFocusEn: string;
  recruiterFocusPt: string;
  starFramework: {
    situation: STARStep;
    task: STARStep;
    action: STARStep;
    result: STARStep;
  };
  sampleAnswerEn: string;
  sampleAnswerPt: string;
  mandatoryKeywords: string[];
};

export const executiveFollowUps: ExecutiveFollowUpItem[] = [
  {
    id: "pix_latency_audit",
    category: "Critical Banking Infrastructure",
    badge: "BANCO BV · PIX · BACEN",
    questionEn:
      "You mentioned designing the security architecture for Brazil's PIX system with mTLS and HSMs without slowing down agility. How did you maintain sub-second transaction latency while passing rigorous Central Bank audits?",
    questionPt:
      "Você mencionou desenhar a arquitetura de segurança do PIX com mTLS e HSMs sem travar a agilidade da engenharia. Como você manteve a latência de transação abaixo de um segundo e foi aprovado nas auditorias do BACEN?",
    recruiterFocusEn:
      "Evaluates cryptographic depth, performance vs security trade-offs, and experience with regulatory bodies (Central Bank).",
    recruiterFocusPt:
      "Avalia profundidade criptográfica, equilíbrio entre performance e proteção e relacionamento com órgãos reguladores (Banco Central).",
    starFramework: {
      situation: {
        label: "Situation (Cenário)",
        en: "Banco BV had to connect directly to the Central Bank's instant payment network, processing millions of transactions 24/7 with strict sub-second SLAs.",
        pt: "O Banco BV precisava se conectar à rede do BACEN para processar milhões de transações 24/7 com SLAs rigorosos de milissegundos.",
      },
      task: {
        label: "Task (Objetivo)",
        en: "Embed mutual TLS (mTLS), Hardware Security Modules (HSMs) for digital signing, and OAuth2 FAPI without introducing network bottlenecks.",
        pt: "Integrar mTLS de ponta a ponta, HSMs para assinatura digital e OAuth2 FAPI sem criar gargalos na esteira dos microsserviços.",
      },
      action: {
        label: "Action (Ação Técnica)",
        en: "Architected dedicated crypto-offloading clusters, established connection pooling for HSM sessions, and built automated canary security tests into CI/CD pipelines.",
        pt: "Desenhei clusters de offloading criptográfico, implementei connection pooling para sessões nos HSMs e automatizei testes de segurança canário no CI/CD.",
      },
      result: {
        label: "Result (Resultado)",
        en: "Achieved an average transaction signing latency under 45ms, passed 100% of Central Bank audits with zero non-conformances, and supported massive Black Friday peaks.",
        pt: "Atingimos latência de assinatura abaixo de 45ms, fomos aprovados em 100% das auditorias do BACEN sem apontamentos e suportamos picos recordes na Black Friday.",
      },
    },
    sampleAnswerEn:
      "When connecting Banco BV to the national PIX network, our primary challenge was ensuring cryptographic signing didn't degrade sub-second response times. I designed dedicated cryptographic offloading layers and persistent connection pools to our Hardware Security Modules (HSMs). For API communication, we enforced mutual TLS and FAPI-compliant tokens at the API gateway tier. By shifting compliance checks into CI/CD with automated Policy-as-Code, engineering teams deployed multiple times a day while meeting 100% of the Central Bank's regulatory requirements with zero audit findings.",
    sampleAnswerPt:
      "Ao conectar o Banco BV à rede do PIX, nosso principal desafio era garantir que a assinatura criptográfica não degradasse a resposta de milissegundos. Desenhei camadas dedicadas de offload criptográfico e pools persistentes de conexão para os HSMs. Na comunicação de APIs, aplicamos mTLS e tokens FAPI no gateway. Ao integrar testes automáticos de conformidade via Policy-as-Code nas esteiras de CI/CD, a engenharia continuou entregando várias vezes ao dia e passamos em 100% das auditorias do BACEN sem apontamentos.",
    mandatoryKeywords: ["mTLS", "HSM", "latency", "sub-second", "BACEN", "Central Bank", "OAuth2", "cryptographic"],
  },
  {
    id: "genai_guardrails_adrs",
    category: "AI Security & Modern Governance",
    badge: "ACHÉ · GENAI · AZURE AI FOUNDRY",
    questionEn:
      "How do your custom AI agents validate Architecture Decision Records (ADRs) against prompt boundaries, data leakage, and regulatory compliance?",
    questionPt:
      "Como seus agentes de IA validam registros de decisão de arquitetura (ADRs) na prática contra prompt injection, vazamento de dados e conformidade regulatória?",
    recruiterFocusEn:
      "Evaluates practical Generative AI security engineering, guardrails, LLM pipelines, and Architecture-as-Code maturity.",
    recruiterFocusPt:
      "Avalia engenharia prática de segurança para IA Generativa, guardrails de LLM e maturidade em Architecture-as-Code.",
    starFramework: {
      situation: {
        label: "Situation (Cenário)",
        en: "At Aché, solutions architects authored hundreds of ADRs, but manual peer reviews took weeks and often missed security edge-cases.",
        pt: "Na Aché, os arquitetos produziam centenas de ADRs, mas as revisões manuais levavam semanas e deixavam passar brechas sutis de segurança.",
      },
      task: {
        label: "Task (Objetivo)",
        en: "Automate architectural QA and security compliance using Generative AI without risking proprietary pharmaceutical formulas or prompt injection.",
        pt: "Automatizar a validação de arquitetura com IA Generativa sem expor segredos industriais nem sofrer ataques de prompt injection.",
      },
      action: {
        label: "Action (Ação Técnica)",
        en: "Deployed Azure AI Foundry with multi-layer prompt sanitization, developed custom LangChain agents trained on TOGAF and NIST CSF, and integrated automated PR reviews in Azure Repos.",
        pt: "Implementei Azure AI Foundry com sanitização em camadas contra prompt injection, criei agentes em LangChain calibrados com NIST e TOGAF, e integrei revisões automáticas de PR no Azure Repos.",
      },
      result: {
        label: "Result (Resultado)",
        en: "Reduced average ADR approval time from 14 days down to 4 hours, achieving 94% first-pass architectural compliance across 40+ engineering squads.",
        pt: "Reduzimos o tempo de aprovação de ADRs de 14 dias para menos de 4 horas, com 94% de conformidade de primeira em mais de 40 squads de engenharia.",
      },
    },
    sampleAnswerEn:
      "At Aché, manual architecture reviews were bottlenecking software delivery. To solve this safely, I engineered an instructional AI copilot deployed on Azure AI Foundry. We implemented strict multi-tier prompt sanitization to eliminate jailbreaking and data exfiltration risks. The agent parses submitted ADRs in Markdown directly in Azure Repos, validating them against our threat models, data classification rules, and ISO standards. It provides developers with actionable fix suggestions within minutes, cutting review cycles from two weeks to under four hours while keeping enterprise compliance ironclad.",
    sampleAnswerPt:
      "Na Aché, revisões manuais de arquitetura estavam travando as entregas. Para resolver isso com segurança, criei um copiloto de IA no Azure AI Foundry. Implementamos sanitização rigorosa contra injeção de prompts e vazamento de dados. O agente analisa os ADRs em Markdown direto nos Pull Requests do Azure Repos, comparando com nossos modelos de ameaças e normas ISO. Ele entrega sugestões práticas de correção em minutos, reduzindo o ciclo de revisão de 14 dias para menos de 4 horas com governança total.",
    mandatoryKeywords: ["Azure AI Foundry", "prompt sanitization", "ADR", "guardrails", "LangChain", "Policy-as-Code", "compliance"],
  },
  {
    id: "platform_tpm_discovery",
    category: "Product & Engineering Leadership",
    badge: "PLATFORM TPM · CONTINUOUS DISCOVERY",
    questionEn:
      "How did you expand from security architecture into a Platform Technical Product Manager? How do you measure adoption and developer velocity?",
    questionPt:
      "Como você expandiu da arquitetura técnica para atuar como Platform TPM? Como você mede a taxa de adoção e a velocidade dos desenvolvedores?",
    recruiterFocusEn:
      "Assesses product management acumen, developer experience (DevEx), and the ability to drive change through metrics rather than mandates.",
    recruiterFocusPt:
      "Avalia visão de produto, experiência do desenvolvedor (DevEx) e liderança por métricas em vez de regras engessadas.",
    starFramework: {
      situation: {
        label: "Situation (Cenário)",
        en: "Enterprise security frameworks often fail because developers find them too burdensome and circumvent mandatory checklists.",
        pt: "Frameworks corporativos de segurança frequentemente falham porque os desenvolvedores os acham burocráticos e tentam desviar das regras.",
      },
      task: {
        label: "Task (Objetivo)",
        en: "Treat the internal 'Architect's Journey' as a software product and build Golden Paths that developers actively want to adopt.",
        pt: "Tratar a 'Jornada do Arquiteto' como um produto de software e criar Golden Paths que os desenvolvedores queiram usar voluntariamente.",
      },
      action: {
        label: "Action (Ação Técnica)",
        en: "Conducted weekly Continuous Discovery interviews with solution architects, prioritized feature backlogs using the RICE framework, and built telemetry tracking adoption rates.",
        pt: "Conduzi entrevistas semanais de Descoberta Contínua com arquitetos, priorizei o roadmap com framework RICE e criei telemetria para medir a adoção.",
      },
      result: {
        label: "Result (Resultado)",
        en: "Boosted platform adoption to 92% across teams, reduced architectural rework by 40%, and elevated internal developer satisfaction (eNPS) to +68.",
        pt: "Elevamos a adoção da plataforma para 92%, reduzimos retrabalho arquitetural em 40% e alcançamos um NPS interno de desenvolvedores de +68.",
      },
    },
    sampleAnswerEn:
      "I believe internal architecture frameworks must be managed just like high-value commercial software products. In my role as Platform TPM for the Architect’s Journey, I conduct continuous discovery interviews with squads to map their daily friction points. I prioritize our feature backlog using the RICE framework—focusing on automating high-frequency tasks through Golden Paths and interactive AI skills. By tracking quantitative adoption metrics and developer sentiment, we achieved a 92% platform adoption rate and reduced architectural rework by 40%.",
    sampleAnswerPt:
      "Acredito que plataformas internas de arquitetura devem ser tratadas como produtos de software de alto valor. Como Platform TPM da Jornada do Arquiteto, realizo entrevistas semanais de Descoberta Contínua para mapear as dores dos times. Priorizo o roadmap com o framework RICE, focando em automatizar tarefas repetitivas via Golden Paths e copilotos de IA. Medindo taxas de adoção e sentimento dos desenvolvedores, alcançamos 92% de adoção voluntária e 40% de redução em retrabalho.",
    mandatoryKeywords: ["Platform TPM", "Continuous Discovery", "RICE", "adoption rate", "Golden Paths", "developer experience"],
  },
  {
    id: "boticario_multibrand_pci",
    category: "Enterprise Data Protection",
    badge: "GRUPO BOTICÁRIO · 50+ BRANDS · LGPD & PCI",
    questionEn:
      "At Grupo Boticário, you architected data protection across more than 50 brands. How did you standardize security baselines across such a massive hybrid cloud environment without creating silos?",
    questionPt:
      "No Grupo Boticário, você desenhou a proteção de dados para mais de 50 marcas. Como você padronizou a segurança em uma nuvem híbrida tão massiva sem criar silos organizacionais?",
    recruiterFocusEn:
      "Evaluates enterprise scale, sensitive data discovery (LGPD/PCI), hybrid cloud governance, and multi-brand organizational alignment.",
    recruiterFocusPt:
      "Avalia escala corporativa, descoberta de dados sensíveis (LGPD/PCI), governança em nuvem híbrida e alinhamento entre múltiplas marcas.",
    starFramework: {
      situation: {
        label: "Situation (Cenário)",
        en: "Grupo Boticário operates over 50 omnichannel retail brands, with heterogeneous legacy databases, disparate cloud providers, and strict LGPD/PCI mandates.",
        pt: "O Grupo Boticário opera mais de 50 marcas no varejo omnichannel, com bancos legados heterogêneos, múltiplos provedores de nuvem e exigências de LGPD e PCI.",
      },
      task: {
        label: "Task (Objetivo)",
        en: "Establish a unified Master Plan (PDSI) and automated data classification architecture to protect PII and payment data across all business units.",
        pt: "Construir um Plano Diretor de Segurança (PDSI) unificado e arquitetura de classificação de dados para proteger PII e cartões em todas as unidades.",
      },
      action: {
        label: "Action (Ação Técnica)",
        en: "Mapped data lifecycles using automated discovery tools, standardized IAM role-based access control, defined target hybrid cloud architectures, and conducted PoCs with tier-1 vendors.",
        pt: "Mapeei o ciclo de vida dos dados com ferramentas automatizadas, padronizei controles IAM de menor privilégio e liderei PoCs para homologar arquiteturas-alvo seguras.",
      },
      result: {
        label: "Result (Resultado)",
        en: "Classified 100% of sensitive customer repositories, achieved full LGPD and PCI DSS compliance across all brands, and established a reusable enterprise reference architecture.",
        pt: "Classificamos 100% dos repositórios de dados sensíveis de clientes, garantimos conformidade total com LGPD/PCI e criamos padrões reutilizáveis para o grupo.",
      },
    },
    sampleAnswerEn:
      "Managing security for over 50 brands requires governance that scales horizontally. At Grupo Boticário, I led the technical architecture for sensitive data protection under LGPD and PCI DSS standards. Rather than imposing rigid manual rules, I designed an automated data classification pipeline across our hybrid cloud and on-premises environments. We standardized zero-trust IAM baselines, network microsegmentation, and payload tokenization. This gave executive leadership unified risk visibility while empowering individual retail brand squads to operate independently with pre-approved reference architectures.",
    sampleAnswerPt:
      "Gerenciar a segurança para mais de 50 marcas exige governança que escale horizontalmente. No Grupo Boticário, liderei o desenho técnico para proteção de dados sensíveis sob LGPD e PCI DSS. Em vez de regras manuais engessadas, desenhei esteiras automatizadas de classificação de dados no ambiente híbrido. Padronizamos controle de acesso Zero Trust, microssegmentação e tokenização de dados de pagamento. Isso deu visibilidade unificada de risco para a diretoria, permitindo que cada marca inovasse com autonomia.",
    mandatoryKeywords: ["50 brands", "data protection", "LGPD", "PCI DSS", "zero trust", "hybrid cloud", "tokenization"],
  },
  {
    id: "department_of_no_culture",
    category: "Cultural Transformation & Influence",
    badge: "CULTURE · DEVSECOPS · LEADERSHIP",
    questionEn:
      "Security is often criticized as the 'department of NO.' Can you share a concrete example where engineering resisted a security policy, and how you turned that into an agile partnership?",
    questionPt:
      "A segurança é frequentemente criticada como o 'departamento do NÃO'. Conte um exemplo concreto onde a engenharia resistiu a uma norma e como você transformou isso em parceria ágil.",
    recruiterFocusEn:
      "Evaluates emotional intelligence, leadership by influence, conflict resolution, and modern DevSecOps mindset.",
    recruiterFocusPt:
      "Avalia inteligência emocional, liderança por influência, resolução de conflitos e mentalidade moderna de DevSecOps.",
    starFramework: {
      situation: {
        label: "Situation (Cenário)",
        en: "An engineering team building a high-priority customer portal rejected a mandatory container vulnerability scan because it repeatedly broke their release schedule.",
        pt: "Um time de engenharia construindo um portal crítico rejeitou o scan obrigatório de contêineres porque ele travava constantemente as entregas de produção.",
      },
      task: {
        label: "Task (Objetivo)",
        en: "Resolve the conflict, address the developers' frustration, and secure the container registry without sacrificing deployment velocity.",
        pt: "Resolver o atrito, eliminar a frustração dos desenvolvedores e proteger os contêineres sem comprometer a velocidade do deploy.",
      },
      action: {
        label: "Action (Ação Técnica)",
        en: "Sat down directly with the tech leads, analyzed false positives together, created pre-hardened distroless base images (Golden Paths), and moved vulnerability scans to IDE pull requests instead of the final release gate.",
        pt: "Sentei com os tech leads, analisei os falsos positivos juntos, criei imagens-base distroless pré-aprovadas (Golden Paths) e antecipei a validação para o Pull Request.",
      },
      result: {
        label: "Result (Resultado)",
        en: "Eliminated deployment pipeline failures, reduced container image vulnerabilities by 85%, and turned the team's tech lead into a security champion.",
        pt: "Eliminamos as falhas de pipeline no deploy, reduzimos 85% das vulnerabilidades das imagens e o próprio tech lead do time virou um promotor de segurança.",
      },
    },
    sampleAnswerEn:
      "My foundational philosophy is that security must enable the business, not block it. Early on, an engineering squad was frustrated because our container vulnerability scanning tool was blocking production releases due to low-severity noise. Instead of quoting security policy, I spent the afternoon pairing with their tech lead. We tuned the scanner, filtered out unexploitable false positives, and built pre-hardened, distroless base images that developers could adopt with a single line of Dockerfile code. By turning security into a frictionless 'Golden Path', we eliminated their deployment friction and reduced vulnerabilities by 85%.",
    sampleAnswerPt:
      "Minha filosofia central é que segurança deve viabilizar o negócio, nunca bloqueá-lo. Certa vez, um time de engenharia estava furioso porque a ferramenta de scan de contêineres travava os deploys por conta de ruídos de baixa severidade. Em vez de impor a política, passei a tarde programando junto com o tech lead do time. Ajustamos o scanner, eliminamos falsos positivos e criamos imagens-base distroless pré-aprovadas (Golden Paths) que eles adotaram com uma única linha de código. Tornamos o caminho seguro o mais fácil, acabamos com o atrito e reduzimos 85% das vulnerabilidades.",
    mandatoryKeywords: ["department of NO", "Golden Path", "partnership", "developers", "influence", "false positives", "DevSecOps"],
  },
];

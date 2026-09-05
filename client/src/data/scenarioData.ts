export type RoleplayScenario = {
  id: string;
  category:
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

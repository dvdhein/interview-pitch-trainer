export type SecurityControl = {
  id: string;
  name: string;
  threatMitigated: string;
  howToExplainEn: string;
  howToExplainPt: string;
  standardOrTech: string;
};

export type ControlCategory = {
  id?: string;
  category: string;
  tag: string;
  iconName: string;
  description: string;
  controls: SecurityControl[];
};

export const apiSecurityCategories: ControlCategory[] = [
  {
    category: "1. Gateway & Perímetro (Edge Security)",
    tag: "GATEWAY LAYER",
    iconName: "Shield",
    description:
      "Controles aplicados na borda e no API Gateway (Apigee / Kong / Envoy) antes da requisição atingir os microsserviços.",
    controls: [
      {
        id: "mtls",
        name: "mTLS (Mutual TLS)",
        threatMitigated:
          "Man-in-the-Middle (MitM), spoofing de parceiros e interceptação de tráfego.",
        howToExplainEn:
          "We enforce mutual TLS (mTLS) so both the client and server present X.509 certificates, authenticating the caller cryptographically before TLS handshake completes.",
        howToExplainPt:
          "Aplicamos mTLS de ponta a ponta para que cliente e servidor apresentem certificados digitais mútuos, validando a identidade antes do handshake TLS ser concluído.",
        standardOrTech: "TLS 1.3 / X.509 Certificates / BACEN PIX / FAPI",
      },
      {
        id: "rate-limiting",
        name: "Adaptive Rate Limiting & Quotas",
        threatMitigated:
          "DDoS de aplicação, brute-force de credenciais e consumo abusivo de recursos (OWASP API4).",
        howToExplainEn:
          "We implement dynamic rate limiting based on client IP and OAuth2 client ID, with burst throttling and spike arrest to protect downstream services.",
        howToExplainPt:
          "Configuramos rate limiting dinâmico por IP e por credencial OAuth2, com travas de pico (spike arrest) para proteger os microsserviços de exaustão.",
        standardOrTech: "Apigee SpikeArrest / Redis Token Bucket / WAF",
      },
      {
        id: "schema-validation",
        name: "Strict Contract Validation (OpenAPI)",
        threatMitigated:
          "Mass Assignment (OWASP API6), injection attacks e payloads corrompidos.",
        howToExplainEn:
          "The gateway validates request bodies directly against the OpenAPI (OAS) specification, rejecting any unexpected fields or malformed payloads at the edge.",
        howToExplainPt:
          "O gateway valida os payloads diretamente contra a especificação OpenAPI (OAS), descartando na borda campos inesperados ou parâmetros malformados.",
        standardOrTech: "OpenAPI 3.1 / JSON Schema / OAS Guardrails",
      },
    ],
  },
  {
    id: "auth",
    category: "2. Autenticação & Autorização (AuthN / AuthZ)",
    tag: "ZERO TRUST ACCESS",
    iconName: "Key",
    description:
      "Garantia de que o chamador é legítimo e possui autorização granular para acessar cada recurso individual.",
    controls: [
      {
        id: "fapi-oauth2",
        name: "OAuth 2.0 / OIDC com FAPI (Financial-grade API)",
        threatMitigated:
          "Roubo de token, replay attacks e impersonação de usuários.",
        howToExplainEn:
          "For critical transactions like Open Banking and PIX, we use FAPI-compliant profiles with signed JWTs (JWS), PKCE, and ephemeral token lifetimes.",
        howToExplainPt:
          "Para transações críticas, adotamos o perfil FAPI do OAuth2 com tokens JWT assinados digitalmente (JWS), validação PKCE e tempo de vida curto.",
        standardOrTech: "OAuth 2.0 / OIDC / FAPI 1.0 Advanced / RFC 8705",
      },
      {
        id: "bola-defense",
        name: "Mitigação de BOLA / IDOR (Broken Object Level Authorization)",
        threatMitigated:
          "Acesso indevido a dados de outro usuário alterando o ID na URL (OWASP API1 - Top Threat).",
        howToExplainEn:
          "We never trust object IDs passed in URL parameters. The backend validates whether the authenticated principal (JWT sub/claims) owns the requested object before fetching data.",
        howToExplainPt:
          "Nunca confiamos cegamente no ID do objeto na URL. O backend valida obrigatoriamente se o usuário autenticado no token JWT é o dono real daquele registro antes de retornar.",
        standardOrTech:
          "OWASP API1 / ABAC (Attribute-Based Access Control) / OPA",
      },
      {
        id: "bfla-defense",
        name: "Mitigação de BFLA (Broken Function Level Authorization)",
        threatMitigated:
          "Usuários comuns acessando endpoints administrativos (OWASP API5).",
        howToExplainEn:
          "Role and permission claims are verified at the gateway and controller level. Administrative endpoints require explicit elevated scopes that regular clients cannot request.",
        howToExplainPt:
          "Permissões e papéis são validados no gateway e nos controllers. Endpoints administrativos exigem scopes elevados que clientes comuns não conseguem obter.",
        standardOrTech:
          "OAuth Scopes / RBAC granular / Spring Security / ASP.NET Policy",
      },
    ],
  },
  {
    id: "data-sec",
    category: "3. Proteção de Dados & Criptografia (Data at Rest & Transit)",
    tag: "DATA PRIVACY",
    iconName: "Lock",
    description:
      "Salvaguarda de dados sensíveis (PII, dados de pagamento PCI e segredos industriais).",
    controls: [
      {
        id: "early-tokenization",
        name: "Tokenização & Mascaramento na Borda",
        threatMitigated:
          "Vazamento de cartões de crédito (PCI DSS) e dados pessoais (LGPD/GDPR).",
        howToExplainEn:
          "Sensitive data is tokenized immediately upon ingestion. Downstream microservices only handle synthetic tokens, keeping cleartext PII out of application logs and databases.",
        howToExplainPt:
          "Dados sensíveis são tokenizados imediatamente na entrada. Os microsserviços internos operam apenas com tokens sintéticos, eliminando PII em texto puro dos logs e bancos.",
        standardOrTech: "PCI DSS v4.0 / LGPD / Tokenization Engines / KMS",
      },
      {
        id: "hsm-custody",
        name: "Custódia Criptográfica em HSM (Hardware Security Module)",
        threatMitigated:
          "Comprometimento de chaves privadas de assinatura e de criptografia.",
        howToExplainEn:
          "Cryptographic keys used for API payload signing and token minting are generated and stored in dedicated HSMs with automatic lifecycle rotation.",
        howToExplainPt:
          "As chaves de assinatura de payloads e de emissão de tokens são custodiadas em HSMs dedicados, com rotação automática sem exposição das chaves privadas.",
        standardOrTech:
          "FIPS 140-2 Level 3 / Cloud HSM / AWS KMS / Azure Key Vault",
      },
    ],
  },
  {
    id: "devsecops",
    category: "4. Esteira DevSecOps & AppSec (Shift-Left Pipeline)",
    tag: "SDLC AUTOMATION",
    iconName: "Cpu",
    description:
      "Segurança automatizada dentro da esteira de CI/CD para que o código já chegue seguro à produção.",
    controls: [
      {
        id: "secret-scanning",
        name: "Secret Scanning em Pre-Commit & PR",
        threatMitigated:
          "Vazamento acidental de chaves de API, tokens e senhas no Git.",
        howToExplainEn:
          "We prevent credential leaks before code is committed using pre-commit hooks (TruffleHog/Gitleaks), blocking commits that contain unencrypted secrets.",
        howToExplainPt:
          "Evitamos vazamento de credenciais antes do commit usando hooks locais com TruffleHog e Gitleaks, bloqueando pushes com chaves ou senhas expostas.",
        standardOrTech: "Gitleaks / TruffleHog / GitHub Secret Scanning",
      },
      {
        id: "sast-sca",
        name: "SAST & SCA com SBOM (Software Bill of Materials)",
        threatMitigated:
          "Vulnerabilidades no código-fonte e dependências terceirizadas comprometidas (Log4j/OWASP).",
        howToExplainEn:
          "CI/CD pipelines run automated SAST (Semgrep) and dependency SCA (Trivy/Snyk) to generate an SBOM and fail the build if high-severity CVEs are introduced.",
        howToExplainPt:
          "A esteira executa SAST automático com Semgrep e SCA com Trivy para gerar o SBOM e reprovar o build caso bibliotecas com CVEs críticas sejam inseridas.",
        standardOrTech: "Semgrep / Trivy / Snyk / CycloneDX SBOM",
      },
      {
        id: "container-hardening",
        name: "Hardening de Contêineres (Distroless & Rootless)",
        threatMitigated:
          "Escape de contêiner e execução de binários maliciosos no Kubernetes.",
        howToExplainEn:
          "We package microservices in minimal Distroless images running as non-root users, applying Kubernetes Pod Security Standards and microsegmentation Network Policies.",
        howToExplainPt:
          "Empacotamos microsserviços em imagens mínimas Distroless rodando como usuário não-root, aplicando Pod Security Standards e Network Policies no Kubernetes.",
        standardOrTech: "Google Distroless / Kubernetes PSS / Calico / Cilium",
      },
    ],
  },
];

export const apiInterviewPitches = [
  {
    id: "api_security_master",
    title: "Master Pitch: Arquitetura de Segurança de APIs",
    tag: "API SECURITY PITCH",
    en: "When designing API security for high-scale enterprise ecosystems, my approach is centered on Defense-in-Depth. At the edge, we use API gateways like Apigee to enforce strict contract validation against OpenAPI specs, rate limiting to stop volumetric abuse, and end-to-end mutual TLS (mTLS). At the identity layer, we rely on OAuth 2.0 and OIDC with FAPI profiles, ensuring that authorization is validated down to the object level to eliminate BOLA and BFLA vulnerabilities. Finally, all sensitive payloads are tokenized before reaching downstream microservices. This guarantees that developer velocity stays high while our attack surface remains minimal.",
    pt: "Ao desenhar a segurança de APIs para ecossistemas de alta escala, minha abordagem é focada em Defesa em Profundidade. Na borda, usamos API Gateways como o Apigee para aplicar validação estrita de contratos OpenAPI, rate limiting para conter abusos e mTLS de ponta a ponta. Na camada de identidade, operamos com OAuth 2.0 e OIDC no perfil FAPI, garantindo que a autorização seja validada no nível do objeto para mitigar vulnerabilidades como BOLA e BFLA. Por fim, dados sensíveis são tokenizados antes de chegar aos microsserviços. Isso garante que a velocidade dos desenvolvedores se mantenha alta enquanto nossa superfície de ataque é minimizada.",
    tips: "Destaque: Apigee, Defesa em Profundidade, OpenAPI contracts, BOLA mitigation e FAPI.",
  },
  {
    id: "appsec_devsecops_pitch",
    title: "Master Pitch: DevSecOps & Golden Paths para Engenharia",
    tag: "APPSEC & PIPELINE",
    en: "My philosophy for Application Security is creating Golden Paths instead of gatekeeping. We shift security directly into the developer workflow. In the IDE and pre-commit hooks, we catch secrets using TruffleHog before they are pushed. In the CI/CD pipeline, automated SAST with Semgrep and SCA with Trivy scan the codebase and third-party dependencies against an SBOM, breaking the build only for actionable, high-severity CVEs. For container runtime, we enforce rootless Distroless images and Policy-as-Code via Open Policy Agent before infrastructure deploys. By making the secure path the easiest path, developers ship faster and security becomes a partner rather than a hurdle.",
    pt: "Minha filosofia para Segurança de Aplicações é criar 'Golden Paths' (caminhos pavimentados seguros) em vez de ser um guardião burocrático. Nós movemos a segurança diretamente para o dia a dia do desenvolvedor. Na IDE e em pre-commit, detectamos credenciais com TruffleHog antes do push. Na esteira de CI/CD, SAST automatizado com Semgrep e SCA com Trivy inspecionam o código e dependências gerando um SBOM, reprovando o build apenas para vulnerabilidades críticas reais. No runtime de contêineres, aplicamos imagens Distroless sem privilégios de root e Policy-as-Code com OPA antes do apply do Terraform. Ao tornar o caminho seguro o mais fácil, a engenharia entrega mais rápido e a segurança atua como parceira.",
    tips: "Destaque: Golden Paths, Shift-Left, Pre-commit hooks, Semgrep, Trivy, SBOM, Distroless e Policy-as-Code.",
  },
];

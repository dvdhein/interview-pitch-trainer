/* Design note: Editorial career studio — ivory paper, graphite ink, burnt coral voice cues, asymmetric study layout. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Headphones,
  Menu,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
  Clock,
  Award,
  ShieldAlert,
  Copy,
  Globe2,
} from "lucide-react";

import {
  allPitches,
  cvTracks,
  type CVTrack,
  type Language,
  type PracticeItem,
} from "../data/cvTracks";
import { InteractiveLab } from "../components/InteractiveLab";
import { RoleplayScenarios } from "../components/RoleplayScenarios";
import { ApiSecurityModule } from "../components/ApiSecurityModule";
import { CVTrackSelector } from "../components/CVTrackSelector";
import { SessionReportModal } from "../components/SessionReportModal";
import { VoiceComparisonStudio } from "../components/VoiceComparisonStudio";
import { ExecutiveFollowUpModule } from "../components/ExecutiveFollowUpModule";
import { InternationalMarketSelector } from "../components/InternationalMarketSelector";
import { GlobalLexiconModal } from "../components/GlobalLexiconModal";
import { InterviewRoundsModule } from "../components/InterviewRoundsModule";

// Q&A Original Preservado
const qa: PracticeItem[] = [
  {
    id: "q1",
    title: "What are your biggest strengths and your working style?",
    en: "One of my strongest assets is taking full ownership from start to finish. I am good at building trust with engineering teams so that security standards are adopted naturally and enforced without friction. My working style is practical, collaborative, and calm under pressure — I am always ready to dig in, solve the root cause, and make sure issues don't come back.",
    pt: "Um dos meus maiores diferenciais é assumir o compromisso de ponta a ponta. Sou muito bom em construir pontes com os desenvolvedores, fazendo com que as regras de segurança sejam aplicadas com naturalidade e sem atrito. Meu estilo de trabalho é prático, parceiro e tranquilo sob pressão — estou sempre pronto para arregaçar as mangas, resolver a raiz do problema e evitar retrabalho.",
  },
  {
    id: "q2",
    title: "Why are you a strong candidate for this position?",
    en: "I have strong skills and experience in securing hybrid cloud environments and protecting sensitive enterprise assets. I know how to take complex regulations — like BACEN, PCI, or ISO 27001 — and turn them into clear, sensible technical steps that developers can easily implement.",
    pt: "Tenho sólidas habilidades e experiência em proteger ambientes em nuvem e ativos de dados sensíveis. Eu sei como pegar normas cheias de detalhes — como BACEN, PCI ou ISO 27001 — e traduzi-las em passos simples e viáveis para quem está programando.",
  },
  {
    id: "q3",
    title: "How do you approach innovation and AI?",
    en: "A big part of my approach is using technology where it actually solves a real problem. I've learned how to build tools like AI review copilots and automated policy checks that save people hours of manual work. What sets me apart is my ability to experiment and innovate fast, while keeping corporate data strictly protected.",
    pt: "Uma grande parte da minha abordagem é usar tecnologia onde ela realmente resolve uma dor do dia a dia. Aprendi a criar ferramentas como copilotos de IA e validações automáticas que poupam horas de trabalho manual. O que me diferencia é minha capacidade de inovar com agilidade, mantendo os dados da empresa totalmente protegidos.",
  },
  {
    id: "q4",
    title: "What sets you apart from other candidates?",
    en: "What sets me apart is that I'm both a high-level architect and an active hands-on engineer. I don't just write guidelines — I've learned how to understand what developers go through and build solutions with them. Combined with a real willingness to learn, I bring both strategic thinking and practical execution.",
    pt: "O que me diferencia é que transito muito bem entre o desenho estratégico e a execução com a mão na massa. Eu não fico só desenhando diagramas — aprendi a entender o dia a dia de quem constrói e trabalhar junto com o time. Somando isso a uma enorme disposição para aprender, consigo unir visão de negócio com entrega prática.",
  },
];

const skills = [
  "Enterprise Security Architecture",
  "GenAI & AI Security",
  "Architecture-as-Code & ADRs",
  "GRC & Compliance",
  "Proteção de Dados & Criptografia",
  "Cloud, Application & API Security",
  "DevSecOps & Modelagem de Ameaças",
  "Liderança & Comunicação Executiva",
];

const career = [
  [
    "04.2025 — presente",
    "Aché Laboratórios Farmacêuticos",
    "Information Security Architect",
    "Modernização do pipeline de arquitetura, governança de ADRs, padrões seguros de GenAI e auditoria automatizada com Fitness Functions e Policy-as-Code.",
  ],
  [
    "06.2024 — 03.2025",
    "Independent Researcher",
    "Web3, Cripto & AI Security",
    "Pesquisa aplicada em agentes de IA, segurança de smart contracts, DeFi, custódia de ativos digitais e modelos regulatórios.",
  ],
  [
    "05.2022 — 05.2024",
    "Grupo Boticário",
    "Information Security Architecture Specialist II",
    "Arquitetura de soluções para InfoSec, prospecção tecnológica, PoCs, health checks e planejamento financeiro estratégico.",
  ],
  [
    "09.2019 — 05.2022",
    "Banco BV",
    "Senior Information Security Architect",
    "Controles de segurança para ambientes on-premises e cloud, alinhamento a NIST/CSA/CIS e arquitetura orientada a risco.",
  ],
  [
    "09.2014 — 09.2019",
    "Atento",
    "Senior Information Security Analyst",
    "Gestão de riscos sistêmicos, prevenção a fraudes, análise de incidentes, auditorias ISO 27001/PCI e treinamentos.",
  ],
  [
    "12.2011 — 09.2014",
    "LSI-TEC (USP)",
    "Information Security Consultant",
    "Consultoria técnica em segurança da informação, análise de riscos e revisão de segurança de software.",
  ],
];

const sixPillars = [
  {
    num: "01",
    title: "Builder + Defender Mindset",
    desc: "Segurança como viabilizador de negócio que acelera a engenharia em vez de bloqueá-la (Golden Paths e Shift-left).",
  },
  {
    num: "02",
    title: "C-Level Risk Translation",
    desc: "Capacidade comprovada de traduzir riscos técnicos em impacto financeiro, ROI e decisões executivas defensáveis.",
  },
  {
    num: "03",
    title: "Hands-on AI Innovation",
    desc: "Construção de agentes de IA e copilotos (Aché) para automatizar revisões de arquitetura e eliminar burocracias manuais.",
  },
  {
    num: "04",
    title: "Leadership by Influence",
    desc: "Conquista de confiança dos desenvolvedores através de mentoria, ADRs colaborativas e ferramentas que facilitam o dia a dia.",
  },
  {
    num: "05",
    title: "Always Ready & Calm",
    desc: "Antecipação proativa de ameaças (STRIDE/PASTA), mantendo serenidade e assertividade em incidentes de alta pressão.",
  },
  {
    num: "06",
    title: "Lifelong Learner",
    desc: "Capacidade ágil e autodidata de dominar novas ondas tecnológicas como GenAI, Web3 e Cloud Security.",
  },
];

const starters = [
  "A big part of my role is...",
  "I have strong skills and experience in...",
  "I know how to...",
  "One of my strongest assets is...",
  "I've learned how to...",
  "What sets me apart is...",
];

const ptStarters = [
  "Uma grande parte do meu papel é",
  "Tenho sólidas habilidades e experiência em",
  "Eu sei como",
  "Um dos meus maiores diferenciais é",
  "Aprendi a",
  "O que me diferencia é",
];

const promptQuestions = [
  "What skills do you have that will benefit our team?",
  "What would you say are your biggest strengths?",
  "Why do you think you’d be a good fit for this role?",
  "What makes me a strong candidate for this position?",
  "Can you tell me about your working style and what you do well?",
  "What do you bring to the table that others might not?",
  "What skills or experience do you have that would help you succeed in this role?",
];

type InterviewRound = {
  id: string;
  number: string;
  label: string;
  audience: string;
  purpose: string;
  looksFor: string[];
  context: { en: string; pt: string };
  guidance: { en: string; pt: string };
  pitchIds: string[];
  questions: string[];
};

const interviewRounds: InterviewRound[] = [
  {
    id: "hr",
    number: "01",
    label: "People & Culture",
    audience: "Recruiter / RH",
    purpose: "Validar aderência, comunicação, motivação e clareza de trajetória.",
    looksFor: ["Clareza", "Motivação", "Comunicação", "Fit cultural"],
    context: { en: "Keep it human and accessible. HR is mapping your story, motivation, communication style and expectations — not testing architecture depth yet.", pt: "Mantenha a conversa humana e acessível. O RH está entendendo sua história, motivação, comunicação e expectativas — ainda não é hora de mergulhar na arquitetura." },
    guidance: { en: "Lead with your 30–45 second introduction, then connect your experience to the kind of environment where you can contribute and keep learning.", pt: "Comece pela apresentação de 30–45 segundos e conecte sua experiência ao tipo de ambiente em que você pode contribuir e continuar aprendendo." },
    pitchIds: ["first_intro", "the_ultimate_pitch"],
    questions: ["Tell me about yourself.", "Why are you considering this opportunity?", "What kind of environment helps you do your best work?"]
  },
  {
    id: "manager",
    number: "02",
    label: "Hiring Manager",
    audience: "Gestor da área / Hiring Manager",
    purpose: "Entender como você gera resultado, influencia times e transforma risco em entrega.",
    looksFor: ["Impacto", "Autonomia", "Influência", "Prioridade"],
    context: { en: "Move from biography to value. The manager wants to see how your judgment, collaboration and delivery would improve the team’s current problems.", pt: "Saia da biografia e vá para o valor. O gestor quer entender como seu julgamento, colaboração e capacidade de entrega melhorariam os problemas atuais do time." },
    guidance: { en: "Use the executive pitch, explain security as an enabler, and anchor your claims in regulated environments, Policy-as-Code and measurable engineering velocity.", pt: "Use o pitch executivo, explique segurança como habilitadora e ancore sua resposta em ambientes regulados, Policy-as-Code e velocidade de engenharia." },
    pitchIds: ["executive", "resume_about_me", "brazil_exec_pitch"],
    questions: ["How would you create value in your first 90 days?", "How do you influence teams without direct authority?", "What makes your approach different?"]
  },
  {
    id: "technical",
    number: "03",
    label: "Technical Deep Dive",
    audience: "Painel técnico / Principal Architect / Security Lead",
    purpose: "Comprovar profundidade técnica, raciocínio arquitetural e capacidade de explicar trade-offs.",
    looksFor: ["Profundidade", "Trade-offs", "Risco", "Execução"],
    context: { en: "This is the evidence round. Expect follow-ups on architecture decisions, threat modeling, cloud/API security, resilience and how you work with engineers.", pt: "Esta é a rodada de evidências. Prepare-se para perguntas sobre decisões arquiteturais, modelagem de ameaças, segurança de cloud/API, resiliência e trabalho com engenharia." },
    guidance: { en: "Use the technical architect pitch, then switch to concrete cases: PIX, mTLS/HSMs, threat modeling, ADRs, guardrails and secure delivery paths.", pt: "Use o pitch de arquitetura técnica e siga para casos concretos: PIX, mTLS/HSMs, modelagem de ameaças, ADRs, guardrails e caminhos seguros de entrega." },
    pitchIds: ["technical", "principal_turbi", "pix_scale", "solutions_aplin"],
    questions: ["Walk me through a difficult architecture decision.", "How do you balance security and developer velocity?", "How would you threat-model this system?"]
  },
  {
    id: "executive",
    number: "04",
    label: "Executive Alignment",
    audience: "Diretor / VP / C-Level stakeholder",
    purpose: "Demonstrar maturidade, visão de negócio, síntese e capacidade de liderar mudança.",
    looksFor: ["Síntese", "Risco de negócio", "Liderança", "Visão"],
    context: { en: "Make the altitude change. Executives need business consequences, decision quality and confidence — not a long list of tools or controls.", pt: "Mude a altitude da conversa. A diretoria precisa entender consequências para o negócio, qualidade das decisões e confiança — não uma lista longa de ferramentas." },
    guidance: { en: "Open with the executive master pitch, quantify the business stakes, and frame AI governance as a way to increase speed with defensible risk decisions.", pt: "Abra com o pitch executivo, quantifique o impacto para o negócio e apresente governança de IA como forma de aumentar velocidade com decisões de risco defensáveis." },
    pitchIds: ["executive", "resume_about_me", "the_ultimate_pitch", "video_3min_pitch"],
    questions: ["How do you communicate security risk to the board?", "What would you change in our security operating model?", "How do you make innovation safe enough to scale?"]
  }
];

const reviewTerms = [
  "A big part of my role is",
  "I have strong skills and experience in",
  "I know how to",
  "One of my strongest assets is",
  "One of my strongest asset is",
  "I've learned how to",
  "What sets me apart is my ability to",
  "What sets me apart is",
  "I'm good at",
  "always ready",
  "willingness to learn",
  "building",
  "securing",
  "protecting",
  "enforcing",
  "assets",
  "sempre pronto",
  "disposição para aprender",
  "construir",
  "proteger",
  "fazer cumprir",
  "ativos",
  "sets me apart",
];

function renderBoldTerms(text: string) {
  const escaped = reviewTerms.map(term =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        reviewTerms.some(term => term.toLowerCase() === part.toLowerCase()) ? (
          <strong key={`${part}-${index}`} className="term-bold">
            {part}
          </strong>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </>
  );
}

function renderSpokenAnswer(text: string, language: Language) {
  const phraseList =
    language === "en"
      ? starters.map(phrase => phrase.replace("...", ""))
      : ptStarters;
  const phrase = phraseList.find(candidate =>
    text.toLowerCase().startsWith(candidate.toLowerCase())
  );
  if (!phrase) return renderBoldTerms(text);
  return (
    <>
      <mark className="starter-highlight">{text.slice(0, phrase.length)}</mark>
      {renderBoldTerms(text.slice(phrase.length))}
    </>
  );
}

function speak(
  text: string,
  lang: Language,
  speed: number,
  voice?: SpeechSynthesisVoice,
  onDone?: () => void,
  onBoundary?: (charIndex: number, progressPercent: number) => void
) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "en" ? "en-US" : "pt-BR";
  utterance.rate = speed;
  utterance.pitch = 1;
  if (voice) utterance.voice = voice;
  if (onDone) {
    utterance.onend = onDone;
    utterance.onerror = onDone;
  }
  if (onBoundary && text.length > 0) {
    utterance.onboundary = (e) => {
      const p = Math.min(100, Math.round((e.charIndex / text.length) * 100));
      onBoundary(e.charIndex, p);
    };
  }
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  const [section, setSection] = useState("pitches");
  const [activeRoundId, setActiveRoundId] = useState("hr");
  const [selectedTrackId, setSelectedTrackId] = useState("all");
  const [language, setLanguage] = useState<Language>("en");
  const [speed, setSpeed] = useState(0.9);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState(
    () => window.localStorage.getItem("pitch-studio-voice") ?? ""
  );
  const [activeId, setActiveId] = useState("first_intro");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [practice, setPractice] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Métricas de Sessão
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [spokenCount, setSpokenCount] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isLexiconOpen, setIsLexiconOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScoreUpdate = (correctDelta: number, totalDelta: number) => {
    setCorrectAnswers(prev => prev + correctDelta);
    setTotalAnswered(prev => prev + totalDelta);
  };

  const handleSpeechRecorded = () => {
    setSpokenCount(prev => prev + 1);
  };

  const handleResetSession = () => {
    setSessionSeconds(0);
    setCorrectAnswers(0);
    setTotalAnswered(0);
    setSpokenCount(0);
  };

  // Filtragem de pitches por modelo de CV selecionado
  const filteredPitches = useMemo(() => {
    if (selectedTrackId === "all") return allPitches;
    const track = cvTracks.find(t => t.id === selectedTrackId);
    if (!track) return allPitches;
    return allPitches.filter(item => track.itemIds.includes(item.id));
  }, [selectedTrackId]);

  const items = section === "pitches" ? filteredPitches : qa;

  // Garante item ativo válido ao trocar de filtro
  const active = useMemo(() => {
    const found = items.find(item => item.id === activeId);
    return found ?? items[0] ?? allPitches[0];
  }, [activeId, items]);
  const activeRound = interviewRounds.find(round => round.id === activeRoundId) ?? interviewRounds[0];
  const roundPitches = useMemo(() => activeRound.pitchIds.map(id => allPitches.find(item => item.id === id)).filter((item): item is PracticeItem => Boolean(item)), [activeRound]);
  const roundActive = roundPitches.find(item => item.id === activeId) ?? roundPitches[0] ?? allPitches[0];

  const voicesForLanguage = useMemo(
    () =>
      voices.filter(voice =>
        voice.lang.toLowerCase().startsWith(language === "en" ? "en" : "pt")
      ),
    [language, voices]
  );
  const activeVoice = useMemo(
    () =>
      voicesForLanguage.find(voice => voice.name === selectedVoiceName) ??
      voicesForLanguage.find(voice => voice.default) ??
      voicesForLanguage[0],
    [selectedVoiceName, voicesForLanguage]
  );

  useEffect(() => {
    const loadVoices = () =>
      setVoices(
        window.speechSynthesis
          ?.getVoices()
          .sort((a, b) => Number(b.default) - Number(a.default)) ?? []
      );
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (activeVoice && activeVoice.name !== selectedVoiceName)
      setSelectedVoiceName(activeVoice.name);
  }, [activeVoice, selectedVoiceName]);

  useEffect(() => {
    if (selectedVoiceName)
      window.localStorage.setItem("pitch-studio-voice", selectedVoiceName);
  }, [selectedVoiceName]);

  const handleSpeak = (item: PracticeItem = active) => {
    if (playingId === item.id) {
      window.speechSynthesis?.cancel();
      setPlayingId(null);
      setPlaybackProgress(0);
      return;
    }
    setActiveId(item.id);
    setPlayingId(item.id);
    setPlaybackProgress(0);
    speak(
      item[language],
      language,
      speed,
      activeVoice,
      () => {
        setPlayingId(null);
        setPlaybackProgress(0);
      },
      (_charIndex, progressPercent) => {
        setPlaybackProgress(progressPercent);
      }
    );
  };

  const handleTestVoice = () => {
    const testText =
      language === "en"
        ? "Hi, I'm David. I turn complex security risks into practical architecture."
        : "Olá, eu sou David. Transformo riscos complexos de segurança em arquitetura prática.";
    speak(testText, language, speed, activeVoice);
  };

  const goSection = (next: string) => {
    window.speechSynthesis?.cancel();
    setPlayingId(null);
    setPlaybackProgress(0);
    setSection(next);
    setMenuOpen(false);
    setMoreMenuOpen(false);
    if (next === "pitches") setActiveId("first_intro");
    if (next === "qa") setActiveId("q1");
    if (next === "rounds") setActiveRoundId("hr");
  };

  const mins = Math.floor(sessionSeconds / 60);
  const secs = sessionSeconds % 60;
  const sessionFormatted = `${mins}:${String(secs).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f5f0e7] text-[#292827]">
      <div className="paper-noise" />
      <header className="sticky top-0 z-30 border-b border-[#292827]/10 bg-[#f5f0e7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <button
            onClick={() => goSection("pitches")}
            className="group flex shrink-0 items-center gap-3 text-left"
            aria-label="Ir para início"
          >
            <img
              src="/pitch-mark.svg"
              alt="Pitch Studio Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-[-0.04em]">
                Pitch
              </span>
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#d96c4f]">
                Studio
              </span>
            </span>
          </button>

          {/* Navegação Principal Concisa (Sem Quebra) */}
          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Navegação principal"
          >
            {              [
              ["pitches", "Pitches"],
              ["rounds", "Rounds"],
              ["training", "Laboratório"],
              ["followups", "Follow-ups"],
              ["profile", "My Profile"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => goSection(id)}
                className={`nav-link ${section === id ? "nav-link-active" : ""}`}
              >
                {label}
              </button>
            ))}

            {/* Dropdown "Mais..." para tópicos complementares */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`nav-link inline-flex items-center gap-1.5 ${
                  ["qa", "apisec", "scenarios", "skills", "coach"].includes(section)
                    ? "nav-link-active text-[#292827]"
                    : ""
                }`}
              >
                Mais{" "}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-150 ${
                    moreMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {moreMenuOpen && (
                <div className="absolute left-0 top-full mt-3 w-56 rounded-[3px] border border-[#292827]/15 bg-[#f5f0e7] p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
                  {[
                    ["qa", "Quick Q&A"],
                    ["apisec", "API & AppSec"],
                    ["scenarios", "Cenários de Roleplay"],
                    ["skills", "Skill Map"],
                    ["coach", "Coach Notes"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => goSection(id)}
                      className={`block w-full rounded px-3 py-2 text-left text-xs font-extrabold uppercase tracking-wider transition ${
                        section === id
                          ? "bg-[#292827] text-white"
                          : "text-[#292827]/70 hover:bg-[#292827]/8 hover:text-[#292827]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Widgets de Sessão e Idioma */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Chips de Sessão */}
            <div className="hidden items-center gap-2 xl:flex">
              <span className="flex items-center gap-1.5 rounded-full border border-[#292827]/15 bg-white/40 px-3 py-1 text-[11px] font-bold text-[#292827]">
                <Clock size={12} className="text-[#d96c4f]" />{" "}
                {sessionFormatted}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#292827]/15 bg-white/40 px-3 py-1 text-[11px] font-bold text-[#292827]">
                ✔ {correctAnswers} / {totalAnswered}
              </span>
              <button
                onClick={() => setIsReportOpen(true)}
                className="rounded-full bg-[#292827] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#fffaf2] hover:bg-[#d96c4f]"
              >
                Relatório
              </button>
              <button
                onClick={() => setIsLexiconOpen(true)}
                className="flex items-center gap-1 rounded-full border border-[#d96c4f]/40 bg-[#d96c4f]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#d96c4f] hover:bg-[#d96c4f] hover:text-white transition"
                title="Dicionário de Termos Internacionais (BACEN, PIX, LGPD, etc.)"
              >
                <Globe2 size={11} /> Lexicon
              </button>
            </div>

            {/* Alternância EN / PT */}
            <div
              className="flex items-center rounded-full border border-[#292827]/15 p-1"
              aria-label="Idioma"
            >
              <button
                onClick={() => setLanguage("en")}
                className={`lang-btn ${language === "en" ? "lang-active" : ""}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("pt")}
                className={`lang-btn ${language === "pt" ? "lang-active" : ""}`}
              >
                PT
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="icon-btn lg:hidden"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="border-t border-[#292827]/10 bg-[#f5f0e7] px-5 py-3 lg:hidden">
            {              [
              ["pitches", "Master pitches"],
              ["rounds", "Interview rounds"],
              ["qa", "Quick Q&A"],
              ["apisec", "API & AppSec"],
              ["training", "Laboratório interativo"],
              ["scenarios", "Cenários de roleplay"],
              ["followups", "Follow-ups (Deep Dive)"],
              ["profile", "My profile"],
              ["skills", "Skill map"],
              ["coach", "Coach notes"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => goSection(id)}
                className="block w-full border-b border-[#292827]/10 py-3 text-left text-sm font-bold"
              >
                {label}
              </button>
            ))}
            <div className="mt-3 flex items-center justify-between pt-2">
              <span className="text-xs font-bold">
                Sessão: {sessionFormatted} · {correctAnswers}/{totalAnswered}{" "}
                acertos
              </span>
              <button
                onClick={() => {
                  setIsReportOpen(true);
                  setMenuOpen(false);
                }}
                className="rounded bg-[#292827] px-3 py-1 text-xs font-bold text-white"
              >
                Ver Relatório
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-20 lg:px-10">
        <section className="hero-grid relative overflow-hidden border-b border-[#292827]/10 py-14 lg:py-24">
          <div className="relative max-w-4xl">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> INTERVIEW REHEARSAL / 01
            </div>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.055em] text-[#292827] sm:text-7xl lg:text-[7.2rem]">
              Say it like
              <br />
              <em>you mean it.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#292827]/65 lg:text-lg">
              Um estúdio de ensaio para transformar experiência em respostas
              claras, naturais e prontas para a conversa.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#292827]/55">
              <span>David Hein Crem</span>
              <span className="text-[#d96c4f]">
                Information Security Architect
              </span>
              <span>GenAI Governance</span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleSpeak(allPitches[0])}
                className="coral-btn"
              >
                <Play size={16} fill="currentColor" /> Ouvir o pitch principal
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("practice")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-btn"
              >
                Ir direto para praticar <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="hero-note relative mt-14 max-w-sm lg:absolute lg:bottom-10 lg:right-8 lg:mt-0">
            <div className="note-line" />
            <span className="font-serif text-3xl leading-none">22</span>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#292827]/55">
              anos de arquitetura,
              <br />
              segurança e entrega
            </p>
          </div>
        </section>

        <div className="grid gap-10 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-8 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#292827]/45">
                Seu roteiro
              </div>
              {                [
                ["pitches", "01", "Master pitches"],
                ["rounds", "02", "Interview rounds"],
                ["qa", "03", "Quick Q&A"],
                ["apisec", "04", "API & AppSec"],
                ["training", "05", "Laboratório interativo"],
                ["scenarios", "06", "Cenários de roleplay"],
                ["followups", "07", "Follow-ups (Deep Dive)"],
                ["profile", "08", "My profile"],
                ["skills", "09", "Skill map"],
                ["coach", "10", "Coach notes"],
              ].map(([id, num, label]) => (
                <button
                  key={id}
                  onClick={() => goSection(id)}
                  className={`side-item ${section === id ? "side-active" : ""}`}
                >
                  <span>{num}</span>
                  {label}
                </button>
              ))}
              <div className="mt-16 border-t border-[#292827]/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="status-dot" /> Seu progresso
                </div>
                <div className="mt-3 h-1 overflow-hidden bg-[#292827]/10">
                  <div
                    className="h-full bg-[#d96c4f] transition-all duration-300"
                    style={{
                      width: `${totalAnswered > 0 ? Math.min(100, Math.round((totalAnswered / 20) * 100)) : 30}%`,
                    }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-[#292827]/50">
                  {totalAnswered} exercícios respondidos
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            {section === "rounds" ? (
              <InterviewRoundsModule
                language={language}
                onSelectPitch={pitchId => {
                  setActiveId(pitchId);
                  setSection("pitches");
                  setPractice(false);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                speakFn={(txt, lang, spd) => speak(txt, lang, spd, activeVoice)}
              />
            ) : section === "pitches" || section === "qa" ? (
              <>
                {/* Seletor de Mercado Internacional (Target Country Tuning) */}
                {section === "pitches" && (
                  <div className="mb-8">
                    <InternationalMarketSelector
                      language={language}
                      onOpenLexicon={() => setIsLexiconOpen(true)}
                      speakFn={(txt, lang, spd) => speak(txt, lang, spd, activeVoice)}
                    />
                  </div>
                )}
                <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#292827]/10 pb-6 sm:flex-row sm:items-end">
                  <div>
                    <div className="eyebrow">
                      {section === "pitches"
                        ? "01 / MASTER PITCHES"
                        : "02 / QUICK Q&A"}
                    </div>
                    <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                      {section === "pitches"
                        ? "Aberturas que soam como você."
                        : "Respostas para manter o ritmo."}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#292827]/55">
                    <Headphones size={15} /> áudio nativo do navegador
                  </div>
                </div>

                {/* Seletor de Modelo de CV (apenas em pitches) */}
                {section === "pitches" && (
                  <div className="mb-8">
                    <CVTrackSelector
                      selectedTrackId={selectedTrackId}
                      onSelectTrack={trackId => {
                        setSelectedTrackId(trackId);
                        const track = cvTracks.find(t => t.id === trackId);
                        if (track && track.itemIds.length > 0) {
                          setActiveId(track.itemIds[0]);
                        }
                      }}
                    />
                  </div>
                )}

                <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveId(item.id);
                          setPractice(false);
                        }}
                        className={`choice-card ${active.id === item.id ? "choice-active" : ""}`}
                      >
                        <span className="choice-number">0{index + 1}</span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
                            {item.tag ?? "QUESTION"}
                          </span>
                          <span className="mt-1 block text-sm font-bold leading-5">
                            {item.title}
                          </span>
                        </span>
                        <ChevronDown
                          className="ml-auto shrink-0 opacity-40"
                          size={16}
                        />
                      </button>
                    ))}
                  </div>
                  <article id="practice" className="answer-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="eyebrow">
                          {language === "en"
                            ? "ENGLISH / SPOKEN VERSION"
                            : "PORTUGUÊS / VERSÃO FALADA"}
                        </div>
                        <h3 className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
                          {active.title}
                        </h3>
                        {active.tips && (
                          <p className="mt-2 text-xs italic text-[#d96c4f]">
                            💡 {active.tips}
                          </p>
                        )}
                      </div>
                      <div
                        className="audio-bars"
                        data-playing={playingId === active.id}
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map(n => (
                          <i
                            key={n}
                            style={{ height: `${9 + (n % 4) * 4}px` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="loop-strip" aria-label="Ciclo de prática">
                      <span className="loop-step loop-current">
                        <b>01</b> escolher
                      </span>
                      <span className="loop-rule" />
                      <span className="loop-step">
                        <b>02</b> ouvir
                      </span>
                      <span className="loop-rule" />
                      <span className="loop-step">
                        <b>03</b> praticar
                      </span>
                      <span className="loop-rule" />
                      <span className="loop-step">
                        <b>04</b> seguir
                      </span>
                    </div>
                    <p
                      className={`answer-copy whitespace-pre-line ${practice ? "answer-blurred" : ""}`}
                    >
                      {renderSpokenAnswer(active[language], language)}
                    </p>
                    {practice && (
                      <div className="practice-overlay">
                        <Mic2 size={22} />
                        <strong>Agora é sua vez.</strong>
                        <span>
                          Fale seguindo a sequência: contexto → habilidade →
                          diferencial.
                        </span>
                      </div>
                    )}
                    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#292827]/10 pt-5">
                      <button
                        onClick={() => handleSpeak()}
                        className="coral-btn"
                      >
                        {playingId === active.id ? (
                          <Pause size={16} fill="currentColor" />
                        ) : (
                          <Volume2 size={16} />
                        )}{" "}
                        {playingId === active.id
                          ? "Pausar áudio"
                          : "Ouvir resposta"}
                      </button>
                      <button
                        onClick={() => setPractice(!practice)}
                        className="outline-btn"
                      >
                        {practice ? <BookOpen size={16} /> : <Mic2 size={16} />}{" "}
                        {practice ? "Mostrar resposta" : "Praticar sem olhar"}
                      </button>
                      <div className="voice-controls">
                        <label htmlFor="voice">Voz</label>
                        <select
                          id="voice"
                          value={activeVoice?.name ?? selectedVoiceName}
                          onChange={e => setSelectedVoiceName(e.target.value)}
                          className="voice-select"
                          disabled={!voicesForLanguage.length}
                        >
                          <option value="">
                            {voicesForLanguage.length
                              ? "Escolha uma voz"
                              : voices.length
                                ? "Sem voz para este idioma"
                                : "Voz padrão do navegador"}
                          </option>
                          {voicesForLanguage.map(voice => (
                            <option
                              key={`${voice.name}-${voice.lang}`}
                              value={voice.name}
                            >
                              {voice.name} · {voice.lang}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={handleTestVoice}
                          className="test-voice-btn"
                          title="Testar voz"
                          aria-label="Testar voz"
                        >
                          <Headphones size={14} />
                        </button>
                      </div>
                      <div className="speed-control">
                        <label htmlFor="speed">Ritmo</label>
                        <select
                          id="speed"
                          value={speed}
                          onChange={e => setSpeed(Number(e.target.value))}
                          className="speed-select"
                        >
                          <option value="0.75">0.75×</option>
                          <option value="0.9">0.9×</option>
                          <option value="1">1×</option>
                          <option value="1.15">1.15×</option>
                        </select>
                      </div>
                    </div>

                    {/* Barra de Progresso em Tempo Real (Speech Synthesis) */}
                    {playingId === active.id && (
                      <div className="mt-5 rounded border border-[#d96c4f]/25 bg-[#d96c4f]/8 p-3.5 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-bold text-[#292827]">
                          <span className="flex items-center gap-1.5 text-[#d96c4f]">
                            <Volume2 size={14} className="animate-pulse" /> Reproduzindo áudio do modelo em tempo real...
                          </span>
                          <span className="font-mono font-extrabold text-[#d96c4f]">{playbackProgress}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#292827]/10">
                          <div
                            className="h-full bg-gradient-to-r from-[#d96c4f] via-amber-500 to-emerald-500 transition-all duration-150"
                            style={{ width: `${playbackProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Estúdio de Gravação e Comparação A/B */}
                    <VoiceComparisonStudio
                      scriptText={active[language]}
                      language={language}
                      onAiPlay={() => handleSpeak()}
                      isAiPlaying={playingId === active.id}
                      aiProgressPercent={playingId === active.id ? playbackProgress : 0}
                    />
                  </article>
                </div>
                {section === "qa" && (
                  <div className="keyword-panel">
                    <div>
                      <div className="eyebrow">
                        QUESTION BANK / PERGUNTAS-CHAVE
                      </div>
                      <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">
                        Treine para reconhecer o que está sendo perguntado.
                      </h3>
                    </div>
                    <div className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                      {promptQuestions.map((question, index) => (
                        <div key={question} className="question-line">
                          <span>0{index + 1}</span>
                          <strong>{question}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 border-t border-[#292827]/10 pt-6">
                      <div className="eyebrow">
                        SENTENCE STARTERS / PALAVRAS DE APOIO
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {reviewTerms.slice(0, 7).map(term => (
                          <strong key={term} className="term-chip">
                            {term}
                          </strong>
                        ))}
                      </div>
                      <p className="mt-4 text-xs leading-5 text-[#292827]/55">
                        As expressões abaixo aparecem em negrito no texto falado
                        para facilitar a revisão visual.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : section === "apisec" ? (
              <ApiSecurityModule
                language={language}
                speakFn={(txt, lang, spd) => speak(txt, lang, spd, activeVoice)}
              />
            ) : section === "training" ? (
              <InteractiveLab
                onScoreUpdate={handleScoreUpdate}
                onSpeechRecorded={handleSpeechRecorded}
                speakFn={(txt, lang, spd) => speak(txt, lang, spd, activeVoice)}
              />
            ) : section === "scenarios" ? (
              <RoleplayScenarios
                language={language}
                speakFn={(txt, lang, spd) => speak(txt, lang, spd, activeVoice)}
                onRecordSpeech={handleSpeechRecorded}
              />
            ) : section === "followups" ? (
              <ExecutiveFollowUpModule
                language={language}
                speakFn={(txt, lang, spd, onEnd) =>
                  speak(txt, lang, spd, activeVoice, onEnd)
                }
                speed={speed}
                onRecordSpeech={handleSpeechRecorded}
              />
            ) : section === "profile" ? (
              <Profile
                language={language}
                speakFn={(txt, lang, spd, onEnd) =>
                  speak(txt, lang, spd, activeVoice, onEnd)
                }
                speed={speed}
              />
            ) : section === "skills" ? (
              <SkillMap />
            ) : (
              <CoachNotes />
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-[#292827]/10 px-5 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 text-xs text-[#292827]/50 sm:flex-row">
          <span>Interview Pitch Trainer · feito para falar, não decorar.</span>
          <span className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#d96c4f]" /> Breathe. Then
            begin.
          </span>
        </div>
      </footer>

      {/* Modal de Relatório de Sessão */}
      <SessionReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        correctAnswers={correctAnswers}
        totalAnswered={totalAnswered}
        spokenCount={spokenCount}
        sessionSeconds={sessionSeconds}
        onResetAll={handleResetSession}
      />

      {/* Modal de Dicionário Global de Termos Técnicos */}
      <GlobalLexiconModal
        isOpen={isLexiconOpen}
        onClose={() => setIsLexiconOpen(false)}
        language={language}
        speakFn={(txt, lang, spd) => speak(txt, lang, spd, activeVoice)}
      />
    </div>
  );
}

function Profile({
  language = "pt",
  speakFn,
  speed = 1,
}: {
  language?: Language;
  speakFn?: (text: string, lang: "en" | "pt", speed: number, onEnd?: () => void) => void;
  speed?: number;
}) {
  const [activeTab, setActiveTab] = useState<"story_en" | "story_pt" | "resume" | "intro">("story_en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const storyEN = `David is an Information Security Architect who has spent more than 22 years protecting mission-critical systems across highly regulated industries.

Early in his career, he worked deeply in the financial sector, where digital transactions were under the watchful eye of strict regulatory authorities like the Central Bank of Brazil. At Banco BV, David was the lead architect responsible for the security design of the country's national instant payment system — PIX — and Open Banking. In this high-stakes environment, millions of digital transactions moved in milliseconds. A single architectural vulnerability or latency bottleneck could paralyze national commerce. To guarantee absolute resilience, David worked relentlessly to embed non-negotiable cryptographic controls, mutual TLS, and Hardware Security Modules directly into high-throughput microservices — enabling the bank to pass rigorous Central Bank audits with zero disruptions to engineering agility.

Having mastered financial security at national scale, David brought his expertise into the omnichannel retail and pharmaceutical worlds. At Grupo Boticário, he architected data protection baselines across more than 50 brands, classifying sensitive consumer data and translating corporate risks into scalable target architectures.

However, modern healthcare and pharmaceutical manufacturing presented a cutting-edge frontier. At Aché Laboratórios Farmacêuticos, proprietary formulas, sensitive medical research, and strict regulatory standards demanded unprecedented digital vigilance. Yet, traditional security audits were too slow for modern agile engineering. Instead of acting as the proverbial "department of NO," David revolutionized how the enterprise handles governance.

He pioneered the adoption of Policy-as-Code and built custom AI agents designed to operate as 24/7 intelligent copilots. Working closely with enterprise architects and software development teams, David implemented multi-layered guardrails using Azure AI Foundry and prompt sanitization. These AI copilots automatically review Architecture Decision Records, instantly flagging architectural risks and regulatory non-compliance before a single line of insecure code reaches production. Acting as a Platform Technical Product Manager for the internal Architect’s Journey, he transformed complex security mandates into frictionless "Golden Paths" that developers actually love to follow.

Under David’s architectural guidance, security audits that once took weeks became automated in minutes, while regulatory compliance remained uncompromised. He proved that when security architects, engineering teams, and modern artificial intelligence work in true partnership, enterprise software can innovate at breakneck speed without ever leaving the company's vital assets exposed. Today, the resilient frameworks David built continue to serve as the gold standard for secure, modern engineering across highly regulated enterprises.`;

  const storyPT = `David é um Arquiteto de Segurança da Informação que dedicou mais de 22 anos à proteção de sistemas de missão crítica em setores altamente regulados.

Em uma etapa marcante de sua carreira, atuou no setor financeiro, onde transações digitais eram rigorosamente fiscalizadas pelo Banco Central do Brasil. No Banco BV, David foi o arquiteto líder responsável pelo desenho de segurança da infraestrutura do PIX e do Open Banking. Nesse cenário de altíssima exigência, milhões de transações digitais precisavam ser processadas em milissegundos. Qualquer falha arquitetural ou lentidão poderia paralisar serviços financeiros essenciais. Para assegurar resiliência total, David trabalhou na implementação de controles criptográficos avançados, mTLS e módulos de segurança em hardware (HSMs) diretamente em microsserviços de altíssima escala — permitindo que o banco superasse auditorias do BACEN com louvor, sem frear a velocidade da engenharia.

Com a experiência em segurança financeira consolidada, David expandiu sua atuação para os setores de varejo omnichannel e indústria farmacêutica. No Grupo Boticário, desenhou a arquitetura de proteção de dados para mais de 50 marcas, estruturando o mapeamento de informações sensíveis e traduzindo riscos de negócio em arquiteturas de referência escaláveis.

No entanto, o universo farmacêutico e de saúde trouxe desafios ainda mais modernos. Na Aché Laboratórios Farmacêuticos, fórmulas proprietárias, dados de pesquisa médica e exigências regulatórias rigorosas exigiam vigilância contínua. Ao mesmo tempo, auditorias manuais tradicionais eram lentas demais para os ciclos de desenvolvimento modernos. Em vez de posicionar a segurança como o 'departamento do NÃO', David transformou radicalmente a governança da empresa.

Ele liderou a implementação de Policy-as-Code e desenvolveu agentes inteligentes de Inteligência Artificial para atuar como copilotos 24 horas por dia. Trabalhando lado a lado com times de desenvolvimento e arquitetos, David implementou guardrails em camadas com o Azure AI Foundry e sanitização contra injeção de prompts. Esses copilotos de IA analisam registros de decisão de arquitetura (ADRs) em tempo real, alertando sobre riscos técnicos e desvios de conformidade antes mesmo do código ir para produção. Atuando como Platform TPM da Jornada do Arquiteto, ele transformou exigências regulatórias complexas em caminhos simples e atrativos ("Golden Paths") para os desenvolvedores.

Sob a liderança arquitetural de David, revisões de conformidade que antes levavam semanas passaram a ser validadas em poucos minutos, com total garantia de segurança. Ele demonstrou que, quando arquitetos de segurança, desenvolvedores e IA generativa trabalham em verdadeira parceria, a empresa consegue acelerar sua inovação com proteção absoluta de seus ativos. Hoje, as esteiras e soluções desenhadas por David permanecem como padrão de excelência para engenharia moderna em ecossistemas altamente regulados.`;

  const resumeBullets = [
    {
      labelEn: "Critical Systems & National Scale",
      labelPt: "Sistemas Críticos & Escala Nacional",
      descEn:
        "Led end-to-end security architecture for Brazil's instant payment ecosystem (PIX), Open Banking, and BaaS at Banco BV, integrating high-throughput microservices with mTLS, HSMs, and OAuth2/FAPI under Central Bank (BACEN) compliance.",
      descPt:
        "Liderança técnica na arquitetura de segurança do PIX, Open Banking e BaaS no Banco BV, integrando microsserviços de alta volumetria com mTLS, HSMs e OAuth2/FAPI sob conformidade BACEN.",
    },
    {
      labelEn: "GenAI & Policy-as-Code Innovation",
      labelPt: "Inovação em GenAI & Policy-as-Code",
      descEn:
        "AI Security pioneer at Aché Laboratórios Farmacêuticos. Implemented prompt sanitization via Azure AI Foundry and engineered custom AI Agents to automate Architecture Decision Record (ADR) reviews and security fitness functions.",
      descPt:
        "Pioneirismo em segurança de IA Generativa na Aché Laboratórios. Implementou sanitização com Azure AI Foundry e construiu Agentes de IA para automatizar revisões de ADRs e fitness functions de segurança.",
    },
    {
      labelEn: "Platform TPM & Continuous Discovery",
      labelPt: "Platform TPM & Descoberta Contínua",
      descEn:
        "Lead the internal Architect's Journey as Platform TPM, applying Continuous Discovery, RICE roadmap prioritization, and Golden Paths to eliminate developer friction and drive company-wide secure-by-design standards.",
      descPt:
        "Atuação como Platform TPM para a Jornada do Arquiteto, aplicando Descoberta Contínua, priorização RICE e Golden Paths para acelerar a adoção de padrões seguros pelos times de engenharia.",
    },
    {
      labelEn: "Leadership Philosophy",
      labelPt: "Filosofia de Liderança",
      descEn:
        "Proven ability to bridge deep technical engineering with executive business strategy, transforming security from a blocking department into an agile business enabler.",
      descPt:
        "Habilidade comprovada em conectar engenharia técnica profunda com estratégia executiva de negócios, transformando a segurança de barreira burocrática em viabilizadora de crescimento.",
    },
  ];

  const introText = {
    en: "My name is David. I’m an Information Security Architect, and I have more than 22 years of experience in technology and cybersecurity. I have worked mainly in highly regulated industries, such as finance, healthcare, pharmaceuticals, and retail. In my current role, I work with security architecture, data protection, and AI security. I also work with AI Agents and Policy-as-Code to improve security governance. One of my strengths is solving complex problems and working with different teams. I also enjoy learning new technologies and finding practical solutions. Now, I’m looking for an opportunity where I can use my experience, continue learning, and contribute to the business. That’s a little about me.",
    pt: "Meu nome é David. Sou Arquiteto de Segurança da Informação e tenho mais de 22 anos de experiência em tecnologia e cibersegurança. Atuei principalmente em setores altamente regulados, como financeiro, saúde, farmacêutico e varejo. No meu papel atual, trabalho com arquitetura de segurança, proteção de dados e segurança de IA. Também atuo com Agentes de IA e Policy-as-Code para aprimorar a governança de segurança. Um dos meus pontos fortes é resolver problemas complexos e trabalhar com diferentes equipes. Também gosto de aprender novas tecnologias e encontrar soluções práticas. Agora, estou buscando uma oportunidade onde eu possa aplicar minha experiência, continuar aprendendo e gerar valor para o negócio. Essa é uma síntese sobre mim.",
  };

  const currentTextToPlay =
    activeTab === "story_en"
      ? storyEN
      : activeTab === "story_pt"
      ? storyPT
      : activeTab === "resume"
      ? resumeBullets.map(b => `${b.labelEn}: ${b.descEn}`).join(". ")
      : introText.en;

  const currentLangToPlay = activeTab === "story_pt" ? "pt" : "en";

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }
    if (speakFn) {
      setIsPlaying(true);
      speakFn(currentTextToPlay, currentLangToPlay, speed, () =>
        setIsPlaying(false)
      );
    }
  };

  return (
    <div>
      <div className="eyebrow">05 / MY PROFILE</div>
      <h2 className="mt-3 max-w-3xl font-serif text-5xl tracking-[-0.04em]">
        Experiência que conecta risco, arquitetura e inovação.
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-7 text-[#292827]/65">
        David é um Information Security Architect com mais de 22 anos de
        carreira em ambientes regulados de finanças, saúde, farmacêutico e
        varejo. Seu foco combina Enterprise Security Architecture, governança de
        GenAI, Architecture-as-Code e decisões técnicas defensáveis.
      </p>

      {/* Stats Cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="profile-stat">
          <span>22+</span>
          <small>anos de carreira</small>
        </div>
        <div className="profile-stat">
          <span>6</span>
          <small>organizações no percurso</small>
        </div>
        <div className="profile-stat">
          <span>3</span>
          <small>setores regulados em foco</small>
        </div>
      </div>

      {/* NOVO: EXECUTIVE SPOTLIGHT & RESUME ABOUT ME */}
      <div className="mt-12 rounded-[4px] border border-[#292827]/18 bg-white/70 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292827]/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d96c4f]/12 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
              <Sparkles size={13} />
              Executive Spotlight & Resume "About Me"
            </div>
            <h3 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-[#292827] sm:text-3xl">
              The Story Behind the Architect (22 Anos de Missão Crítica)
            </h3>
            <p className="mt-1 text-xs text-[#292827]/65">
              Narrativa em estilo case study e resumo executivo para entrevistas, CV e apresentações de liderança.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="inline-flex items-center gap-2 rounded-[3px] bg-[#d96c4f] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#c25a3f]"
              title="Ouvir texto com voz sintetizada"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              {isPlaying ? "Parar áudio" : "Ouvir narração"}
            </button>
            <button
              onClick={() => handleCopy(currentTextToPlay)}
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#292827]/20 bg-white px-3 py-2 text-xs font-semibold text-[#292827] hover:bg-[#f5f0e7]"
              title="Copiar texto atual para a área de transferência"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>

        {/* Abas de Navegação do Profile Spotlight */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (isPlaying) window.speechSynthesis?.cancel();
              setIsPlaying(false);
              setActiveTab("story_en");
            }}
            className={`rounded-[3px] px-3.5 py-1.5 text-xs font-bold transition ${
              activeTab === "story_en"
                ? "bg-[#292827] text-[#f5f0e7]"
                : "border border-[#292827]/15 bg-white/50 text-[#292827]/70 hover:bg-white"
            }`}
          >
            🇬🇧 Executive Story (English)
          </button>
          <button
            onClick={() => {
              if (isPlaying) window.speechSynthesis?.cancel();
              setIsPlaying(false);
              setActiveTab("story_pt");
            }}
            className={`rounded-[3px] px-3.5 py-1.5 text-xs font-bold transition ${
              activeTab === "story_pt"
                ? "bg-[#292827] text-[#f5f0e7]"
                : "border border-[#292827]/15 bg-white/50 text-[#292827]/70 hover:bg-white"
            }`}
          >
            🇧🇷 Narrativa Executiva (Português)
          </button>
          <button
            onClick={() => {
              if (isPlaying) window.speechSynthesis?.cancel();
              setIsPlaying(false);
              setActiveTab("resume");
            }}
            className={`rounded-[3px] px-3.5 py-1.5 text-xs font-bold transition ${
              activeTab === "resume"
                ? "bg-[#292827] text-[#f5f0e7]"
                : "border border-[#292827]/15 bg-white/50 text-[#292827]/70 hover:bg-white"
            }`}
          >
            📋 Resume "About Me" (Bullets)
          </button>
          <button
            onClick={() => {
              if (isPlaying) window.speechSynthesis?.cancel();
              setIsPlaying(false);
              setActiveTab("intro");
            }}
            className={`rounded-[3px] px-3.5 py-1.5 text-xs font-bold transition ${
              activeTab === "intro"
                ? "bg-[#292827] text-[#f5f0e7]"
                : "border border-[#292827]/15 bg-white/50 text-[#292827]/70 hover:bg-white"
            }`}
          >
            ⚡ First Introduction (35–45s)
          </button>
        </div>

        {/* Badges de Destaque */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-bold text-[#292827]/70">
          <span className="rounded bg-[#292827]/6 px-2 py-0.5">Banco BV: PIX & mTLS/HSM</span>
          <span className="rounded bg-[#292827]/6 px-2 py-0.5">Boticário: 50+ Brands</span>
          <span className="rounded bg-[#292827]/6 px-2 py-0.5">Aché: Azure AI Foundry</span>
          <span className="rounded bg-[#292827]/6 px-2 py-0.5">Policy-as-Code & ADRs</span>
          <span className="rounded bg-[#292827]/6 px-2 py-0.5">Platform TPM</span>
        </div>

        {/* Conteúdo da Aba Selecionada */}
        <div className="mt-6 border-t border-[#292827]/10 pt-6">
          {activeTab === "story_en" && (
            <div className="space-y-4 font-sans text-sm leading-7 text-[#292827]/85">
              <p className="text-base font-bold text-[#292827]">
                David is an Information Security Architect who has spent more than 22 years protecting mission-critical systems across highly regulated industries.
              </p>
              <p>
                Early in his career, he worked deeply in the financial sector, where digital transactions were under the watchful eye of strict regulatory authorities like the Central Bank of Brazil. At <strong>Banco BV</strong>, David was the lead architect responsible for the security design of the country's national instant payment system—<strong>PIX</strong>—and Open Banking. In this high-stakes environment, millions of digital transactions moved in milliseconds. A single architectural vulnerability or latency bottleneck could paralyze national commerce. To guarantee absolute resilience, David worked relentlessly to embed non-negotiable cryptographic controls, <strong>mutual TLS (mTLS)</strong>, and <strong>Hardware Security Modules (HSMs)</strong> directly into high-throughput microservices—enabling the bank to pass rigorous Central Bank audits with zero disruptions to engineering agility.
              </p>
              <p>
                Having mastered financial security at national scale, David brought his expertise into the omnichannel retail and pharmaceutical worlds. At <strong>Grupo Boticário</strong>, he architected data protection baselines across more than 50 brands, classifying sensitive consumer data and translating corporate risks into scalable target architectures.
              </p>
              <p>
                However, modern healthcare and pharmaceutical manufacturing presented a cutting-edge frontier. At <strong>Aché Laboratórios Farmacêuticos</strong>, proprietary formulas, sensitive medical research, and strict regulatory standards demanded unprecedented digital vigilance. Yet, traditional security audits were too slow for modern agile engineering. Instead of acting as the proverbial "department of NO," David revolutionized how the enterprise handles governance.
              </p>
              <p>
                He pioneered the adoption of <strong>Policy-as-Code</strong> and built custom AI agents designed to operate as 24/7 intelligent copilots. Working closely with enterprise architects and software development teams, David implemented multi-layered guardrails using <strong>Azure AI Foundry</strong> and prompt sanitization. These AI copilots automatically review Architecture Decision Records (ADRs), instantly flagging architectural risks and regulatory non-compliance before a single line of insecure code reaches production. Acting as a <strong>Platform Technical Product Manager</strong> for the internal Architect’s Journey, he transformed complex security mandates into frictionless "Golden Paths" that developers actually love to follow.
              </p>
              <p className="rounded border-l-2 border-[#d96c4f] bg-[#d96c4f]/6 p-3 font-medium text-[#292827]">
                Under David’s architectural guidance, security audits that once took weeks became automated in minutes, while regulatory compliance remained uncompromised. He proved that when security architects, engineering teams, and modern artificial intelligence work in true partnership, enterprise software can innovate at breakneck speed without ever leaving the company's vital assets exposed. Today, the resilient frameworks David built continue to serve as the gold standard for secure, modern engineering across highly regulated enterprises.
              </p>
            </div>
          )}

          {activeTab === "story_pt" && (
            <div className="space-y-4 font-sans text-sm leading-7 text-[#292827]/85">
              <p className="text-base font-bold text-[#292827]">
                David é um Arquiteto de Segurança da Informação que dedicou mais de 22 anos à proteção de sistemas de missão crítica em setores altamente regulados.
              </p>
              <p>
                Em uma etapa marcante de sua carreira, atuou no setor financeiro, onde transações digitais eram rigorosamente fiscalizadas pelo Banco Central do Brasil. No <strong>Banco BV</strong>, David foi o arquiteto líder responsável pelo desenho de segurança da infraestrutura do <strong>PIX</strong> e do Open Banking. Nesse cenário de altíssima exigência, milhões de transações digitais precisavam ser processadas em milissegundos. Qualquer falha arquitetural ou lentidão poderia paralisar serviços financeiros essenciais. Para assegurar resiliência total, David trabalhou na implementação de controles criptográficos avançados, <strong>mTLS</strong> e módulos de segurança em hardware (<strong>HSMs</strong>) diretamente em microsserviços de altíssima escala — permitindo que o banco superasse auditorias do BACEN com louvor, sem frear a velocidade da engenharia.
              </p>
              <p>
                Com a experiência em segurança financeira consolidada, David expandiu sua atuação para os setores de varejo omnichannel e indústria farmacêutica. No <strong>Grupo Boticário</strong>, desenhou a arquitetura de proteção de dados para mais de 50 marcas, estruturando o mapeamento de informações sensíveis e traduzindo riscos de negócio em arquiteturas de referência escaláveis.
              </p>
              <p>
                No entanto, o universo farmacêutico e de saúde trouxe desafios ainda mais modernos. Na <strong>Aché Laboratórios Farmacêuticos</strong>, fórmulas proprietárias, dados de pesquisa médica e exigências regulatórias rigorosas exigiam vigilância contínua. Ao mesmo tempo, auditorias manuais tradicionais eram lentas demais para os ciclos de desenvolvimento modernos. Em vez de posicionar a segurança como o "departamento do NÃO", David transformou radicalmente a governança da empresa.
              </p>
              <p>
                Ele liderou a implementação de <strong>Policy-as-Code</strong> e desenvolveu agentes inteligentes de Inteligência Artificial para atuar como copilotos 24 horas por dia. Trabalhando lado a lado com times de desenvolvimento e arquitetos, David implementou guardrails em camadas com o <strong>Azure AI Foundry</strong> e sanitização contra injeção de prompts. Esses copilotos de IA analisam registros de decisão de arquitetura (ADRs) em tempo real, alertando sobre riscos técnicos e desvios de conformidade antes mesmo do código ir para produção. Atuando como <strong>Platform TPM da Jornada do Arquiteto</strong>, ele transformou exigências regulatórias complexas em caminhos simples e atrativos ("Golden Paths") para os desenvolvedores.
              </p>
              <p className="rounded border-l-2 border-[#d96c4f] bg-[#d96c4f]/6 p-3 font-medium text-[#292827]">
                Sob a liderança arquitetural de David, revisões de conformidade que antes levavam semanas passaram a ser validadas em poucos minutos, com total garantia de segurança. Ele demonstrou que, quando arquitetos de segurança, desenvolvedores e IA generativa trabalham em verdadeira parceria, a empresa consegue acelerar sua inovação com proteção absoluta de seus ativos. Hoje, as esteiras e soluções desenhadas por David permanecem como padrão de excelência para engenharia moderna em ecossistemas altamente regulados.
              </p>
            </div>
          )}

          {activeTab === "resume" && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {resumeBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="rounded-[3px] border border-[#292827]/12 bg-white/60 p-4 transition hover:bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-bold text-[#d96c4f]">
                        0{idx + 1}
                      </span>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#292827]">
                        {bullet.labelEn}
                      </h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#292827]/80">
                      {bullet.descEn}
                    </p>
                    <div className="mt-3 border-t border-[#292827]/8 pt-2 text-[11px] leading-relaxed text-[#292827]/60">
                      <strong>PT:</strong> {bullet.descPt}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-[3px] bg-[#292827]/5 p-4 text-xs text-[#292827]/75">
                💡 <strong>Dica para o CV:</strong> Copie estes 4 tópicos para o início do seu currículo em inglês (Professional Summary) ou na seção "Sobre" do LinkedIn para causar impacto imediato em recrutadores internacionais.
              </div>
            </div>
          )}

          {activeTab === "intro" && (
            <div className="space-y-4">
              <div className="rounded-[3px] border border-[#d96c4f]/30 bg-[#d96c4f]/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d96c4f]">
                    🇬🇧 Spoken English (35–45 seconds)
                  </span>
                  <span className="text-[11px] font-semibold text-[#292827]/50">
                    104 palavras · Ritmo conversacional
                  </span>
                </div>
                <p className="mt-3 font-serif text-lg leading-relaxed text-[#292827]">
                  "{introText.en}"
                </p>
              </div>

              <div className="rounded-[3px] border border-[#292827]/10 bg-white/50 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292827]/70">
                  🇧🇷 Versão Falada em Português
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[#292827]/80">
                  "{introText.pt}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Linha do Tempo da Carreira */}
      <div className="mt-14 border-t border-[#292827]/10 pt-10">
        <div className="eyebrow">CAREER TIMELINE</div>
        <div className="mt-5 space-y-0">
          {career.map(([period, company, role, detail]) => (
            <div key={company} className="career-row">
              <div className="career-period">{period}</div>
              <div>
                <h3 className="font-bold">{role}</h3>
                <p className="text-sm font-bold text-[#d96c4f]">{company}</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#292827]/60">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Os 6 Pilares de Diferenciação Estratégica */}
      <div className="mt-14 border-t border-[#292827]/10 pt-10">
        <div className="eyebrow">CORE DIFFERENTIATORS</div>
        <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">
          Os 6 Pilares Estratégicos que diferenciam David Hein:
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sixPillars.map(pillar => (
            <div
              key={pillar.num}
              className="rounded-[3px] border border-[#292827]/12 bg-white/40 p-5"
            >
              <span className="font-serif text-2xl text-[#d96c4f]">
                {pillar.num}
              </span>
              <h4 className="mt-1 text-sm font-extrabold text-[#292827]">
                {pillar.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#292827]/70">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-[#292827]/10 pt-6 text-sm text-[#292827]/60">
        <strong className="text-[#292827]">Formação:</strong> MBA em Information
        Security Management (IBTA, 2013) · Bacharelado em Data Processing (FAI
        Centro Universitário, 2011).
      </div>
    </div>
  );
}

function SkillMap() {
  return (
    <div>
      <div className="eyebrow">06 / SKILL MAP</div>
      <h2 className="mt-3 max-w-2xl font-serif text-5xl tracking-[-0.04em]">
        Sua experiência, organizada para aparecer.
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-7 text-[#292827]/65">
        Use esta lista como mapa mental. Em uma conversa, escolha dois ou três
        domínios e conecte-os a uma história prática.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {skills.map((skill, i) => (
          <div key={skill} className="skill-card">
            <span className="font-serif text-3xl text-[#d96c4f]/70">
              0{i + 1}
            </span>
            <span>
              <strong>{skill}</strong>
              <small>
                {i % 2 === 0
                  ? "Arquitetura · proteção · decisão"
                  : "Prática · colaboração · evolução"}
              </small>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-[2px] bg-[#292827] p-7 text-[#f5f0e7] sm:p-10">
        <div className="eyebrow text-[#f5f0e7]/50">FRASE DE TRANSIÇÃO</div>
        <p className="mt-4 max-w-2xl font-serif text-3xl leading-tight">
          “A big part of my role is connecting this technical depth to a
          business outcome.”
        </p>
      </div>
    </div>
  );
}

function CoachNotes() {
  return (
    <div>
      <div className="eyebrow">07 / COACH NOTES</div>
      <h2 className="mt-3 max-w-2xl font-serif text-5xl tracking-[-0.04em]">
        Não decore. Encontre o ritmo.
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          [
            "01",
            "Guarde a sequência",
            "Contexto → habilidade prática → diferencial.",
          ],
          [
            "02",
            "Respire nas pausas",
            "Uma pausa de um segundo depois de uma conquista importante.",
          ],
          [
            "03",
            "Fale como colega",
            "Caloroso, confiante e colaborativo — sem soar como um livro técnico.",
          ],
        ].map(([n, t, d]) => (
          <div key={n} className="coach-card">
            <span className="font-serif text-5xl text-[#d96c4f]">{n}</span>
            <h3 className="mt-12 text-base font-extrabold">{t}</h3>
            <p className="mt-3 text-sm leading-6 text-[#292827]/60">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3 border-y border-[#292827]/10 py-5 text-sm font-bold">
        <RotateCcw size={17} className="text-[#d96c4f]" /> Dica: faça uma
        tentativa sem olhar e só depois revise as palavras-chave.
      </div>
    </div>
  );
}

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
import { CVTrackSelector } from "../components/CVTrackSelector";
import { SessionReportModal } from "../components/SessionReportModal";

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
  onDone?: () => void
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
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  const [section, setSection] = useState("pitches");
  const [selectedTrackId, setSelectedTrackId] = useState("all");
  const [language, setLanguage] = useState<Language>("en");
  const [speed, setSpeed] = useState(0.9);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState(
    () => window.localStorage.getItem("pitch-studio-voice") ?? ""
  );
  const [activeId, setActiveId] = useState("executive");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [practice, setPractice] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Métricas de Sessão
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [spokenCount, setSpokenCount] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);

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
      return;
    }
    setActiveId(item.id);
    setPlayingId(item.id);
    speak(item[language], language, speed, activeVoice, () =>
      setPlayingId(null)
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
    setSection(next);
    setMenuOpen(false);
    if (next === "pitches") setActiveId("executive");
    if (next === "qa") setActiveId("q1");
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
            className="group flex items-center gap-3 text-left"
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

          {/* Navegação Principal Expandida */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Navegação principal"
          >
            {[
              ["pitches", "Master pitches"],
              ["qa", "Quick Q&A"],
              ["training", "Laboratório interativo"],
              ["scenarios", "Cenários de roleplay"],
              ["profile", "My profile"],
              ["skills", "Skill map"],
              ["coach", "Coach notes"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => goSection(id)}
                className={`nav-link ${section === id ? "nav-link-active" : ""}`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Widgets de Sessão e Idioma */}
          <div className="flex items-center gap-3">
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
            {[
              ["pitches", "Master pitches"],
              ["qa", "Quick Q&A"],
              ["training", "Laboratório interativo"],
              ["scenarios", "Cenários de roleplay"],
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
              {[
                ["pitches", "01", "Master pitches"],
                ["qa", "02", "Quick Q&A"],
                ["training", "03", "Laboratório interativo"],
                ["scenarios", "04", "Cenários de roleplay"],
                ["profile", "05", "My profile"],
                ["skills", "06", "Skill map"],
                ["coach", "07", "Coach notes"],
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
            {section === "pitches" || section === "qa" ? (
              <>
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
            ) : section === "profile" ? (
              <Profile />
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
    </div>
  );
}

function Profile() {
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

      {/* Linha do Tempo da Carreira */}
      <div className="mt-12">
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

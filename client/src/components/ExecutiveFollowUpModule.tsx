import { useState } from "react";
import {
  HelpCircle,
  Award,
  Play,
  Pause,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import {
  executiveFollowUps,
  type ExecutiveFollowUpItem,
} from "../data/executiveFollowUpData";
import { VoiceComparisonStudio } from "./VoiceComparisonStudio";

type ExecutiveFollowUpModuleProps = {
  language: "en" | "pt";
  speakFn: (text: string, lang: "en" | "pt", speed: number, onEnd?: () => void) => void;
  speed?: number;
  onRecordSpeech?: () => void;
};

export function ExecutiveFollowUpModule({
  language,
  speakFn,
  speed = 1,
  onRecordSpeech,
}: ExecutiveFollowUpModuleProps) {
  const [selectedId, setSelectedId] = useState<string>(executiveFollowUps[0].id);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showStarDetails, setShowStarDetails] = useState(true);

  const activeItem =
    executiveFollowUps.find((item) => item.id === selectedId) ||
    executiveFollowUps[0];

  const handleTogglePlaySample = () => {
    if (playingId === activeItem.id) {
      window.speechSynthesis?.cancel();
      setPlayingId(null);
      return;
    }
    const textToSpeak =
      language === "en" ? activeItem.sampleAnswerEn : activeItem.sampleAnswerPt;
    setPlayingId(activeItem.id);
    speakFn(textToSpeak, language, speed, () => setPlayingId(null));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow">04 / EXECUTIVE DRILL-DOWN QUESTIONS</div>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          Perguntas de Aprofundamento: Defenda sua Trajetória.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#292827]/65">
          Após ouvirem o seu <strong>Executive Spotlight</strong> ou <strong>Resume About Me</strong>, entrevistadores experientes e C-Levels fazem perguntas profundas para testar a sua autoridade técnica e liderança. Treine respostas no método <strong>STAR</strong> com gravação de voz e transcrição em tempo real.
        </p>
      </div>

      {/* Selector de Cenários */}
      <div className="flex flex-wrap gap-2">
        {executiveFollowUps.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (playingId) window.speechSynthesis?.cancel();
                setPlayingId(null);
                setSelectedId(item.id);
              }}
              className={`rounded-[3px] px-3.5 py-2 text-left text-xs font-bold transition ${
                isSelected
                  ? "bg-[#292827] text-[#f5f0e7] shadow-sm"
                  : "border border-[#292827]/15 bg-white/60 text-[#292827]/70 hover:bg-white"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-wider text-[#d96c4f]">
                {item.badge}
              </span>
              <span className="mt-0.5 block truncate max-w-[200px] sm:max-w-none">
                {item.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Card Principal da Pergunta Selecionada */}
      <div className="rounded-[4px] border border-[#292827]/18 bg-white/80 p-6 shadow-sm sm:p-8">
        {/* Topo do Card */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#292827]/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d96c4f]/12 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
              <HelpCircle size={13} />
              {activeItem.badge}
            </div>
            <h3 className="mt-3 font-serif text-2xl tracking-tight text-[#292827] sm:text-3xl">
              {language === "en" ? activeItem.questionEn : activeItem.questionPt}
            </h3>
            <p className="mt-1 text-sm italic text-[#292827]/60">
              {language === "en" ? `PT: "${activeItem.questionPt}"` : `EN: "${activeItem.questionEn}"`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlaySample}
              className="inline-flex items-center gap-2 rounded-[3px] bg-[#d96c4f] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#c25a3f]"
              title="Ouvir resposta modelo recomendada"
            >
              {playingId === activeItem.id ? (
                <Pause size={14} />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
              {playingId === activeItem.id ? "Pausar Resposta" : "Ouvir Resposta Modelo"}
            </button>
          </div>
        </div>

        {/* Intenção do Recrutador / O que está sendo avaliado */}
        <div className="mt-5 rounded-[3px] border border-[#292827]/10 bg-[#f5f0e7]/50 p-4 text-xs leading-relaxed text-[#292827]/75">
          <strong className="text-[#292827]">🎯 O que o entrevistador quer avaliar:</strong>{" "}
          {language === "en" ? activeItem.recruiterFocusEn : activeItem.recruiterFocusPt}
        </div>

        {/* Framework STAR Breakdown */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#292827]/60">
              Framework de Resposta STAR (Estrutura Recomendada)
            </h4>
            <button
              onClick={() => setShowStarDetails((prev) => !prev)}
              className="text-xs font-bold text-[#d96c4f] hover:underline"
            >
              {showStarDetails ? "Ocultar Estrutura" : "Ver Estrutura STAR"}
            </button>
          </div>

          {showStarDetails && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Situation */}
              <div className="rounded-[3px] border border-[#292827]/10 bg-white p-3.5">
                <span className="font-serif text-sm font-bold text-[#d96c4f]">
                  S · Situation
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#292827]/80">
                  {language === "en"
                    ? activeItem.starFramework.situation.en
                    : activeItem.starFramework.situation.pt}
                </p>
              </div>

              {/* Task */}
              <div className="rounded-[3px] border border-[#292827]/10 bg-white p-3.5">
                <span className="font-serif text-sm font-bold text-[#d96c4f]">
                  T · Task
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#292827]/80">
                  {language === "en"
                    ? activeItem.starFramework.task.en
                    : activeItem.starFramework.task.pt}
                </p>
              </div>

              {/* Action */}
              <div className="rounded-[3px] border border-[#292827]/10 bg-white p-3.5">
                <span className="font-serif text-sm font-bold text-[#d96c4f]">
                  A · Action
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#292827]/80">
                  {language === "en"
                    ? activeItem.starFramework.action.en
                    : activeItem.starFramework.action.pt}
                </p>
              </div>

              {/* Result */}
              <div className="rounded-[3px] border border-[#292827]/10 bg-white p-3.5">
                <span className="font-serif text-sm font-bold text-[#d96c4f]">
                  R · Result
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#292827]/80">
                  {language === "en"
                    ? activeItem.starFramework.result.en
                    : activeItem.starFramework.result.pt}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Resposta Completa Modelo */}
        <div className="mt-6 rounded-[3px] border-l-2 border-[#d96c4f] bg-[#d96c4f]/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d96c4f]">
              🗣️ Exemplo de Resposta Pronta (Fluida & Executiva)
            </span>
            <span className="text-[11px] font-semibold text-[#292827]/50">
              Ideal para 45–60 segundos
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#292827]">
            "{language === "en" ? activeItem.sampleAnswerEn : activeItem.sampleAnswerPt}"
          </p>
        </div>

        {/* Gravador e Comparador A/B Embutido */}
        <VoiceComparisonStudio
          scriptText={
            language === "en"
              ? activeItem.sampleAnswerEn
              : activeItem.sampleAnswerPt
          }
          language={language}
          onAiPlay={handleTogglePlaySample}
          isAiPlaying={playingId === activeItem.id}
          aiProgressPercent={playingId === activeItem.id ? 100 : 0}
          mandatoryKeywords={activeItem.mandatoryKeywords}
        />
      </div>
    </div>
  );
}

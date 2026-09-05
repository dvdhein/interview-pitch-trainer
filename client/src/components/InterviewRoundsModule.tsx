import React, { useState } from "react";
import {
  Users,
  Target,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  Play,
  Volume2,
  ArrowRight,
  ListChecks,
  Check,
} from "lucide-react";
import {
  interviewRounds,
  type InterviewRound,
  type InterviewRoundId,
} from "../data/interviewRoundsData";
import { allPitches, type Language, type PracticeItem } from "../data/cvTracks";

interface InterviewRoundsModuleProps {
  language: Language;
  onSelectPitch: (pitchId: string) => void;
  speakFn: (text: string, lang: Language, speed: number) => void;
}

export const InterviewRoundsModule: React.FC<InterviewRoundsModuleProps> = ({
  language,
  onSelectPitch,
  speakFn,
}) => {
  const [selectedRoundId, setSelectedRoundId] =
    useState<InterviewRoundId>("round_1_recruiter");
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({});

  const activeRound =
    interviewRounds.find(r => r.id === selectedRoundId) ?? interviewRounds[0];

  const toggleChecklist = (key: string) => {
    setCheckedChecklist(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getPitchById = (id: string): PracticeItem | undefined => {
    return allPitches.find(p => p.id === id);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header do Módulo */}
      <div className="border-b border-[#292827]/10 pb-6">
        <div className="eyebrow">
          <span className="eyebrow-dot" /> PIPELINE DE ENTREVISTA INTERNACIONAL
        </div>
        <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-5xl text-[#292827]">
          {language === "en"
            ? "Master the 4-Round Executive Interview Pipeline"
            : "Domine as 4 Fases da Entrevista Internacional"}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#292827]/70 sm:text-base">
          {language === "en"
            ? "Each interview round has a distinct audience, motive, and evaluation rubric. Customize your pitch length, depth, and vocabulary to win each conversation."
            : "Cada etapa da entrevista tem um interlocutor diferente, objetivos específicos e armadilhas que eliminam candidatos. Ajuste seu tom, profundidade técnica e vocabulário para cada fase."}
        </p>
      </div>

      {/* Seletor de Fases (Tabs) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {interviewRounds.map(round => {
          const isSelected = round.id === selectedRoundId;
          return (
            <button
              key={round.id}
              onClick={() => setSelectedRoundId(round.id)}
              className={`rounded-[3px] p-4 text-left transition ${
                isSelected
                  ? "border-2 border-[#d96c4f] bg-[#292827] text-white shadow-md"
                  : "border border-[#292827]/15 bg-white/70 text-[#292827] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-serif text-2xl font-bold ${
                    isSelected ? "text-[#d96c4f]" : "text-[#292827]/40"
                  }`}
                >
                  {round.roundNumber}
                </span>
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider ${
                    isSelected ? "text-[#fffaf2]/80" : "text-[#292827]/60"
                  }`}
                >
                  {round.typicalDuration}
                </span>
              </div>
              <h3 className="mt-2 text-xs font-extrabold uppercase tracking-wider leading-snug">
                {language === "en" ? round.titleEn : round.titlePt}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Detalhes da Rodada Ativa */}
      <div className="rounded-[3px] border border-[#292827]/15 bg-[#fbf9f4] p-6 shadow-sm">
        {/* Banner do Interlocutor */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#292827]/10 pb-5">
          <div>
            <span className="rounded bg-[#d96c4f]/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
              {activeRound.badge}
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#292827]">
              {language === "en" ? activeRound.titleEn : activeRound.titlePt}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-[#292827]/70">
              <Users size={14} className="text-[#d96c4f]" />
              <strong>{language === "en" ? "Interlocutor:" : "Quem entrevista:"}</strong>{" "}
              <span>
                {language === "en"
                  ? activeRound.interlocutorEn
                  : activeRound.interlocutorPt}
              </span>
            </div>
          </div>

          <div className="rounded bg-white/80 p-3 text-right border border-[#292827]/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#292827]/50">
              {language === "en" ? "Duration" : "Duração Típica"}
            </span>
            <span className="font-serif text-lg font-bold text-[#292827]">
              {activeRound.typicalDuration}
            </span>
          </div>
        </div>

        {/* Objetivo Principal */}
        <div className="mt-5 rounded-[3px] bg-white p-4 border border-[#292827]/10">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#292827]">
            <Target size={15} className="text-[#d96c4f]" />
            {language === "en" ? "Primary Objective & Mindset" : "Objetivo Central & Mindset da Fase"}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#292827]/85">
            {language === "en"
              ? activeRound.primaryObjectiveEn
              : activeRound.primaryObjectivePt}
          </p>
        </div>

        {/* Green Lights vs Red Flags */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Green Lights */}
          <div className="rounded-[3px] border border-emerald-600/20 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-900">
              <CheckCircle2 size={16} className="text-emerald-600" />
              {language === "en"
                ? "Green Lights (What gets you hired)"
                : "Green Lights (O que te aprova de imediato)"}
            </div>
            <ul className="mt-3 space-y-2 text-xs text-[#292827]/85">
              {(language === "en"
                ? activeRound.greenLightsEn
                : activeRound.greenLightsPt
              ).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flags */}
          <div className="rounded-[3px] border border-rose-600/20 bg-rose-500/5 p-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-900">
              <AlertOctagon size={16} className="text-rose-600" />
              {language === "en"
                ? "Red Flags (What gets you eliminated)"
                : "Red Flags (O que te elimina da disputa)"}
            </div>
            <ul className="mt-3 space-y-2 text-xs text-[#292827]/85">
              {(language === "en"
                ? activeRound.redFlagsEn
                : activeRound.redFlagsPt
              ).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Perguntas Frequentes desta Rodada */}
        <div className="mt-6 border-t border-[#292827]/10 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#292827]">
              <HelpCircle size={15} className="text-[#d96c4f]" />
              {language === "en"
                ? "Frequent Questions in this Round"
                : "Perguntas Mais Frequentes Nesta Fase"}
            </div>
            <span className="text-[10px] text-[#292827]/55">
              Clique no áudio para ouvir a pergunta falada em inglês
            </span>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {(language === "en"
              ? activeRound.frequentQuestionsEn
              : activeRound.frequentQuestionsPt
            ).map((q, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 rounded-[3px] border border-[#292827]/10 bg-white p-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-[#d96c4f]">
                    0{idx + 1}
                  </span>
                  <span className="font-medium text-[#292827]">"{q}"</span>
                </div>
                <button
                  onClick={() => speakFn(q, language, 0.9)}
                  className="rounded p-1.5 text-[#292827]/60 hover:bg-[#292827]/10 hover:text-[#292827] transition shrink-0"
                  title="Ouvir pergunta"
                >
                  <Volume2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pitches Recomendados para esta Rodada */}
        <div className="mt-6 border-t border-[#292827]/10 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#292827]">
              🎯 {language === "en" ? "Recommended Master Pitches for this Round:" : "Pitches Recomendados para esta Fase:"}
            </span>
            <span className="text-[10px] text-[#292827]/60">
              Clique para abrir no estúdio de prática
            </span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeRound.recommendedPitchIds.map(pitchId => {
              const pitch = getPitchById(pitchId);
              if (!pitch) return null;
              return (
                <div
                  key={pitch.id}
                  className="group flex flex-col justify-between rounded-[3px] border border-[#292827]/15 bg-white p-3.5 transition hover:border-[#d96c4f] hover:shadow-sm"
                >
                  <div>
                    <span className="rounded bg-[#292827]/8 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
                      {pitch.tag}
                    </span>
                    <h4 className="mt-2 font-serif text-sm font-bold text-[#292827] group-hover:text-[#d96c4f] transition">
                      {pitch.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[11px] text-[#292827]/65">
                      {pitch[language]}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectPitch(pitch.id)}
                    className="mt-3 flex items-center justify-between rounded bg-[#292827]/5 px-2.5 py-1.5 text-[11px] font-bold text-[#292827] hover:bg-[#292827] hover:text-white transition"
                  >
                    <span>Praticar este Pitch</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* STAR Checklist Interativo de Preparação */}
        <div className="mt-6 border-t border-[#292827]/10 pt-5">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#292827]">
            <ListChecks size={16} className="text-[#d96c4f]" />
            {language === "en"
              ? "Pre-Interview STAR Checklist"
              : "Checklist de Validação STAR Antes da Chamada"}
          </div>
          <p className="mt-1 text-xs text-[#292827]/60">
            {language === "en"
              ? "Ensure you have solid real-world examples for each of these before joining the meeting room:"
              : "Garanta que você tem exemplos reais prontos para cada um destes pontos antes de entrar no link da chamada:"}
          </p>

          <div className="mt-3 space-y-2">
            {(language === "en"
              ? activeRound.prepChecklistEn
              : activeRound.prepChecklistPt
            ).map((item, idx) => {
              const itemKey = `${activeRound.id}-${idx}`;
              const isChecked = !!checkedChecklist[itemKey];
              return (
                <label
                  key={idx}
                  onClick={() => toggleChecklist(itemKey)}
                  className={`flex cursor-pointer items-center gap-3 rounded-[3px] border p-2.5 text-xs transition ${
                    isChecked
                      ? "border-emerald-500/40 bg-emerald-500/8 text-[#292827]"
                      : "border-[#292827]/10 bg-white text-[#292827]/80 hover:bg-white/80"
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                      isChecked
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-[#292827]/30 bg-white"
                    }`}
                  >
                    {isChecked && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className={isChecked ? "line-through opacity-70" : ""}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

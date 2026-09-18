import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Link2,
  Pause,
  RotateCcw,
  Volume2,
  XCircle,
} from "lucide-react";
import {
  classClauses,
  classExercises,
  classMeta,
  classSentences,
  clauseRule,
  grammarRules,
  plainText,
  pronunciationTips,
  tenseInfo,
  verbGroups,
  vocabGroups,
  type Tense,
  type TenseText,
} from "../data/englishClassData";
import { VoiceComparisonStudio } from "./VoiceComparisonStudio";

type EnglishClassModuleProps = {
  speakFn: (text: string, lang: "en" | "pt", speed: number, onEnd?: () => void) => void;
  speed?: number;
  onScoreUpdate?: (correctDelta: number, totalDelta: number) => void;
};

type Tab = "sentences" | "clauses" | "verbs" | "vocab" | "exercises";
type TenseView = Tense | "all";

const tabs: [Tab, string][] = [
  ["sentences", "01 · 10 Frases"],
  ["clauses", "02 · Clauses (when + and)"],
  ["verbs", "03 · Verbos"],
  ["vocab", "04 · Vocabulário"],
  ["exercises", "05 · Exercícios"],
];

const tenses: Tense[] = ["past", "present", "future"];

const tenseIcon: Record<Tense, string> = { past: "⏪", present: "▶️", future: "⏩" };

function renderHighlighted(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) =>
    part.startsWith("**") ? (
      <strong key={index} className="rounded-sm bg-[#d96c4f]/12 px-0.5 text-[#b8502f]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export function EnglishClassModule({
  speakFn,
  speed = 0.9,
  onScoreUpdate,
}: EnglishClassModuleProps) {
  const [tab, setTab] = useState<Tab>("sentences");
  const [tenseView, setTenseView] = useState<TenseView>("past");
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [hideText, setHideText] = useState(false);
  const [activeClauseId, setActiveClauseId] = useState(classClauses[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const studioTense: Tense = tenseView === "all" ? "past" : tenseView;
  const activeClause = classClauses.find(c => c.id === activeClauseId) ?? classClauses[0];
  const correctCount = classExercises.filter(e => answers[e.id] === e.answer).length;

  const stopAudio = () => {
    window.speechSynthesis?.cancel();
    setPlayingKey(null);
  };

  const toggleSpeak = (key: string, text: string) => {
    if (playingKey === key) {
      stopAudio();
      return;
    }
    setPlayingKey(key);
    speakFn(plainText(text), "en", speed, () => setPlayingKey(null));
  };

  const goTab = (next: Tab) => {
    stopAudio();
    setTab(next);
  };

  const handleAnswer = (exerciseId: string, optionIndex: number, correct: number) => {
    if (answers[exerciseId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [exerciseId]: optionIndex }));
    onScoreUpdate?.(optionIndex === correct ? 1 : 0, 1);
  };

  const speakButton = (key: string, text: string, label = "Ouvir") => (
    <button
      onClick={() => toggleSpeak(key, text)}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-[3px] px-2.5 py-1.5 text-[11px] font-bold transition ${
        playingKey === key
          ? "bg-[#d96c4f] text-white"
          : "border border-[#292827]/15 bg-white text-[#292827]/75 hover:bg-[#292827] hover:text-white"
      }`}
      title="Ouvir em inglês"
    >
      {playingKey === key ? <Pause size={12} /> : <Volume2 size={12} />}
      {playingKey === key ? "Parar" : label}
    </button>
  );

  const tenseLines = (key: string, text: TenseText) => {
    const shown = tenseView === "all" ? tenses : [tenseView];
    return (
      <div className="space-y-2">
        {shown.map(t => (
          <div key={t} className="flex items-start justify-between gap-3">
            <p className={`text-base leading-7 text-[#292827] ${hideText ? "select-none blur-sm" : ""}`}>
              {tenseView === "all" && (
                <span className="mr-2 text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/45">
                  {tenseIcon[t]} {tenseInfo[t].label}
                </span>
              )}
              {renderHighlighted(text[t])}
            </p>
            {speakButton(`${key}-${t}`, text[t])}
          </div>
        ))}
      </div>
    );
  };

  const tenseToggle = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap rounded-full border border-[#292827]/15 bg-white/60 p-1">
        {([...tenses, "all"] as TenseView[]).map(t => (
          <button
            key={t}
            onClick={() => {
              stopAudio();
              setTenseView(t);
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider transition ${
              tenseView === t ? "bg-[#292827] text-[#f5f0e7]" : "text-[#292827]/60 hover:text-[#292827]"
            }`}
          >
            {t === "all" ? "Os 3 tempos" : `${tenseIcon[t]} ${tenseInfo[t].label}`}
          </button>
        ))}
      </div>
      <button onClick={() => setHideText(!hideText)} className="outline-btn text-xs">
        {hideText ? <Eye size={14} /> : <EyeOff size={14} />}
        {hideText ? "Mostrar texto" : "Praticar sem olhar"}
      </button>
    </div>
  );

  const tenseSummary =
    tenseView === "all" ? null : (
      <div className="rounded-[3px] border-l-2 border-[#d96c4f] bg-[#d96c4f]/6 p-4 text-sm text-[#292827]/80">
        <strong className="text-[#292827]">
          {tenseInfo[tenseView].label} · {tenseInfo[tenseView].pt}:
        </strong>{" "}
        {tenseInfo[tenseView].when} Estrutura: <em>{tenseInfo[tenseView].structure}</em>. Palavras de tempo:{" "}
        <span className="font-semibold">{tenseInfo[tenseView].timeWords}</span>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="border-b border-[#292827]/10 pb-6">
        <div className="eyebrow">
          <span className="eyebrow-dot" /> ENGLISH CLASS · {classMeta.date.toUpperCase()}
        </div>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          What I did today: past, present & future.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#292827]/65">
          As 10 frases do meu dia de trabalho e as 10 cláusulas com <strong>when</strong> +{" "}
          <strong>and</strong>, em cada tempo verbal. Os verbos que mudam aparecem em destaque. Ouça, esconda o
          texto e repita em voz alta.
        </p>
      </div>

      {/* Mapa dos 3 tempos */}
      <div className="grid gap-3 sm:grid-cols-3">
        {tenses.map(t => (
          <div key={t} className="rounded-[3px] border border-[#292827]/12 bg-white/60 p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
              {tenseIcon[t]} {tenseInfo[t].label} · {tenseInfo[t].pt}
            </div>
            <p className="mt-2 font-serif text-lg text-[#292827]">{tenseInfo[t].example}</p>
            <p className="mt-1 text-xs text-[#292827]/60">{tenseInfo[t].when}</p>
            <p className="mt-2 text-[11px] font-semibold text-[#292827]/50">{tenseInfo[t].timeWords}</p>
          </div>
        ))}
      </div>

      {/* Abas */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => goTab(id)}
            className={`rounded-[3px] px-3.5 py-2 text-xs font-bold transition ${
              tab === id
                ? "bg-[#292827] text-[#f5f0e7] shadow-sm"
                : "border border-[#292827]/15 bg-white/60 text-[#292827]/70 hover:bg-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "sentences" && (
        <div className="space-y-5">
          {tenseToggle}
          {tenseSummary}
          <div className="space-y-3">
            {classSentences.map((s, index) => (
              <div key={s.id} className="rounded-[3px] border border-[#292827]/12 bg-white/70 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-serif text-lg font-bold text-[#d96c4f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/50">
                    {s.topic}
                  </span>
                </div>
                {tenseLines(s.id, s.text)}
                <p className="mt-2 text-xs text-[#292827]/55">🇧🇷 {s.pt}</p>
                {s.note && <p className="mt-2 text-xs italic text-[#d96c4f]">💡 {s.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "clauses" && (
        <div className="space-y-5">
          {/* Regra principal */}
          <div className="rounded-[4px] border border-[#292827]/18 bg-white/80 p-5 sm:p-6">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#d96c4f]">
              ⚠️ A regra mais importante
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#292827]/10 text-[10px] uppercase tracking-wider text-[#292827]/50">
                    <th className="py-2 pr-3">Tempo</th>
                    <th className="py-2 pr-3">Parte com when</th>
                    <th className="py-2">Parte principal</th>
                  </tr>
                </thead>
                <tbody>
                  {clauseRule.map(r => (
                    <tr key={r.tense} className="border-b border-[#292827]/6">
                      <td className="py-2 pr-3 font-bold">
                        {tenseIcon[r.tense]} {tenseInfo[r.tense].label}
                      </td>
                      <td className="py-2 pr-3">{r.whenPart}</td>
                      <td className="py-2">{r.mainPart}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-[#292827]/75">
              ❌ <s>When I will finish the report</s> · ✅ When I <strong>finish</strong> the report, I{" "}
              <strong>will send</strong> it to my manager.
            </p>
          </div>

          {tenseToggle}
          {tenseSummary}

          <div className="space-y-3">
            {classClauses.map((c, index) => (
              <div
                key={c.id}
                className={`rounded-[3px] border bg-white/70 p-5 transition ${
                  activeClauseId === c.id ? "border-[#d96c4f]/60 shadow-sm" : "border-[#292827]/12"
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/50">
                    Clause {index + 1}
                  </span>
                  <button
                    onClick={() => setActiveClauseId(c.id)}
                    className="text-[11px] font-bold text-[#d96c4f] hover:underline"
                  >
                    {activeClauseId === c.id ? "● No estúdio de gravação" : "Gravar esta cláusula ↓"}
                  </button>
                </div>
                <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-[#292827]/60">
                  {c.parts.map((p, i) => (
                    <span key={p} className="flex items-center gap-1.5">
                      <span className="rounded bg-[#292827]/6 px-2 py-0.5 italic">{p}</span>
                      {i < c.parts.length - 1 && <Link2 size={11} className="text-[#292827]/30" />}
                    </span>
                  ))}
                </div>
                {tenseLines(c.id, c.text)}
                {c.note && <p className="mt-2 text-xs italic text-[#d96c4f]">💡 {c.note}</p>}
              </div>
            ))}
          </div>

          {/* Estúdio de gravação para a cláusula escolhida */}
          <div className="rounded-[4px] border border-[#292827]/18 bg-white/80 p-5 sm:p-6">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#d96c4f]">
              🎙️ Grave e compare · Clause {classClauses.indexOf(activeClause) + 1} ·{" "}
              {tenseInfo[studioTense].label}
            </div>
            <p className="mt-2 font-serif text-xl text-[#292827]">{renderHighlighted(activeClause.text[studioTense])}</p>
            <VoiceComparisonStudio
              scriptText={plainText(activeClause.text[studioTense])}
              language="en"
              onAiPlay={() => toggleSpeak(`studio-${activeClause.id}`, activeClause.text[studioTense])}
              isAiPlaying={playingKey === `studio-${activeClause.id}`}
            />
          </div>

          {/* Outras regras */}
          <div className="grid gap-3 sm:grid-cols-2">
            {grammarRules.map(rule => (
              <div key={rule.title} className="rounded-[3px] border border-[#292827]/12 bg-white/60 p-4">
                <h4 className="text-sm font-extrabold text-[#292827]">{rule.title}</h4>
                <p className="mt-2 text-xs text-[#292827]/60">❌ {rule.wrong}</p>
                <p className="mt-1 text-xs font-semibold text-[#292827]">✅ {rule.right}</p>
                <p className="mt-2 text-[11px] italic text-[#d96c4f]">{rule.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "verbs" && (
        <div className="space-y-6">
          <p className="text-sm text-[#292827]/65">
            Futuro é sempre <strong>will + forma base</strong> (will write, will finish…). Clique no verbo para ouvir
            as três formas.
          </p>
          {verbGroups.map(group => (
            <div key={group.id} className="rounded-[4px] border border-[#292827]/15 bg-white/70 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl text-[#292827]">{group.label}</h3>
                <span className="text-xs text-[#292827]/55">{group.hint}</span>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#292827]/10 text-[10px] uppercase tracking-wider text-[#292827]/50">
                      <th className="py-2 pr-3">Presente</th>
                      <th className="py-2 pr-3">he / she / it</th>
                      <th className="py-2 pr-3">Passado</th>
                      <th className="py-2 pr-3">Futuro</th>
                      <th className="py-2 pr-3">Passado se fala</th>
                      <th className="py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {group.verbs.map(v => {
                      const futureBase = v.base.replace(" (are)", "");
                      const spoken = `${futureBase}. ${v.past}. will ${futureBase}.`;
                      return (
                        <tr key={v.base} className="border-b border-[#292827]/6">
                          <td className="py-2 pr-3">{v.base}</td>
                          <td className="py-2 pr-3 text-[#292827]/70">{v.third}</td>
                          <td className="py-2 pr-3 font-bold text-[#b8502f]">{v.past}</td>
                          <td className="py-2 pr-3">will {futureBase}</td>
                          <td className="py-2 pr-3 text-[#292827]/70">{v.pastSound}</td>
                          <td className="py-2 text-right">{speakButton(`verb-${v.base}`, spoken, "")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "vocab" && (
        <div className="space-y-6">
          <p className="text-sm text-[#292827]/65">
            A sílaba em MAIÚSCULA é a forte. A pronúncia usa sons do português: é um guia, não uma transcrição exata.
          </p>
          {vocabGroups.map(group => (
            <div key={group.id}>
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#d96c4f]">{group.label}</h3>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {group.words.map(w => (
                  <button
                    key={w.word}
                    onClick={() => toggleSpeak(`word-${w.word}`, w.word)}
                    className={`rounded-[3px] border p-3 text-left transition ${
                      playingKey === `word-${w.word}`
                        ? "border-[#d96c4f] bg-[#d96c4f]/8"
                        : "border-[#292827]/12 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#292827]">{w.word}</span>
                      <Volume2 size={13} className="text-[#292827]/35" />
                    </div>
                    <div className="mt-1 text-xs text-[#292827]/60">
                      {w.ipa} · <span className="font-semibold text-[#292827]/80">{w.say}</span>
                    </div>
                    {w.pt && <div className="mt-0.5 text-[11px] text-[#292827]/45">{w.pt}</div>}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-[2px] bg-[#292827] p-6 text-[#f5f0e7]">
            <div className="eyebrow text-[#f5f0e7]/50">🎯 PRONÚNCIA PARA O ÁUDIO</div>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {pronunciationTips.map(tip => (
                <li key={tip}>· {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "exercises" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#292827]/65">
              <BookOpen size={14} className="mr-1 inline" /> Escolha a resposta. O resultado entra no relatório da
              sessão.
            </p>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#292827]/15 bg-white/60 px-3 py-1 text-xs font-bold">
                ✔ {correctCount} / {Object.keys(answers).length}
              </span>
              <button onClick={() => setAnswers({})} className="outline-btn text-xs">
                <RotateCcw size={13} /> Refazer
              </button>
            </div>
          </div>
          {classExercises.map((ex, index) => {
            const chosen = answers[ex.id];
            const answered = chosen !== undefined;
            return (
              <div key={ex.id} className="rounded-[3px] border border-[#292827]/12 bg-white/70 p-5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
                  {String(index + 1).padStart(2, "0")} · {ex.hint}
                </div>
                <p className="mt-2 font-serif text-lg text-[#292827]">{ex.prompt}</p>
                <div className="mt-3 grid gap-2">
                  {ex.options.map((opt, i) => {
                    const isRight = i === ex.answer;
                    const style = !answered
                      ? "border-[#292827]/15 bg-white hover:border-[#292827]/40"
                      : isRight
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : i === chosen
                          ? "border-red-400 bg-red-50 text-red-900"
                          : "border-[#292827]/10 bg-white/50 text-[#292827]/50";
                    return (
                      <button
                        key={opt}
                        disabled={answered}
                        onClick={() => handleAnswer(ex.id, i, ex.answer)}
                        className={`flex items-center justify-between gap-2 rounded-[3px] border px-3 py-2 text-left text-sm transition ${style}`}
                      >
                        <span>{opt}</span>
                        {answered && isRight && <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />}
                        {answered && !isRight && i === chosen && (
                          <XCircle size={15} className="shrink-0 text-red-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {answered && <p className="mt-3 text-xs italic text-[#292827]/70">💡 {ex.explanation}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

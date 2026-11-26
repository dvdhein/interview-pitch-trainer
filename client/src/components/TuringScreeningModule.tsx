import { useEffect, useMemo, useState } from "react";
import { Play, Pause, RotateCcw, Timer, Volume2, Wind, AlertTriangle, CheckCircle2, NotebookPen } from "lucide-react";
import { roleplayScenarios } from "../data/scenarioData";
import {
  screeningSteps,
  preInterviewChecklist,
  generalTips,
  SPEAKING_WPM,
  QUESTION_BUFFER_SEC,
  type ScreeningAnswer,
} from "../data/turingScreeningData";

type Props = {
  speakFn: (text: string, lang: "en" | "pt", speed: number, onEnd?: () => void) => void;
  speed?: number;
};

const STORAGE_KEY = "turing-screening-notes-v1";

const plainText = (s: string) => s.replace(/\s*\/\/?\s*/g, " ").replace(/\s+/g, " ").trim();

/** Estimativa em segundos: palavras no ritmo calmo + pausas marcadas. */
function estimateSeconds(breathing: string) {
  const words = plainText(breathing).split(" ").filter(Boolean).length;
  const breaths = (breathing.match(/\/\//g) || []).length;
  const pauses = (breathing.match(/(^|[^/])\/(?!\/)/g) || []).length;
  return Math.round((words / SPEAKING_WPM) * 60 + breaths * 0.8 + pauses * 0.3);
}

const fmt = (s: number) => {
  const sign = s < 0 ? "-" : "";
  const a = Math.abs(Math.round(s));
  return `${sign}${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}`;
};

function loadNotes(): Record<string, string> {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function BreathingText({ text }: { text: string }) {
  const parts = text.split(/(\/\/|\/)/);
  return (
    <p className="text-[15px] leading-8 text-[#292827]">
      {parts.map((p, i) =>
        p === "//" ? (
          <span key={i} className="mx-1 inline-flex items-center rounded-full bg-sky-100 px-1.5 text-[11px] font-bold text-sky-700" title="Respiração completa">
            ↻
          </span>
        ) : p === "/" ? (
          <span key={i} className="mx-0.5 font-bold text-[#d96c4f]/70" title="Pausa curta">
            ·
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
}

function BoxBreathing() {
  const phases = ["Inspire (nariz)", "Segure", "Expire (boca)", "Segure"];
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick(t => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const phase = Math.floor(tick / 4) % 4;
  const cycle = Math.floor(tick / 16) + 1;
  const count = (tick % 4) + 1;
  const scale = phase === 0 ? 0.6 + count * 0.1 : phase === 2 ? 1 - count * 0.1 : phase === 1 ? 1 : 0.6;
  return (
    <div className="flex items-center gap-5 rounded-[4px] border border-sky-200 bg-sky-50/70 p-5">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center">
        <div
          className="flex items-center justify-center rounded-[8px] bg-sky-300/60 text-sm font-bold text-sky-900 transition-all duration-1000"
          style={{ width: `${scale * 96}px`, height: `${scale * 96}px` }}
        >
          {running ? count : "4·4·4·4"}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-bold text-sky-900">
          <Wind size={16} /> Respiração quadrada (antes de começar)
        </div>
        <p className="mt-1 text-sm text-sky-900/75">
          {running ? `${phases[phase]} — ciclo ${Math.min(cycle, 3)} de 3` : "4 s inspira · 4 s segura · 4 s expira · 4 s segura. Faça 3 ciclos (~50 s)."}
        </p>
        <button
          onClick={() => {
            setTick(0);
            setRunning(r => !r);
          }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-[3px] bg-sky-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-800"
        >
          {running ? <Pause size={13} /> : <Play size={13} />} {running ? "Parar" : "Começar"}
        </button>
      </div>
    </div>
  );
}

function stepPlan(step: (typeof screeningSteps)[number]) {
  const studio: ScreeningAnswer[] = (step.fromStudio ?? []).flatMap(ref => {
    const s = roleplayScenarios.find(x => x.id === ref.id);
    return s
      ? [{ id: s.id, question: s.question, breathing: s.suggestedAnswerEn, keywords: s.goldenKeyPoints, why: ref.why, source: "já está no Pitch Studio (Roleplay)" as const, title: s.title }]
      : [];
  });
  const core = [...step.answers.filter(x => x.core !== false), ...studio];
  const talk = core.reduce((a, x) => a + estimateSeconds(x.breathing), 0);
  const asking = core.length * QUESTION_BUFFER_SEC;
  return { studio, core, talk, asking, plan: talk + asking, budget: step.minutes * 60 };
}

const shortLabel = (q: string) => q.replace(/\s*\(.*?\)\s*$/, "").replace(/^Tell me about /, "").replace(/\?$/, "");

export function TuringScreeningModule({ speakFn, speed = 0.9 }: Props) {
  const totalMin = screeningSteps.reduce((a, s) => a + s.minutes, 0);
  const boundaries = useMemo(() => {
    let acc = 0;
    return screeningSteps.map(s => {
      const start = acc;
      acc += s.minutes * 60;
      return { start, end: acc };
    });
  }, []);

  // Cronômetro geral da simulação
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed(e => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const currentStepIdx = boundaries.findIndex(b => elapsed < b.end);

  // Cronômetro de prática por resposta
  const [practice, setPractice] = useState<{ id: string; start: number } | null>(null);
  const [lastTimes, setLastTimes] = useState<Record<string, number>>({});
  const [, force] = useState(0);
  useEffect(() => {
    if (!practice) return;
    const id = window.setInterval(() => force(x => x + 1), 250);
    return () => window.clearInterval(id);
  }, [practice]);

  const [showPlain, setShowPlain] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(loadNotes);
  const saveNote = (key: string, value: string) => {
    const next = { ...notes, [key]: value };
    setNotes(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* armazenamento indisponível: as notas ficam só nesta sessão */
    }
  };

  const togglePractice = (a: ScreeningAnswer) => {
    if (practice?.id === a.id) {
      setLastTimes(t => ({ ...t, [a.id]: (Date.now() - practice.start) / 1000 }));
      setPractice(null);
    } else {
      setPractice({ id: a.id, start: Date.now() });
    }
  };

  const togglePlay = (a: ScreeningAnswer) => {
    if (playing === a.id) {
      window.speechSynthesis?.cancel();
      setPlaying(null);
      return;
    }
    window.speechSynthesis?.cancel();
    setPlaying(a.id);
    speakFn(plainText(a.breathing), "en", speed, () => setPlaying(null));
  };

  const renderAnswer = (a: ScreeningAnswer) => {
    const est = estimateSeconds(a.breathing);
    const live = practice?.id === a.id ? (Date.now() - practice.start) / 1000 : null;
    const last = lastTimes[a.id];
    const shown = live ?? last;
    const over = shown !== undefined && shown > est * 1.25;
    return (
      <div key={a.id} className="rounded-[4px] border border-[#292827]/10 bg-[#fffaf2] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/45">{a.source}</div>
            <div className="mt-1 font-semibold text-[#292827]">“{a.question}”</div>
            {a.why && <div className="mt-1 text-xs text-[#292827]/60">{a.why}</div>}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-[#292827]/5 px-2.5 py-1 font-bold text-[#292827]/70">alvo ≈ {fmt(est)}</span>
            <button onClick={() => togglePractice(a)} className={`inline-flex items-center gap-1 rounded-[3px] px-2.5 py-1 font-bold ${practice?.id === a.id ? "bg-[#d96c4f] text-white" : "border border-[#292827]/20"}`}>
              <Timer size={12} /> {practice?.id === a.id ? `${fmt(live ?? 0)} · parar` : "Cronometrar"}
            </button>
            {shown !== undefined && practice?.id !== a.id && (
              <span className={`font-bold ${over ? "text-red-600" : "text-emerald-700"}`}>
                último: {fmt(shown)} {over ? "(longo demais)" : "✓"}
              </span>
            )}
            <button onClick={() => togglePlay(a)} className="inline-flex items-center gap-1 rounded-[3px] border border-[#292827]/20 px-2.5 py-1 font-bold">
              {playing === a.id ? <Pause size={12} /> : <Volume2 size={12} />} Ouvir
            </button>
            <button onClick={() => setShowPlain(s => ({ ...s, [a.id]: !s[a.id] }))} className="rounded-[3px] border border-[#292827]/20 px-2.5 py-1 font-bold">
              {showPlain[a.id] ? "Com respiração" : "Texto corrido"}
            </button>
          </div>
        </div>
        <div className="mt-3">
          {showPlain[a.id] ? <p className="text-[15px] leading-7 text-[#292827]">{plainText(a.breathing)}</p> : <BreathingText text={a.breathing} />}
        </div>
        {a.keywords && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {a.keywords.map(k => (
              <span key={k} className="rounded-[3px] bg-[#292827] px-2 py-1 text-[11px] font-semibold text-[#f5f0e7]">
                {k}
              </span>
            ))}
          </div>
        )}
        {a.notes?.map(n => (
          <div key={n} className="mt-3 flex gap-2 rounded-[3px] bg-amber-50 p-2.5 text-xs leading-5 text-amber-900">
            <AlertTriangle size={14} className="mt-0.5 shrink-0" /> {n}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <div className="eyebrow">TURING · AI SCREENING · 1ª ENTREVISTA</div>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          Roteiro da entrevista com a IA da Turing.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#292827]/65">
          Entrevista de triagem conduzida por IA, com cerca de <strong>{totalMin} minutos</strong>. Ela é gravada e depois
          revisada por um recrutador da Turing. Antes de começar há uma checagem de câmera, microfone e compartilhamento de tela. Na resposta, cada{" "}
          <span className="font-bold text-[#d96c4f]">·</span> é uma pausa curta e cada{" "}
          <span className="rounded-full bg-sky-100 px-1.5 text-[11px] font-bold text-sky-700">↻</span> é uma respiração completa: inspire pelo nariz e fale um pouco mais devagar que o natural.
        </p>
      </div>

      {/* De-para: timeline da Turing × seu roteiro */}
      <div className="overflow-x-auto rounded-[4px] border border-[#292827]/15 bg-white/80">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#292827]/10 px-5 py-3">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">De-para: roadmap da Turing × seu roteiro</div>
          <div className="text-xs font-bold text-[#292827]/60">
            Turing: ~{totalMin}:00 · seu plano: {fmt(screeningSteps.reduce((a, s) => a + stepPlan(s).plan, 0))}
          </div>
        </div>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-[#292827]/50">
            <tr>
              <th className="px-5 py-2">Etapa (Turing)</th>
              <th className="px-3 py-2">Tempo</th>
              <th className="px-3 py-2">Janela</th>
              <th className="px-3 py-2">O que você vai falar</th>
              <th className="px-3 py-2">Seu plano</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {screeningSteps.map((step, idx) => {
              const p = stepPlan(step);
              const ok = p.plan <= p.budget;
              return (
                <tr
                  key={step.n}
                  onClick={() => document.getElementById(`turing-step-${step.n}`)?.scrollIntoView({ behavior: "smooth" })}
                  className="cursor-pointer border-t border-[#292827]/8 align-top hover:bg-[#fffaf2]"
                >
                  <td className="px-5 py-3 font-semibold text-[#292827]">
                    {step.n}. {step.title}
                    <div className="text-xs font-normal text-[#292827]/50">{step.titlePt}</div>
                  </td>
                  <td className="px-3 py-3 font-bold">~{step.minutes} min</td>
                  <td className="px-3 py-3 font-mono text-xs text-[#292827]/60">
                    {fmt(boundaries[idx].start)}–{fmt(boundaries[idx].end)}
                  </td>
                  <td className="px-3 py-3 text-xs leading-5 text-[#292827]/75">
                    {p.core.map(a => (
                      <div key={a.id}>
                        • {"title" in a && a.title ? String(a.title) : shortLabel(a.question)}{" "}
                        <span className="text-[#292827]/45">({fmt(estimateSeconds(a.breathing))})</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-3 py-3 text-xs">
                    <span className="font-bold">{fmt(p.plan)}</span>
                    <div className="text-[#292827]/50">
                      fala {fmt(p.talk)} + IA {fmt(p.asking)}
                    </div>
                  </td>
                  <td className={`px-3 py-3 text-xs font-bold ${ok ? "text-emerald-700" : "text-red-600"}`}>
                    {ok ? `✓ folga ${fmt(p.budget - p.plan)}` : `estoura ${fmt(p.plan - p.budget)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Preparação */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[4px] border border-[#292827]/15 bg-white/70 p-5">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">Antes de começar</div>
          <ul className="mt-3 space-y-2">
            {preInterviewChecklist.map(item => (
              <li key={item} className="flex gap-2 text-sm text-[#292827]/80">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <BoxBreathing />
          <div className="rounded-[4px] border border-[#292827]/15 bg-white/70 p-5">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">Regras de ouro</div>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[#292827]/80">
              {generalTips.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cronômetro da simulação */}
      <div className="sticky top-2 z-10 flex flex-wrap items-center gap-4 rounded-[4px] border border-[#292827]/20 bg-[#292827] px-5 py-3 text-[#f5f0e7] shadow-md">
        <Timer size={18} className="text-[#d96c4f]" />
        <span className="font-mono text-2xl font-bold">{fmt(elapsed)}</span>
        <span className="text-xs text-[#f5f0e7]/70">
          de ~{totalMin}:00 ·{" "}
          {currentStepIdx === -1
            ? "tempo total esgotado"
            : `agora: ${screeningSteps[currentStepIdx].n}. ${screeningSteps[currentStepIdx].title} (faltam ${fmt(boundaries[currentStepIdx].end - elapsed)} nesta etapa)`}
        </span>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setRunning(r => !r)} className="inline-flex items-center gap-1.5 rounded-[3px] bg-[#d96c4f] px-3 py-1.5 text-xs font-bold">
            {running ? <Pause size={13} /> : <Play size={13} />} {running ? "Pausar" : "Simular entrevista"}
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setElapsed(0);
            }}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#f5f0e7]/30 px-3 py-1.5 text-xs font-bold"
          >
            <RotateCcw size={13} /> Zerar
          </button>
        </div>
      </div>

      {/* Timeline vertical */}
      <ol className="relative ml-4 border-l-2 border-[#292827]/15">
        {screeningSteps.map((step, idx) => {
          const isCurrent = running && idx === currentStepIdx;
          const isDone = elapsed > 0 && (currentStepIdx === -1 || idx < currentStepIdx);
          const { studio, core, talk, asking, plan, budget } = stepPlan(step);
          const planPct = Math.min(100, (plan / budget) * 100);
          return (
            <li key={step.n} id={`turing-step-${step.n}`} className="relative mb-10 scroll-mt-24 pl-8">
              <span
                className={`absolute -left-[19px] top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  isCurrent
                    ? "border-[#d96c4f] bg-[#d96c4f] text-white"
                    : isDone
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-[#292827]/25 bg-[#f5f0e7] text-[#292827]/70"
                }`}
              >
                {step.n}
              </span>
              <div className={`rounded-[4px] border p-5 sm:p-6 ${isCurrent ? "border-[#d96c4f] bg-white shadow-md" : "border-[#292827]/15 bg-white/70"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl text-[#292827]">
                    {step.title} <span className="text-base text-[#292827]/50">· {step.titlePt}</span>
                  </h3>
                  <span className="rounded-full border border-[#292827]/15 px-3 py-1 text-xs font-bold text-[#292827]/70">
                    ~{step.minutes} min · {fmt(boundaries[idx].start)}–{fmt(boundaries[idx].end)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#292827]/70">{step.goal}</p>
                <ul className="mt-2 list-disc pl-5 text-xs leading-5 text-[#292827]/60">
                  {step.tips.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="mt-3 rounded-[3px] bg-[#292827]/5 p-3">
                  <div className="flex flex-wrap justify-between gap-2 text-xs font-bold text-[#292827]/75">
                    <span>
                      Plano de tempo: fala {fmt(talk)} + perguntas da IA {fmt(asking)} ({core.length} × {QUESTION_BUFFER_SEC}s) = {fmt(plan)}
                    </span>
                    <span className={plan > budget ? "text-red-600" : budget - plan > 90 ? "text-amber-700" : "text-emerald-700"}>
                      {plan > budget
                        ? `estoura em ${fmt(plan - budget)}`
                        : budget - plan > 90
                          ? `sobra ${fmt(budget - plan)}: a IA vai aprofundar, desenvolva mais`
                          : `cabe em ${fmt(budget)} ✓`}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#292827]/10">
                    <div className={`h-full ${plan > budget ? "bg-red-500" : "bg-emerald-600"}`} style={{ width: `${planPct}%` }} />
                  </div>
                </div>

                <div className="mt-5 space-y-5">{step.answers.map(renderAnswer)}</div>

                {studio.length > 0 && (
                  <div className="mt-5 space-y-5">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
                      Do Pitch Studio (Roleplay). Se editar lá, muda aqui também
                    </div>
                    {studio.map(renderAnswer)}
                  </div>
                )}

                {step.extras && (
                  <div className="mt-5 rounded-[4px] border border-dashed border-[#d96c4f]/50 p-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">Reservas: outros cenários que você já treinou ou pode desenvolver</div>
                    <ul className="mt-3 space-y-3">
                      {step.extras.map(x => (
                        <li key={x.title} className="text-sm">
                          <div className="font-semibold text-[#292827]">{x.title}</div>
                          <div className="text-[#292827]/70">{x.why}</div>
                          <div className="text-xs text-[#292827]/50">↳ {x.where}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <label className="mt-5 block">
                  <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#292827]/55">
                    <NotebookPen size={13} /> Minhas anotações: {step.title}
                  </span>
                  <textarea
                    value={notes[`step-${step.n}`] ?? ""}
                    onChange={e => saveNote(`step-${step.n}`, e.target.value)}
                    rows={3}
                    placeholder="O que treinar melhor, palavras que travaram, perguntas que a IA fez..."
                    className="mt-1.5 w-full rounded-[3px] border border-[#292827]/15 bg-white p-2.5 text-sm"
                  />
                </label>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Registro pós-entrevista */}
      <div className="rounded-[4px] border border-[#292827]/18 bg-white/80 p-6">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">Registro pós-entrevista</div>
        <p className="mt-1 text-sm text-[#292827]/65">
          Escreva logo depois de terminar, enquanto está fresco: as perguntas exatas que a IA fez, quanto tempo durou e o que você faria diferente. Fica salvo neste navegador.
        </p>
        <textarea
          value={notes["post-interview"] ?? ""}
          onChange={e => saveNote("post-interview", e.target.value)}
          rows={8}
          placeholder={"Data/hora:\nPerguntas que a IA fez:\n1.\n2.\nO que foi bem:\nO que travou:\nPróximos passos:"}
          className="mt-3 w-full rounded-[3px] border border-[#292827]/15 bg-white p-3 text-sm"
        />
      </div>
    </div>
  );
}

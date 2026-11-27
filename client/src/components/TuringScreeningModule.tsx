import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Timer, Volume2, VolumeX, Wind, AlertTriangle, CheckCircle2, NotebookPen, SkipBack, SkipForward } from "lucide-react";
import { roleplayScenarios } from "../data/scenarioData";
import {
  screeningSteps,
  preInterviewChecklist,
  generalTips,
  SPEAKING_WPM,
  QUESTION_BUFFER_SEC,
  bridges,
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
    <p className="text-[17px] leading-9 text-[#292827]">
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

type Item = ScreeningAnswer & { title?: string };

/** Respostas da etapa, na ordem em que você vai falar: as da etapa e depois as do Pitch Studio. */
function stepItems(step: (typeof screeningSteps)[number]): Item[] {
  const studio: Item[] = (step.fromStudio ?? []).flatMap(ref => {
    const s = roleplayScenarios.find(x => x.id === ref.id);
    return s
      ? [{ id: s.id, question: s.question, breathing: ref.breathing ?? s.suggestedAnswerEn, keywords: s.goldenKeyPoints, why: ref.why, source: "já está no Pitch Studio (Roleplay)" as const, title: s.title }]
      : [];
  });
  return [...step.answers, ...studio];
}

function stepPlan(items: Item[], minutes: number) {
  const talk = items.reduce((a, x) => a + estimateSeconds(x.breathing), 0);
  const asking = items.length * QUESTION_BUFFER_SEC;
  return { talk, asking, plan: talk + asking, budget: minutes * 60 };
}

const shortLabel = (a: Item) => a.title ?? a.question.replace(/^Tell me about /, "").replace(/\?$/, "");

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.tagName === "TEXTAREA" || el.tagName === "INPUT" || el.tagName === "SELECT" || el.isContentEditable);

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
  const itemsByStep = useMemo(() => screeningSteps.map(stepItems), []);
  const seq = useMemo(() => itemsByStep.flatMap((items, stepIdx) => items.map(a => ({ a, stepIdx }))), [itemsByStep]);

  // Roteiro corrido: posição atual + relógio da entrevista
  const [cur, setCur] = useState(0);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [itemStart, setItemStart] = useState(0);
  const [times, setTimes] = useState<Record<string, number>>({});
  const [autoRead, setAutoRead] = useState(false);
  const [plain, setPlain] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed(e => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const goTo = (next: number) => {
    if (elapsed > itemStart) setTimes(t => ({ ...t, [seq[cur].a.id]: elapsed - itemStart }));
    if (next >= seq.length) {
      setRunning(false);
      setFinished(true);
      return;
    }
    setCur(Math.max(0, next));
    setItemStart(elapsed);
  };

  const reset = () => {
    window.speechSynthesis?.cancel();
    setRunning(false);
    setElapsed(0);
    setItemStart(0);
    setCur(0);
    setTimes({});
    setFinished(false);
  };

  // Teclado: espaço / → avança, ← volta
  const goToRef = useRef(goTo);
  goToRef.current = goTo;
  const curRef = useRef(cur);
  curRef.current = cur;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      if (e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        goToRef.current(curRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToRef.current(curRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Rola a timeline até a pergunta atual
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    document.getElementById(`turing-item-${cur}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cur]);

  // Leitura automática: lê a resposta e passa para a próxima sozinho
  const readToken = useRef(0);
  const speakRef = useRef(speakFn);
  speakRef.current = speakFn;
  useEffect(() => {
    if (!running || !autoRead) return;
    const token = ++readToken.current;
    speakRef.current(plainText(seq[cur].a.breathing), "en", speed, () => {
      if (token !== readToken.current) return;
      window.setTimeout(() => {
        if (token === readToken.current) goToRef.current(curRef.current + 1);
      }, 1200);
    });
    return () => {
      readToken.current++;
      window.speechSynthesis?.cancel();
    };
  }, [cur, running, autoRead, seq, speed]);

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

  const curItem = seq[cur];
  const curStep = screeningSteps[curItem.stepIdx];
  const clockStepIdx = boundaries.findIndex(b => elapsed < b.end);
  const itemElapsed = elapsed - itemStart;
  const curTarget = estimateSeconds(curItem.a.breathing);
  const pace =
    elapsed === 0
      ? null
      : clockStepIdx === -1 || clockStepIdx > curItem.stepIdx
        ? { ok: false, text: `atrasado: pelo relógio você já deveria estar em ${clockStepIdx === -1 ? "fim" : screeningSteps[clockStepIdx].title}` }
        : clockStepIdx < curItem.stepIdx
          ? { ok: true, text: `adiantado: a IA deve aprofundar, desenvolva mais` }
          : { ok: true, text: `no tempo · faltam ${fmt(boundaries[clockStepIdx].end - elapsed)} nesta etapa` };

  let flat = -1;

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <div className="eyebrow">TURING · AI SCREENING · 1ª ENTREVISTA</div>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          Roteiro da entrevista com a IA da Turing.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#292827]/65">
          Cerca de <strong>{totalMin} minutos</strong>, conduzida por IA, gravada e revisada depois por um recrutador. Uma resposta por pergunta, na ordem
          da entrevista. Clique em <strong>Começar</strong> e avance com a <strong>barra de espaço</strong> (← volta). Cada{" "}
          <span className="font-bold text-[#d96c4f]">·</span> é uma pausa curta e cada{" "}
          <span className="rounded-full bg-sky-100 px-1.5 text-[11px] font-bold text-sky-700">↻</span> é uma respiração completa.
        </p>
      </div>

      {/* De-para: timeline da Turing × seu roteiro */}
      <div className="overflow-x-auto rounded-[4px] border border-[#292827]/15 bg-white/80">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#292827]/10 px-5 py-3">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">De-para: roadmap da Turing × seu roteiro</div>
          <div className="text-xs font-bold text-[#292827]/60">
            Turing: ~{totalMin}:00 · seu plano: {fmt(screeningSteps.reduce((a, s, i) => a + stepPlan(itemsByStep[i], s.minutes).plan, 0))}
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
              const p = stepPlan(itemsByStep[idx], step.minutes);
              const ok = p.plan <= p.budget;
              return (
                <tr key={step.n} className="border-t border-[#292827]/8 align-top">
                  <td className="px-5 py-3 font-semibold text-[#292827]">
                    {step.n}. {step.title}
                    <div className="text-xs font-normal text-[#292827]/50">{step.titlePt}</div>
                  </td>
                  <td className="px-3 py-3 font-bold">~{step.minutes} min</td>
                  <td className="px-3 py-3 font-mono text-xs text-[#292827]/60">
                    {fmt(boundaries[idx].start)}–{fmt(boundaries[idx].end)}
                  </td>
                  <td className="px-3 py-3 text-xs leading-5 text-[#292827]/75">
                    {itemsByStep[idx].map(a => (
                      <div key={a.id}>
                        • {shortLabel(a)} <span className="text-[#292827]/45">({fmt(estimateSeconds(a.breathing))})</span>
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

      {/* Barra de controle do roteiro corrido */}
      <div className="sticky top-[76px] z-20 rounded-[4px] border border-[#292827]/20 bg-[#292827] px-4 py-3 text-[#f5f0e7] shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setRunning(r => !r)} className="inline-flex items-center gap-1.5 rounded-[3px] bg-[#d96c4f] px-3 py-1.5 text-xs font-bold">
            {running ? <Pause size={13} /> : <Play size={13} />} {running ? "Pausar" : elapsed ? "Continuar" : "Começar"}
          </button>
          <button onClick={() => goTo(cur - 1)} disabled={cur === 0} className="inline-flex items-center gap-1 rounded-[3px] border border-[#f5f0e7]/30 px-2.5 py-1.5 text-xs font-bold disabled:opacity-40" title="Voltar (←)">
            <SkipBack size={13} />
          </button>
          <button onClick={() => goTo(cur + 1)} className="inline-flex items-center gap-1.5 rounded-[3px] bg-[#f5f0e7] px-3 py-1.5 text-xs font-bold text-[#292827]" title="Próxima (espaço)">
            Próxima <SkipForward size={13} />
          </button>
          <button
            onClick={() => setAutoRead(v => !v)}
            className={`inline-flex items-center gap-1.5 rounded-[3px] px-2.5 py-1.5 text-xs font-bold ${autoRead ? "bg-sky-600" : "border border-[#f5f0e7]/30"}`}
            title="Lê cada resposta em voz alta e avança sozinho"
          >
            {autoRead ? <Volume2 size={13} /> : <VolumeX size={13} />} {autoRead ? "Lendo em voz alta" : "Só eu falo"}
          </button>
          <button onClick={() => setPlain(v => !v)} className="rounded-[3px] border border-[#f5f0e7]/30 px-2.5 py-1.5 text-xs font-bold">
            {plain ? "Com respiração" : "Texto corrido"}
          </button>
          <button onClick={reset} className="ml-auto inline-flex items-center gap-1.5 rounded-[3px] border border-[#f5f0e7]/30 px-2.5 py-1.5 text-xs font-bold">
            <RotateCcw size={13} /> Zerar
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Timer size={14} className="text-[#d96c4f]" />
            <span className="font-mono text-lg font-bold">{fmt(elapsed)}</span>
            <span className="text-[#f5f0e7]/60">/ {totalMin}:00</span>
          </span>
          <span className="font-bold">
            Etapa {curStep.n} de {screeningSteps.length} · {curStep.title} · pergunta {cur + 1} de {seq.length}
          </span>
          <span className={itemElapsed > curTarget * 1.25 ? "font-bold text-red-300" : "text-[#f5f0e7]/75"}>
            esta resposta {fmt(itemElapsed)} / alvo {fmt(curTarget)}
          </span>
          {pace && <span className={pace.ok ? "text-emerald-300" : "font-bold text-red-300"}>{pace.text}</span>}
          {finished && <span className="font-bold text-emerald-300">✓ fim do roteiro em {fmt(elapsed)}</span>}
        </div>
      </div>

      <div className="flex gap-4 sm:gap-6">
      {/* Linha do tempo à esquerda: 20 min proporcionais, relógio e etapa atual */}
      <aside className="sticky top-[190px] h-[calc(100vh-220px)] max-h-[620px] w-[84px] shrink-0 self-start sm:w-[120px]" aria-label="Linha do tempo">
        <div className="relative h-full">
          <div className="absolute bottom-0 left-[9px] top-0 w-[6px] rounded-full bg-[#292827]/10" />
          <div
            className="absolute left-[9px] top-0 w-[6px] rounded-full bg-[#d96c4f] transition-all duration-1000"
            style={{ height: `${Math.min(100, (elapsed / (totalMin * 60)) * 100)}%` }}
          />
          {screeningSteps.map((step, idx) => {
            const top = (boundaries[idx].start / (totalMin * 60)) * 100;
            const height = (step.minutes / totalMin) * 100;
            const here = idx === curItem.stepIdx && !finished;
            const done = idx < curItem.stepIdx || finished;
            return (
              <button
                key={step.n}
                onClick={() => goTo(seq.findIndex(x => x.stepIdx === idx))}
                className="absolute left-0 flex w-full items-start gap-2 text-left"
                style={{ top: `${top}%`, height: `${height}%` }}
                title={`Ir para ${step.title}`}
              >
                <span
                  className={`relative z-10 mt-[-2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                    here ? "border-[#d96c4f] bg-[#d96c4f] text-white" : done ? "border-emerald-600 bg-emerald-600 text-white" : "border-[#292827]/25 bg-[#f5f0e7] text-[#292827]/70"
                  }`}
                >
                  {done ? "✓" : step.n}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className={`block truncate text-[11px] font-bold ${here ? "text-[#d96c4f]" : "text-[#292827]/70"}`}>{step.title}</span>
                  <span className="block font-mono text-[10px] text-[#292827]/45">
                    {fmt(boundaries[idx].start)} · {step.minutes}m
                  </span>
                </span>
              </button>
            );
          })}
          <span className="absolute bottom-[-6px] left-[2px] font-mono text-[10px] text-[#292827]/45">{totalMin}:00</span>
          {elapsed > 0 && (
            <span
              className="absolute left-[-4px] z-20 -translate-y-1/2 rounded-[3px] bg-[#292827] px-1 font-mono text-[10px] font-bold text-[#f5f0e7] transition-all duration-1000"
              style={{ top: `${Math.min(100, (elapsed / (totalMin * 60)) * 100)}%` }}
            >
              {fmt(elapsed)}
            </span>
          )}
        </div>
      </aside>

      {/* Etapas → perguntas, na ordem */}
      <ol className="min-w-0 flex-1">
        {screeningSteps.map((step, idx) => {
          const isCurrent = idx === curItem.stepIdx;
          const p = stepPlan(itemsByStep[idx], step.minutes);
          return (
            <li key={step.n} className="mb-8">
              <div className={`rounded-[4px] border p-4 sm:p-5 ${isCurrent && !finished ? "border-[#d96c4f] bg-white shadow-md" : "border-[#292827]/15 bg-white/60"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl text-[#292827]">
                    {step.title} <span className="text-base text-[#292827]/50">· {step.titlePt}</span>
                  </h3>
                  <span className="rounded-full border border-[#292827]/15 px-3 py-1 text-xs font-bold text-[#292827]/70">
                    ~{step.minutes} min · {fmt(boundaries[idx].start)}–{fmt(boundaries[idx].end)} · plano {fmt(p.plan)}
                  </span>
                </div>
                {isCurrent && (
                  <>
                    <p className="mt-2 text-sm leading-6 text-[#292827]/70">{step.goal}</p>
                    <ul className="mt-1 list-disc pl-5 text-xs leading-5 text-[#292827]/60">
                      {step.tips.map(t => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </>
                )}

                <ol className="mt-4 space-y-2">
                  {itemsByStep[idx].map(a => {
                    flat++;
                    const i = flat;
                    const active = i === cur && !finished;
                    const last = times[a.id];
                    const est = estimateSeconds(a.breathing);
                    if (!active)
                      return (
                        <li key={a.id} id={`turing-item-${i}`} className="scroll-mt-[190px]">
                          <button
                            onClick={() => goTo(i)}
                            className={`flex w-full items-center gap-3 rounded-[3px] border px-3 py-2 text-left text-sm hover:bg-[#fffaf2] ${i < cur ? "border-emerald-600/20 text-[#292827]/55" : "border-[#292827]/10 text-[#292827]/80"}`}
                          >
                            <span className="w-5 shrink-0 text-xs font-bold text-[#292827]/40">{i + 1}</span>
                            <span className="min-w-0 flex-1 truncate">{shortLabel(a)}</span>
                            <span className="shrink-0 text-xs text-[#292827]/45">alvo {fmt(est)}</span>
                            {last !== undefined && (
                              <span className={`shrink-0 text-xs font-bold ${last > est * 1.25 ? "text-red-600" : "text-emerald-700"}`}>
                                {fmt(last)} {last > est * 1.25 ? "longo" : "✓"}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    return (
                      <li key={a.id} id={`turing-item-${i}`} className="scroll-mt-[190px] rounded-[4px] border-2 border-[#d96c4f] bg-[#fffaf2] p-4 sm:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
                              Pergunta {i + 1} de {seq.length} · {a.source}
                            </div>
                            <div className="mt-1 text-lg font-semibold text-[#292827]">“{a.question}”</div>
                            {a.why && <div className="mt-1 text-xs text-[#292827]/60">{a.why}</div>}
                          </div>
                          <span className="rounded-full bg-[#292827]/5 px-2.5 py-1 text-xs font-bold text-[#292827]/70">alvo ≈ {fmt(est)}</span>
                        </div>
                        <div className="mt-3">{plain ? <p className="text-[17px] leading-8 text-[#292827]">{plainText(a.breathing)}</p> : <BreathingText text={a.breathing} />}</div>
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
                        {bridges[a.id] && seq[i + 1] && (
                          <div className="mt-4 rounded-[3px] border-l-4 border-sky-500 bg-sky-50 p-3">
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800">
                              Ponte, se precisar → {shortLabel(seq[i + 1].a)}
                            </div>
                            <div className="mt-1">
                              {plain ? <p className="text-[15px] leading-7 text-[#292827]">{plainText(bridges[a.id])}</p> : <BreathingText text={bridges[a.id]} />}
                            </div>
                          </div>
                        )}
                        <div className="mt-4 text-xs font-bold text-[#292827]/50">Espaço → próxima · ← volta</div>
                      </li>
                    );
                  })}
                </ol>

                {isCurrent && (
                  <label className="mt-4 block">
                    <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#292827]/55">
                      <NotebookPen size={13} /> Minhas anotações: {step.title}
                    </span>
                    <textarea
                      value={notes[`step-${step.n}`] ?? ""}
                      onChange={e => saveNote(`step-${step.n}`, e.target.value)}
                      rows={2}
                      placeholder="O que treinar melhor, palavras que travaram, perguntas que a IA fez..."
                      className="mt-1.5 w-full rounded-[3px] border border-[#292827]/15 bg-white p-2.5 text-sm"
                    />
                  </label>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      </div>

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

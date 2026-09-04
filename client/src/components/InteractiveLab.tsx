import { useState, useMemo } from "react";
import {
  Check,
  Headphones,
  Mic2,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { trainingModules, type ExerciseItem } from "../data/trainingData";

type InteractiveLabProps = {
  onScoreUpdate: (correctDelta: number, totalDelta: number) => void;
  onSpeechRecorded: () => void;
  speakFn: (text: string, lang: "en" | "pt", speed: number) => void;
};

function norm(s: string) {
  return String(s)
    .toLowerCase()
    .replace(/[‘’ʼ´`]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[,]/g, " ")
    .replace(/[.!?;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function canon(s: string) {
  return norm(s)
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcan't\b|\bcannot\b/g, "can not")
    .replace(
      /\b(is|are|was|were|do|does|did|has|have|had|could|would|should|must)n't\b/g,
      "$1 not"
    )
    .replace(/\bi'm\b/g, "i am")
    .replace(/\b(he|she|it|that|this|there|what|who|where|here)'s\b/g, "$1 is")
    .replace(/\b(you|we|they)'re\b/g, "$1 are")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchAnswer(given: string, accepted: string[]) {
  const g = canon(given);
  if (!g) return false;
  return accepted.some(acc => g === canon(acc));
}

export function InteractiveLab({
  onScoreUpdate,
  onSpeechRecorded,
  speakFn,
}: InteractiveLabProps) {
  const [currentModIndex, setCurrentModIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { answered: boolean; correct: boolean; value?: any }>
  >({});
  const [orderSlots, setOrderSlots] = useState<Record<string, string[]>>({});
  const [spokenDone, setSpokenDone] = useState<Record<string, boolean>>({});

  const module = trainingModules[currentModIndex];

  const handleFillSubmit = (
    itemKey: string,
    val: string,
    accepted: string[]
  ) => {
    if (answers[itemKey]?.answered) return;
    const isCorrect = matchAnswer(val, accepted);
    setAnswers(prev => ({
      ...prev,
      [itemKey]: { answered: true, correct: isCorrect, value: val },
    }));
    onScoreUpdate(isCorrect ? 1 : 0, 1);
    if (isCorrect) {
      speakFn(accepted[0], "en", 0.9);
    }
  };

  const handleMcSelect = (
    itemKey: string,
    chosenIdx: number,
    correctIdx: number,
    text: string
  ) => {
    if (answers[itemKey]?.answered) return;
    const isCorrect = chosenIdx === correctIdx;
    setAnswers(prev => ({
      ...prev,
      [itemKey]: { answered: true, correct: isCorrect, value: chosenIdx },
    }));
    onScoreUpdate(isCorrect ? 1 : 0, 1);
    if (isCorrect) {
      speakFn(text, "en", 0.9);
    }
  };

  const handleOrderAdd = (
    itemKey: string,
    word: string,
    poolIdx: number,
    wordsPool: string[]
  ) => {
    const current = orderSlots[itemKey] || [];
    setOrderSlots(prev => ({ ...prev, [itemKey]: [...current, word] }));
  };

  const handleOrderRemove = (itemKey: string, indexToRemove: number) => {
    const current = orderSlots[itemKey] || [];
    const updated = current.filter((_, idx) => idx !== indexToRemove);
    setOrderSlots(prev => ({ ...prev, [itemKey]: updated }));
  };

  const handleOrderCheck = (itemKey: string, targetPhrase: string) => {
    if (answers[itemKey]?.answered) return;
    const current = orderSlots[itemKey] || [];
    const built = current.join(" ");
    const isCorrect = canon(built) === canon(targetPhrase);
    setAnswers(prev => ({
      ...prev,
      [itemKey]: { answered: true, correct: isCorrect, value: built },
    }));
    onScoreUpdate(isCorrect ? 1 : 0, 1);
    if (isCorrect) {
      speakFn(targetPhrase, "en", 0.9);
    }
  };

  const handleOrderReset = (itemKey: string) => {
    setOrderSlots(prev => ({ ...prev, [itemKey]: [] }));
    setAnswers(prev => {
      const next = { ...prev };
      delete next[itemKey];
      return next;
    });
  };

  const handleSayConfirm = (itemKey: string) => {
    if (spokenDone[itemKey]) return;
    setSpokenDone(prev => ({ ...prev, [itemKey]: true }));
    onSpeechRecorded();
  };

  return (
    <div className="space-y-8">
      {/* Header do Módulo */}
      <div className="rounded-[4px] border border-[#292827]/10 bg-[#292827] p-6 text-[#f5f0e7] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full bg-[#d96c4f] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#fffaf2]">
            MÓDULO 0{currentModIndex + 1} · {module.tag}
          </span>
          <span className="text-xs font-bold text-[#f5f0e7]/60">
            Meta: {module.min} minutos
          </span>
        </div>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{module.title}</h2>
        <p className="mt-2 text-sm text-[#f5f0e7]/75">{module.sub}</p>
        <div className="mt-4 border-t border-white/10 pt-3 text-xs italic text-[#f5f0e7]/60">
          Por que isto importa: {module.why}
        </div>
      </div>

      {/* Navegação entre módulos */}
      <div className="flex flex-wrap gap-2">
        {trainingModules.map((mod, idx) => (
          <button
            key={mod.id}
            onClick={() => setCurrentModIndex(idx)}
            className={`rounded-[2px] border px-3 py-1.5 text-xs font-bold transition-all ${
              currentModIndex === idx
                ? "border-[#d96c4f] bg-[#d96c4f] text-[#fffaf2]"
                : "border-[#292827]/15 bg-white/40 text-[#292827]/70 hover:border-[#d96c4f]"
            }`}
          >
            0{idx + 1}. {mod.tag}
          </button>
        ))}
      </div>

      {/* Lista de Exercícios do Módulo */}
      <div className="space-y-5">
        {module.items.map((item, idx) => {
          const itemKey = `${module.id}-${idx}`;
          const state = answers[itemKey];

          if (item.t === "note") {
            return (
              <div
                key={itemKey}
                className="rounded-[3px] border-l-4 border-[#d96c4f] bg-[#d96c4f]/10 p-5"
              >
                <h4 className="font-serif text-lg font-bold text-[#292827]">
                  {item.title}
                </h4>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#292827]/80">
                  {item.body}
                </p>
              </div>
            );
          }

          if (item.t === "read") {
            return (
              <div
                key={itemKey}
                className="rounded-[3px] border border-dashed border-[#292827]/25 bg-white/40 p-6"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-bold text-[#292827]">
                    {item.title}
                  </h4>
                  <button
                    onClick={() => speakFn(item.paras.join(" "), "en", 0.85)}
                    className="flex items-center gap-1.5 rounded-[2px] border border-[#292827]/20 px-2.5 py-1 text-xs font-bold hover:border-[#d96c4f]"
                  >
                    <Volume2 size={14} className="text-[#d96c4f]" /> Ouvir tudo
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {item.paras.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm font-semibold leading-relaxed text-[#292827]/85"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );
          }

          if (item.t === "mc") {
            return (
              <div
                key={itemKey}
                className={`rounded-[3px] border bg-white/50 p-6 transition-all ${
                  state?.answered
                    ? state.correct
                      ? "border-emerald-500/50 bg-emerald-50/40"
                      : "border-red-400/50 bg-red-50/40"
                    : "border-[#292827]/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#292827] text-xs font-bold text-[#f5f0e7]">
                    ?
                  </span>
                  <h4 className="text-base font-bold text-[#292827]">
                    {item.q}
                  </h4>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {item.opts.map((opt, optIdx) => {
                    const isChosen = state?.value === optIdx;
                    const isTheCorrectOne = optIdx === item.a;
                    let btnStyle =
                      "border-[#292827]/20 bg-white hover:border-[#d96c4f]";
                    if (state?.answered) {
                      if (isTheCorrectOne)
                        btnStyle =
                          "border-emerald-600 bg-emerald-100 text-emerald-950 font-extrabold";
                      else if (isChosen && !state.correct)
                        btnStyle = "border-red-500 bg-red-100 text-red-950";
                      else btnStyle = "opacity-40 border-gray-200";
                    }
                    return (
                      <button
                        key={opt}
                        disabled={state?.answered}
                        onClick={() =>
                          handleMcSelect(itemKey, optIdx, item.a, opt)
                        }
                        className={`rounded-[3px] border px-4 py-2 text-sm font-bold transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {state?.answered && (
                  <div className="mt-3 flex items-center justify-between text-xs font-bold">
                    <span
                      className={
                        state.correct ? "text-emerald-700" : "text-red-700"
                      }
                    >
                      {state.correct
                        ? "✔ Correto!"
                        : `✘ Resposta certa: ${item.opts[item.a]}`}
                    </span>
                    <button
                      onClick={() => speakFn(item.opts[item.a], "en", 0.9)}
                      className="flex items-center gap-1 text-[#d96c4f] hover:underline"
                    >
                      <Volume2 size={13} /> Ouvir pronúncia
                    </button>
                  </div>
                )}
              </div>
            );
          }

          if (item.t === "fill") {
            return (
              <FillQuestion
                key={itemKey}
                itemKey={itemKey}
                q={item.q}
                ph={item.ph}
                accepted={item.a}
                state={state}
                onSubmit={val => handleFillSubmit(itemKey, val, item.a)}
                onSpeak={txt => speakFn(txt, "en", 0.9)}
              />
            );
          }

          if (item.t === "ord") {
            return (
              <OrderQuestion
                key={itemKey}
                itemKey={itemKey}
                q={item.q}
                targetAnswer={item.a}
                state={state}
                chosenWords={orderSlots[itemKey] || []}
                onAddWord={(w, pIdx, pool) =>
                  handleOrderAdd(itemKey, w, pIdx, pool)
                }
                onRemoveWord={rIdx => handleOrderRemove(itemKey, rIdx)}
                onCheck={() => handleOrderCheck(itemKey, item.a)}
                onReset={() => handleOrderReset(itemKey)}
                onSpeak={(txt, slow) => speakFn(txt, "en", slow ? 0.6 : 0.9)}
              />
            );
          }

          if (item.t === "say") {
            const isDone = spokenDone[itemKey];
            return (
              <div
                key={itemKey}
                className="rounded-[3px] border border-[#d96c4f]/30 bg-[#f5f0e7] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#d96c4f]">
                      <Mic2 size={14} /> Falar em voz alta
                    </span>
                    <h4 className="mt-1 font-serif text-lg font-bold text-[#292827]">
                      {item.q}
                    </h4>
                    <p className="mt-2 text-xs italic text-[#292827]/70">
                      Ponto de partida: <strong>{item.starter}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => handleSayConfirm(itemKey)}
                    className={`flex items-center gap-1.5 rounded-[2px] border px-3 py-1.5 text-xs font-bold transition-all ${
                      isDone
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-[#292827]/25 bg-white text-[#292827] hover:border-[#d96c4f]"
                    }`}
                  >
                    <Check size={14} />{" "}
                    {isDone ? "Praticado!" : "Falei em voz alta"}
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

function FillQuestion({
  itemKey,
  q,
  ph,
  accepted,
  state,
  onSubmit,
  onSpeak,
}: {
  itemKey: string;
  q: string;
  ph?: string;
  accepted: string[];
  state?: { answered: boolean; correct: boolean; value?: any };
  onSubmit: (val: string) => void;
  onSpeak: (txt: string) => void;
}) {
  const [val, setVal] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && val.trim() && !state?.answered) {
      onSubmit(val.trim());
    }
  };

  return (
    <div
      className={`rounded-[3px] border bg-white/50 p-6 transition-all ${
        state?.answered
          ? state.correct
            ? "border-emerald-500/50 bg-emerald-50/40"
            : "border-red-400/50 bg-red-50/40"
          : "border-[#292827]/10"
      }`}
    >
      <h4 className="text-base font-bold text-[#292827]">{q}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          type="text"
          value={val}
          disabled={state?.answered}
          onChange={e => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ph || "Digite sua resposta..."}
          className="min-w-[240px] flex-1 rounded-[2px] border border-[#292827]/20 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#d96c4f]"
        />
        <button
          disabled={state?.answered || !val.trim()}
          onClick={() => onSubmit(val.trim())}
          className="rounded-[2px] bg-[#292827] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#f5f0e7] hover:bg-[#d96c4f] disabled:opacity-40"
        >
          Verificar (Enter)
        </button>
      </div>
      {state?.answered && (
        <div className="mt-3 flex items-center justify-between text-xs font-bold">
          <span className={state.correct ? "text-emerald-700" : "text-red-700"}>
            {state.correct ? "✔ Correto!" : `✘ Resposta certa: ${accepted[0]}`}
          </span>
          <button
            onClick={() => onSpeak(accepted[0])}
            className="flex items-center gap-1 text-[#d96c4f] hover:underline"
          >
            <Volume2 size={13} /> Ouvir resposta correta
          </button>
        </div>
      )}
    </div>
  );
}

function OrderQuestion({
  itemKey,
  q,
  targetAnswer,
  state,
  chosenWords,
  onAddWord,
  onRemoveWord,
  onCheck,
  onReset,
  onSpeak,
}: {
  itemKey: string;
  q: string;
  targetAnswer: string;
  state?: { answered: boolean; correct: boolean; value?: any };
  chosenWords: string[];
  onAddWord: (word: string, poolIdx: number, pool: string[]) => void;
  onRemoveWord: (index: number) => void;
  onCheck: () => void;
  onReset: () => void;
  onSpeak: (txt: string, slow?: boolean) => void;
}) {
  const wordsPool = useMemo(() => {
    // Quebra palavras do target e embaralha determinístico
    const raw = targetAnswer.split(/\s+/);
    return [...raw].sort((a, b) => a.localeCompare(b));
  }, [targetAnswer]);

  return (
    <div
      className={`rounded-[3px] border bg-white/50 p-6 transition-all ${
        state?.answered
          ? state.correct
            ? "border-emerald-500/50 bg-emerald-50/40"
            : "border-red-400/50 bg-red-50/40"
          : "border-[#292827]/10"
      }`}
    >
      <h4 className="text-base font-bold text-[#292827]">{q}</h4>

      {/* Slot onde o usuário monta a frase */}
      <div className="mt-3 min-h-[50px] rounded-[3px] border-2 border-dashed border-[#d96c4f]/40 bg-[#d96c4f]/5 p-2.5">
        {chosenWords.length === 0 ? (
          <span className="text-xs italic text-[#292827]/45">
            Clique nas palavras abaixo para montar a frase...
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {chosenWords.map((word, idx) => (
              <button
                key={`${word}-${idx}`}
                disabled={state?.answered}
                onClick={() => onRemoveWord(idx)}
                className="rounded-[2px] border border-[#292827] bg-[#292827] px-2.5 py-1 text-xs font-bold text-[#f5f0e7] hover:bg-red-600"
              >
                {word} ✕
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pool de palavras disponíveis */}
      {!state?.answered && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {wordsPool.map((word, pIdx) => (
            <button
              key={`${word}-${pIdx}`}
              onClick={() => onAddWord(word, pIdx, wordsPool)}
              className="rounded-[2px] border border-[#292827]/25 bg-white px-3 py-1.5 text-xs font-bold text-[#292827] hover:border-[#d96c4f] hover:text-[#d96c4f]"
            >
              {word}
            </button>
          ))}
        </div>
      )}

      {/* Botões de Ação */}
      <div className="mt-4 flex items-center gap-2">
        {!state?.answered ? (
          <>
            <button
              disabled={chosenWords.length === 0}
              onClick={onCheck}
              className="rounded-[2px] bg-[#d96c4f] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#c95d42] disabled:opacity-40"
            >
              Conferir Frase
            </button>
            <button
              onClick={onReset}
              className="rounded-[2px] border border-[#292827]/20 px-3 py-1.5 text-xs font-bold text-[#292827]/60 hover:border-[#292827]"
            >
              Limpar
            </button>
          </>
        ) : (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-bold text-[#292827]/60 hover:text-[#292827]"
          >
            <RotateCcw size={13} /> Tentar novamente
          </button>
        )}
      </div>

      {state?.answered && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#292827]/10 pt-3 text-xs font-bold">
          <span className={state.correct ? "text-emerald-700" : "text-red-700"}>
            {state.correct
              ? "✔ Perfeito!"
              : `✘ Resposta correta: ${targetAnswer}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSpeak(targetAnswer, false)}
              className="flex items-center gap-1 text-[#d96c4f] hover:underline"
            >
              <Volume2 size={13} /> Ouvir normal
            </button>
            <button
              onClick={() => onSpeak(targetAnswer, true)}
              className="flex items-center gap-1 text-[#292827]/60 hover:underline"
            >
              🐢 Devagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

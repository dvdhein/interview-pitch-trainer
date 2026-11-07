import { useState } from "react";
import {
  Headphones,
  Sparkles,
  Volume2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { roleplayScenarios, type RoleplayScenario } from "../data/scenarioData";

type RoleplayScenariosProps = {
  language: "en" | "pt";
  speakFn: (text: string, lang: "en" | "pt", speed: number) => void;
  onRecordSpeech: () => void;
};

export function RoleplayScenarios({
  language,
  speakFn,
  onRecordSpeech,
}: RoleplayScenariosProps) {
  const [selectedId, setSelectedId] = useState(roleplayScenarios[0].id);
  const [categoryFilter, setCategoryFilter] = useState<
    RoleplayScenario["category"] | "all"
  >("all");
  const [markedDone, setMarkedDone] = useState<Record<string, boolean>>({});

  const categories = Array.from(
    new Set(roleplayScenarios.map(s => s.category))
  );
  const visibleScenarios =
    categoryFilter === "all"
      ? roleplayScenarios
      : roleplayScenarios.filter(s => s.category === categoryFilter);

  const active =
    roleplayScenarios.find(s => s.id === selectedId) || roleplayScenarios[0];

  const handleFilter = (cat: RoleplayScenario["category"] | "all") => {
    setCategoryFilter(cat);
    const first =
      cat === "all"
        ? roleplayScenarios[0]
        : roleplayScenarios.find(s => s.category === cat);
    if (first && cat !== "all" && active.category !== cat)
      setSelectedId(first.id);
  };

  const handleMarkSpoken = (id: string) => {
    setMarkedDone(prev => ({ ...prev, [id]: true }));
    onRecordSpeech();
  };

  return (
    <div className="space-y-8">
      {/* Header da Seção */}
      <div className="border-b border-[#292827]/10 pb-6">
        <div className="eyebrow">04 / ROLEPLAY & HARD SCENARIOS</div>
        <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
          Cenários reais que definem a contratação.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#292827]/70">
          Entrevistadores seniores avaliam como você reage sob pressão, como
          resolve conflitos de prazos vs. segurança e como se posiciona em
          arquiteturas críticas de alta escala.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        {/* Seletor de Cenários */}
        <div className="space-y-2">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {(["all", ...categories] as const).map(cat => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`rounded-[2px] border px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                  categoryFilter === cat
                    ? "border-[#d96c4f] bg-[#d96c4f] text-white"
                    : "border-[#292827]/15 text-[#292827]/70 hover:border-[#d96c4f]"
                }`}
              >
                {cat === "all" ? "Todos" : cat}
              </button>
            ))}
          </div>
          {visibleScenarios.map(scen => (
            <button
              key={scen.id}
              onClick={() => setSelectedId(scen.id)}
              className={`choice-card ${active.id === scen.id ? "choice-active" : ""}`}
            >
              <span className="choice-number">
                {String(roleplayScenarios.indexOf(scen) + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
                  {scen.category}
                </span>
                <span className="mt-1 block text-sm font-bold leading-5">
                  {scen.title}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Card do Cenário Ativo */}
        <div className="answer-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow">{active.category}</span>
              <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
                “{active.question}”
              </h3>
            </div>
            <button
              onClick={() =>
                speakFn(
                  language === "en"
                    ? active.suggestedAnswerEn
                    : active.suggestedAnswerPt,
                  language,
                  0.9
                )
              }
              className="flex items-center gap-1.5 rounded-[2px] border border-[#d96c4f] bg-[#d96c4f] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#c95d42]"
            >
              <Volume2 size={15} /> Ouvir resposta
            </button>
          </div>

          {/* Contexto Estratégico */}
          <div className="mt-5 rounded-[3px] border border-[#292827]/10 bg-white/40 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#d96c4f]">
              <AlertCircle size={15} /> A intenção por trás da pergunta:
            </div>
            <p className="mt-1.5 text-xs leading-5 text-[#292827]/80">
              {active.context}
            </p>
          </div>

          {/* Resposta Sugerida */}
          <div className="mt-6">
            <div className="eyebrow">
              {language === "en"
                ? "RECOMMENDED SPOKEN RESPONSE (EN)"
                : "RESPOSTA MODELO FALADA (PT-BR)"}
            </div>
            <p className="mt-3 font-sans text-base font-semibold leading-relaxed text-[#292827]/90">
              {language === "en"
                ? active.suggestedAnswerEn
                : active.suggestedAnswerPt}
            </p>
          </div>

          {/* Método STAR — versão completa */}
          {active.star && (
            <div className="mt-6 border-t border-[#292827]/10 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="eyebrow">
                  {language === "en"
                    ? "STAR METHOD — FULL VERSION"
                    : "MÉTODO STAR — VERSÃO COMPLETA"}
                </div>
                <button
                  onClick={() => {
                    const st = active.star![language];
                    speakFn(
                      [st.situation, st.task, st.action, st.result].join(" "),
                      language,
                      0.9
                    );
                  }}
                  className="flex items-center gap-1.5 rounded-[2px] border border-[#292827]/20 px-3 py-1.5 text-xs font-bold text-[#292827] hover:border-[#d96c4f]"
                >
                  <Headphones size={15} /> Ouvir STAR completo
                </button>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#292827]/60">
                Proporção ideal: Situação + Tarefa ≈ 20%, Ação ≈ 60% (o que VOCÊ
                fez, em primeira pessoa), Resultado ≈ 20% (impacto +
                aprendizado). A resposta falada acima é a versão curta.
              </p>
              <div className="mt-4 space-y-3">
                {(
                  [
                    ["S", "Situation", "Situação", "situation"],
                    ["T", "Task", "Tarefa", "task"],
                    ["A", "Action", "Ação", "action"],
                    ["R", "Result", "Resultado", "result"],
                  ] as const
                ).map(([letter, en, pt, key]) => (
                  <div
                    key={key}
                    className="grid grid-cols-[32px_1fr] gap-3 rounded-[3px] border border-[#292827]/10 bg-white/40 p-3"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#d96c4f] font-serif text-lg font-bold text-white">
                      {letter}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
                        {language === "en" ? en : pt}
                      </div>
                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#292827]/85">
                        {active.star![language][key]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pontos de Ouro (Golden Points) */}
          <div className="mt-6 border-t border-[#292827]/10 pt-5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#292827]/60">
              <ShieldCheck size={15} className="text-[#d96c4f]" /> Argumentos
              inegociáveis para incluir:
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.goldenKeyPoints.map(pt => (
                <span
                  key={pt}
                  className="rounded-[2px] border border-[#d96c4f]/30 bg-[#d96c4f]/10 px-2.5 py-1 text-xs font-bold text-[#292827]"
                >
                  {pt}
                </span>
              ))}
            </div>
          </div>

          {/* Botão de Registro de Treino */}
          <div className="mt-8 flex items-center justify-between border-t border-[#292827]/10 pt-5">
            <span className="text-xs text-[#292827]/60">
              Pratique respondendo em voz alta com suas próprias palavras antes
              de ouvir.
            </span>
            <button
              onClick={() => handleMarkSpoken(active.id)}
              className={`rounded-[2px] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] transition-all ${
                markedDone[active.id]
                  ? "bg-emerald-700 text-white"
                  : "border border-[#292827] bg-[#292827] text-white hover:bg-[#d96c4f]"
              }`}
            >
              {markedDone[active.id]
                ? "✔ Treino Registrado"
                : "Pratiquei em voz alta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

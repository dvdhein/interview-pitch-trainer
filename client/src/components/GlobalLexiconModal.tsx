import React, { useState } from "react";
import { X, Search, Volume2, Copy, Check, Globe2, Sparkles, BookOpen } from "lucide-react";
import { globalLexiconEntries, type GlobalLexiconEntry } from "../data/internationalMarketsData";
import type { Language } from "../data/cvTracks";

interface GlobalLexiconModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  speakFn: (text: string, lang: Language, speed: number) => void;
}

export const GlobalLexiconModal: React.FC<GlobalLexiconModalProps> = ({
  isOpen,
  onClose,
  language,
  speakFn,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    "all",
    "Regulação",
    "Sistemas de Pagamento",
    "Empresas & Escala",
    "Privacidade & Compliance",
  ];

  const filtered = globalLexiconEntries.filter(entry => {
    const matchesCat =
      selectedCategory === "all" || entry.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      entry.brazilianTerm.toLowerCase().includes(q) ||
      entry.contextPt.toLowerCase().includes(q) ||
      entry.contextEn.toLowerCase().includes(q) ||
      entry.spokenHookEn.toLowerCase().includes(q) ||
      entry.equivalents.global.toLowerCase().includes(q) ||
      entry.equivalents.us.toLowerCase().includes(q) ||
      entry.equivalents.eu.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#292827]/70 p-4 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[3px] border border-[#292827]/20 bg-[#fbf9f4] shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#292827]/10 bg-[#f5f0e7] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d96c4f]/15 text-[#d96c4f]">
              <Globe2 size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d96c4f]">
                  Global Tech Lexicon
                </span>
                <span className="rounded bg-[#292827]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#292827]/70">
                  {filtered.length} termos mapeados
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-[#292827]">
                Dicionário de Tradução de Autoridade Técnica
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-[#292827]/60 hover:bg-[#292827]/10 hover:text-[#292827] transition"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Subheader / Explicação */}
        <div className="border-b border-[#292827]/10 bg-white/40 px-6 py-3 text-xs text-[#292827]/70 flex flex-wrap items-center justify-between gap-2">
          <p>
            Traduza <strong>BACEN</strong>, <strong>PIX</strong>, <strong>LGPD</strong>, <strong>Boticário</strong> e <strong>Aché</strong> em equivalentes de peso reconhecidos por recrutadores e gestores nos EUA, Europa, Canadá e Austrália.
          </p>
          <span className="flex items-center gap-1 font-semibold text-[#d96c4f]">
            <Sparkles size={13} /> Clique no alto-falante para treinar pronúncia
          </span>
        </div>

        {/* Controles de Busca e Filtro */}
        <div className="p-6 pb-3 space-y-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#292827]/40"
            />
            <input
              type="text"
              placeholder="Buscar termo brasileiro ou equivalente internacional (ex: FedNow, BACEN, GDPR, Pharma)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-[3px] border border-[#292827]/15 bg-white py-2.5 pl-10 pr-4 text-xs text-[#292827] placeholder:text-[#292827]/40 focus:border-[#d96c4f] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-[3px] px-2.5 py-1 text-[11px] font-bold transition ${
                  selectedCategory === cat
                    ? "bg-[#292827] text-white"
                    : "border border-[#292827]/15 bg-white/50 text-[#292827]/70 hover:bg-white"
                }`}
              >
                {cat === "all" ? "Todos os Termos" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Termos */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded border border-dashed border-[#292827]/20 p-8 text-center text-xs text-[#292827]/60">
              Nenhum termo encontrado para essa busca. Tente buscar por "PIX", "BACEN", "LGPD" ou "Boticário".
            </div>
          ) : (
            filtered.map(entry => (
              <div
                key={entry.id}
                className="rounded-[3px] border border-[#292827]/12 bg-white/80 p-4 transition hover:border-[#292827]/25 hover:bg-white"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#292827]/10 pb-3">
                  <div>
                    <span className="rounded bg-[#d96c4f]/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
                      {entry.category}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-[#292827]">
                      {entry.brazilianTerm}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#292827]/65">
                      {language === "en" ? entry.contextEn : entry.contextPt}
                    </p>
                  </div>
                </div>

                {/* Grade de Equivalentes Internacionais */}
                <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                  <div className="rounded bg-[#292827]/4 p-2.5">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/60">
                      🇺🇸 Equivalente EUA
                    </span>
                    <span className="mt-1 block font-semibold text-[#292827]">
                      {entry.equivalents.us}
                    </span>
                  </div>
                  <div className="rounded bg-[#292827]/4 p-2.5">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/60">
                      🇪🇺 Equivalente Europa & UK
                    </span>
                    <span className="mt-1 block font-semibold text-[#292827]">
                      {entry.equivalents.eu}
                    </span>
                  </div>
                  <div className="rounded bg-[#292827]/4 p-2.5">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/60">
                      🇨🇦 Equivalente Canadá
                    </span>
                    <span className="mt-1 block font-semibold text-[#292827]">
                      {entry.equivalents.ca}
                    </span>
                  </div>
                  <div className="rounded bg-[#292827]/4 p-2.5">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#292827]/60">
                      🇦🇺 Equivalente Austrália
                    </span>
                    <span className="mt-1 block font-semibold text-[#292827]">
                      {entry.equivalents.au}
                    </span>
                  </div>
                </div>

                {/* Spoken Hook: Como falar na entrevista */}
                <div className="mt-3 rounded border-l-2 border-[#d96c4f] bg-[#d96c4f]/6 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
                      🎯 Como falar ao vivo (Executive Spoken Hook)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          speakFn(
                            language === "en"
                              ? entry.spokenHookEn
                              : entry.spokenHookPt,
                            language,
                            0.9
                          )
                        }
                        className="flex items-center gap-1 rounded bg-[#292827] px-2 py-1 text-[10px] font-bold text-white hover:bg-[#d96c4f] transition"
                        title="Ouvir gancho em inglês"
                      >
                        <Volume2 size={12} /> Treinar Áudio
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            entry.id,
                            language === "en"
                              ? entry.spokenHookEn
                              : entry.spokenHookPt
                          )
                        }
                        className="flex items-center gap-1 rounded border border-[#292827]/20 bg-white px-2 py-1 text-[10px] font-bold text-[#292827] hover:bg-[#292827]/5 transition"
                        title="Copiar texto"
                      >
                        {copiedId === entry.id ? (
                          <>
                            <Check size={12} className="text-emerald-600" /> Copiado!
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs italic font-serif leading-relaxed text-[#292827]">
                    "{language === "en" ? entry.spokenHookEn : entry.spokenHookPt}"
                  </p>
                </div>

                {/* Why it works / Estratégia */}
                <div className="mt-2 text-[11px] text-[#292827]/60">
                  <strong className="font-semibold text-[#292827]/80">
                    💡 Por que funciona com recrutadores internacionais:
                  </strong>{" "}
                  {language === "en" ? entry.whyItWorksEn : entry.whyItWorksPt}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#292827]/10 bg-[#f5f0e7] px-6 py-3 flex items-center justify-between text-xs text-[#292827]/60">
          <span>Use estes ganchos no início de cada resposta para criar autoridade imediata.</span>
          <button
            onClick={onClose}
            className="rounded-[3px] bg-[#292827] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#d96c4f] transition"
          >
            Concluir & Voltar ao Treino
          </button>
        </div>
      </div>
    </div>
  );
};

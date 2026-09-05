import React, { useState } from "react";
import {
  Globe2,
  Volume2,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import {
  internationalMarkets,
  type TargetMarket,
  type TargetMarketId,
} from "../data/internationalMarketsData";
import type { Language } from "../data/cvTracks";

interface InternationalMarketSelectorProps {
  language: Language;
  onOpenLexicon: () => void;
  speakFn: (text: string, lang: Language, speed: number) => void;
}

export const InternationalMarketSelector: React.FC<
  InternationalMarketSelectorProps
> = ({ language, onOpenLexicon, speakFn }) => {
  const [selectedMarketId, setSelectedMarketId] = useState<TargetMarketId>("us");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeMarket =
    internationalMarkets.find(m => m.id === selectedMarketId) ??
    internationalMarkets[0];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="rounded-[3px] border border-[#292827]/15 bg-[#fbf9f4] p-5 shadow-sm">
      {/* Header do Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292827]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d96c4f]">
              <Globe2 size={13} /> Target Market Navigator
            </span>
            <span className="rounded bg-[#292827]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#292827]/70">
              Posicionamento Internacional
            </span>
          </div>
          <h2 className="mt-1 font-serif text-xl font-bold tracking-tight text-[#292827]">
            {language === "en"
              ? "Select Your Target Country for Cultural & Regulatory Tuning"
              : "Selecione o País de Destino para Ajuste Cultural & Regulatório"}
          </h2>
        </div>

        <button
          onClick={onOpenLexicon}
          className="flex items-center gap-1.5 rounded-[3px] border border-[#d96c4f] bg-[#d96c4f]/10 px-3 py-1.5 text-xs font-bold text-[#d96c4f] hover:bg-[#d96c4f] hover:text-white transition"
        >
          <BookOpen size={14} />
          {language === "en" ? "Global Tech Lexicon" : "Dicionário Tech Global"}
        </button>
      </div>

      {/* Seletor de Países */}
      <div className="mt-4 flex flex-wrap gap-2">
        {internationalMarkets.map(market => {
          const isSelected = market.id === selectedMarketId;
          return (
            <button
              key={market.id}
              onClick={() => setSelectedMarketId(market.id)}
              className={`flex items-center gap-2 rounded-[3px] px-3.5 py-2 text-xs font-bold transition ${
                isSelected
                  ? "bg-[#292827] text-[#fffaf2] shadow-sm"
                  : "border border-[#292827]/15 bg-white/70 text-[#292827]/80 hover:bg-white hover:text-[#292827]"
              }`}
            >
              <span className="text-base">{market.flag}</span>
              <span>{language === "en" ? market.nameEn : market.namePt}</span>
            </button>
          );
        })}
      </div>

      {/* Cartão de Detalhes do Mercado Ativo */}
      <div className="mt-5 rounded-[3px] border border-[#292827]/10 bg-white/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292827]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeMarket.flag}</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#292827]">
                {language === "en" ? activeMarket.nameEn : activeMarket.namePt}
              </h3>
              <p className="text-[11px] font-semibold text-[#292827]/60">
                {activeMarket.regionTag} · <em>{activeMarket.culturalTone}</em>
              </p>
            </div>
          </div>
        </div>

        {/* Expectativas e Dicas de Estilo */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[3px] bg-[#292827]/4 p-3 text-xs leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#292827]">
              <Lightbulb size={14} className="text-[#d96c4f]" />
              {language === "en" ? "Core Cultural Expectation" : "Expectativa Cultural Central"}
            </div>
            <p className="mt-2 text-[#292827]/80">
              {language === "en"
                ? activeMarket.coreExpectationsEn
                : activeMarket.coreExpectationsPt}
            </p>
            <div className="mt-3 border-t border-[#292827]/10 pt-2 font-medium text-[#d96c4f]">
              💡 {language === "en" ? activeMarket.styleAdviceEn : activeMarket.styleAdvicePt}
            </div>
          </div>

          <div className="rounded-[3px] bg-red-500/5 p-3 text-xs leading-relaxed border border-red-500/15">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-900">
              <AlertTriangle size={14} className="text-red-600" />
              {language === "en" ? "Cultural Red Flags to Avoid" : "Armadilhas e Red Flags Culturais"}
            </div>
            <p className="mt-2 text-[#292827]/80">
              {language === "en"
                ? activeMarket.redFlagsToAvoidEn
                : activeMarket.redFlagsToAvoidPt}
            </p>
          </div>
        </div>

        {/* Palavras-Chave de Ouro */}
        <div className="mt-4">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#292827]/60">
            {language === "en" ? "Golden Keywords for this Market:" : "Palavras-Chave Recomendadas para este Mercado:"}
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {activeMarket.goldenKeywords.map(keyword => (
              <span
                key={keyword}
                className="rounded-full border border-[#292827]/15 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#292827]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Ganchos Regulatórios Equivalentes Prontos para Falar */}
        <div className="mt-4 border-t border-[#292827]/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
              {language === "en"
                ? "Ready-to-Speak Regulatory Equivalents"
                : "Equivalentes Regulatórios Prontos para Falar"}
            </span>
            <span className="text-[10px] text-[#292827]/55">
              Clique em reproduzir para ouvir a pronúncia em inglês
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {activeMarket.equivalents.map((item, idx) => {
              const hookText =
                language === "en" ? item.spokenHookEn : item.spokenHookPt;
              const copyKey = `${activeMarket.id}-${idx}`;
              return (
                <div
                  key={idx}
                  className="rounded-[3px] border border-[#292827]/10 bg-white p-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1 border-b border-[#292827]/8 pb-2">
                    <div className="flex items-center gap-2">
                      <strong className="font-bold text-[#292827]">
                        {item.brazilTerm}
                      </strong>
                      <span className="text-[#292827]/40">➔</span>
                      <span className="font-semibold text-[#d96c4f]">
                        {item.globalEquivalent}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => speakFn(hookText, language, 0.9)}
                        className="flex items-center gap-1 rounded bg-[#292827] px-2 py-0.5 text-[10px] font-bold text-white hover:bg-[#d96c4f] transition"
                        title="Ouvir gancho falado"
                      >
                        <Volume2 size={11} /> Ouvir
                      </button>
                      <button
                        onClick={() => handleCopy(copyKey, hookText)}
                        className="flex items-center gap-1 rounded border border-[#292827]/20 bg-white px-2 py-0.5 text-[10px] font-bold text-[#292827] hover:bg-[#292827]/5 transition"
                      >
                        {copiedText === copyKey ? (
                          <>
                            <Check size={11} className="text-emerald-600" /> Copiado
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs italic font-serif text-[#292827]/85">
                    "{hookText}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

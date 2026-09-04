import { useState } from "react";
import {
  Shield,
  Key,
  Lock,
  Cpu,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  apiSecurityCategories,
  apiInterviewPitches,
  type SecurityControl,
} from "../data/apiSecurityData";
import { type Language } from "../data/cvTracks";

type ApiSecurityModuleProps = {
  language: Language;
  speakFn: (text: string, lang: Language, speed: number) => void;
};

export function ApiSecurityModule({
  language,
  speakFn,
}: ApiSecurityModuleProps) {
  const [activeTab, setActiveTab] = useState<"blueprint" | "pitches" | "owasp">(
    "blueprint"
  );
  const [selectedControlId, setSelectedControlId] = useState<string>("mtls");
  const [selectedPitchId, setSelectedPitchId] = useState<string>(
    "api_security_master"
  );

  const allControls = apiSecurityCategories.flatMap(cat => cat.controls);
  const activeControl =
    allControls.find(c => c.id === selectedControlId) || allControls[0];
  const activePitch =
    apiInterviewPitches.find(p => p.id === selectedPitchId) ||
    apiInterviewPitches[0];

  return (
    <div className="space-y-8">
      {/* Header do Módulo */}
      <div className="border-b border-[#292827]/10 pb-6">
        <div className="eyebrow">
          <span className="eyebrow-dot" /> ARQUITETURA & GOVERNANÇA TÉCNICA
        </div>
        <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
          Segurança de APIs & Aplicações
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#292827]/70">
          Controles essenciais para blindar ecossistemas de microsserviços, APIs
          corporativas e esteiras de engenharia. Domine a explicação de{" "}
          <strong>
            mTLS, OAuth2 FAPI, mitigação de BOLA/BFLA, tokenização
          </strong>{" "}
          e práticas modernas de <strong>DevSecOps</strong>.
        </p>

        {/* Sub-navegação interna */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("blueprint")}
            className={`rounded-[2px] border px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "blueprint"
                ? "border-[#d96c4f] bg-[#292827] text-[#fffaf2]"
                : "border-[#292827]/15 bg-white text-[#292827]/70 hover:border-[#d96c4f]"
            }`}
          >
            🛡️ Matriz de Controles Necessários
          </button>
          <button
            onClick={() => setActiveTab("pitches")}
            className={`rounded-[2px] border px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "pitches"
                ? "border-[#d96c4f] bg-[#292827] text-[#fffaf2]"
                : "border-[#292827]/15 bg-white text-[#292827]/70 hover:border-[#d96c4f]"
            }`}
          >
            🎙️ Pitches de API & AppSec
          </button>
          <button
            onClick={() => setActiveTab("owasp")}
            className={`rounded-[2px] border px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "owasp"
                ? "border-[#d96c4f] bg-[#292827] text-[#fffaf2]"
                : "border-[#292827]/15 bg-white text-[#292827]/70 hover:border-[#d96c4f]"
            }`}
          >
            ⚠️ Guia OWASP API Top 10
          </button>
        </div>
      </div>

      {/* ABA 1: MATRIZ DE CONTROLES */}
      {activeTab === "blueprint" && (
        <div className="space-y-8">
          <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
            {/* Lista Agrupada de Controles */}
            <div className="space-y-5">
              {apiSecurityCategories.map((cat, cIdx) => (
                <div key={cat.category} className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-[#292827]/10 pb-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
                    <span>{cat.category}</span>
                  </div>
                  {cat.controls.map(ctrl => {
                    const isSelected = selectedControlId === ctrl.id;
                    return (
                      <button
                        key={ctrl.id}
                        onClick={() => setSelectedControlId(ctrl.id)}
                        className={`flex w-full items-center justify-between rounded-[2px] border p-3 text-left transition-all ${
                          isSelected
                            ? "border-[#d96c4f] bg-[#d96c4f]/10 shadow-sm"
                            : "border-[#292827]/10 bg-white/40 hover:border-[#d96c4f]/50"
                        }`}
                      >
                        <div>
                          <strong className="block text-xs font-extrabold text-[#292827]">
                            {ctrl.name}
                          </strong>
                          <span className="mt-0.5 block text-[10px] text-[#292827]/60">
                            {ctrl.standardOrTech}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[#d96c4f]">●</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Detalhe e Como Explicar o Controle Ativo */}
            <div className="answer-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow">CONTROLE DE SEGURANÇA</span>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-[#292827]">
                    {activeControl.name}
                  </h3>
                  <div className="mt-2 inline-block rounded-[2px] border border-[#292827]/15 bg-white/70 px-2.5 py-0.5 text-xs font-bold text-[#d96c4f]">
                    {activeControl.standardOrTech}
                  </div>
                </div>
                <button
                  onClick={() =>
                    speakFn(
                      language === "en"
                        ? activeControl.howToExplainEn
                        : activeControl.howToExplainPt,
                      language,
                      0.9
                    )
                  }
                  className="coral-btn"
                >
                  <Volume2 size={16} /> Ouvir explicação
                </button>
              </div>

              {/* Ameaça Mitigada */}
              <div className="mt-6 rounded-[3px] border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <AlertTriangle size={15} /> Ameaça & Risco Mitigado:
                </div>
                <p className="mt-1 text-xs leading-5 text-[#292827]/85">
                  {activeControl.threatMitigated}
                </p>
              </div>

              {/* Como Explicar na Entrevista */}
              <div className="mt-6">
                <div className="eyebrow">
                  {language === "en"
                    ? "HOW TO EXPLAIN THIS TO INTERVIEWERS (ENGLISH)"
                    : "COMO EXPLICAR NA ENTREVISTA (PORTUGUÊS)"}
                </div>
                <p className="mt-3 font-sans text-base font-semibold leading-relaxed text-[#292827]/90">
                  “
                  {language === "en"
                    ? activeControl.howToExplainEn
                    : activeControl.howToExplainPt}
                  ”
                </p>
              </div>

              {/* Versão Bilíngue Alternativa */}
              <div className="mt-6 border-t border-[#292827]/10 pt-5 text-xs leading-relaxed text-[#292827]/60">
                <strong>
                  {language === "en"
                    ? "Versão em Português:"
                    : "English Version:"}
                </strong>
                <p className="mt-1 italic">
                  {language === "en"
                    ? activeControl.howToExplainPt
                    : activeControl.howToExplainEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: PITCHES DE API & APPSEC */}
      {activeTab === "pitches" && (
        <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
          <div className="space-y-2">
            {apiInterviewPitches.map((pitch, pIdx) => (
              <button
                key={pitch.id}
                onClick={() => setSelectedPitchId(pitch.id)}
                className={`choice-card ${activePitch.id === pitch.id ? "choice-active" : ""}`}
              >
                <span className="choice-number">0{pIdx + 1}</span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#d96c4f]">
                    {pitch.tag}
                  </span>
                  <span className="mt-1 block text-sm font-bold leading-5">
                    {pitch.title}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="answer-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">{activePitch.tag}</span>
                <h3 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-[#292827]">
                  {activePitch.title}
                </h3>
                <p className="mt-1 text-xs italic text-[#d96c4f]">
                  {activePitch.tips}
                </p>
              </div>
              <button
                onClick={() =>
                  speakFn(
                    language === "en" ? activePitch.en : activePitch.pt,
                    language,
                    0.9
                  )
                }
                className="coral-btn"
              >
                <Volume2 size={16} /> Ouvir Pitch
              </button>
            </div>

            <div className="mt-6">
              <div className="eyebrow">
                {language === "en"
                  ? "SPOKEN VERSION (ENGLISH)"
                  : "VERSÃO FALADA (PORTUGUÊS)"}
              </div>
              <p className="mt-3 font-sans text-base font-semibold leading-relaxed text-[#292827]/90">
                {language === "en" ? activePitch.en : activePitch.pt}
              </p>
            </div>

            <div className="mt-6 border-t border-[#292827]/10 pt-5 text-xs text-[#292827]/60">
              <strong>
                {language === "en"
                  ? "Equivalente em Português:"
                  : "English Version:"}
              </strong>
              <p className="mt-1 italic leading-relaxed">
                {language === "en" ? activePitch.pt : activePitch.en}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: GUIA OWASP API TOP 10 */}
      {activeTab === "owasp" && (
        <div className="space-y-4">
          <div className="rounded-[3px] border border-[#292827]/15 bg-white/50 p-6">
            <h3 className="font-serif text-2xl font-bold text-[#292827]">
              As 4 Principais Ameaças OWASP API que todo Arquiteto deve saber
              defender:
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[2px] border border-[#292827]/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#d96c4f] px-2 py-0.5 text-[10px] font-extrabold text-white">
                    OWASP API1
                  </span>
                  <strong className="text-xs font-bold text-[#292827]">
                    BOLA (Broken Object Level Auth)
                  </strong>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#292827]/75">
                  <strong>O ataque:</strong> O usuário troca{" "}
                  <code>/api/orders/123</code> para <code>/api/orders/124</code>{" "}
                  e vê dados de outro cliente.
                </p>
                <p className="mt-2 text-xs leading-5 text-emerald-800">
                  <strong>A defesa do Tech Lead:</strong> Validação de
                  propriedade no controller/serviço. Validar se o{" "}
                  <code>sub/tenant_id</code> do JWT autenticado possui vínculo
                  real com o objeto 124 antes da consulta.
                </p>
              </div>

              <div className="rounded-[2px] border border-[#292827]/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#292827] px-2 py-0.5 text-[10px] font-extrabold text-white">
                    OWASP API5
                  </span>
                  <strong className="text-xs font-bold text-[#292827]">
                    BFLA (Broken Function Level Auth)
                  </strong>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#292827]/75">
                  <strong>O ataque:</strong> Usuário comum chama métodos
                  restritos (ex: <code>DELETE /api/users</code> ou endpoints com
                  verbos administrativos).
                </p>
                <p className="mt-2 text-xs leading-5 text-emerald-800">
                  <strong>A defesa do Tech Lead:</strong> Scopes dedicados no
                  OAuth2 (ex: <code>admin:write</code>) e validação de
                  permissões granulares tanto no Gateway quanto nas annotations
                  dos microsserviços.
                </p>
              </div>

              <div className="rounded-[2px] border border-[#292827]/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#d96c4f] px-2 py-0.5 text-[10px] font-extrabold text-white">
                    OWASP API6
                  </span>
                  <strong className="text-xs font-bold text-[#292827]">
                    Mass Assignment / Unrestricted Payload
                  </strong>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#292827]/75">
                  <strong>O ataque:</strong> O atacante injeta{" "}
                  <code>&quot;role&quot;: &quot;admin&quot;</code> ou{" "}
                  <code>&quot;balance&quot;: 99999</code> no JSON de atualização
                  de perfil.
                </p>
                <p className="mt-2 text-xs leading-5 text-emerald-800">
                  <strong>A defesa do Tech Lead:</strong> Uso de DTOs (Data
                  Transfer Objects) estritos sem binding automático do modelo de
                  banco, e validação de schema OpenAPI no Gateway.
                </p>
              </div>

              <div className="rounded-[2px] border border-[#292827]/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#292827] px-2 py-0.5 text-[10px] font-extrabold text-white">
                    OWASP API4
                  </span>
                  <strong className="text-xs font-bold text-[#292827]">
                    Unrestricted Resource Consumption
                  </strong>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#292827]/75">
                  <strong>O ataque:</strong> Requisições volumosas sem paginação
                  ou chamadas em loop que esgotam memória e banco de dados.
                </p>
                <p className="mt-2 text-xs leading-5 text-emerald-800">
                  <strong>A defesa do Tech Lead:</strong> Rate limiting com
                  Redis Token Bucket, SpikeArrest no Apigee, limites máximos de
                  paginação (max page_size) e restrição de timeout na malha de
                  serviços.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

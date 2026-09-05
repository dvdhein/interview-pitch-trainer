import {
  X,
  RotateCcw,
  Trophy,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

type SessionReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  correctAnswers: number;
  totalAnswered: number;
  spokenCount: number;
  sessionSeconds: number;
  onResetAll: () => void;
};

export function SessionReportModal({
  isOpen,
  onClose,
  correctAnswers,
  totalAnswered,
  spokenCount,
  sessionSeconds,
  onResetAll,
}: SessionReportModalProps) {
  if (!isOpen) return null;

  const pct =
    totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
  const mins = Math.floor(sessionSeconds / 60);
  const secs = sessionSeconds % 60;
  const timeFormatted = `${mins}m ${String(secs).padStart(2, "0")}s`;

  let ringColor = "#1E8449"; // verde
  if (pct < 65)
    ringColor = "#C00000"; // vermelho
  else if (pct < 85) ringColor = "#B9770E"; // amarelo

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[4px] border border-[#292827]/20 bg-[#f5f0e7] p-6 shadow-2xl sm:p-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#292827]/60 hover:bg-[#292827]/10 hover:text-[#292827]"
        >
          <X size={20} />
        </button>

        <div className="eyebrow">DIAGNÓSTICO DA SESSÃO</div>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
          Resultado da sua preparação
        </h2>
        <p className="mt-2 text-xs text-[#292827]/60">
          Tech Lead & Solutions Architect Interview Rehearsal
        </p>

        {/* Ring & Stats */}
        <div className="mt-8 flex flex-col items-center gap-6 rounded-[3px] border border-[#292827]/15 bg-white/50 p-6 sm:flex-row">
          <div
            className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full text-white shadow-md"
            style={{ backgroundColor: ringColor }}
          >
            <span className="font-serif text-3xl font-extrabold leading-none">
              {totalAnswered ? `${pct}%` : "—"}
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">
              de acerto
            </span>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-base font-bold text-[#292827]">
              {correctAnswers} acertos em {totalAnswered} exercícios respondidos
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-[#292827]/70 sm:justify-start">
              <CheckCircle size={14} className="text-[#d96c4f]" />
              <span>
                Fala em voz alta: <strong>{spokenCount}</strong> respostas
                verbalizadas
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-[#292827]/70 sm:justify-start">
              <Clock size={14} className="text-[#d96c4f]" />
              <span>
                Tempo total de treino: <strong>{timeFormatted}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Didático */}
        <div className="mt-6 space-y-3">
          {pct >= 85 && totalAnswered >= 5 ? (
            <div className="rounded-[3px] border-l-4 border-emerald-600 bg-emerald-50 p-4 text-xs leading-relaxed text-emerald-900">
              <strong>Excelente domínio!</strong> Suas respostas escritas e de
              ordenação mostram forte consistência terminológica. Continue
              repetindo os pitches em voz alta para manter a fluidez natural.
            </div>
          ) : totalAnswered > 0 ? (
            <div className="rounded-[3px] border-l-4 border-amber-600 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle size={15} /> Foco para a revisão:
              </div>
              <p className="mt-1">
                Refaça as questões de <strong>Sentence Starters</strong> e{" "}
                <strong>Word Order</strong> para que as frases saiam sem pausas
                longas durante a entrevista real.
              </p>
            </div>
          ) : (
            <div className="rounded-[3px] border border-[#292827]/15 bg-white/40 p-4 text-center text-xs text-[#292827]/60">
              Você ainda não respondeu aos exercícios interativos do
              laboratório. Acesse a aba <strong>Laboratório de Treino</strong>{" "}
              para praticar!
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#292827]/10 pt-5">
          <button
            onClick={onClose}
            className="rounded-[2px] bg-[#292827] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#f5f0e7] hover:bg-[#d96c4f]"
          >
            Continuar praticando
          </button>
          <button
            onClick={() => {
              if (confirm("Deseja zerar as estatísticas da sessão atual?")) {
                onResetAll();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#292827]/50 hover:text-red-700"
          >
            <RotateCcw size={14} /> Zerar estatísticas
          </button>
        </div>
      </div>
    </div>
  );
}

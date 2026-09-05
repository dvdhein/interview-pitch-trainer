import { useState, useRef, useEffect, useMemo } from "react";
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeftRight,
  Headphones,
} from "lucide-react";
import { useAudioRecorder } from "../hooks/useAudioRecorder";

type VoiceComparisonStudioProps = {
  scriptText: string;
  language: "en" | "pt";
  onAiPlay: () => void;
  isAiPlaying: boolean;
  aiProgressPercent?: number;
  mandatoryKeywords?: string[];
};

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'–—]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function VoiceComparisonStudio({
  scriptText,
  language,
  onAiPlay,
  isAiPlaying,
  aiProgressPercent = 0,
  mandatoryKeywords = [],
}: VoiceComparisonStudioProps) {
  const {
    state: recState,
    audioUrl,
    durationSeconds,
    transcript,
    isTranscribing,
    volumeLevel,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder(language);

  const [userAudioPlaying, setUserAudioPlaying] = useState(false);
  const [userProgress, setUserProgress] = useState(0);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);

  // Time format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // Keyword analysis comparing transcript vs script
  const scriptKeywords = useMemo(() => {
    if (mandatoryKeywords && mandatoryKeywords.length > 0) {
      return mandatoryKeywords;
    }
    // Auto-extract prominent words (> 4 chars)
    const words = normalizeWords(scriptText);
    const unique = Array.from(new Set(words));
    return unique.filter((w) => w.length > 4).slice(0, 10);
  }, [scriptText, mandatoryKeywords]);

  const matchedKeywords = useMemo(() => {
    if (!transcript) return new Set<string>();
    const spokenWords = new Set(normalizeWords(transcript));
    const matched = new Set<string>();
    scriptKeywords.forEach((kw) => {
      const normKw = kw.toLowerCase().trim();
      if (spokenWords.has(normKw) || transcript.toLowerCase().includes(normKw)) {
        matched.add(kw);
      }
    });
    return matched;
  }, [transcript, scriptKeywords]);

  const matchScore = useMemo(() => {
    if (scriptKeywords.length === 0 || !transcript) return null;
    return Math.round((matchedKeywords.size / scriptKeywords.length) * 100);
  }, [matchedKeywords, scriptKeywords, transcript]);

  const toggleUserAudio = () => {
    if (!userAudioRef.current) return;
    if (userAudioPlaying) {
      userAudioRef.current.pause();
      setUserAudioPlaying(false);
    } else {
      // Stop AI playback if playing
      if (isAiPlaying) onAiPlay();
      userAudioRef.current.play();
      setUserAudioPlaying(true);
    }
  };

  const handleUserAudioTimeUpdate = () => {
    if (!userAudioRef.current) return;
    const current = userAudioRef.current.currentTime;
    const total = userAudioRef.current.duration || 1;
    setUserProgress(Math.min(100, Math.round((current / total) * 100)));
  };

  const handleUserAudioEnded = () => {
    setUserAudioPlaying(false);
    setUserProgress(0);
  };

  return (
    <div className="mt-6 rounded-[4px] border border-[#292827]/18 bg-[#f5f0e7]/70 p-5 backdrop-blur-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292827]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d96c4f]/12 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-[#d96c4f]">
            <Headphones size={12} />
            Voice Recording & A/B Comparison Studio
          </div>
          <h4 className="mt-1 font-serif text-xl tracking-tight text-[#292827]">
            Grave sua voz e compare com o modelo de referência
          </h4>
        </div>

        {recState === "recording" && (
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-3 py-1 text-xs font-bold text-red-600 animate-pulse">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
            Gravando ({formatTime(durationSeconds)})
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {/* Recording Control Center */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Left Card: Gravador */}
        <div className="rounded-[3px] border border-[#292827]/12 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#292827]/60">
              🎙️ Seu Gravador
            </span>
            <span className="font-mono text-xs font-bold text-[#292827]">
              {formatTime(durationSeconds)}
            </span>
          </div>

          {/* Volume visualizer bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#292827]/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-[#d96c4f] transition-all duration-75"
              style={{ width: `${recState === "recording" ? Math.max(5, volumeLevel) : 0}%` }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {recState === "idle" && (
              <button
                onClick={startRecording}
                className="inline-flex items-center gap-2 rounded-[3px] bg-[#d96c4f] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#c25a3f]"
              >
                <Mic size={15} /> Gravar Minha Voz
              </button>
            )}

            {recState === "recording" && (
              <button
                onClick={stopRecording}
                className="inline-flex items-center gap-2 rounded-[3px] bg-red-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:bg-red-700"
              >
                <Square size={14} fill="currentColor" /> Finalizar Gravação
              </button>
            )}

            {recState === "recorded" && (
              <>
                <button
                  onClick={toggleUserAudio}
                  className="inline-flex items-center gap-2 rounded-[3px] bg-[#292827] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-black"
                >
                  {userAudioPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                  {userAudioPlaying ? "Pausar Minha Voz" : "Ouvir Minha Voz"}
                </button>
                <button
                  onClick={resetRecording}
                  className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#292827]/20 bg-white px-3 py-2 text-xs font-semibold text-[#292827] hover:bg-[#f5f0e7]"
                  title="Regravar novo áudio"
                >
                  <RotateCcw size={13} /> Regravar
                </button>
              </>
            )}
          </div>

          {/* Hidden audio element for user recording */}
          {audioUrl && (
            <div className="mt-3">
              <audio
                ref={userAudioRef}
                src={audioUrl}
                onTimeUpdate={handleUserAudioTimeUpdate}
                onEnded={handleUserAudioEnded}
                className="hidden"
              />
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#292827]/10">
                <div
                  className="h-full bg-[#292827] transition-all duration-100"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Card: Trilha A (Voz Guia da IA) */}
        <div className="rounded-[3px] border border-[#292827]/12 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#292827]/60">
              🔊 Áudio de Referência (IA Coach)
            </span>
            <span className="font-mono text-xs font-bold text-[#d96c4f]">
              {aiProgressPercent}%
            </span>
          </div>

          {/* AI Progress bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#292827]/10">
            <div
              className="h-full bg-[#d96c4f] transition-all duration-150"
              style={{ width: `${aiProgressPercent}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => {
                if (userAudioPlaying && userAudioRef.current) {
                  userAudioRef.current.pause();
                  setUserAudioPlaying(false);
                }
                onAiPlay();
              }}
              className="inline-flex items-center gap-2 rounded-[3px] border border-[#d96c4f] bg-[#d96c4f]/10 px-4 py-2 text-xs font-bold text-[#d96c4f] shadow-sm transition hover:bg-[#d96c4f] hover:text-white"
            >
              {isAiPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              {isAiPlaying ? "Pausar Áudio IA" : "Tocar Áudio IA de Referência"}
            </button>
          </div>

          <p className="mt-2 text-[11px] text-[#292827]/60">
            Preste atenção no ritmo, pausas de respiração nos Sentence Starters e entonação de finalização.
          </p>
        </div>
      </div>

      {/* Live Speech Recognition & Script Matcher */}
      {transcript && (
        <div className="mt-5 rounded-[3px] border border-[#292827]/10 bg-white/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292827]/8 pb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#292827]">
              <Sparkles size={14} className="text-[#d96c4f]" />
              Transcrição da Sua Fala em Tempo Real:
            </span>
            {matchScore !== null && (
              <span
                className={`rounded px-2 py-0.5 text-xs font-extrabold ${
                  matchScore >= 80
                    ? "bg-emerald-100 text-emerald-800"
                    : matchScore >= 50
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Aderência ao Roteiro: {matchScore}%
              </span>
            )}
          </div>

          <p className="mt-2 text-xs italic leading-relaxed text-[#292827]/80">
            "{transcript}"
          </p>

          {/* Keywords checklist */}
          <div className="mt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#292827]/60">
              Palavras-chave Mencionadas:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {scriptKeywords.map((kw) => {
                const wasSpoken = matchedKeywords.has(kw);
                return (
                  <span
                    key={kw}
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold ${
                      wasSpoken
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {wasSpoken ? (
                      <CheckCircle2 size={11} className="text-emerald-600" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    )}
                    {kw}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

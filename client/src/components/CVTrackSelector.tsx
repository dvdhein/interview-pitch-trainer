import { cvTracks, type CVTrack } from "../data/cvTracks";

type CVTrackSelectorProps = {
  selectedTrackId: string;
  onSelectTrack: (trackId: string) => void;
};

export function CVTrackSelector({
  selectedTrackId,
  onSelectTrack,
}: CVTrackSelectorProps) {
  const activeTrack =
    cvTracks.find(t => t.id === selectedTrackId) || cvTracks[0];

  return (
    <div className="rounded-[4px] border border-[#292827]/15 bg-white/40 p-5 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d96c4f]">
            MODELO DE CV / PERSONA TRACK
          </span>
          <h3 className="font-serif text-xl font-bold text-[#292827]">
            Escolha o perfil de CV que deseja treinar:
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#292827]/55">
          {activeTrack.sourceCvFile}
        </span>
      </div>

      {/* Botões de Trilha */}
      <div className="mt-4 flex flex-wrap gap-2">
        {cvTracks.map(track => {
          const isSelected = selectedTrackId === track.id;
          return (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className={`flex items-center gap-2 rounded-[2px] border px-3.5 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "border-[#d96c4f] bg-[#292827] text-[#fffaf2] shadow-sm"
                  : "border-[#292827]/15 bg-white text-[#292827]/75 hover:border-[#d96c4f] hover:text-[#d96c4f]"
              }`}
            >
              <span>{track.badge}</span>
              <span>{track.title}</span>
            </button>
          );
        })}
      </div>

      {/* Descrição da Persona Ativa */}
      <div className="mt-4 border-t border-[#292827]/10 pt-3 text-xs leading-5 text-[#292827]/70">
        <strong className="text-[#292827]">{activeTrack.targetRole}:</strong>{" "}
        {activeTrack.description}
      </div>
    </div>
  );
}

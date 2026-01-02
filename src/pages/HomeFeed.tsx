import { useState } from "react";
import { mockAudios } from "@/data/mockAudios";
import FullScreenAudioCard from "@/components/FullScreenAudioCard";
import BottomNav from "@/components/BottomNav";
import AudioDetailModal from "@/components/AudioDetailModal";
import { AudioItem } from "@/data/mockAudios";

const HomeFeed = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<AudioItem | null>(null);

  const handlePlayToggle = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const handleOpenDetail = (audio: AudioItem) => {
    setSelectedAudio(audio);
  };

  const handleCloseDetail = () => {
    setSelectedAudio(null);
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Full screen snap scroll container */}
      <div className="snap-container pb-20">
        {mockAudios.map((audio, index) => (
          <FullScreenAudioCard
            key={audio.id}
            audio={audio}
            isPlaying={playingId === audio.id}
            onPlayToggle={() => handlePlayToggle(audio.id)}
            onOpenDetail={() => handleOpenDetail(audio)}
            gradientIndex={index}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Audio Detail Modal */}
      {selectedAudio && (
        <AudioDetailModal
          audio={selectedAudio}
          isOpen={!!selectedAudio}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default HomeFeed;

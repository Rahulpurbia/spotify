import React, { useContext, useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";
import { SongContext } from "../../context/songContext";
import {
  OptionsIcon,
  PauseBtn,
  PlayBtn,
  PrevBtn,
  SpeakerIcon,
} from "../../assets";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { selectedSong, songList, setSelectedSong } = useContext(SongContext);
  const [isMuted, setIsMuted] = useState(false);
  const mountCount = useRef(0);

  useEffect(() => {
    if (selectedSong && mountCount.current >= 2) {
      const audio = audioRef.current;
      audio.play();
      setIsPlaying(true);
    } else {
      mountCount.current = mountCount.current + 1;
    }
  }, [selectedSong]);

  const handlePause = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.removeEventListener("ended", handlePause);
    };
  }, []);

  const handleNext = () => {
    const currentSongIndex = songList.findIndex(
      (song) => song?.id === selectedSong?.id
    );
    if (songList.length - 1 > currentSongIndex) {
      setSelectedSong(songList[currentSongIndex + 1]);
    } else setSelectedSong(songList[0]);
  };

  const handlePrev = () => {
    const currentSongIndex = songList.findIndex(
      (song) => song?.id === selectedSong?.id
    );
    if (currentSongIndex !== 0) {
      setSelectedSong(songList[currentSongIndex - 1]);
    } else setSelectedSong(songList[songList.length - 1]);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / progressBar.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMuteUnmute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const songUrl =
    selectedSong?.url ??
    "https://pub-172b4845a7e24a16956308706aaf24c2.r2.dev/french-song-about-brittany-136020.mp3";

  const songTitle = selectedSong?.name ?? "Viva La Vida";
  const artist = selectedSong?.artist ?? "Coldplay";
  const albumArt = `https://cms.samespace.com/assets/${
    selectedSong?.cover ?? "e714a3b8-9ae0-4417-a2d1-6ece39ad5776"
  }`;

  return (
    <div className="audio-player">
      <div className="song-info">
        <h2 className="song-title">{songTitle}</h2>
        <h3 className="artist">{artist}</h3>
      </div>
      <div className="album-art-container">
        <img src={albumArt} alt="Album Art" className="album-art" />
      </div>
      <audio ref={audioRef} src={songUrl} />
      <div className="controls-wrapper">
        <div className="progress-bar" onClick={handleProgressClick}>
          <div
            className="progress"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="controls">
          <button className="more-options">
            <img src={OptionsIcon} alt="options" />
          </button>
          <div className="control-buttons">
            <button className="prev-btn" onClick={handlePrev}>
              <img src={PrevBtn} alt="prev-btn" />
            </button>
            <button onClick={handlePlayPause} className="play-pause-button">
              <img src={isPlaying ? PauseBtn : PlayBtn} alt="play-pause-btn" />
            </button>
            <button className="next-btn" onClick={handleNext}>
              <img src={PrevBtn} alt="next-btn" />
            </button>
          </div>
          <button
            className={`mute-button ${isMuted ? "muted" : ""}`}
            onClick={handleMuteUnmute}
          >
            <img src={SpeakerIcon} alt="mute-button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

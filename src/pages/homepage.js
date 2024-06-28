import React from "react";
import { useContext } from "react";
import MusicList from "../components/MusicList/MusicList";
import "./homepage.css";
import { SongContext } from "../context/songContext";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const Homepage = () => {
  const { selectedSong } = useContext(SongContext);
  return (
    <div
      className="outer-container"
      style={{
        background: `linear-gradient(90deg, ${
          selectedSong?.accent ?? "#055224"
        } 0%, #000000 100%)`,
      }}
    >
      <MusicList />
      <MusicPlayer />
    </div>
  );
};

export default Homepage;

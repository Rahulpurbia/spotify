import React from "react";
import { useContext } from "react";
import MusicList from "../components/MusicList/MusicList";
import "./homepage.css";
import { SongContext } from "../context/songContext";

const Homepage = () => {
  const { accentColor } = useContext(SongContext);
  return (
    <div
      className="outer-container"
      style={{
        background: `linear-gradient(90deg, ${accentColor} 0%, #000000 100%)`,
      }}
    >
      <MusicList />
    </div>
  );
};

export default Homepage;

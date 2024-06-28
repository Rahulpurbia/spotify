import React from "react";
import { useContext } from "react";
import MusicList from "../components/MusicList/MusicList";
import "./homepage.css";
import { SongContext } from "../context/songContext";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import { Logo, MenuIcon, ProfileIcon } from "../assets";

const Homepage = () => {
  const { selectedSong, setMenuOpen } = useContext(SongContext);

  return (
    <div
      className="outer-container"
      style={{
        background: `linear-gradient(90deg, ${
          selectedSong?.accent ?? "#055224"
        } 0%, #000000 100%)`,
      }}
    >
      <div className="brand-and-user">
        <div className="header-left-section">
          <button
            className="menu-icon"
            onClick={() => {
              setMenuOpen((prev) => !prev);
            }}
          >
            <img src={MenuIcon} alt="menu" />
          </button>
          <span className="logo">
            <img src={Logo} alt="logo" />
          </span>
        </div>
        <span className="user-profile">
          <img src={ProfileIcon} alt="profile" />
        </span>
      </div>
      <div className="player-list-container">
        <MusicList />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Homepage;

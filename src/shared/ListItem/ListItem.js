import React, { useContext } from "react";
import "./ListItem.css";
import { SongContext } from "../../context/songContext";

const ListItem = ({ song, handleSelect }) => {
  const { selectedSong } = useContext(SongContext);

  return (
    <div
      className={`list-item ${
        selectedSong?.name === song.name ? "active-song" : ""
      }`}
      onClick={handleSelect}
    >
      <span className="list-item-image">
        <img
          src={`https://cms.samespace.com/assets/${
            song?.cover ?? "e714a3b8-9ae0-4417-a2d1-6ece39ad5776"
          }`}
        />
      </span>
      <div className="list-item-details">
        <div className="artist-song">
          <span className="song-name">{song.name}</span>
          <span className="artist">{song.artist}</span>
        </div>
        <div className="song-duration">4:15</div>
      </div>
    </div>
  );
};

export default ListItem;

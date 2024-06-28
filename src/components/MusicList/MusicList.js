import React, { useContext, useEffect, useState } from "react";
import "./MusicList.css";
import axios from "axios";
import ListItem from "../../shared/ListItem/ListItem";
import SearchBar from "../../shared/SearchBar/SearchBar";
import { SongContext } from "../../context/songContext";
import Loader from "../Loader/Loader";

const tabs = {
  forYou: "forYou",
  topTracks: "topTracks",
};

const MusicList = () => {
  const [activeTab, setActiveTab] = useState(tabs.forYou);
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedSong, setSongList, songList } = useContext(SongContext);

  const fetchMusicList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://cms.samespace.com/items/songs");
      if (response.status === 200) setSongList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (song) => {
    setSelectedSong(song);
  };

  const getActiveClass = (tabName) => {
    return activeTab === tabName ? "active" : "";
  };

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    fetchMusicList();
  }, []);

  return (
    <div>
      <div className="tabs">
        <button
          className={getActiveClass(tabs.forYou)}
          onClick={() => handleClick(tabs.forYou)}
        >
          For you
        </button>
        <button
          className={getActiveClass(tabs.topTracks)}
          onClick={() => handleClick(tabs.topTracks)}
        >
          Top Tracks
        </button>
      </div>
      <SearchBar />
      {isLoading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          {songList.map((song) => {
            return (
              <ListItem
                key={song.id}
                song={song}
                handleSelect={() => handleSelect(song)}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default MusicList;

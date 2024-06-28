import React, { useContext, useEffect, useState } from "react";
import "./MusicList.css";
import axios from "axios";
import ListItem from "../../shared/ListItem/ListItem";
import SearchBar from "../../shared/SearchBar/SearchBar";
import { SongContext } from "../../context/songContext";
import Loader from "../Loader/Loader";
import useDebounce from "../../hooks/useDebounce";

const tabs = {
  forYou: "forYou",
  topTracks: "topTracks",
};

const MusicList = () => {
  const [activeTab, setActiveTab] = useState(tabs.forYou);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedSong, setSongList, songList, menuOpen, setMenuOpen } =
    useContext(SongContext);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filteredMusicList, setFilteredMusicList] = useState([]);

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
    setMenuOpen(false);
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

  useEffect(() => {
    let filteredSongs = [];
    if (activeTab === tabs.forYou) {
      filteredSongs = [...songList];
    } else {
      filteredSongs = songList.filter((song) => song.top_track);
    }
    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLocaleLowerCase();
      filteredSongs = filteredSongs.filter((song) => {
        return (
          song?.name?.toLowerCase()?.includes(lowerCaseSearchQuery) ||
          song?.artist?.toLowerCase()?.includes(lowerCaseSearchQuery)
        );
      });
    }
    setFilteredMusicList(filteredSongs);
  }, [activeTab, songList, debouncedSearchQuery]);

  return (
    <div className={`list-item-wrapper ${menuOpen ? "opened-menu" : ""}`}>
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
      <div className="search-wrapper">
        <SearchBar
          value={searchQuery}
          handleChange={(value) => setSearchQuery(value)}
        />
      </div>
      {isLoading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : filteredMusicList.length > 0 ? (
        <div className="music-list">
          {filteredMusicList.map((song) => {
            return (
              <ListItem
                key={song.id}
                song={song}
                handleSelect={() => handleSelect(song)}
              />
            );
          })}
        </div>
      ) : (
        <div className="no-music">No Music Found</div>
      )}
    </div>
  );
};

export default MusicList;

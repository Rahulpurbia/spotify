import React, { useContext, useEffect, useState } from "react";
import "./MusicList.css";
import axios from "axios";
import ListItem from "../../shared/ListItem/ListItem";
import SearchBar from "../../shared/SearchBar/SearchBar";
import { SongContext } from "../../context/songContext";

const MusicList = () => {
  const [musicData, setMusicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {setSelectedSong}=useContext(SongContext)

  const fetchMusicList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://cms.samespace.com/items/songs");
      if (response.status === 200) setMusicData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick=(song)=>{
  setSelectedSong(song)
  }

  useEffect(() => {
    fetchMusicList();
  }, []);

  return (
    <div>
      <SearchBar />
      {musicData.map((song) => {
        return <ListItem key={song.id} song={song} handleClick={()=>handleClick(song)} />;
      })}
    </div>
  );
};

export default MusicList;

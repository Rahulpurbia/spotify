import { SongContext } from "./songContext";
import { useEffect, useState } from "react";

const SongProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    if (songList.length > 0) {
      setSelectedSong(songList[0]);
    }
  }, [songList]);

  return (
    <SongContext.Provider
      value={{ selectedSong, setSelectedSong, songList, setSongList }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;

import { SongContext } from "./songContext";
import { useEffect, useState } from "react";

const SongProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songList, setSongList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (songList.length > 0) {
      setSelectedSong(songList[0]);
    }
  }, [songList]);

  return (
    <SongContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        songList,
        setSongList,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;

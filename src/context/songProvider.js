import { SongContext } from "./songContext";
import { useContext, useState } from "react";

const SongProvider = ({ children }) => {
  const [accentColor, setAccentColor] = useState("#055224");
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <SongContext.Provider
      value={{ accentColor, setAccentColor, selectedSong, setSelectedSong }}
    >
      {children}
  </SongContext.Provider>
  );
};

export default SongProvider;

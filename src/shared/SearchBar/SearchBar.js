import React from "react";
import "./SearchBar.css";
import { SearchIcon } from "../../assets";

const SearchBar = ({ value, handleChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <img src={SearchIcon} />
    </div>
  );
};

export default SearchBar;

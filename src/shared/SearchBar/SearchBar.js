import React from "react";
import "./SearchBar.css";
import { SearchIcon } from "../../assets";

const SearchBar = () => {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search Song, Artist" />
      <img src={SearchIcon} />
    </div>
  );
};

export default SearchBar;

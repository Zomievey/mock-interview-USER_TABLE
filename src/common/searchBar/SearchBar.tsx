import React from "react";
import "./SearchBarStyles.css";

interface SearchBarProps {
  searchUser: string;
  setSearchUser: (value: string) => void;
}

export default function SearchBar({
  searchUser,
  setSearchUser,
}: SearchBarProps) {
  return (
    <div>
      <label className='search-bar' htmlFor='searchBar'>
        Search Name:
      </label>{" "}
      <input
        type='text'
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
        }}
      />
    </div>
  );
}

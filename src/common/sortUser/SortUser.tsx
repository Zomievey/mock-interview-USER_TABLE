import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "./SortUserStyles.css";

interface SortUserProps {
  sortOption: string;
  setSortOption: (value: string, isAscending: boolean) => void;
}

export default function SortUser({ sortOption, setSortOption }: SortUserProps) {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSortClick = () => {
    setIsAscending(!isAscending);
    setSortOption(sortOption, !isAscending);
  };

  return (
    <FontAwesomeIcon
      data-testid='sort-icon'
      className='sort-icon'
      icon={faSort}
      onClick={handleSortClick}
    />
  );
}

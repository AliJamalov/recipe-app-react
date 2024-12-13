import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Обновляем состояние поиска
  };

  return (
    <section>
      <div className="relative w-[350px] lg:w-[720px]">
        <CiSearch className="absolute top-[50%] left-2 text-[22px] transform -translate-y-1/2" />
        <input
          value={searchQuery}
          onChange={handleInputChange}
          className="bg-gray-300 rounded-[30px] py-2 px-9 outline-none w-full lg:py-3 lg:px-9"
          type="search"
          placeholder="Search"
        />
      </div>
    </section>
  );
};

export default Search;

import React, { useState } from "react";
import { IoMenu, IoFastFoodSharp } from "react-icons/io5";
import Search from "./Search";
import Container from "../common/Container";
import Filter from "../home/Filter";
import { Link } from "react-router-dom";

const Header = ({ setSearchQuery, searchQuery }) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleOpen = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <header className="py-5 shadow-md w-full">
      <Container>
        <div className="flex justify-between items-center">
          {/* Логотип и меню слева */}
          <div className="flex md:items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <IoMenu onClick={handleOpen} className="text-[26px] md:hidden" />
            <div className="flex items-center justify-center flex-1 md:flex-none gap-4">
              <Link className="flex items-center gap-2" to={"/"}>
                <IoFastFoodSharp className="text-[26px] text-red-600 lg:text-[32px]" />
                <h1 className="text-lg font-semibold lg:text-3xl">FoodApp</h1>
              </Link>
            </div>
          </div>

          {/* Поисковая строка в центре */}
          <div className="hidden md:flex justify-center flex-1">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Кнопка входа справа */}
          <button className="bg-red-500 rounded-lg text-white py-1 px-3 lg:py-2 lg:px-5">
            Login
          </button>
        </div>
      </Container>

      {/* Модальное окно для фильтра и поиска */}
      {isOpenFilter && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-5 gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Filter & Search</h2>
            <button
              onClick={handleOpen}
              className="text-red-600 font-bold text-lg"
            >
              Close
            </button>
          </div>
          <Search />
          <Filter />
        </div>
      )}
    </header>
  );
};

export default Header;

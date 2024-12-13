import React from "react";

const PaginationItems = ({ handlePrevPaginate, handleNextPaginate }) => {
  return (
    <div className="my-[30px]">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevPaginate}
          className="bg-blue-500 p-1 rounded-md text-white"
        >
          prev
        </button>
        <button
          onClick={handleNextPaginate}
          className="bg-blue-500 p-1 rounded-md text-white"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationItems;

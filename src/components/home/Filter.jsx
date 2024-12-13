import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";

const Filter = ({ setSelectedFilter, handleOpen }) => {
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const handelActiveFilter = (index) => {
    setActiveFilter(index);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.log("error fethcing", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="border-2 border-red-700 rounded-md p-1">
      <ScrollArea className="h-[400px] w-full overflow-auto">
        <div>
          {categories &&
            categories.map((item, index) => (
              <ul className="mb-3" key={index}>
                <div
                  onClick={() => {
                    handelActiveFilter(index);
                    setSelectedFilter(item.strCategory);
                    handleOpen();
                  }}
                  className={`${
                    activeFilter === index ? "bg-red-600" : ""
                  } flex items-center py-1 gap-4 rounded-md cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out`}
                >
                  <img
                    className="w-[70px] rounded-xl"
                    src={item.strCategoryThumb}
                    alt="category-image"
                  />
                  <li className="text-gray-400">{item.strCategory}</li>
                </div>
              </ul>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Filter;

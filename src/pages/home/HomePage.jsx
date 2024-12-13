import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/common/Container";
import Filter from "../../components/home/Filter";
import SingleRecipe from "../../components/home/SingleRecipe";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import PaginationItems from "@/components/home/PaginationItems";
import { Link } from "react-router-dom";

const HomePage = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Dessert");
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);

  const handleNextPaginate = () => {
    setLimit(limit + 8);
  };

  const handlePrevPaginate = () => {
    if (limit === 8) return;
    setLimit(limit - 8);
  };

  const fetchFoodDatas = async () => {
    setLoading(true); // Устанавливаем состояние загрузки
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedFilter}`
      );
      const meals = response.data.meals.slice(0, limit);
      setData(meals);
      setFilteredData(meals); // Устанавливаем исходные данные
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  useEffect(() => {
    fetchFoodDatas();
  }, [selectedFilter, limit]);

  useEffect(() => {
    if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
      const filtered = data.filter((item) =>
        item.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Если строка поиска пуста или не является строкой, показываем все данные
    }
  }, [searchQuery, data]);

  if (loading) {
    return (
      <section className="mt-[40px]">
        <Container>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="mt-[40px]">
      <Container>
        <div className="flex items-center flex-col gap-1 lg:flex lg:flex-row lg:gap-[100px] lg:items-start">
          <div className="hidden lg:block w-[450px]">
            <Filter setSelectedFilter={setSelectedFilter} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-3">Cooking recipes</h1>
            {filteredData.length === 0 ? (
              <div className="text-center text-gray-500 mt-5">
                No recipes found for "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
                {filteredData.map((item, index) => (
                  <div key={index}>
                    <Link to={`/RecipeDetailPage/${item.idMeal}`}>
                      <SingleRecipe
                        image={item.strMealThumb}
                        title={item.strMeal}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <PaginationItems
          handleNextPaginate={handleNextPaginate}
          handlePrevPaginate={handlePrevPaginate}
        />
      </Container>
    </section>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@/components/common/Container";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();

  const [singleRecipe, setSingleRecipe] = useState(null);

  const fetchSingleRecipe = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );
      setSingleRecipe(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, [recipeId]);

  if (!singleRecipe) {
    return <p>Loading...</p>;
  }

  // Преобразуем YouTube ссылку в формат embed
  const youtubeEmbedUrl = singleRecipe.strYoutube
    ? singleRecipe.strYoutube.replace("watch?v=", "embed/")
    : null;

  return (
    <div className="flex flex-col justify-center items-center gap-2 my-6">
      <Container>
        <div>
          {/* Изображение рецепта */}
          <div className="w-[300px] lg:w-[500px]">
            <img
              className="w-full rounded-md"
              src={singleRecipe.strMealThumb}
              alt={singleRecipe.strMeal}
            />
          </div>

          {/* Название рецепта */}
          <p className="my-2 font-semibold text-[20px]">
            {singleRecipe.strMeal}
          </p>

          {/* Список ингредиентов */}
          <ul className="list-disc pl-5">
            {Object.entries(singleRecipe)
              .filter(
                ([key, value]) => key.startsWith("strIngredient") && value
              )
              .map(([key, value], index) => (
                <li key={index}>{value}</li>
              ))}
          </ul>

          {/* Инструкции по приготовлению */}
          <p className="my-3">{singleRecipe.strInstructions}</p>

          {/* Видео с YouTube */}
          {youtubeEmbedUrl && (
            <div className="mt-4">
              <iframe
                className="w-[380px] h-[215px] lg:h-[300px] lg:w-[600px]"
                src={youtubeEmbedUrl}
                title={singleRecipe.strMeal}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default RecipeDetailPage;

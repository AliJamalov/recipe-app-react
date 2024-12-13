import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Header from "./components/layout/Header";
import { useState } from "react";
import RecipeDetailPage from "./pages/detailPage/RecipeDetailPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route
          path="/RecipeDetailPage/:recipeId"
          element={<RecipeDetailPage />}
        />
      </Routes>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContentful from "../hooks/useContentful";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import "./SearchResults.css";

const { getRecipes } = useContentful();

const fetchRecipes = async (name, setSortedRecipes, setRecipes) => {
  try {
    const response = await getRecipes(0, 1000, name);
    setRecipes(response);
    setSortedRecipes(response);
  } catch (error) {
    console.error(error);
  }
};

function SearchResults() {
  const { name } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [sortedRecipes, setSortedRecipes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(name, setRecipes, setSortedRecipes);
  }, [name]);

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };
  
  return (
    <div className="search-all">
      <SearchBar />
      <div className="search">
        <div className="title">
          <button className="back" onClick={() => navigate(-1)}>
            Back
          </button>
          {sortedRecipes && sortedRecipes.length === 0 && (
            <p className="search-results">No recipe found</p>
          )}
          {sortedRecipes && sortedRecipes.length >= 1 && (
            <p className="search-results">
              Search results for <span className="search-query">{name}</span>
            </p>
          )}
        </div>
        {sortedRecipes && (
          <Filter
            sortedRecipes={sortedRecipes}
            setSortedRecipes={setSortedRecipes}
            recipes={recipes}
          />
        )}
        <div className="recipe-container">
          {sortedRecipes &&
            sortedRecipes.map((recipe) => (
              <div
                key={recipe.sys.id}
                className="recipe-card"
                onClick={() => handleCardClick(recipe.sys.id)}
              >
                <p className="cooking-time">
                  {recipe.fields.cookingTime} minutes
                </p>

                <img
                  src={recipe.fields.images[0].fields.file.url}
                  alt={recipe.fields.title}
                />
                <p className="recipe-title">{recipe.fields.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;

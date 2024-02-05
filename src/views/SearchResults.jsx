import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import "../styles/SearchResults.css";
import axios from "axios";
import { SERVER_URL, IMAGES_URL } from "../constants/server";
import { useSearchParams } from 'react-router-dom';

const fetchRecipes = async (keyword, setSortedRecipes, setRecipes) => {
  try {
    const response = await axios.get(`${SERVER_URL}/recipes/?q=${keyword}`);
    setRecipes(response.data);
    setSortedRecipes(response.data);
    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};

function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q');
  const [recipes, setRecipes] = useState(null);
  const [sortedRecipes, setSortedRecipes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(keyword, setRecipes, setSortedRecipes);
  }, [keyword]);

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
              Search results for <span className="search-query">{keyword}</span>
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
                key={recipe.id}
                className="recipe-card"
                onClick={() => handleCardClick(recipe.id)}
              >
                <p className="cooking-time">
                  {recipe.preparation_time} minutes
                </p>

                <img src={`${IMAGES_URL}/${recipe.id}.jpg`} alt={recipe.name} />
                <p className="recipe-title">{recipe.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;

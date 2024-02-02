import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import { HashLoader } from "react-spinners";
import SearchBar from "../components/SearchBar";
import SERVER_URL from "../constants/server.js";
import axios from "axios";

const fetchRecipes = async (
  setRecipes,
  setLoading,
  amountSkipRecipes,
  setSortedRecipes
) => {
  setLoading(true);
  const response = await axios.get(
    `${SERVER_URL}/recipes?skip=${amountSkipRecipes}&limit=6`
  );
  try {
    setRecipes((prevRecipes) => [...prevRecipes, ...response.data]);
    setSortedRecipes((prevRecipes) => [...prevRecipes, ...response.data]);
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [amountSkipRecipes, setAmountSkipRecipes] = useState(0);
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(setRecipes, setLoading, amountSkipRecipes, setSortedRecipes);
  }, [amountSkipRecipes]);

  const loadMore = () => {
    setAmountSkipRecipes(amountSkipRecipes + 6);
  };

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <SearchBar />
      {loading ? <HashLoader className="loading" color="#a43636" /> : null}
      <div className="all-recipes">
        <div className="title">
          <button className="back" onClick={handleBackClick}>
            Back
          </button>
          <p>All recipes</p>
          <span></span>
        </div>
        <Filter
          sortedRecipes={sortedRecipes}
          setSortedRecipes={setSortedRecipes}
          recipes={recipes}
        />
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

                <img src="https://placehold.co/400x250" alt={recipe.name} />
                <p className="recipe-title">{recipe.name}</p>
              </div>
            ))}
        </div>
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      </div>
    </>
  );
};

export default AllRecipes;

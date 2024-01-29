import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import useContentful from "../hooks/useContentful";
import { HashLoader } from "react-spinners";
import SearchBar from "../components/SearchBar";

const fetchRecipes = async (getRecipes, setRecipes, setLoading, amountSkipRecipes, setSortedRecipes) => {
  const response = await getRecipes(amountSkipRecipes, 6);
  try {
    setRecipes((prevRecipes) => [...prevRecipes, ...response]);
    setSortedRecipes((prevRecipes) => [...prevRecipes, ...response]);
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

  const { getRecipes } = useContentful();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(getRecipes, setRecipes, setLoading, amountSkipRecipes, setSortedRecipes);
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
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      </div>
    </>
  );
};

export default AllRecipes;

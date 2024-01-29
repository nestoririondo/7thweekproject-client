import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import useContentful from "../hooks/useContentful";
import { HashLoader } from "react-spinners";
import axios from "axios";
import SERVER_URL from "../constants/server";

const Recent = () => {
  const navigate = useNavigate();
  // const { getRecipes } = useContentful();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/recipes`, {
        params: {
          limit: 6,
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleViewAll = () => {
    navigate("/all");
  };
  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <>
      {recipes && recipes.length === 0 && (
        <HashLoader className="loading" color="#a43636" />
      )}
      <div className="recent">
        <div className="left">
          <p>Latest recipes</p>
          <button className="view-all" onClick={handleViewAll}>
            View all
          </button>
        </div>
        <div className="right">
          {recipes &&
            recipes.map((recipe) => (
              <div
                onClick={() => handleCardClick(recipe.id)}
                key={recipe.id}
                className="recipe-card"
              >
                <img src="https://placehold.co/400x250" alt="" />
                <p>{recipe.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Recent;

import { useNavigate, useParams } from "react-router-dom";
import "../styles/RecipeDetail.css";
import { useState, useEffect } from "react";
import { LuChefHat } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { HashLoader } from "react-spinners";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import SERVER_URL from "../constants/server";
import ReactMarkdown from "react-markdown";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const { id } = useParams();

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchRecipe = async (id) => {
    const response = await axios.get(`${SERVER_URL}/recipes/${id}`);
    try {
      setSelectedRecipe(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecipe(id);
  }, []);

  return (
    <>
      <SearchBar />
      {selectedRecipe ? (
        <div className="recipe-detail">
          <div className="title">
            <button className="back" onClick={handleBackClick}>
              Back
            </button>
            <h2 className="recipe-title">{selectedRecipe.name}</h2>
            <span></span>
          </div>
          <div className="recipe-container">
            <div className="icons">
              <IoMdTime className="time-icon" />
              <p className="time">{selectedRecipe.preparation_time} min</p>
              <LuChefHat className="chef-icon" />
              <p className="chef-name">{selectedRecipe.difficulty}</p>
            </div>
            <div className="img-ing">
              <img src="https://placehold.co/600x400" />
              {/* <div className="ingredients">
                {documentToReactComponents(
                  selectedRecipe.fields.ingredientList,
                  options
                )}
              </div> */}
            </div>
            <div className="instructions">
              {/* {documentToReactComponents(
                selectedRecipe.fields.preparationInstructions,
                options
              )} */}
              <ReactMarkdown>
                {selectedRecipe.instructions && selectedRecipe.instructions.replace(/\\n/g, '\n')}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <HashLoader className="loading" color="#a43636" />
      )}
    </>
  );
};

export default RecipeDetail;

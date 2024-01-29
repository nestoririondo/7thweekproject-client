import { useNavigate, useParams } from "react-router-dom";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./RecipeDetail.css";
import useContentful from "../hooks/useContentful";
import { useState, useEffect } from "react";
import { LuChefHat } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { HashLoader } from "react-spinners";
import SearchBar from "../components/SearchBar";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    },
  };

  const [selectedRecipe, setSelectedRecipe] = useState([]);

  const { id } = useParams();
  const { getRecipe } = useContentful();

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchRecipe = async (id) => {
    const response = await getRecipe(id);
    try {
      setSelectedRecipe(response);
      console.log(response);
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
      {selectedRecipe && selectedRecipe.fields ? (
        <div className="recipe-detail">
          <div className="title">
            <button className="back" onClick={handleBackClick}>
              Back
            </button>
            <h2 className="recipe-title">{selectedRecipe.fields.title}</h2>
            <span></span>
          </div>
          <div className="recipe-container">
            <div className="icons">
              <IoMdTime className="time-icon" />
              <p className="time">{selectedRecipe.fields.cookingTime} min</p>
              <LuChefHat className="chef-icon" />
              <p className="chef-name">{selectedRecipe.fields.difficulty}</p>
            </div>
            <div className="img-ing">
              <img src={selectedRecipe.fields.images[0].fields.file.url} />
              <div className="ingredients">
                {documentToReactComponents(
                  selectedRecipe.fields.ingredientList,
                  options
                )}
              </div>
            </div>
            <div className="instructions">
              {documentToReactComponents(
                selectedRecipe.fields.preparationInstructions,
                options
              )}
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

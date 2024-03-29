import ascending from "../assets/order-ascending.png";
import descending from "../assets/order-descending.png";
import { useState, useEffect } from "react";
import "../styles/Filter.css";

const Filter = ({ recipes, sortedRecipes, setSortedRecipes }) => {
  const [orderBy, setOrderBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [course, setCourse] = useState("all");

  const handleSort = (cat, order) => {
    let newSortedRecipes = [...sortedRecipes];
    if (cat === "date") {
      if (order === "asc") {
        newSortedRecipes.sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
      } else {
        newSortedRecipes.sort(
          (a, b) => Date.parse(b.date) - Date.parse(a.date)
        );
      }
    } else if (cat === "cookingTime") {
      if (order === "asc") {
        newSortedRecipes.sort(
          (a, b) => a.preparation_time - b.preparation_time
        );
      } else {
        newSortedRecipes.sort(
          (a, b) => b.preparation_time - a.preparation_time
        );
      }
    }
    setSortedRecipes(newSortedRecipes);
  };

  const handleFilter = (course) => {
    // let newSortedRecipes = [...recipes];
    // console.log(newSortedRecipes)
    // if (course === "all") {
    //   setSortedRecipes(newSortedRecipes);
    // } else {
    //   newSortedRecipes = newSortedRecipes.filter((recipe) =>
    //     recipe.keywords.includes(course)
    //   );
    //   setSortedRecipes(newSortedRecipes);
    // }
  };

  useEffect(() => {
    handleSort(orderBy, sortOrder);
  }, [orderBy, sortOrder]);

  useEffect(() => {
    handleFilter(course);
  }, [course]);

  return (
    <>
      <div className="filter">
        <div className="filter-left">
          <label htmlFor="filter">Sort by</label>
          <select
            onChange={(e) => setOrderBy(e.target.value)}
            name="filter"
            id="filter"
          >
            <option value="date">Recent</option>
            <option value="cookingTime">Cooking time</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className={sortOrder}
            id="sortOrder"
          >
            <img
              src={sortOrder === "asc" ? ascending : descending}
              alt={sortOrder}
            />
          </button>
        </div>
        {/* <div className="filter-right">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="all">All</option>
            <option value="starter">Starter</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
        </div> */}
      </div>
    </>
  );
};

export default Filter;

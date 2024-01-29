import { Routes, Route } from "react-router-dom";
import AllRecipes from "./views/AllRecipes";
import RecipeDetail from "./views/RecipeDetail";
import Home from "./views/Home";
import Footer from "./components/Footer";
import SearchResults from './views/SearchResults';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/all" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/search/:name" element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;

import { createClient } from "contentful";


const useContentful = () => {
  const client = createClient({
    space: import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    host: "preview.contentful.com",
  });

  const getRecipes = async (skip = 0, limit = 1000, name = "") => {
    try {
      let response = await client.getEntries({
        content_type: "recipe",
        order: "-sys.createdAt",
        'fields.keywords[match]': name,
        skip: skip,
        limit: limit,
      });
      return response.items;
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipe = async (id) => {
    try {
      let entry = await client.getEntry(id);
      return entry;
    } catch (error) {
      console.log(error);
    }
  };

  return { getRecipes, getRecipe };
};

export default useContentful;

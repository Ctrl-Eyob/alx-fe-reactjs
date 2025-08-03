import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: applyFilter(updatedRecipes, state.searchTerm),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: applyFilter(updatedRecipes, state.searchTerm),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: applyFilter(updatedRecipes, state.searchTerm),
      };
    }),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    const { recipes } = get();
    set({ filteredRecipes: applyFilter(recipes, term) });
  },

  setRecipes: (recipes) =>
    set({
      recipes,
      filteredRecipes: applyFilter(recipes, get().searchTerm),
    }),
}));

const applyFilter = (recipes, term) => {
  if (!term.trim()) return recipes;
  const lowerTerm = term.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerTerm) ||
      recipe.description.toLowerCase().includes(lowerTerm)
  );
};

import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  // 📦 State
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // ➕ Recipe Management
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),

  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== recipeId),
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  // 🔍 Search Filtering
  setSearchTerm: (term) => {
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return {
        searchTerm: term,
        filteredRecipes: filtered,
      };
    });
  },

  // 💖 Favorites
  addFavorite: (recipeId) =>
    set((state) =>
      state.favorites.includes(recipeId)
        ? {}
        : { favorites: [...state.favorites, recipeId] }
    ),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // 🌟 Recommendations
  generateRecommendations: () =>
    set((state) => {
      const favoriteRecipes = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id)
      );
      const otherRecipes = state.recipes.filter(
        (recipe) =>
          !state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: [...favoriteRecipes, ...otherRecipes] };
    }),
}));

import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const { favorites, recipes } = useRecipeStore((state) => ({
    favorites: state.favorites,
    recipes: state.recipes,
  }));

  const favoriteRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean); // remove undefined if any

  return (
    <div>
      <h2>❤️ My Favorites</h2>
      {favoriteRecipes.length === 0 && <p>No favorites yet.</p>}
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;

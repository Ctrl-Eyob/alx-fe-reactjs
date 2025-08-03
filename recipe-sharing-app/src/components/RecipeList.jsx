import { Link } from 'react-router-dom';
import { useRecipeStore } from '../components/recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      <h2>Recipes</h2>
      {filteredRecipes.length === 0 && <p>No matching recipes found.</p>}
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;

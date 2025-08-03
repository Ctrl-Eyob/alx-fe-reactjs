import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore((state) => ({
    recommendations: state.recommendations,
    generateRecommendations: state.generateRecommendations,
  }));

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <h2>🌟 Recommended Recipes</h2>
      {recommendations.length === 0 && <p>No recommendations available.</p>}
      {recommendations.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;

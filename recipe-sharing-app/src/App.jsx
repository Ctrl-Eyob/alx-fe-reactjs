import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import SearchBar from './components/SearchBar';
import { useRecipeStore } from './components/recipeStore';

function HomePage() {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  useEffect(() => {
    setSearchTerm(''); // Clear search on homepage
  }, []);

  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

function RecipeDetailWrapper() {
  const { id } = useParams();
  return <RecipeDetails recipeId={id} />;
}

function EditRecipeWrapper() {
  const { id } = useParams();
  return <EditRecipeForm recipeId={id} />;
}

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/favorites" style={{ marginRight: '10px' }}>Favorites</Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>

      <div style={{ padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailWrapper />} />
          <Route path="/edit/:id" element={<EditRecipeWrapper />} />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

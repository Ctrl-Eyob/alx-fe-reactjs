import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients || !steps) {
      setError("All fields are required");
      return;
    }

    if (ingredients.split(",").length < 2) {
      setError("Please include at least two ingredients");
      return;
    }

    setError("");
    alert("Recipe submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Recipe title"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Ingredients (comma separated)"
            className="w-full border rounded p-2"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <textarea
            placeholder="Preparation steps"
            className="w-full border rounded p-2"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

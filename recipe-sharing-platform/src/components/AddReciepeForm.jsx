import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: required fields
    if (!title.trim() || !ingredients.trim() || !steps.trim()) {
      setError("All fields are required.");
      return;
    }

    // Validation: at least 2 ingredients
    const ingredientList = ingredients.split(",").filter((i) => i.trim() !== "");
    if (ingredientList.length < 2) {
      setError("Please include at least two ingredients.");
      return;
    }

    setError("");
    alert("Recipe submitted successfully!");

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Card container */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>

        {error && (
          <p className="mb-4 text-red-500 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Recipe Title</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter recipe title"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-1 font-medium">
              Ingredients (comma separated)
            </label>
            <textarea
              className="w-full border rounded-lg p-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. flour, sugar, eggs"
            />
          </div>

          {/* Steps */}
          <div>
            <label className="block mb-1 font-medium">
              Preparation Steps
            </label>
            <textarea
              className="w-full border rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Describe the cooking process"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

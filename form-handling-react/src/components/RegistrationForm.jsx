import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // mock API simulation
    try {
      await new Promise((res) => setTimeout(res, 1000));
      alert("User registered successfully (Controlled Form)!");
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md w-96">
      <div>
        <label className="block">Username</label>
        <input
          type="text"
          name="username"
          value={username} {/* ✅ explicit binding */}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      <div>
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={email} {/* ✅ explicit binding */}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block">Password</label>
        <input
          type="password"
          name="password"
          value={password} {/* ✅ explicit binding */}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}

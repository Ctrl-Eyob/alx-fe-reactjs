
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1> Home Page</h1>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/blog">Blog</Link>
      </nav>
    </div>
  );
}

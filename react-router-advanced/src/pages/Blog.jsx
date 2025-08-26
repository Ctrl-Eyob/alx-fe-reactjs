import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "React Router Basics" },
  { id: 2, title: "Advanced Routing" },
];

export default function Blog() {
  return (
    <div>
      <h1>📝 Blog</h1>
      {posts.map((post) => (
        <p key={post.id}>
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </p>
      ))}
    </div>
  );
}

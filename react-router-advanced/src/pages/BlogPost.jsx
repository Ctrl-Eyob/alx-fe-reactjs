import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return <h2>📖 Blog Post ID: {id}</h2>;
}

import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export default function PostsComponent() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts</h2>

      <button onClick={refetch}>Refetch Posts</button>

      {data.slice(0, 10).map((post) => (
        <div key={post.id} style={{ marginBottom: "10px" }}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

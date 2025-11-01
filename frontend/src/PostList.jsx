import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

export default function PostList({ session }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`id, title, content, created_at`)
      .order("created_at", { ascending: false });
    if (!error) setPosts(data);
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>Welcome, {session.user.email}</h2>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>

      <Link to="/create" style={{ marginLeft: "20px" }}>
        ➕ Create New Post
      </Link>

      <h3 style={{ marginTop: "30px" }}>All Blogs</h3>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((p) => (
        <div
          key={p.id}
          style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}
        >
          <h4>{p.title}</h4>
          <p>{p.content}</p>
          <small>{new Date(p.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

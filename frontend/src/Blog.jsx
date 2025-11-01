import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function Blog({ session }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`id, title, content, created_at`)
      .order("created_at", { ascending: false });
    if (!error) setPosts(data);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!error) setCategories(data);
  };

  const createPost = async (e) => {
    e.preventDefault();
    const user = session.user;
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, user_id: user.id }])
      .select();
    if (!error && data.length) {
      const post = data[0];
      if (selectedCategory) {
        await supabase
          .from("post_categories")
          .insert([{ post_id: post.id, category_id: selectedCategory }]);
      }
      fetchPosts();
      setTitle("");
      setContent("");
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>Welcome, {session.user.email}</h2>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>

      <h3>Create a new post</h3>
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <textarea
          placeholder="Write your blog..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <button type="submit">Post</button>
      </form>

      <h3>All Blogs</h3>
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

import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ session }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

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
      // redirect to the post list
      navigate("/posts");
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>Create a new post</h2>
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
    </div>
  );
}

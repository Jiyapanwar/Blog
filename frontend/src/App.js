import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CreatePost from "./CreatePost";
import PostList from "./PostList";

import { supabase } from "./supabaseClient";
import Auth from "./Auth";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!session) return <Auth />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<PostList session={session} />} />
        <Route path="/create" element={<CreatePost session={session} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

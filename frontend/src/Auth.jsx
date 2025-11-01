import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    let res;
    if (isLogin) {
      res = await supabase.auth.signInWithPassword({ email, password });
    } else {
      res = await supabase.auth.signUp({ email, password });
    }
    if (res.error) setMessage(res.error.message);
    else setMessage("Success! Check your inbox or log in.");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign Up" : "Have an account? Sign In"}
      </button>
    </div>
  );
}

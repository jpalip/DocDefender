import { loggedIn, loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  const login = (e) => {
    e.preventDefault();

    loginUser(e.target.username.value, e.target.password.value).then((r) => {
      if (r.data.error) {
        alert(r.data.error);
      } else if (r.data.success) {
        navigate("/user");
      }
    });
  };

  useEffect(() => {
    if (loggedIn()) {
      navigate("/user");
    } else {
      setRender(true);
    }
  }, [navigate]);

  return (
    render && (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={login}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="sign-up">
          Need an account? <a href="/register">Sign Up</a>
        </div>
      </div>
    )
  );
}

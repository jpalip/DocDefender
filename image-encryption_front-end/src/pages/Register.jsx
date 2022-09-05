import { loggedIn, registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  const register = (e) => {
    e.preventDefault();

    registerUser(e.target.username.value, e.target.password.value).then((r) => {
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
        <h1>Register</h1>
        <form onSubmit={register}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="sign-up">
          Already have an account? <a href="/sign-in">Sign In</a>
        </div>
      </div>
    )
  );
}

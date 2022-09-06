import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/hooks";

export default function Register() {
  const navigate = useNavigate();

  const { authed, useRedirectIfAuthed, registerUser } = useAuth();
  useRedirectIfAuthed("/user");

  const register = (e) => {
    e.preventDefault();

    registerUser(e.target.username.value, e.target.password.value).then((r) => {
      if (r.data.error) {
        alert(r.data.error);
      } else if (r.data.success) {
        navigate(0);
      }
    });
  };

  return (
    !authed() && (
      <div>
        <h1>Register</h1>
        <form onSubmit={register}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" autoComplete="ie-username" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" autoComplete="ie-password" />
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

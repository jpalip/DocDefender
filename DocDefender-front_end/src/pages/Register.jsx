import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/hooks";

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

  const checkSamePWD = () => {
    if (
      document.getElementById("password").value !==
      document.getElementById("confirmpassword").value
    ) {
      document.getElementById("register").disabled = true;
      document.getElementById("confpwd").innerHTML = "Passwords Do Not Match";
      document.getElementById("confpwd").style.color = "red";
    }
    if (
      document.getElementById("password").value ===
      document.getElementById("confirmpassword").value
    ) {
      document.getElementById("register").disabled = false;
      document.getElementById("confpwd").innerHTML = "Passwords Match";
      document.getElementById("confpwd").style.color = "green";
    }
  };

  return (
    !authed() && (
      <div
        style={{
          display: "block",
          width: "100%",
        }}
        className="container-fluid"
      >
        <div className="row no-gutter">
          <div className="center-screen">
            <div className="register d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-20 col-x5-50 mx-auto">
                    <h3 className="display-4">
                      <b>Register</b>
                    </h3>
                    <p className="text-muted mb-4">
                      Register a DocDefender account below.
                    </p>
                    <form onSubmit={register}>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          id="email"
                          autoComplete="ie-email"
                          className="form-control"
                        />
                        <label
                          className="form-label form-control1"
                          htmlFor="email"
                        >
                          Email
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="username"
                          id="username"
                          autoComplete="ie-username"
                          className="form-control"
                        />
                        <label
                          className="form-label form-control1"
                          htmlFor="username"
                        >
                          Username
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          id="password"
                          autoComplete="ie-password"
                          className="form-control"
                        />
                        <label
                          className="form-label form-control1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          onChange={checkSamePWD}
                          type="password"
                          autoComplete="ie-confirmpassword"
                          className="form-control"
                          id="confirmpassword"
                        />
                        <label
                          className="form-label form-control1"
                          htmlFor="confirmpassword"
                          id="confpwd"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        id="register"
                      >
                        Register
                      </button>
                    </form>
                    <div className="text-center">
                      <br />
                      <h5> Already a member?</h5>
                      <h5>
                        <a href="/sign-in">Sign In</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

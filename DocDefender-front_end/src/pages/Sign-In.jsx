import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/hooks";

export default function SignIn() {
  const navigate = useNavigate();

  const { authed, useRedirectIfAuthed, loginUser } = useAuth();
  useRedirectIfAuthed("/user");

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
          {/* login form half */}
          <div className="center-screen">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-20 col-x5-50 mx-auto">
                    <h3 className="display-4">
                      <b>Login</b>
                    </h3>
                    <p className="text-muted mb-4">
                      Login to your DocDefender account below.
                    </p>
                    <form onSubmit={login}>
                      {/* email input */}
                      <div className="form-floating mb-3">
                        <input
                          type="username"
                          id="username"
                          className="form-control"
                        />
                        <label
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                          className="form-label"
                          htmlFor="username"
                        >
                          Username
                        </label>
                      </div>
                      {/* password input */}
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                      {/* <button type="submit">Sign In</button> */}
                      {/* need account ? */}
                      <div className="text-center">
                        <br />
                        <h5> Not a member?</h5>
                        <h5>
                          <a href="/register">Register</a>
                        </h5>
                      </div>
                    </form>
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

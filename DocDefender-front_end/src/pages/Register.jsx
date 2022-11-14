import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/hooks";

export default function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(false);

  const { authed, useRedirectIfAuthed, registerUser } = useAuth();
  useRedirectIfAuthed("/user");

  const register = async (e) => {
    e.preventDefault();

    const { email, username } = e.target.elements;

    if (!email.value || !username.value || !password) {
      return alert("Please fill out all fields");
    }

    const { success, error } = await registerUser(
      email.value,
      username.value,
      password
    );

    success && navigate("/user");
    error && alert(error);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    setMatch(password === confirmPassword && password.length > 0);
  }, [password, confirmPassword]);

  return (
    !authed() && (
      <div
        style={{
          display: "block",
          marginTop: "-2%",
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
                    <p className="text-muted">
                      <div>Register a DocDefender account below.</div>
                      <div>
                        By registering, you agree to{" "}
                        <a href="https://www.docdefender.org/terms">
                          these terms.
                        </a>
                      </div>
                    </p>
                    <form onSubmit={register} style={{ minWidth: "20vw" }}>
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
                          onChange={onPasswordChange}
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
                          onChange={onConfirmPasswordChange}
                          type="password"
                          autoComplete="ie-confirmpassword"
                          className="form-control"
                          id="confirmpassword"
                        />
                        <label
                          className={`form-label form-control1 ${
                            confirmPassword.length > 0
                              ? match
                                ? "text-success"
                                : "text-danger"
                              : ""
                          }`}
                          htmlFor="confirmpassword"
                          id="confpwd"
                        >
                          {confirmPassword.length > 0
                            ? match
                              ? "Passwords Match"
                              : "Passwords Do Not Match"
                            : "Confirm Password"}
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mt-1"
                        id="register"
                        disabled={!match}
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

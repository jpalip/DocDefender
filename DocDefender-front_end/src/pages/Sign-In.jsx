import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/hooks";
import logo from "./icon.png";

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
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="styles.css" />
        </head>
        <body>
          <div class="container-fluid">
            <div class="row no-gutter">
              {/* image half */}
              <div class="col-md-6 d-none d-md-flex bg-image">
                <img src={logo} class="img-fluid" alt="responsive image is not avalible"></img>
              </div>

              {/* login form half */}
              <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">

                  <div class="container">
                    <div class="row">
                      <div class="col-lg-10 col-xl-7 mx-auto">
                        <h3 class="display-4">Login</h3>
                        <p class="text-muted mb-4">Login to DocDefender now or register an account below.</p>
                        <form onSubmit={login}>
                          {/* email input */}
                          <div className="form-floating mb-3">
                            <input type="username" id="username" class="form-control" />
                            <label class="form-label" for="username">Username</label>
                          </div>
                          {/* password input */}
                          <div className="form-floating mb-3">
                            <input type="password" id="password" class="form-control" />
                            <label class="form-label" for="password">Password</label>
                          </div>
                          <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                          {/* <button type="submit">Sign In</button> */}
                          {/* need account ? */}
                          <div class="text-center">
                            <p> Not a member? <a href="/register">Register</a></p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </body>
      </html>
    )
  );
}

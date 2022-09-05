export default function SignIn() {
  const login = (e) => {
    e.preventDefault();

    fetch("http://localhost:8393/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
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
  );
}

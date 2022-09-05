export default function Register() {
  const register = (e) => {
    e.preventDefault();
    fetch("http://localhost:8393/register", {
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
  );
}

import { useRef, useState, useEffect } from "react";


const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrorMsg] = useState('');
  const [succsesMsg, setSuccsesMsg] = useState(false); 

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in:", { user, pwd });
    setSuccsesMsg(true);
    setUser('');
    setPwd('');
  };

  if (succsesMsg) {
    // Render success message
    return (
      <section>
        <h1>Login Successful!</h1>
        <br />
        <p>
          <a href="/">Go to Home</a>
        </p>
      </section>
    );
  }

  // Render login form
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <br></br>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
      <p>
        Need an account?
        <span className="line">
          {/* Replace this with a React Router link if using routing */}
          <a href="SignUp">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;

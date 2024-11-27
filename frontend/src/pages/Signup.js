import { useRef, useState, useEffect } from "react";
import axios from "axios";

const CreateUser = async (user, email, password) => {
  try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', { 
        user,  
        email,
        password,
      });
      return response.data;
  } catch (error) {
      throw error.response?.data?.message || error.message || "An unknown error occurred.";
  }
};

const Sign = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [user, setUser] = useState('');
  const [errMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
      }
    }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pwd || !user) {
        setErrorMsg("All fields are required");
        return;
    }
    try {
        const response = await CreateUser(user, email, pwd);
        console.log('User Creation successful:', response);
        setSuccessMsg(true);
        setEmail('');
        setPwd('');
        setUser('');
    } catch (error) {
        console.error('Login failed:', error);
        setErrorMsg(error);
    }
};

if (successMsg) {
  return (
      <section>
          <h1>Login Successful!</h1>
          <p>
              <a href="/">Go to Home</a>
          </p>
      </section>
  );
}

  return <section>
  <p
      ref={errRef}
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
  >
      {errMsg}
  </p>
  <h1>Sign Up</h1>
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
      <br />
      <label htmlFor="email">Email:</label>
      <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
          type="password"
          id="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
      />
      <br />

      <button type="submit">Sign In</button>
  </form>
</section>;
};

export default Sign;

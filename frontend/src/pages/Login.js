import { useRef, useState, useEffect } from "react";
import axios from "axios";

const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/user/login', { 
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message || "An unknown error occurred.";
    }
};

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);

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
        if (!user || !pwd) {
            setErrorMsg("Both fields are required");
            return;
        }
        try {
            const response = await loginUser(user, pwd);
            console.log('Login successful:', response);
            setSuccessMsg(true);
            setUser('');
            setPwd('');
            localStorage.setItem('token', response.data.token);
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
                <a href="/EmployeeComponents">Up</a>
                </p>
            </section>
        );
    }

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
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
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

                <button type="submit">Sign In</button>
            </form>
            <p>
                Need an account?{" "}
                <span className="line">
                    <a href="/SignUp">Sign Up</a>
                </span>
            </p>
        </section>
    );
};

export default Login;

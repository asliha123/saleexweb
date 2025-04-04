// import React, { useState } from "react";

// const Login = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Dummy authentication (Replace with API call)
//     if (email === "test@example.com" && password === "password") {
//       const userData = { email, token: "dummyToken123" };
//       onLoginSuccess(userData); // Notify HomePage of successful login
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.loginBox}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleLogin} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <button type="submit" style={styles.button}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     background: "#2e2d2d", // Matches your color theme
//   },
//   loginBox: {
//     background: "#3d3d3d",
//     padding: "30px",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
//     width: "350px",
//   },
//   title: {
//     color: "#fff",
//     marginBottom: "20px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   input: {
//     background: "#2e2d2d",
//     color: "#fff",
//     border: "1px solid #444",
//     padding: "10px",
//     borderRadius: "5px",
//     marginBottom: "15px",
//     fontSize: "16px",
//   },
//   button: {
//     background: "#C9851E", // Matches your button color
//     color: "#fff",
//     border: "none",
//     padding: "10px",
//     borderRadius: "5px",
//     fontSize: "16px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
// };

// export default Login;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#2e2d2d",
  },
  loginBox: {
    background: "#3d3d3d",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    width: "350px",
  },
  title: {
    color: "#fff",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    background: "#2e2d2d",
    color: "#fff",
    border: "1px solid #444",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    background: "#C9851E",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token));

      onLoginSuccess(data.user);
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;

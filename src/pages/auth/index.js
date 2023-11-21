import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Axios from "axios";
import Swal from "sweetalert2";

export default function AuthPage() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const getRequestToken = async () => {
    try {
      const response = await Axios.get(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389"
      );
      return response.data.request_token;
    } catch (error) {
      console.log(error);
    }
  };
  const createSession = async () => {
    try {
      const getToken = await getRequestToken();
      const data = {
        username: username,
        password: password,
        request_token: getToken,
      };
      const response = await Axios.post(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389",
        data
      );
      const success = response.data.success;
      if (success) {
        const sessionId = await generateSessionId(getToken);
        Cookies.set("sessionId", sessionId);
        navigate(`/`);
        Swal.fire({
          title: "Success",
          text: "Login Successfully",
          icon: "success",
        });
      } else {
        console.log("validasi login gagal");
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      Swal.fire({
        title: "Authentication Error",
        text: "Login Failed",
        icon: "error",
      });
      console.log("validasi login gagal:" + error);
    }
  };
  const generateSessionId = async (token) => {
    try {
      const response = await Axios.post(
        "https://api.themoviedb.org/3/authentication/session/new?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389",
        {
          request_token: token,
        }
      );
      return response.data.session_id;
    } catch (error) {
      console.log("Generate Session Gagal:" + error);
    }
  };
  const getDetailUser = async (session_id, request_token) => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/account/${session_id}?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&request_token=${request_token}`
      );
      return response;
    } catch (error) {
      console.log(`get Detail User gagal:${error}`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createSession();
  };
  const navigate = useNavigate();
  useEffect(() => {
    const authentication = Cookies.get("sessionId");
    if (authentication != null || authentication != undefined) {
      navigate(`/`);
    }
  }, []);
  return (
    <div className="login-form">
      <h1 className="text-white text-center fw-bold">LOGIN</h1>
      <small className="text-center text-white">Login with TMDB account</small>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-5">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="btn btn-warning" type="submit">
            Masuk
          </button>
          <button className="btn btn-muted text-warning ps-2">Register</button>
        </div>
      </form>
    </div>
  );
}

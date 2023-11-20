import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import MovieDetail from "./pages/movieDetail";
import WatchList from "./pages/watchList";
import AuthPage from "./pages/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar></Navbar>
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/watch-list" element={<WatchList />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

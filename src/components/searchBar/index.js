import { useEffect, useState } from "react";

import Axios from "axios";
import "./style.css";
export default function SearchBar() {
  // https://api.themoviedb.org/3/search/movie?query=the god father
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGFlY2NmNzI3NmM2ZDliYjRjYTUyYjRhYzk2ZDM4OSIsInN1YiI6IjY1NTkzZTBkY2EwZTE3MDEzYTFkNTBjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IgftU8-FfN0_Pl-Unn6G23Was1aizuRjfzcYLqx3dPE",
    },
  };
  const [inputValue, setInputValue] = useState("");
  const [dataResult, setResults] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${inputValue}`,
          options
        );
        setResults(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const timeoutId = setTimeout(() => {
      if (inputValue.trim() !== "") {
        getData();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div>
      <div className="form-group search-bar">
        <input
          class="form-control"
          type="text"
          placeholder="Search here.."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className={`search-results ${inputValue ? "show" : ""}`}>
        <small className="text-muted">Your results </small>

        {dataResult.map((item) => {
          return (
            <li className="mb-2" key={item.id}>
              <a href={`/detail/${item.id}`} className="d-flex">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                  alt=""
                  className="img-fluid"
                />
                <div className="ps-2 list-desc">
                  <div className="title fw-bold fs-4">
                    {item.original_title}
                  </div>
                  <div className="score">
                    {item.vote_average} <span className="fw-bold">Score</span>
                  </div>
                  <div className="desc">{item.overview}</div>
                </div>
              </a>
            </li>
          );
        })}
      </div>
    </div>
  );
}

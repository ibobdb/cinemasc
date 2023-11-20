// import { Container } from "react-bootstrap";
import "./style.css";
import SectionHeader from "../../components/sectionHeader";
import Card from "../../components/card";
import Axios from "axios";
import Cookies from "js-cookie";
// import Api from "../../config/apiConfig";
import { useState, useEffect } from "react";
export default function Home() {
  const authentication = Cookies.get("sessionId");

  const [dataPlayingList, setPlayingList] = useState([]);
  const [dataTopRated, setTopRated] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGFlY2NmNzI3NmM2ZDliYjRjYTUyYjRhYzk2ZDM4OSIsInN1YiI6IjY1NTkzZTBkY2EwZTE3MDEzYTFkNTBjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IgftU8-FfN0_Pl-Unn6G23Was1aizuRjfzcYLqx3dPE",
    },
  };
  useEffect(() => {
    const getPlayingList = async () => {
      try {
        const response = await Axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389"
        );
        setPlayingList(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getTopRated = async () => {
      try {
        const response = await Axios.get(
          `https://api.themoviedb.org/3/movie/top_rated`,
          options
        );
        setTopRated(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getButtonStatus = async (id) => {
      try {
        const response = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getPlayingList();
    getTopRated();
  }, []);
  return (
    <div className="container">
      <div className="section mt-5 pt-5">
        <SectionHeader text="Now Playing" />
        <div className="d-flex gap-2 overflow-auto py-3">
          {dataPlayingList.map((item) => {
            return (
              <div className="col-md-3" key={item.id}>
                <Card
                  img={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  title={item.original_title}
                  year={item.release_date.substr(0, 4)}
                  movieId={item.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Top Rated */}
      <div className="section">
        <SectionHeader text="Top Rated" />
        <div className="row">
          {dataTopRated.map((item) => {
            return (
              <div className="col-md-2 mb-3" key={item.id}>
                <Card
                  img={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                  title={item.original_title}
                  year={item.release_date.substr(0, 4)}
                  movieId={item.id}
                  button_type={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

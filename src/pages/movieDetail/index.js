import Axios from "axios";
import SectionHeader from "../../components/sectionHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import MovieDetailComponent from "../../components/movieDetail";
export default function MovieDetail() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGFlY2NmNzI3NmM2ZDliYjRjYTUyYjRhYzk2ZDM4OSIsInN1YiI6IjY1NTkzZTBkY2EwZTE3MDEzYTFkNTBjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IgftU8-FfN0_Pl-Unn6G23Was1aizuRjfzcYLqx3dPE",
    },
  };
  const [dataMovie, setDataMovie] = useState([]);
  const [dataRecomendation, setDataRecomendation] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getMovieDetail = async (id) => {
      try {
        const response = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389`
        );
        setDataMovie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getRecomendation = async (id) => {
      try {
        const response = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          options
        );
        setDataRecomendation(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getMovieDetail(id);
    getRecomendation(id);
  }, [dataMovie]);

  return (
    <div>
      <MovieDetailComponent
        poster_path={dataMovie.poster_path}
        backdrop_path={dataMovie.backdrop_path}
        title={dataMovie.title}
        release={dataMovie.release_date}
        tagline={dataMovie.tagline}
        overview={dataMovie.overview}
        duration={dataMovie.runtime}
        genre={dataMovie.genres}
        vote_average={dataMovie.vote_average}
        movieId={dataMovie.id}
      />
      <div className="container">
        <div className="section mt-5">
          <SectionHeader text="Recomendations" />
          <div className="d-flex gap-2 overflow-auto py-3">
            {dataRecomendation.map((item) => {
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
      </div>
    </div>
  );
}

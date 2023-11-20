import React, { useState } from "react";
import "../../components/movieDetail";
import "./style.css";
import ButtonFavorite from "../buttonFavorite";
import ButtonWatchList from "../buttonWatchList";
import AddRating from "../addRating";
export default function MovieDetail(props) {
  const [ratingPopup, setRatingPopup] = useState(false);
  const genre = props.genre || [];
  const duration = (total_menit) => {
    const hours = Math.floor(total_menit / 60);
    const minutes = total_menit % 60;
    return `${hours}H ${minutes}m`;
  };
  const openPopupRating = () => {
    setRatingPopup(true);
  };
  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/w1280/${props.backdrop_path}"
        )`,
      }}
    >
      <div className="overlay"></div>

      <div className="detail d-flex">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${props.poster_path}`}
          alt=""
          className="img-fluid"
        />
        <div className="detail-text ps-3 text-light overflow-hidden d-grid">
          <h2 className="title text-capitalize fs-1 fw-bold">{props.title}</h2>
          <div className="d-flex gap-2">
            <span className="release">{props.release}</span>
            <span className="genre">
              {genre.map((item) => {
                return `${item.name},`;
              })}
            </span>
            <span className="duration">{duration(props.duration)}</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="user-score fw-bold">
              {props.vote_average} Rate
            </span>
            <AddRating movieId={props.movieId} />
            <ButtonFavorite movieId={props.movieId} />
            <ButtonWatchList movieId={props.movieId} />
          </div>
          <span className="tagline lh-1 fst-italic">{props.tagline}</span>
          <span className=" fw-bold">Overview</span>
          <p className="overview  text-wrap">{props.overview}</p>
        </div>
      </div>
    </div>
  );
}

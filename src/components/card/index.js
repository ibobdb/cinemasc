import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import ButtonFavorite from "../../components/buttonFavorite";
import ButtonWatchList from "../../components/buttonWatchList";
export default function Card(props) {
  const handleButtonClick = (evt) => {
    evt.stopPropagation();
  };
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/detail/${props.movieId}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="overlay"></div>
      <div className="card-body w-100 p-0 pe-auto">
        <img src={props.img} alt="" className="img-fluid w-100" />
        <div className="desc-wrapper">
          <div className="action-group d-flex float-end gap-2 p-2">
            <ButtonFavorite
              data={props}
              button_type={true}
              movieId={props.movieId}
            />
            <ButtonWatchList
              data={props}
              button_type={true}
              movieId={props.movieId}
            />
          </div>
          <div className="card-movie-description p-2 d-grid">
            <div className="card-movie-title">{props.title}</div>
            <span className="card-movie-year">{props.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import "./style.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function ButtonFavorite(props) {
  const authentication = Cookies.get("sessionId");
  const navigate = useNavigate();

  const [btnStat, setBtnStat] = useState(false);
  const handleFavoriteButton = async (evt) => {
    evt.stopPropagation();
    if (authentication == undefined) {
      navigate(`/auth`);
    }
    try {
      const data = {
        media_type: "movie",
        media_id: props.movieId,
        favorite: btnStat ? false : true,
      };

      const response = await Axios.post(
        `https://api.themoviedb.org/3/account/account_id/favorite?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`,
        data
      );
      setBtnStat(btnStat ? false : true);
    } catch (error) {}
  };
  const handleButton = async (id) => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`
      );
      const data = response.data.favorite;
      if (data == true) {
        setBtnStat(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleButton(props.movieId);
  }, []);
  useEffect(() => {
    handleButton(props.movieId);
  }, [btnStat]);
  return (
    <button
      type="button"
      className="btn btn-sm text-light fs-5"
      onClick={handleFavoriteButton}
    >
      {btnStat ? (
        <i class="bx bxs-star text-warning"></i>
      ) : (
        <i class="bx bx-star"></i>
      )}
    </button>
  );
}

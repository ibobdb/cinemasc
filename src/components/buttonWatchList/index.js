import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function ButtonwWatchList(props) {
  const authentication = Cookies.get("sessionId");
  const [btnStat, setBtnStat] = useState(false);
  const navigate = useNavigate();
  const handleWatchListButton = async (evt) => {
    evt.stopPropagation();
    if (authentication == undefined) {
      navigate(`/auth`);
    }
    try {
      const data = {
        media_type: "movie",
        media_id: props.movieId,
        watchlist: btnStat ? false : true,
      };
      const response = await Axios.post(
        `https://api.themoviedb.org/3/account/account_id/watchlist?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`,
        data
      );
      Swal.fire({
        title: "Success",
        text: "Data updated",
        icon: "success",
      });
      setBtnStat(btnStat ? false : true);
    } catch (error) {}
  };
  const handleButton = async (id) => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`
      );
      const data = response.data.watchlist;
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
      className="btn btn-sm  text-light fs-5"
      onClick={handleWatchListButton}
    >
      {btnStat ? (
        <i class="bx bxs-bookmark-star text-warning"></i>
      ) : (
        <i class="bx bxs-bookmark-star"></i>
      )}
    </button>
  );
}

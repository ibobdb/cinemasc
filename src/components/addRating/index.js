import { useEffect, useState } from "react";
import "./style.css";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function AddRating(props) {
  const authentication = Cookies.get("sessionId");
  const [rateValue, setRateValue] = useState(1);
  const [popUp, setPopup] = useState(false);
  const navigate = useNavigate();
  const rateOnChange = (e) => {
    const value = e.target.value;
    setRateValue(value);
  };
  const openPopup = () => {
    if (authentication == undefined) {
      navigate(`/auth`);
    } else {
      setPopup(true);
    }
  };
  const closePopup = () => {
    setPopup(false);
  };
  const submitRating = async (e) => {
    e.preventDefault();
    const data = {
      value: rateValue,
    };
    const id = props.movieId;
    try {
      const response = await Axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`,
        data
      );
      setPopup(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-warning text-white mx-2" onClick={openPopup}>
        Add Rating
      </button>
      <div className={`rate-overlay ${popUp ? "show" : ""}`}>
        <div className="rate-card">
          <div className="container d-grid">
            <h2 className="text-center pt-2 fw-bold text-dark">
              ADD YOUR RATING
            </h2>

            <div className="form-group">
              <input
                type="range"
                class="form-range pt-5"
                min="1"
                max="10"
                onChange={rateOnChange}
                value={rateValue}
              />
            </div>
            <div className="range-value text-center mt-5 text-dark">
              <span>{rateValue}</span>
            </div>
            <form action="" method="post" onSubmit={submitRating}>
              <button className="btn btn-warning mx-auto w-50" type="submit">
                Send
              </button>
              <button
                className="btn btn-danger mx-auto w-50"
                type="button"
                onClick={closePopup}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

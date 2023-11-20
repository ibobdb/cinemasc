import "./style.css";
import SectionHeader from "../../components/sectionHeader";
import Card from "../../components/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Axios from "axios";

export default function Favorite() {
  const [favData, setFavdata] = useState([]);
  const authentication = Cookies.get("sessionId");
  const getFavoriteList = async () => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/account/account_id/favorite/movies?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`
      );
      setFavdata(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (authentication == undefined) {
      navigate(`/auth`);
    }
    getFavoriteList();
    console.log(favData);
  }, []);

  return (
    <div className="container">
      <div className="section mt-5 pt-5">
        <SectionHeader text="Your Favorite Movies" />
        <div className="row">
          {favData.map((item) => {
            return (
              <div className="col-md-2 mb-3" key={item.id}>
                <Card
                  img={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                  title={item.title}
                  year={item.release_date.slice(0, 4)}
                  movieId={item.id}
                  button_type={true}
                  session={authentication}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

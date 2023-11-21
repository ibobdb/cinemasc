import { Nav, Navbar, Container } from "react-bootstrap";
import Logow from "../../assets/img/logow.png";
import SearchBar from "../searchBar";
import "./style.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

export default function Mynav() {
  const [scrolled, setScrolled] = useState(false);
  const authentication = Cookies.get("sessionId");
  const [isLogged, setLogged] = useState(authentication ? true : false);
  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 50) {
      // Ganti nilai sesuai dengan kapan Anda ingin Navbar berubah warna
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const logout = async () => {
    const data = {
      session_id: authentication,
    };
    try {
      const response = await Axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=e0aeccf7276c6d9bb4ca52b4ac96d389&session_id=${authentication}`,
        data
      );
      if (response) {
        Cookies.remove("sessionId");
        setLogged(false);
      }
    } catch (error) {
      // console.log(error);
    }
    console.log(isLogged);
  };
  useEffect(() => {
    // setLogged(authentication ? true : false);
    console.log(isLogged);
  }, [isLogged]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <Navbar expand="lg" className={`navbar ${scrolled ? "navbar-dark" : ""}`}>
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img src={Logow} alt="" className="img-fluid" />
        </Navbar.Brand>
        <SearchBar />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-list ps-2">
            <Nav.Link href="/favorite" className="text-light nav-icon-fav">
              Favorite List
            </Nav.Link>
            <Nav.Link href="/watch-list" className="text-light">
              Watch List
            </Nav.Link>
            {isLogged ? (
              <Nav.Link>
                <button
                  className="btn btn-warning text-white btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link href="/auth" className="text-light">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Contenido from "../Chatbot/Chatbot";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  removeLoggedUser,
  removeToken,
  removeUserDetail,
} from "../../redux/actions";
import logo from "../../Images/logoAkademit.png";
import { slide as Menu } from "react-burger-menu";

export default function Home() {
  // function handleChatbot(e){
  //   e.preventDefault(e);
  //   setChatbot(!chatbot)

  //    }
  const [chatbot, setChatbot] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUsers);

  const user = useSelector((state) => state.userDetail);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const style = {
    bmBurgerButton: {
      position: "absolute",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      // background: "#373a47",
      background: "#fff",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#373a47",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    dispatch(removeLoggedUser(loggedUser));
    dispatch(removeUserDetail());
    alert("Ha cerrado sesion exitosamente!");
    navigate("/home");
  };

  return (
    <div>
      {isTabletOrMobile && (
        // <div className={styles.navBar}>
        //   <Link className={styles.linkHome} to="/home">
        //     <h1 style={{ bottom: "0px" }}>AkademIT</h1>
        //   </Link>
        //   {(toggleMenu || screenWidth > 500) && (
        //     <ul className={styles.list}>
        //       <li className={styles.items}>Home</li>
        //     </ul>
        //   )}
        //   <button onClick={toggleNav} className={styles.btn}>
        //     {"="}
        //   </button>
        // </div>
        <div style={{ flexDirection: "row" }} className={styles.navMobile}>
          <Menu styles={style}>
            <ul className={styles.list}>
              {/* <li className={styles.items}>Home</li> */}

              <li>
                {loggedUser.length > 0 && Object.keys(user).length > 0 ? (
                  <div className={styles.myPerfil}>
                    <p className={styles.userName}>
                      {user.roles[0] &&
                        user.roles[0].tipo.charAt(0).toUpperCase() +
                          user.roles[0].tipo.slice(1)}{" "}
                      {user.name}
                    </p>
                    <Link to={`/profile/${loggedUser}`}>
                      <button className={styles.buttonPerfil2}>
                        Mi perfil
                      </button>
                    </Link>
                  </div>
                ) : null}
              </li>
              <li>
                {loggedUser.length === 0 ? (
                  <Link to="/user">
                    <button className={styles.buttonPerfil2}>Ingresar</button>
                  </Link>
                ) : (
                  <button
                    className={styles.buttonPerfil2}
                    onClick={(e) => handleOnClick(e)}
                  >
                    Salir
                  </button>
                )}
              </li>

              {chatbot ? (
                <div className={styles.visible}>
                  <Contenido setChatbot={setChatbot} chatbot={chatbot} />
                </div>
              ) : null}
              <li>
                <button
                  onClick={() => setChatbot(!chatbot)}
                  className={styles.buttonPerfil2}
                >
                  Ayuda
                </button>
              </li>
              <li>
                <Link to="/nosotros" className={styles.us2}>
                  {" "}
                  ¿Quiénes somos?
                </Link>
              </li>
            </ul>
          </Menu>
          <Link className={styles.linkHome} to="/home">
            <h1 style={{ fontSize: "35px" }}>AkademIT</h1>
            {/* <h1>AkademIT</h1> */}
          </Link>
        </div>
      )}
      {isDesktopOrLaptop && (
        <div className={styles.navBar}>
          <div className={styles.buttonsRight}>
            <Link to="/nosotros" className={styles.us}>
              {" "}
              ¿Quiénes somos?
            </Link>
            {loggedUser.length > 0 && Object.keys(user).length > 0 ? (
              <div className={styles.myPerfil}>
                <p className={styles.userName}>
                  {user.roles[0] &&
                    user.roles[0].tipo.charAt(0).toUpperCase() +
                      user.roles[0].tipo.slice(1)}{" "}
                  {user.name}
                </p>
                <Link to={`/profile/${loggedUser}`}>
                  <button className={styles.buttonPerfil}>Mi perfil</button>
                </Link>
              </div>
            ) : null}

            {loggedUser.length === 0 ? (
              <Link to="/user">
                <button>Ingresar</button>
              </Link>
            ) : (
              <button onClick={(e) => handleOnClick(e)}>Salir</button>
            )}
            {chatbot ? (
              <div className={styles.visible}>
                <Contenido setChatbot={setChatbot} chatbot={chatbot} />
              </div>
            ) : null}
            <button
              onClick={() => setChatbot(!chatbot)}
              className={styles.buttonPerfil}
            >
              Ayuda
            </button>
            {/* <div>
              <Link className={styles.linkHome} to="/home">
                <h1 style={{ top: "0px" }}>AkademIT</h1>
              </Link>
            </div> */}
          </div>
          <div>
            <Link className={styles.linkHome} to="/home">
              <h1 style={{ top: "0px" }}>AkademIT</h1>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

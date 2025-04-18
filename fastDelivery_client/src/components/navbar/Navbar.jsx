import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/userReducer";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [popup, setPopup] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlePopup = () => {
    popup === false ? setPopup(true) : setPopup(false);
  };

  const navigate = useNavigate();

  const handleUser = () => {
    if (user?.isAuth) {
      localStorage.removeItem("token");
      dispatch(logoutUser());
      handlePopup();
      navigate("/mock");
    } else {
      handlePopup();
      navigate("/auth");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__navigation">
        <div className="navbar__navigation__element">
          <div
            className="navbar__navigation__element_single"
            onClick={() => navigate("/mock")}
          >
            Главная
          </div>
        </div>
        <div className="navbar__navigation__element">
          <div className="navbar__navigation__element_single">Заказы</div>
          <div
            className="navbar__navigation__element_single"
            onClick={handlePopup}
          >
            Профиль
          </div>
        </div>
        <div
          className={
            popup
              ? "navbar__navigation__popup open"
              : "navbar__navigation__popup"
          }
        >
          {user?.isAuth && (
            <>
              <div className="navbar__navigation__popup__element">
                {user.currentUser.name}
              </div>
              <div className="navbar__navigation__popup__element">Адреса</div>
            </>
          )}

          <div
            className="navbar__navigation__popup__element"
            onClick={handleUser}
          >
            {user?.isAuth ? "Выход" : "Войти"}
          </div>
        </div>
      </div>
      <span className="navbar__divider"></span>
    </div>
  );
};

export default Navbar;

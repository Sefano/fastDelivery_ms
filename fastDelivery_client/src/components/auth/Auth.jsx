import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import "./auth.scss";
import { signIn, signUp } from "../../api/api";
import { setUser } from "../../redux/reducers/userReducer";

const Auth = () => {
  const dispatch = useDispatch();

  const [isUp, setIsUp] = useState("reg");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeForm = () => {
    isUp === "reg" ? setIsUp("log") : setIsUp("reg");
  };

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    if (isUp === "reg") {
      signUpMutation.mutate({ email, password, name });
    } else {
      signInMutation.mutate({ email, password });
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSignUp}>
        {isUp === "reg" ? (
          <h2 className="auth__form-title">Регистрация</h2>
        ) : (
          <h2 className="auth__form-title">Вход</h2>
        )}

        <label htmlFor="email">Почта</label>
        <input
          type="text"
          name="email"
          id="email"
          className="auth__form-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        {isUp === "reg" && (
          <>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              name="name"
              id="name"
              className="auth__form-input"
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        <label htmlFor="image">Пароль</label>
        <input
          type="password"
          name="password"
          id="password"
          className="auth__form-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isUp === "reg" ? (
          <button className="auth__form-btn" type="submit">
            Зарегестрироваться
          </button>
        ) : (
          <button className="auth__form-btn" type="submit">
            Войти
          </button>
        )}
        {isUp === "reg" ? (
          <span className="auth__form-change">
            Уже зарегестрированы?
            <p className="auth__form-change-active" onClick={handleChangeForm}>
              Войти
            </p>
          </span>
        ) : (
          <span className="auth__form-change">
            Нет аккаунта?
            <p className="auth__form-change-active" onClick={handleChangeForm}>
              Загерестрироваться
            </p>
          </span>
        )}
      </form>
    </div>
  );
};

export default Auth;

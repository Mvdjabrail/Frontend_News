import React, { useState } from "react";
import css from "../SigninUpContent/signinUp.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../../app/features/userSlice";
import CircularProgress from '@mui/material/CircularProgress';

const SigninUpContent = () => {
  const sugninUp = useSelector((state) => state.user.signinUp);
  const loaders = useSelector((state)=> state.user.loaders)
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handelChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handelChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      login[0] !== " " &&
      password[0] !== " " &&
      login !== "" &&
      password !== ""
    ) {
      dispatch(postUser({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  const handleClick = () => {
    if (
      login[0] !== " " &&
      password[0] !== " " &&
      login !== "" &&
      password !== ""
    ) {
      dispatch(postUser({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className={css.registrDiv}>
      {loaders ? <CircularProgress  /> : ''}
      <div className={css.regDiv}>Регистрация</div>
      
      <form onSubmit={(e) => handleSubmit(e)} className={css.formDiv} action="">
        <input
          value={login}
          type="login"
          onChange={handelChangeLogin}
          placeholder="Введите логин"
        />
        <input
          value={password}
          type="password"
          onChange={handelChangePassword}
          placeholder="Введите пароль"
        />
        <button
          onClick={handleClick}
          disabled={sugninUp}
          className={css.btnAvtoregistr}
        >
          Зарегистрироваться
        </button>
        <button className={css.btnAvtoregistr}>
          {error && <div>{error}</div>}
          <Link to="/SigninIn"> Еcть аккаунт? Войти</Link>
        </button>
      </form>
    </div>
  );
};

export default SigninUpContent;

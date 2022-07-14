import React, { useState } from "react";
import css from "../SigninContent/signinContent.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../../app/features/userSlice";

const SigninContent = () => {
  const signinIn = useSelector((state) => state.user.signinIn);
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
      dispatch(doLogin({ login, password }));
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
      dispatch(signinIn({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className={css.registrDiv}>
      <div className={css.regDiv}>Авторизация</div>

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
            disabled={signinIn}
            className={css.btnAvtoregistr}
          >
            Авторизоваться
          </button>

        <button className={css.btnAvtoregistr}>
          {error && <div>{error}</div>}
          <Link to="/SigninUp"> Нет аккаунта? Зарегистрируйтесь</Link>
        </button>
      </form>
    </div>
  );
};

export default SigninContent;

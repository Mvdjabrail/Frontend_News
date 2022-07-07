import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import css from "../Header/header.module.css";
import img from "../image/Union.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      rootEl.current.contains(e.target) && console.log("click");
    document.addEventListener("click", (onClick) => {
      setIsMenuOpen(false);
    });
    return () => document.removeEventListener("click", onClick);
  }, []);

  console.log(isMenuOpen);

  const handleBurger = () => {
    setIsMenuOpen(true);
  };

  return (
    <header onClick={(e) => e.stopPropagation()} ref={rootEl}>
      <div className={css.headerdiv}>
        <div className={css.logotip}>
          {" "}
          <Link to="/">Intocode News</Link>{" "}
        </div>
        <div className={css.novost}>
          <div className={css.novosti}>Наука</div>
          <div className={css.novosti}>Спорт</div>
          <div className={css.novosti}>Игры</div>
          <div className={css.novosti}>Политика</div>
        </div>
        {!isMenuOpen ? (
          <div onClick={handleBurger} className={css.sign}>
            <img src={img} alt="" />
          </div>
        ) : (
          <div className={css.burger}>
            <Link to="SigninIn">Войти</Link>
            <Link to="SigninUp">Регистрация</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

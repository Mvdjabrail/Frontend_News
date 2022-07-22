import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logaut } from "../../../app/features/userSlice";
import css from "./header.module.css";
import img from "../../image/Union.svg";
import { fetchCategory } from "../../../app/features/categoriesSlice";

const Header = () => {
  const token = useSelector((state) => state.user.token);
  const category = useSelector((state) => state.category.category);
  const name = localStorage.getItem("name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      rootEl.current.contains(e.target) && console.log("click");
    document.addEventListener("click", (onClick) => {
      setIsMenuOpen(false);
    });
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleBurger = () => {
    setIsMenuOpen(true);
  };

  const handleLogaut = () => {
    if (token) {
      dispatch(logaut());
    }
  };

  return (
    <header onClick={(e) => e.stopPropagation()} ref={rootEl}>
      <div className={css.headerdiv}>
        <div className={css.logotip}>
          <Link to="/">Intocode News</Link>
        </div>
        <div className={css.novost}>
          {category.map((item, index) => {
            return (
              <Link key={index} to={`/category/${item._id}`}>
                {item.text}{" "}
              </Link>
            );
          })}
        </div>
        {!isMenuOpen ? (
          <>
            <div className={css.sign}>
              <div className={css.nameDiv}>
                <Link to="/admin">{token && name}</Link>
              </div>
              <div>
                <img onClick={handleBurger} src={img} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className={css.burger}>
            {token ? (<div><Link to="/" onClick={handleLogaut} className={css.logaut}>
              Выход
            </Link></div>) : (<div>
            <Link to="/SigninIn">Войти</Link>
            <Link to="/SigninUp">Регистрация</Link>
            </div>)}

            
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

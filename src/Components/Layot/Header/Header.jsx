import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logaut } from "../../../app/features/userSlice";
import css from "./header.module.css";
import img from "../../image/Union.svg";
import { fetchCategory } from '../../../app/features/categoriesSlice';

const Header = () => {
  const token = useSelector((state)=> state.user.token)
  const name = localStorage.getItem("name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.category);

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

  const handleLogaut = ()=>{
    if(token){
      dispatch(logaut())
    }
  }
  console.log('sdcsd',category);

  return (
    <header onClick={(e) => e.stopPropagation()} ref={rootEl}>
      <div className={css.headerdiv}>
        <div className={css.logotip}>
          <Link to="/">Intocode News</Link>
        </div>
        <div className={css.novost}>
          {category.map((item)=>{
            return <Link to={`/category/${item._id}`}>{item.text} </Link>
          })}
        </div>
        {!isMenuOpen ? (
          <>
            <div onClick={handleBurger} className={css.sign}>
              <div className={css.nameDiv}>{name}</div>
              <div><img src={img} alt="" /></div>
            </div>
          </>
        ) : (
          <div className={css.burger}>
            <Link to="/SigninIn">Войти</Link>
            <Link to="/SigninUp">Регистрация</Link>
            <Link to='/' onClick={handleLogaut} className={css.logaut}>Выход</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

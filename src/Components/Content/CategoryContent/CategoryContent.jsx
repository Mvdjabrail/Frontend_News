import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCategory } from "../../../app/features/categoriesSlice";
import { fetchNews } from "../../../app/features/newsSlise";
import css from '../CategoryContent/category.module.css'
const CategoryContent = () => {
  const news = useSelector((state) => state.news.news);
  const dispatch = useDispatch()
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchNews())
  }, [dispatch]);

  return (
    <div className={css.mainNews}>
      {news.map((item) => {
        if (id === item.category) {
          console.log(id === item.category);
          return (

            <div className={css.divNews}>
              <div className={css.divTitle}>{item.title}</div>
              <Link to={`/News/${item._id}`}>
                <img src={`http://localhost:4000/${item.pictures}`} alt="" />
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategoryContent;

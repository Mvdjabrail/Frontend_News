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
      {news.map((item, index) => {
        if (id === item.category) {
          return (
            <div key={index} className={css.divNews}>
              <div className={css.divTitle}>{item.title}</div>
              <Link to={`/News/${item._id}`}>
                <img className={css.img1} src={`http://localhost:4000/${item.image}`} alt="" />
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategoryContent;

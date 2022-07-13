import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "../HomeContent/homeContent.module.css";
import { fetchNews } from "../../../app/features/newsSlise";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const news = useSelector((state) => state.news.news);


  return (
    <>
      <div className={css.divContayner}>
        <div className={css.contaynerCenter}>
          <div className={css.hotTapis}>Hot topics</div>
          <div className={css.nisi}>
            <div className={css.photoBacr}>
              <div className={css.textphoto}>
                Massa tortor nibh nulla condimentum imperdiet scelerisque...
              </div>
            </div>
            <div className={css.maintext}>
              <div className={css.textdiv1}>
                Nisi, sagittis aliquet sit rutrum. Nunc, id vestibulum quam
                ornare adipiscing. Pellentesque sed turpis nunc gravida
                pharetra, sit nec vivamus pharetra. Velit, dui, egestas nisi,
                elementum mattis mauris, magnis. Massa tortor nibh nulla
                condimentum imperdiet scelerisque... read more
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.textLates}>Latest News</div>
      <div className={css.divLatesNews}>
        {news.map((item) => {
          return (
            <div className={css.latesPhoto}>
              <div className={css.divLates1}>
                <div>{item.title}</div>
                <div className={css.divImg}>
                  <Link to={`/News/${item._id}`}>
                    <img
                      src={`http://localhost:4000/${item.pictures}`}
                      alt=""
                    />
                  </Link>
                </div>
                <Link to={`/News/${item._id}`}>
                  <FaRegComment />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeContent;

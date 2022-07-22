import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "../HomeContent/homeContent.module.css";
import { fetchNews } from "../../../app/features/newsSlise";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getComments } from "../../../app/features/commentSlice";
import { CircularProgress } from "@mui/material";

const HomeContent = () => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment.comments);
  const loading = useSelector((state) => state.news.loading);

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(getComments());
  }, [dispatch]);

  const news = useSelector((state) => state.news.news);

  if (!news.length) {
    return "";
  }

  
  const comments = news.map((item) => {
    const result = comment.filter((com) => com.news === item._id);
    return result;
  });

  const topNews = () => {
    let max = comments[0];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].length > max.length) {
        max = comments[i];
      }
    }
    return max[0];
  };

  const topic = topNews();

  if (!topic) {
    return "";
  }

  if (loading) {
    return <CircularProgress className={css.loader} />;
  }

  return (
    <>
      {news && news.map((item, index) => {
        if (item._id === topic.news) {
          return (
            <div key={index} className={css.divContayner}>
              <div className={css.contaynerCenter}>
                <div className={css.hotTapis}>Hot topics</div>
                <div className={css.nisi}>
                  <div className={css.photoBacr}>
                  <Link to={`/News/${item._id}`}>
                    <img
                    className={css.img5}
                      src={`http://localhost:4000/${item.image}`}
                      alt=""
                    />
                  </Link>
                  </div>
                  <div className={css.maintext}>
                    <div className={css.textdiv1}>
                      Nisi, sagittis aliquet sit rutrum. Nunc, id vestibulum
                      quam ornare adipiscing. Pellentesque sed turpis nunc
                      gravida pharetra, sit nec vivamus pharetra. Velit, dui,
                      egestas nisi, elementum mattis mauris, magnis. Massa
                      tortor nibh nulla condimentum imperdiet scelerisque...
                      read more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
      <div className={css.textLates}>Latest News</div>
      <div className={css.divLatesNews}>
        {news.map((item, index) => {
          return (
            <div key={index} className={css.latesPhoto}>
              <div className={css.divLates1}>
                <div>{item.title}</div>
                <div className={css.divImg}>
                  <Link to={`/News/${item._id}`}>
                    <img
                      src={`http://localhost:4000/${item.image}`}
                      alt=""
                    />
                  </Link>
                </div>
                <Link className={css.lengCom} to={`/News/${item._id}`}>
                  <FaRegComment className={css.faCom} />
                  <div className={css.lendiv}>
                    {comment.filter((com) => com.news === item._id).length}
                  </div>
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

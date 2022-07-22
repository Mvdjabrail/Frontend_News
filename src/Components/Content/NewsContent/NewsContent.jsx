import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  commentNews,
  deleteComment,
  getComment,
} from "../../../app/features/commentSlice";
import { fetchNews } from "../../../app/features/newsSlise";
import { getUser } from "../../../app/features/userSlice";
import css from "./newsContent.module.css";

const NewsContent = () => {
  const news = useSelector((state) => state.news.news);
  const comments = useSelector((state) => state.comment.comment);
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.news.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const userId = localStorage.getItem("user");
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComment(id));
    dispatch(getUser());
    dispatch(deleteComment());
  }, [dispatch, id]);

  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment[0] !== " " && comment !== "") {
      dispatch(commentNews({ comment, id }));
      setComment("");
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteComment(id));
  };

  if (loading) {
    return <CircularProgress className={css.loader} />;
  }

  return (
    <div>
      {news.map((item, index) => {
        if (item._id === id) {
          return (
            <div key={index} className={css.mainDiv}>
              <div>
                <img
                  className={css.img1}
                  src={`http://localhost:4000/${item.image}`}
                  alt=""
                />
              </div>
              <div className={css.titleDiv}>{item.title}</div>
              <div className={css.divText}>{item.text}</div>
              <div className={css.commentDiv}>
                {token ? (
                  <form onSubmit={(e) => handleSubmit(e)} action="">
                    <input
                      onChange={changeComment}
                      value={comment}
                      type="text"
                      placeholder="Введите комментарий"
                    />
                  </form>
                ) : (
                  <div className={css.divReg}>
                    <Link className={css.regAuto} to="/SigninIn">
                      Авторизируйтесь
                    </Link>
                  </div>
                )}
                {comments.map((items) => {
                  return users.map((user) => {
                    if (user._id === items.user) {
                      return (
                        <div className={css.loginComm}>
                          <div>
                            <div className={css.loginDiv}>{user.login}</div>
                            <div className={css.textDiv}>{items.text}</div>
                          </div>
                          {items.user === userId ? (
                            <button
                              onClick={() => handleRemove(items)}
                              className={css.btnRemove}
                            >
                              Удалить
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    }
                  });
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewsContent;

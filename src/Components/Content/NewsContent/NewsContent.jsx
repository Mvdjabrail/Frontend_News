import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commentNews, getComment } from "../../../app/features/commentSlice";
import { fetchNews } from "../../../app/features/newsSlise";
import { getUser } from "../../../app/features/userSlice";
import css from "./newsContent.module.css";

const NewsContent = () => {
  const news = useSelector((state) => state.news.news);
  const comments = useSelector((state) => state.comment.comment);
  const users = useSelector((state) => state.user.users);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComment(id));
    dispatch(getUser());
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

  console.log(users);

  return (
    <div>
      {news.map((item) => {
        if (item._id === id) {
          return (
            <div className={css.mainDiv}>
              <div>
                <img src={`http://localhost:4000/${item.pictures}`} alt="" />
              </div>
              <div className={css.titleDiv}>{item.title}</div>
              <div className={css.divText}>{item.text}</div>
              <div className={css.commentDiv}>
                <form onSubmit={(e) => handleSubmit(e)} action="">
                  <input
                    onChange={changeComment}
                    value={comment}
                    type="text"
                    placeholder="Введите комментарий"
                  />
                </form>
                  {comments.map((item) => {
                    return users.map((user) => {
                      if (user._id === item.user) {
                        return (
                          <div className={css.loginComm}>
                            <div className={css.loginDiv}>{user.login}</div>
                            <div className={css.textDiv}>{item.text}</div>
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

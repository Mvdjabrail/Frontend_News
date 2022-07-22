import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getUser, patchUser } from "../../../app/features/userSlice";
import css from "./polzovatel.module.css";

const PolzovatelContent = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onClick = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAdmin = (item) => {
    dispatch(patchUser(item))
  }

  return (
    <div className={css.mainDiv}>
      <div className={css.divMap}>
        {users.map((item, index) => {
          return (
            <div className={css.userDiv} key={index}>
              <div className={css.divUser}>{`${item.login}(${item.role})`}</div>
              <div className={css.btnDiv}>
                {
                  <button
                    onClick={() => onClick(item)}
                    className={css.deleteBtn}
                  >
                    Удалить
                  </button>
                }
                {<button onClick={() =>handleAdmin(item)} className={css.adminBtn}>Назначить Админом</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolzovatelContent;

import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect, useState } from "react";
import css from "../AdminContent/admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postNews } from "../../../app/features/newsSlise";
import { Link } from "react-router-dom";

const AdminContent = () => {
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [categor, setCategory] = useState("");

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeText = (e) => {
    setText(e.target.value);
  };

  const changecategory = (e) => {
    setCategory(e.target.value);
  };

  const onClickAdd = () => {
    setCategory("");
    setPhoto("");
    setText("");
    setTitle("");
    const payload = { title, text, categor, photo };
    dispatch(postNews(payload));
  };

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(photo);
    } else {
      setPreview(null);
    }
  }, [dispatch, photo]);

  return (
    <>
    <div className={css.polzovatel}> <Link to='/polzovatel'>Все пользователи</Link> </div>

    <div className={css.mainNovost}>
      <div className={css.divNovost}>
        <input
          onChange={changeTitle}
          value={title}
          type="text"
          placeholder="Введите заголовок новости"
        />
        <input
          onChange={changeText}
          value={text}
          type="text"
          placeholder="Введите текс новости"
        />
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="Категории">
              <Form.Select
                onChange={(e) => changecategory(e)}
                value={categor}
                aria-label="Floating label select example"
              >
                {category.map((item, index) => {
                  return <option key={index} value={item._id}>{item.text}</option>;
                })}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <div className={css.creatyImage}>
          <div>
            <input
              type="file"
              id="upload"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.substring(0, 5) === "image") {
                  setPhoto(file);
                } else {
                  setPhoto(null);
                }
              }}
            />
            {preview ? (
              <>
                <div className={css.divImg}>
                  <img className={css.img2} src={preview} alt="" />
                </div>
                <label htmlFor="upload">
                  <ion-icon name="create-outline"></ion-icon>
                </label>{" "}
              </>
            ) : (
              <label htmlFor="upload">
                <div className={css.addDiv}>
                  <img
                    className={css.img1}
                    src="https://www.babypillowth.com/images/templates/upload.png"
                    alt=""
                  />
                  <div className={css.add}>Выбрать файл</div>
                </div>
              </label>
            )}
          </div>
        </div>
        <div className={css.btn}>
          <button onClick={onClickAdd}>Отправить</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminContent;

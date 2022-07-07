import React from "react";
import css from "../Content/homeContent.module.css";
import img1 from "../image/1.svg";
import img2 from "../image/2.svg";
import img3 from "../image/3.svg";
import img4 from "../image/4.svg";
import img5 from "../image/5.svg";
import img6 from "../image/6.svg";
import img7 from "../image/7.svg";
import img8 from "../image/8.svg";

const HomeContent = () => {
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
      <div className={css.divLatesNews}>
        <div className={css.textLates}>Latest News</div>
        <div className={css.latesPhoto}>
          <div className={css.divLates1}>
            <img src={img1} alt="" />
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img2} alt="" />
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img3} alt="" />{" "}
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img4} alt="" />{" "}
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img5} alt="" />{" "}
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img6} alt="" />{" "}
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img7} alt="" />{" "}
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
          <div className={css.divLates1}>
            <img src={img8} alt="" />{" "}
            <div>News Title Lorem Ipsum Dolor Sit Amet</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;

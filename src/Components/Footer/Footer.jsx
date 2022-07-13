import React from "react";
import { Link } from "react-router-dom";
import css from "../Footer/footer.module.css";
import img1 from "../image/icon1.svg";
import img2 from "../image/icon2.svg";

const Footer = () => {
  return (
    <footer >
      <div className={css.footerDiv}>
        <div className={css.divfooter}>
          <Link to = "https://intocode.ru/">
            <img src={img1} alt="" />
          </Link>
          <Link to = "https://intocode.ru/">
            {" "}
            <img src={img2} alt="" />
          </Link>
        </div>
        <div className={css.intocodeNews}>Intocode News</div>
        <div className={css.photoFooter}>Intocode Bootcamp 2022</div>
      </div>
    </footer>
  );
};

export default Footer;

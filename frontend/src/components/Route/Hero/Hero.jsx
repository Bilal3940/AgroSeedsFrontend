import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div
      className={`relative min-h-[70vh] 400px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1623211268529-69c56e303312?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[45px] leading-[1.2] 800px:text-[60px] text-[#ebe8e2] font-[700] capitalize`}
        >
          {/* Where Dreams Take Root <br /> Your Seed Haven. */}
          {t('hero-heading')}
        </h1>
        <p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#ebe8e2]">
         {t("hero-para")}
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                   {t("hero-shop")}
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

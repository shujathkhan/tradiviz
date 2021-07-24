import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles["loader-bg"]}>
      <div className={styles["loader-p"]}></div>
    </div>
  );
};

export default Loader;

import React from "react";
import styles from "./KPI.module.scss";

const KPI = (props: any) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      {data.map((stat: any) => {
        return (
          <div className="stat-container">
            <div className="stat-label"></div>
            <div className="stat-value"></div>
          </div>
        );
      })}
    </div>
  );
};

export default KPI;

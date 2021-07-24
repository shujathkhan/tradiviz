/* eslint-disable react/display-name */
import Head from "next/head";
import styles from "../../styles/Home.module.scss";
import React, { useEffect, useState } from "react";
import { columnDefs } from "../featureConfigs/tableConfig";
import dynamic from "next/dynamic";
import Loader from "../components/Loader";

const MultiLineChart = dynamic(() => import("../components/MultiLineChart"), {
  ssr: false,
  loading: () => <Loader />,
});

const Table = dynamic(() => import("../components/Table"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  const [detailedData, setDetailedData] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);

  const getDetailedData = async () => {
    const res = await fetch("/stock_data.json");
    const stocks = await res.json();
    console.log(stocks);
    let results = stocks.results;
    return results.map((item: any) => {
      return {
        ...item,
        price: {
          open_price: item.open_price,
          close_price: item.close_price,
        },
        date: new Date(item.date),
      };
    });
  };

  const getAggregatedData = async () => {
    const res = await fetch("/aggregated_stock_exchange.json");
    const stocks = await res.json();
    console.log(stocks);
    let results = stocks.results;
    return results;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getDetailedData()
      .then((data) => setDetailedData(data))
      .catch((err) => console.error(err));

    getAggregatedData()
      .then((data) => setAggregatedData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tradiviz</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="theme-color" content="#060A1B"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={`${styles["stat-card"]} ${styles["title-card"]}`}>
          <h1>Tradiviz</h1>
          <div className={styles["title-description"]}>
            A graphical representation of stock exchange
          </div>
        </div>

        <div className={`${styles["stat-card"]}`}>
          <MultiLineChart
            data={aggregatedData}
            label={"Aggregated Stock Exchange"}
          />
        </div>
        <div className={`${styles["stat-card"]} ${styles["table-container"]}`}>
          <Table
            detailedData={detailedData}
            columnDefs={columnDefs}
            label={"Stock Market Data"}
          />
        </div>
      </main>
    </div>
  );
}

import React from "react";
import dynamic from "next/dynamic";
import styles from "./MultiLine.module.scss";
import Image from "next/image";
import { downloadImage } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

type AggregatedExchangeType = {
  date: string;
  total_rev: number;
  total_vol: number;
};

const MultiLine = (props: {
  data: Array<AggregatedExchangeType>;
  label: string;
}) => {
  const { data, label } = props;

  const unpack = (rows: Array<AggregatedExchangeType>, key: any) => {
    return rows.map(function (row: any) {
      return row[key];
    });
  };

  const downloadGraph = () => {
    downloadImage("graphPlot", {
      format: "png",
      filename: "graph",
      width: 1500,
      height: 750,
    });
  };

  return (
    <>
      <span className={styles["chart-label-container"]}>
        <span className={styles["chart-label"]}>{label}</span>
        <button className={styles["chart-export-btn"]} onClick={downloadGraph}>
          <span className={styles["chart-download-label"]}>Download</span>
          <Image
            src={"/export-csv.svg"}
            alt={"Export as csv"}
            width={20}
            height={20}
          />
        </button>
      </span>
      <Plot
        divId={"graphPlot"}
        data={[
          {
            type: "scatter",
            mode: "lines",
            name: "Total Revenue",
            x: unpack(data, "date"),
            y: unpack(data, "total_rev"),
            line: { color: "red" },
          },
          {
            type: "scatter",
            mode: "lines",
            name: "Total Volume",
            x: unpack(data, "date"),
            y: unpack(data, "total_vol"),
            line: { color: "#17BECF" },
          },
        ]}
        layout={{
          xaxis: {
            autorange: true,
            automargin: true,
            type: "date",
          },
          yaxis: {
            autorange: true,
            automargin: true,
            type: "linear",
          },
          legend: {
            traceorder: "normal",
            font: {
              family: "sans-serif",
              size: 12,
              color: "white",
            },
            bgcolor: "transparent",
            bordercolor: "#FFFFFF",
            borderwidth: 2,
          },
        }}
      />
    </>
  );
};

export default MultiLine;

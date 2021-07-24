import React from "react";
import dynamic from "next/dynamic";
import styles from "./MultiLine.module.scss";

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

  return (
    <>
      <div className={styles["chart-label"]}>{label}</div>
      <Plot
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

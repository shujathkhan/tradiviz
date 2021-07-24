import React, { useRef, useState } from "react";
import Image from "next/image";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styles from "./Table.module.scss";
import { ColDef, DetailGridInfo, GridApi } from "ag-grid-community";
// import CsvFile from "/export-csv.svg";

type StockDataType = {
  name: string;
  date: string;
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
  volume: number;
  market: string;
};

const Table = (props: {
  detailedData: Array<StockDataType>;
  columnDefs: ColDef[];
  label: string;
}) => {
  const { detailedData, columnDefs, label } = props;
  const [gridApi, setGridApi] = useState<GridApi>();

  const exportAsCSV = () => {
    gridApi?.exportDataAsCsv();
  };

  return (
    <div className={`ag-theme-alpine ${styles["table-root"]}`}>
      <span className={styles["table-label-container"]}>
        <span className={styles["table-label"]}>{label}</span>
        <button className={styles["table-export-btn"]} onClick={exportAsCSV}>
          <span className={styles["table-download-label"]}>Download</span>
          <Image
            src={"/export-csv.svg"}
            alt={"Export as csv"}
            width={20}
            height={20}
          />
        </button>
      </span>
      <AgGridReact
        onGridReady={(params) => setGridApi(params.api)}
        rowData={detailedData}
        columnDefs={columnDefs}
        paginationAutoPageSize
        pagination
      />
    </div>
  );
};

export default Table;

import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styles from "./Table.module.scss";
import { ColDef } from "ag-grid-community";

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

  return (
    <div className={`ag-theme-alpine ${styles["table-root"]}`}>
      <div className={styles["table-label"]}>{label}</div>
      <AgGridReact
        rowData={detailedData}
        columnDefs={columnDefs}
        paginationAutoPageSize
        pagination
      />
    </div>
  );
};

export default Table;

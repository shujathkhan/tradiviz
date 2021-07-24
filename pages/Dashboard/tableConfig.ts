const dateCellRenderer = (params: any) => {
  return (
    new Date(params.value).getDate() +
    "-" +
    (new Date(params.value).getMonth() + 1) +
    "-" +
    new Date(params.value).getFullYear()
  );
};

const priceCellRenderer = (params: any) => {
  return `<span><span style="width:${params.value.open_price}px; height:30px; background: red; font-size: 10px;  height: 15px; background: red; color: white; padding: 3px 9px;">${params.value.open_price}</span><span style="width:${params.value.close_price}px; height: 15px; background: green; font-size: 10px;  color: white; padding: 3px 9px;">${params.value.close_price}</span></span>`;
};

export const columnDefs = [
  {
    headerName: "Name",
    field: "name",
    flex: 1,
    minWidth: 200,
    resizable: true,

    floatingFilter: true,
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Date",
    field: "date",
    flex: 1,
    minWidth: 200,
    resizable: true,

    floatingFilter: true,
    sortable: true,
    filter: "agDateColumnFilter",
    cellRenderer: dateCellRenderer,
  },
  {
    headerName: "Market Price",
    field: "price",
    flex: 1,
    minWidth: 200,
    resizable: true,

    floatingFilter: true,
    sortable: true,
    filter: "agNumberColumnFilter",
    cellRenderer: priceCellRenderer,
  },
  {
    headerName: "High Price",
    field: "high_price",
    flex: 1,
    minWidth: 200,
    resizable: true,

    sortable: true,
    floatingFilter: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Low Price",
    field: "low_price",
    flex: 1,
    minWidth: 200,
    resizable: true,

    floatingFilter: true,
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Volume",
    field: "volume",
    flex: 1,
    minWidth: 200,
    resizable: true,

    floatingFilter: true,
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Market",
    field: "market",
    flex: 1,
    minWidth: 200,
    resizable: true,

    floatingFilter: true,
    sortable: true,
    filter: "agTextColumnFilter",
  },
];

export const getRowData = async () => {
  const res = await fetch("/stock_data.json");
  const stocks = await res.json();
  console.log(stocks);
  let results = stocks.results;
  // results.length = 200;
  return results;
};

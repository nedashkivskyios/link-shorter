import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "N", width: 50, sortable: false },
  {
    field: "initialUrl",
    headerName: "Initial Link",
    width: 750,
    sortable: false,
  },
  { field: "shortUrl", headerName: "Shorted Url", width: 500, sortable: false },
  {
    field: "clicks",
    headerName: "Cliks",
    type: "number",
    width: 50,
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    initialUrl: "Snoasdkfahsdkfhalskdfjhaslkdjfhalksdjfhw",
    shortUrl: "Joalsdjfhkalsjdhflkasjdhflkasjdhfalksjdhfn",
    clicks: 0,
  },
];

export const LinksTable = () => {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        pagination={undefined}
        rows={rows}
        columns={columns}
        // pageSize={5}
        rowsPerPageOptions={[0]}
      />
    </div>
  );
};

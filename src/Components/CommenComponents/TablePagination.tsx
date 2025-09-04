import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

interface TablePaginationProps {
  page: number;
  pageCount: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  page,
  pageCount,
  totalItems,
  rowsPerPage,
  onPageChange,
}: TablePaginationProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent={{ xs: "space-between", sm: "flex-end" }}
      sx={{ pt: 1 }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing data {Math.min((page - 1) * rowsPerPage + 1, totalItems)} to{" "}
        {Math.min(page * rowsPerPage, totalItems)} of {totalItems} entries
      </Typography>
      <Pagination
        page={page}
        count={pageCount}
        onChange={(_, p) => onPageChange(p)}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Stack>
  );
}

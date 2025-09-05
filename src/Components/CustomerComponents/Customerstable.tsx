import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Row = {
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
  createdAt: string;
};
const rows: Row[] = [
  {
    name: "Jane Cooper",
    company: "Microsoft",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: "Active",
    createdAt: "2024-06-18",
  },
  {
    name: "Floyd Miles",
    company: "Yahoo",
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: "Inactive",
    createdAt: "2024-05-22",
  },
  {
    name: "Ronald Richards",
    company: "Adobe",
    phone: "(302) 555-0107",
    email: "ronald@adobe.com",
    country: "Israel",
    status: "Inactive",
    createdAt: "2024-04-09",
  },
  {
    name: "Marvin McKinney",
    company: "Tesla",
    phone: "(252) 555-0126",
    email: "marvin@tesla.com",
    country: "Iran",
    status: "Active",
    createdAt: "2024-03-28",
  },
  {
    name: "Jerome Bell",
    company: "Google",
    phone: "(629) 555-0129",
    email: "jerome@google.com",
    country: "Réunion",
    status: "Active",
    createdAt: "2024-02-14",
  },
  {
    name: "Kathryn Murphy",
    company: "Microsoft",
    phone: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    country: "Curaçao",
    status: "Active",
    createdAt: "2024-01-25",
  },
  {
    name: "Jacob Jones",
    company: "Yahoo",
    phone: "(208) 555-0112",
    email: "jacob@yahoo.com",
    country: "Brazil",
    status: "Active",
    createdAt: "2023-12-21",
  },
  {
    name: "Kristin Watson",
    company: "Facebook",
    phone: "(704) 555-0127",
    email: "kristin@facebook.com",
    country: "Åland Islands",
    status: "Inactive",
    createdAt: "2023-11-10",
  },
  {
    name: "Devon Lane",
    company: "Stripe",
    phone: "(222) 555-0166",
    email: "devon@stripe.com",
    country: "United States",
    status: "Active",
    createdAt: "2023-10-05",
  },
  {
    name: "Cody Fisher",
    company: "Amazon",
    phone: "(606) 555-0132",
    email: "cody@amazon.com",
    country: "Canada",
    status: "Inactive",
    createdAt: "2023-08-17",
  },
];
type SortKey = "Newest" | "Oldest" | "A-Z" | "Z-A";
export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortKey>("Newest");
    const theme = useTheme();
  

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setSortBy("Newest");
  };

  return (
    <Paper sx={{ width: { xs: "100%", md: "auto" } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            All Customers
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, fontWeight: 600, color :theme.palette.custom.slate }}
          >
            Active Members
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 260, bgcolor:theme.palette.custom.ocean, borderRadius: 2 }}
          />

          <Box>
            <IconButton
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: 2,
                bgcolor: theme.palette.custom.ocean,
                color: "text.primary",
                "&:hover": { bgcolor: theme.palette.custom.ocean },
              }}
            >
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                Sort by: <b>{sortBy}</b>
              </Typography>
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {[
                "Customer Name",
                "Company",
                "Phone Number",
                "Email",
                "Country",
                "Status",
              ].map((label) => (
                <TableCell
                  key={label}
                  align="left"
                  sx={{
                    position: "sticky",
                    top: 1,
                    color: theme.palette.custom.ocean,
                    bgcolor: "background.paper",
                    zIndex: 2,
                    fontWeight: 600,
                    minWidth: 150,
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.status}
                      variant="outlined"
                      color={row.status === "Active" ? "success" : "error"}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          row.status === "Active"
                            ?  theme.palette.success.main
                            :  theme.palette.error.main,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

import { Box } from "@mui/material";
import CustomersTable from "../Components/CustomerComponents/Customerstable";
import StatsCards from "../Components/CustomerComponents/Statscards";

export default function CustomerPage() {
  return (
    <Box
      sx={{
        ml: { xs: "73px", md: 0 },
        flex: 1,
        mt: 2,
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Box sx={{ mb: 3 }}>
          <StatsCards />
        </Box>
        <CustomersTable />
      </Box>
    </Box>
  );
}

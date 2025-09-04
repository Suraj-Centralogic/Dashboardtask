import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { MuiThemeProvider } from "./Components/SideBarComponents/Muithemeprovider";
import Sidebarmain from "./Components/SideBarComponents/Sidebarmain";
import CustomerPage from "./Pages/CustomerPage";

function App() {
  return (
    <MuiThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Sidebarmain />}>
            <Route index element={<HomePage />} />
            <Route path="customers" element={<CustomerPage />} />
          </Route>
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

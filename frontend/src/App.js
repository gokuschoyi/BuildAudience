import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themes/theme";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthHandler from "./pages/auth/AuthHandler";
import DashboardStats from "./pages/dashboard/dashboard-tabs/DashboardStats";
import QuickPost from "./pages/dashboard/dashboard-tabs/QuickPost";
import CustomPost from "./pages/dashboard/dashboard-tabs/CustomPost";
import BlogPost from "./pages/dashboard/dashboard-tabs/BlogPost";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="auth" element={<AuthHandler />} />
            <Route path="dashboard" element={<Dashboard color={theme.palette.background.default} />}>
              <Route path="dashboardTab" element={<DashboardStats tab="Dashboard" />} />
              <Route path="quickPost" element={<QuickPost tab="Quick Post" />} />
              <Route path="customPost" element={<CustomPost tab="Custom Post" />} />
              <Route path="blogPost" element={<BlogPost tab="Blog Post" />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

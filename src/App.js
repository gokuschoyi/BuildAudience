import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themes/theme";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthHandler from "./pages/auth/AuthHandler";
import QuickPost from "./pages/QuickPost";

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
              <Route path="dashboardTab" element={<QuickPost tab="dashboard" />} />
              <Route path="quickPost" element={<QuickPost tab="quickPost" />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

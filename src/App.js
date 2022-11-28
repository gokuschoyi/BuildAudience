import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themes/theme";
import { ProSidebarProvider } from 'react-pro-sidebar';
import Topbar from "./components/global/TopBar";
import SidebarC from "./components/global/SideBar";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ProSidebarProvider>
            <SidebarC isSidebar={isSidebar} />
          </ProSidebarProvider>
          <main className="content"
          style={{
            backgroundColor: theme.palette.background.default,
          }}
          >
            <Topbar setIsSidebar={setIsSidebar} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

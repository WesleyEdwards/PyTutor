import {
  CssBaseline,
  CssVarsProvider,
  CssVarsThemeOptions,
  Sheet,
  ThemeProvider,
} from "@mui/joy";
import PythonIO from "./PythonIO";
import { TopBar } from "./TopBar/TopBar";
import { ToastProvider } from "./contexts/Toaster";
import { PythonIOProvider } from "./contexts/PythonIOProvider";

const theme: CssVarsThemeOptions = {};

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <PythonIOProvider>
            <TopBar />
            <Sheet
              variant="outlined"
              sx={{
                mx: 2,
                mb: 2,
                borderRadius: 10,
              }}
            >
              <PythonIO />
            </Sheet>
          </PythonIOProvider>
        </ToastProvider>
      </ThemeProvider>
    </CssVarsProvider>
  );
}

export default App;

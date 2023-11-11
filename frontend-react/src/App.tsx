import {
  CssBaseline,
  CssVarsProvider,
  CssVarsThemeOptions,
  Sheet,
  ThemeProvider,
} from "@mui/joy";
import PythonIO from "./layout/PythonIO";
import { TopBar } from "./layout/TopBar";
import { ToastProvider } from "./Toaster";
import { PythonIOProvider } from "./pyIOContext/PythonIOProvider";

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

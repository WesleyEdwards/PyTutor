import {
  CssBaseline,
  CssVarsProvider,
  CssVarsThemeOptions,
  Sheet,
  ThemeProvider,
} from "@mui/joy";
import PythonIO from "./layout/PythonIO";
import { TopBar } from "./layout/TopBar";

const theme: CssVarsThemeOptions = {};

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TopBar />
        <Sheet
          variant="outlined"
          sx={{
            m: 2,
            borderRadius: 10,
          }}
        >
          <PythonIO />
        </Sheet>
      </ThemeProvider>
    </CssVarsProvider>
  );
}

export default App;

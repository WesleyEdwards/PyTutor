import {
  CssBaseline,
  CssVarsProvider,
  CssVarsThemeOptions,
  Sheet,
  ThemeProvider,
} from "@mui/joy";
import PythonIO from "./PythonIO";
import { TopBar } from "./TopBar";

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
            mx: 2,
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

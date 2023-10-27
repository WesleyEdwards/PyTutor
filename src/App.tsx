import { CssBaseline, CssVarsProvider, Sheet } from "@mui/joy";
import PythonIO from "./PythonIO";
import { TopBar } from "./TopBar";

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />

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
    </CssVarsProvider>
  );
}

export default App;

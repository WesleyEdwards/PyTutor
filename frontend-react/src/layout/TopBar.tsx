import { Button, Checkbox, Stack, Typography, useColorScheme } from "@mui/joy";
import { FC, useEffect } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";

export const TopBar: FC = () => {
  const { mode, setMode } = useColorScheme();
  const { aiapi, changeApi } = usePyIOContext();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setMode(prefersDarkMode === true ? "dark" : "light");
  }, []);

  return (
    <Stack
      direction="row"
      width="100%"
      padding={2}
      justifyContent="space-between"
    >
      <Typography level="h1">PyTutor</Typography>
      <Stack direction="row" gap="2rem" alignItems="center">
        {import.meta.env.MODE === "development" && (
          <Checkbox
            label="Mock Api"
            checked={aiapi.name === "mock"}
            onChange={(e) => changeApi(e.target.checked ? "mock" : "real")}
          />
        )}
        <Button
          variant="soft"
          onClick={() => {
            setMode(mode === "dark" ? "light" : "dark");
          }}
        >
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </Stack>
    </Stack>
  );
};

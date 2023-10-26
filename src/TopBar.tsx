import { Button, Stack, useColorScheme } from "@mui/joy";
import { FC, useEffect } from "react";

export const TopBar: FC = () => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setMode(prefersDarkMode === true ? "dark" : "light");
  }, []);

  return (
    <Stack direction="row" width="100%" padding="1rem">
      <Button
        variant="soft"
        onClick={() => {
          setMode(mode === "dark" ? "light" : "dark");
        }}
      >
        {mode === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
    </Stack>
  );
};

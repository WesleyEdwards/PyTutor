import { Button, Stack, Typography, useColorScheme } from "@mui/joy";
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
    <Stack
      direction="row"
      width="100%"
      padding={2}
      justifyContent="space-between"
    >
      <Typography level="h1">PyTutor</Typography>
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

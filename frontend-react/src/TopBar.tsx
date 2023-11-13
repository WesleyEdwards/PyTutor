import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { FC, useEffect } from "react";
import { usePyIOContext } from "./hooks/usePyIOContext";
import { Settings } from "@mui/icons-material";

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
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "plain", color: "neutral" } }}
            sx={{ borderRadius: 40 }}
          >
            <Settings />
          </MenuButton>
          <Menu sx={{ p: "1rem" }}>
            <Stack gap="1rem">
              {true && (
                <Checkbox
                  label="Mock Api"
                  checked={aiapi.name === "mock"}
                  onChange={(e) =>
                    changeApi(e.target.checked ? "mock" : "real")
                  }
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
          </Menu>
        </Dropdown>
      </Stack>
    </Stack>
  );
};

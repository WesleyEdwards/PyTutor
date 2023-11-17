import {
  Badge,
  Button,
  Checkbox,
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
import { GitHub, Settings } from "@mui/icons-material";
import { Instructions } from "./Instructions";

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
    <Stack direction="row" padding={2} justifyContent="space-between">
      <Typography level="h1">PyTutor</Typography>
      <Stack direction="row" gap="2rem" alignItems="center">
        <Instructions />

        <a href="https://github.com/WesleyEdwards/PyTutor">
          <IconButton variant="plain" disabled>
            <GitHub />
          </IconButton>
        </a>

        <Dropdown>
          <MenuButton slots={{ root: IconButton }} sx={{ borderRadius: 40 }}>
            {aiapi.name === "mock" ? (
              <Badge>
                <Settings />
              </Badge>
            ) : (
              <Settings />
            )}
          </MenuButton>
          <Menu sx={{ p: "1rem" }}>
            <Checkbox
              sx={{ mb: "1rem" }}
              label="Mock Api"
              checked={aiapi.name === "mock"}
              onChange={(e) => changeApi(e.target.checked ? "mock" : "real")}
            />
            <MenuItem
              slots={{ root: Button }}
              onClick={() => {
                setMode(mode === "dark" ? "light" : "dark");
              }}
            >
              {mode === "dark" ? "Light Mode" : "Dark Mode"}
            </MenuItem>
          </Menu>
        </Dropdown>
      </Stack>
    </Stack>
  );
};

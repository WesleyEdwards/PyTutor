import { IconButton, Stack, Typography } from "@mui/joy";
import { FC } from "react";
import { GitHub } from "@mui/icons-material";
import { Instructions } from "../Instructions";
import { SettingsDropdown } from "./SettingsDropdown";

export const TopBar: FC = () => {
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
        <SettingsDropdown />
      </Stack>
    </Stack>
  );
};

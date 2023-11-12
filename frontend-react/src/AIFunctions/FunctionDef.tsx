import {
  Card,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import CopyAll from "@mui/icons-material/CopyAll";
import { FC } from "react";
import { useToast } from "../contexts/Toaster";
import { GptFunction } from "../types";
import {
  Check,
  DeleteForever,
  Edit,
  MoreVert,
  Restore,
} from "@mui/icons-material";

export const FunctionDef: FC<{
  gptFun: GptFunction;
  setEditing: () => void;
  setDeleting: () => void;
}> = ({ gptFun, setEditing, setDeleting }) => {
  const showToast = useToast();
  return (
    <Card sx={{ p: 1 }} variant="soft">
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row" alignItems="center" gap="1rem">
          <IconButton
            onClick={() => {
              const defCopy = gptFun.def.split("(")[0].replace("def ", "");
              showToast({
                message: `Copied '${defCopy}' to clipboard`,
                color: "success",
              });
              navigator.clipboard.writeText(defCopy);
            }}
            sx={{ alignSelf: "flex-start", p: "3px" }}
          >
            <CopyAll />
          </IconButton>
          <Typography>{gptFun.def}</Typography>
        </Stack>
        <Stack direction="row" gap="1rem" alignItems="center">
          {gptFun.implemented && (
            <Tooltip title="Implemented">
              <Check color="success" />
            </Tooltip>
          )}
          <IconButton onClick={setEditing} variant="solid">
            <Edit />
          </IconButton>
          <Dropdown>
            <MenuButton slots={{ root: IconButton }} variant="solid">
              <MoreVert />
            </MenuButton>
            <Menu placement="bottom-end">
              <MenuItem>
                <ListItemDecorator>
                  <Restore />
                </ListItemDecorator>
                Restore
              </MenuItem>
              <ListDivider />
              <MenuItem onClick={setDeleting} variant="soft" color="danger">
                <ListItemDecorator sx={{ color: "inherit" }}>
                  <DeleteForever />
                </ListItemDecorator>{" "}
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </Card>
  );
};

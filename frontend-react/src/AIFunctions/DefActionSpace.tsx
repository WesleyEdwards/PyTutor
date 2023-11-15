import {
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
} from "@mui/joy";
import CopyAll from "@mui/icons-material/CopyAll";
import { FC } from "react";
import { useToast } from "../contexts/Toaster";
import { DeleteForever, Edit, MoreVert } from "@mui/icons-material";
import { ModalType } from "./GptFunctions";
import { extractFunctionName } from "../utils";
import { GptFunction } from "../types";

export const DefActionSpace: FC<{
  setActionFun: (action: ModalType) => void;
  fun: GptFunction;
}> = ({ setActionFun, fun }) => {
  const showToast = useToast();

  const funName = extractFunctionName(fun.def) ?? "";

  return (
    <>
      <IconButton
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(funName);
          showToast({
            message: `Copied '${funName}' to clipboard`,
            color: "success",
          });
        }}
      >
        <CopyAll />
      </IconButton>
      <Tooltip title="Test" size="sm" variant="soft">
        <IconButton
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setActionFun("implement");
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Dropdown>
        <MenuButton
          onClick={(e) => e.stopPropagation()}
          size="sm"
          slots={{ root: IconButton }}
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end">
          <ListDivider />
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setActionFun("delete");
            }}
            variant="soft"
            color="danger"
          >
            <ListItemDecorator sx={{ color: "inherit" }}>
              <DeleteForever />
            </ListItemDecorator>{" "}
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};

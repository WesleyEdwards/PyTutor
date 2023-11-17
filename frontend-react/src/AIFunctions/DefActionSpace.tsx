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
import { FC } from "react";
import { Delete, Edit, FactCheck, MoreVert } from "@mui/icons-material";
import { ModalType } from "./GptFunctions";

export const DefActionSpace: FC<{
  setActionFun: (action: ModalType) => void;
  hovering: boolean;
}> = ({ setActionFun, hovering }) => {
  return (
    <>
      <Tooltip title="Test" size="sm" variant="soft">
        <IconButton
          sx={{ visibility: hovering ? "visible" : "hidden" }}
          onClick={(e) => {
            e.stopPropagation();
            setActionFun("test");
          }}
        >
          <FactCheck />
        </IconButton>
      </Tooltip>
      <Dropdown>
        <MenuButton
          sx={{ visibility: hovering ? "visible" : "hidden" }}
          onClick={(e) => e.stopPropagation()}
          size="sm"
          slots={{ root: IconButton }}
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end">
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setActionFun("rename");
            }}
            variant="soft"
          >
            <ListItemDecorator sx={{ color: "inherit" }}>
              <Edit />
            </ListItemDecorator>{" "}
            Rename
          </MenuItem>
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
              <Delete />
            </ListItemDecorator>{" "}
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};

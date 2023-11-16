import { IconButton, Tooltip } from "@mui/joy";
import { FC } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { ModalType } from "./GptFunctions";

export const DefActionSpace: FC<{
  setActionFun: (action: ModalType) => void;
  hovering: boolean;
}> = ({ setActionFun, hovering }) => {
  return (
    <>
      <Tooltip title="Test" size="sm" variant="soft">
        <IconButton
          size="sm"
          sx={{ visibility: hovering ? "visible" : "hidden" }}
          onClick={(e) => {
            e.stopPropagation();
            setActionFun("implement");
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Test" size="sm" variant="soft">
        <IconButton
          size="sm"
          sx={{ visibility: hovering ? "visible" : "hidden" }}
          onClick={(e) => {
            e.stopPropagation();
            setActionFun("delete");
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      {/* <Dropdown>
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
      </Dropdown> */}
    </>
  );
};

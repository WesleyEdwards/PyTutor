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
import {
  DeleteForever,
  Edit,
  MoreVert,
  Restore,
  PublishedWithChanges,
} from "@mui/icons-material";
import { ModalType } from "./GptFunctions";
import { extractFunctionName } from "../utils";
import { GptFunction } from "../types";
import { usePyIOContext } from "../hooks/usePyIOContext";

export const DefActionSpace: FC<{
  setActionFun: (action: ModalType) => void;
  fun: GptFunction;
  noHovering: () => void;
}> = ({ setActionFun, fun, noHovering }) => {
  const showToast = useToast();
  const { updateFuns } = usePyIOContext();

  const funName = extractFunctionName(fun.def) ?? "";

  const changeImplementation = (implement: boolean) => {
    showToast({
      message: implement
        ? "Function implemented!"
        : `AI functionality restored for ${funName}!`,
      color: "success",
    });
    updateFuns("modify", { id: fun._id, mod: { implemented: implement } });
    noHovering();
  };

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
          {fun.implemented ? (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                changeImplementation(false);
              }}
            >
              <ListItemDecorator>
                <Restore />
              </ListItemDecorator>
              Un-Implement
            </MenuItem>
          ) : (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                changeImplementation(true);
              }}
            >
              <ListItemDecorator>
                <PublishedWithChanges />
              </ListItemDecorator>
              Implement
            </MenuItem>
          )}

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

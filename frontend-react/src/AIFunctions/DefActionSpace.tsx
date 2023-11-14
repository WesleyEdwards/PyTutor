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
  Check,
  Code,
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
  const { gptFunctions, modifyFunction } = usePyIOContext();

  const clickIcon = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    modal: ModalType
  ) => {
    e.stopPropagation();
    setActionFun(modal);
  };

  return (
    <>
      <IconButton
        size="sm"
        onClick={(e) => {
          const funName = extractFunctionName(fun.def) ?? "";
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
        <IconButton size="sm" onClick={(e) => clickIcon(e, "implement")}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Dropdown>
        <MenuButton
          onClick={(e) => e.stopPropagation()}
          slots={{ root: IconButton }}
          variant="solid"
          size="sm"
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end">
          {fun.implemented ? (
            <MenuItem onClick={(e) => clickIcon(e, "restore")}>
              <ListItemDecorator>
                <Restore />
              </ListItemDecorator>
              Restore
            </MenuItem>
          ) : (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                showToast({
                  message: fun.implemented
                    ? "Your implementation has been updated!"
                    : "Function implemented!",
                  color: "success",
                });
                modifyFunction(fun?._id ?? "", { implemented: true });
                noHovering();
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
            onClick={(e) => clickIcon(e, "delete")}
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

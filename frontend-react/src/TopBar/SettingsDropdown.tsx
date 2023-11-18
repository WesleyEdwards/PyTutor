import {
  Alert,
  Badge,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { FC, useEffect, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { Settings } from "@mui/icons-material";
import {
  assignmentList,
  changeAssignment,
  currentAssignment,
} from "../assignmentInfo";

export const SettingsDropdown: FC = () => {
  const { aiapi, changeApi } = usePyIOContext();
  const { mode, setMode } = useColorScheme();

  const [modal, setModal] = useState(false);

  const [assignmentKey, setAssignmentKey] = useState<string>(
    currentAssignment.key
  );

  const closeModal = () => {
    setModal(false);
    setAssignmentKey(currentAssignment.key);
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setMode(prefersDarkMode === true ? "dark" : "light");
  }, []);

  return (
    <>
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
            sx={{ mb: "1rem" }}
            onClick={() => {
              setMode(mode === "dark" ? "light" : "dark");
            }}
          >
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </MenuItem>
          <MenuItem onClick={() => setModal(true)}>Change Assignment</MenuItem>
        </Menu>
      </Dropdown>

      <Modal
        open={modal}
        onClose={() => {
          setAssignmentKey(currentAssignment.key);
          setModal(false);
        }}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <ModalClose onClick={closeModal} />
          <DialogTitle sx={{ marginRight: "3rem" }}>Assignments</DialogTitle>
          <DialogContent sx={{ gap: "1rem", mt: "1rem" }}>
            <Typography>Choose a different assignment</Typography>
            <Select
              defaultValue={assignmentKey}
              onChange={(_, value) => value && setAssignmentKey(value)}
            >
              {assignmentList.map(({ key, name }) => (
                <Option key={key} value={key}>
                  {name}
                </Option>
              ))}
            </Select>
            <Alert
              color="warning"
              sx={{
                visibility:
                  assignmentKey === currentAssignment.key
                    ? "hidden"
                    : "visible",
              }}
            >
              By changing the assignment, you will lose all your current
              progress
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              disabled={assignmentKey === currentAssignment.key}
              onClick={() => {
                setModal(false);
                changeAssignment(assignmentKey);
              }}
            >
              Change
            </Button>
            <Button variant="plain" color="neutral" onClick={closeModal}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

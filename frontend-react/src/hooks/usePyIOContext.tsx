import { useContext } from "react";
import { PyIOContext } from "../contexts/PythonIOProvider";

export const usePyIOContext = () => {
  return useContext(PyIOContext);
};

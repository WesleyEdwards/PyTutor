import { useContext } from "react";
import { PyIOContext } from "./PythonIOProvider";

export const usePyIOContext = () => {
  return useContext(PyIOContext);
};

import { useContext } from "react";
import { PyIOContext } from "../pyIOContext/PythonIOProvider";

export const usePyIOContext = () => {
  return useContext(PyIOContext);
};

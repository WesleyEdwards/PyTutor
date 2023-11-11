import Snackbar from "@mui/joy/Snackbar";
import { createContext, useContext, useState } from "react";

type ToastProps = {
  message: string;
  color?: "success" | "warning";
};

const ToastContext = createContext({
  showToast: {} as (params: ToastProps) => void,
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastInfo, setToastInfo] = useState<{
    message: string;
    color?: "success" | "warning";
    startDecorator?: React.ReactNode;
  }>();

  return (
    <ToastContext.Provider
      value={{
        showToast: (params: ToastProps) => {
          setToastInfo(params);
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!toastInfo}
        startDecorator={toastInfo?.startDecorator}
        onClose={(_, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setToastInfo(undefined);
        }}
        key="bottomcenter"
        color={toastInfo?.color ?? "neutral"}
        autoHideDuration={3000}
      >
        {toastInfo?.message}
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return showToast;
};

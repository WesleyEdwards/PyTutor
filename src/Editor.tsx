import { FC, useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useColorScheme } from "@mui/joy";
// import styles from "./Editor.module.css";

export const Editor: FC<{
  code: string;
  changeCode: (newCode: string) => void;
}> = ({ code, changeCode }) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const monacoEl = useRef(null);

  const { mode } = useColorScheme();

  useEffect(() => {
    console.log("asdf");
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        const edit = monaco.editor.create(monacoEl.current!, {
          dimension: {
            height: 500,
            width: 500,
          },
          autoDetectHighContrast: true,
          value: code,
          language: "python",
          theme: mode === "light" ? "vs-light" : "vs-dark",
        });

        edit.onDidChangeModelContent(() => {
          changeCode(edit.getValue());
        });
        return edit;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  // useEffect(() => {
  //   setEditor((prev) => {
  //     if (!prev) return prev;
  //     return monaco.editor.create(monacoEl.current!, {
  //       dimension: {
  //         height: 500,
  //         width: 500,
  //       },
  //       autoDetectHighContrast: true,
  //       value: code,
  //       language: "python",
  //       theme: mode === "light" ? "vs-light" : "vs-dark",
  //     });
  //   });
  // }, [mode]);

  return (
    <div>
      <div ref={monacoEl}></div>
    </div>
  );
};

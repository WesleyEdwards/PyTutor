import { FC, useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useColorScheme } from "@mui/joy";
import { usePyIOContext } from "./PyIOContext";

export const TextEditor: FC<{ isLoaded: () => void }> = ({
  isLoaded,
}) => {
  const { code, setCode, resetEditorTrigger } = usePyIOContext();

  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const monacoEl = useRef(null);

  const { mode } = useColorScheme();

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        const edit = monaco.editor.create(monacoEl.current!, {
          dimension: {
            height: 400,
            width: 700,
          },
          autoDetectHighContrast: true,
          value: code,
          language: "python",
          theme: mode === "light" ? "vs-light" : "vs-dark",
        });

        edit.onDidChangeModelContent(() => {
          setCode(edit.getValue());
        });
        isLoaded();
        return edit;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  useEffect(() => {
    editor?.setValue(code);
  }, [resetEditorTrigger]);

  useEffect(() => {
    monaco.editor.setTheme(mode === "light" ? "vs-light" : "vs-dark");
  }, [mode]);

  return <div ref={monacoEl}></div>;
};

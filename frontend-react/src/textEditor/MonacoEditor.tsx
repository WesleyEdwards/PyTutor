import { FC, useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useColorScheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

export const MonacoEditor: FC<{
  code: string;
  setCode: (code: string) => void;
}> = ({ code, setCode }) => {
  const smallScreen = useMediaQuery("(max-width: 1400px)");

  const widthHeight = smallScreen
    ? { width: 600, height: 500 }
    : { width: 1000, height: 400 };

  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const monacoEl = useRef(null);

  const { mode } = useColorScheme();

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        const edit = monaco.editor.create(monacoEl.current!, {
          dimension: widthHeight,
          autoDetectHighContrast: true,
          value: code,
          language: "python",
          theme: mode === "light" ? "vs-light" : "vs-dark",
        });

        edit.onDidChangeModelContent(() => {
          setCode(edit.getValue());
        });
        return edit;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  useEffect(() => {
    editor?.layout(widthHeight);
  }, [smallScreen]);

  useEffect(() => {
    monaco.editor.setTheme(mode === "light" ? "vs-light" : "vs-dark");
  }, [mode]);

  return <div ref={monacoEl}></div>;
};

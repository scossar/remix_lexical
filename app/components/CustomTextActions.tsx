import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";

type SupportedTextFormatType = Exclude<
  TextFormatType,
  "underline" | "strikethrough" | "highlight" | "subscript" | "superscript"
>;

export const CustomTextActions = () => {
  const [editor] = useLexicalComposerContext();
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [codeActive, setCodeActive] = useState(false);

  function handleBoldClick(formatType: SupportedTextFormatType) {
    console.log(`editor: ${JSON.stringify(editor, null, 2)}`);
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    setBoldActive(!boldActive);
  }
  function handleItalicClick(formatType: SupportedTextFormatType) {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    setItalicActive(!italicActive);
  }
  function handleCodeClick(formatType: SupportedTextFormatType) {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    setCodeActive(!codeActive);
  }

  return (
    <div className="mt-3">
      <span className="font-bold">Text actions</span>
      <div>
        <button
          className={`px-2 py-1 mr-1 border rounded-sm border-slate-500 ${
            boldActive ? "bg-blue-500 text-white" : "bg-white text-slate-500"
          }`}
          onClick={() => handleBoldClick("bold")}
        >
          Bold
        </button>
        <button
          className={`px-2 py-1 mr-1 border rounded-sm border-slate-500 ${
            italicActive ? "bg-blue-500 text-white" : "bg-white text-slate-500"
          }`}
          onClick={() => handleItalicClick("italic")}
        >
          Italic
        </button>
        <button
          className={`px-2 py-1 mr-1 border rounded-sm border-slate-500 ${
            codeActive ? "bg-blue-500 text-white" : "bg-white text-slate-500"
          }`}
          onClick={() => handleCodeClick("code")}
        >
          Code
        </button>
      </div>
    </div>
  );
};

import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";

export const CustomTextActions = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
    code: false,
    highlight: false,
    strikethrough: false,
  });

  const handleOnClick = (formatType: TextFormatType) => {
    const isActive = !activeFormats[formatType];
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    setActiveFormats((prev) => ({ ...prev, [formatType]: isActive }));
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <span style={{ fontWeight: "bold" }}>Text actions</span>
      <div>
        {["Bold", "Italic", "Code", "Highlight", "Strikethrough"].map(
          (formatType, index) => {
            return (
              <button
                className={`px-2 py-1 mr-1 border rounded-sm border-slate-500 ${
                  activeFormats[formatType.toLowerCase()]
                    ? "bg-blue-500 text-white"
                    : "bg-white text-slate-500"
                }`}
                key={index}
                onClick={() =>
                  handleOnClick(formatType.toLowerCase() as TextFormatType)
                }
              >
                {formatType}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";

export const CustomTextActions = () => {
  const [editor] = useLexicalComposerContext();

  const handleOnClick = (formatType: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <span style={{ fontWeight: "bold" }}>Text actions</span>
      <div>
        {[
          "Bold",
          "Italic",
          "Underline",
          "Code",
          "Highlight",
          "Strikethrough",
          "Subscript",
          "Superscript",
        ].map((value, index) => {
          return (
            <button
              className="px-2 py-1 mr-1 border rounded-sm border-slate-499"
              key={index}
              onClick={() =>
                handleOnClick(value.toLowerCase() as TextFormatType)
              }
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

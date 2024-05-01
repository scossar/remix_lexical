import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function CustomFocusEditor() {
  const [editor] = useLexicalComposerContext();
  const [editorFocus, setEditorFocus] = useState(false);
  function handleFocusClick() {
    editor.focus();
    setEditorFocus(true);
  }

  // in the production app, this will be handled by the "Reply" button

  return (
    <div className="my-3">
      <button
        className={`px-2 py-1 mr-1 border rounded-sm border-slate-500 ${
          editorFocus ? "bg-blue-500 text-white" : "bg-white text-slate-500"
        }`}
        onClick={handleFocusClick}
      >
        Focus
      </button>
    </div>
  );
}

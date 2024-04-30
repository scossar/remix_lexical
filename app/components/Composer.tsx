import { useEffect, useMemo } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { CustomTextActions } from "~/components/CustomTextActions";
import { CustomSubmitAction } from "~/components/CustomSubmitAction";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import "~/editor.css";

export default function Composer() {
  const editableContent = useMemo(() => {
    return (
      <ContentEditable className="max-w-full p-2 border rounded-sm min-h-16 border-slate-400" />
    );
  }, []);

  function Placeholder(isEditable: boolean) {
    const [editor] = useLexicalComposerContext();
    return (
      <button
        onClick={() => {
          if (isEditable) {
            editor.focus();
          }
        }}
        className="block p-2 -mt-16 text-slate-500"
      >
        Enter some text...
      </button>
    );
  }

  const lexicalConfig: InitialConfigType = {
    namespace: "Lexical Test",
    theme: {
      text: {
        bold: "text-bold",
        italic: "text-italic",
        underline: "text-underline",
        code: "text-code",
        highlight: "text-highlight",
        strikethrough: "text-strikethrough",
        subscript: "text-subscript",
        superscript: "text-superscript",
      },
    },
    onError: (e) => {
      console.log("ERROR:", e);
    },
  };
  return (
    <>
      <LexicalComposer initialConfig={lexicalConfig}>
        <RichTextPlugin
          contentEditable={editableContent}
          placeholder={Placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <div className="mt-16">
          <CustomTextActions />
          <CustomSubmitAction />
        </div>
      </LexicalComposer>
    </>
  );
}

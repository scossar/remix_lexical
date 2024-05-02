import { useMemo } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import CustomFocusEditor from "./CustomFocusEditor";
import { CustomTextActions } from "~/components/CustomTextActions";
import { CustomSubmitAction } from "~/components/CustomSubmitAction";
import CustomHeadingActions from "./CustomHeadingActions";
import { HeadingNode } from "@lexical/rich-text";
import "~/editor.css";

export default function Composer() {
  const editableContent = useMemo(() => {
    return (
      <ContentEditable className="max-w-full p-2 border rounded-sm min-h-16 border-slate-400" />
    );
  }, []);

  const lexicalConfig: InitialConfigType = {
    namespace: "Lexical Test",
    nodes: [HeadingNode],
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
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <HistoryPlugin />
        <div className="mt-6">
          <CustomFocusEditor />
          <CustomTextActions />
          <CustomHeadingActions />
          <CustomSubmitAction />
        </div>
      </LexicalComposer>
    </>
  );
}

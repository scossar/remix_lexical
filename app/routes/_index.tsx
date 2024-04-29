import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
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
import "~/editor.css";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const markdown = body?.get("markdown");
  const html = body?.get("html");
  console.log(`markdown: ${markdown}`);
  console.log(`html: ${html}`);
  return null;
}

export default function Index() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CustomContent = useMemo(() => {
    return (
      <ContentEditable
        style={{
          position: "relative",
          borderColor: "rgba(255,211,2,0.68)",
          border: "2px solid red",
          borderRadius: "5px",
          maxWidth: "100%",
          padding: "10px",
        }}
      />
    );
  }, []);

  const CustomPlaceholder = useMemo(() => {
    return (
      <div
        style={{
          position: "absolute",
          top: 30,
        }}
      >
        Enter some text...
      </div>
    );
  }, []);

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

  if (!isClient) {
    return (
      <div>
        <textarea />
      </div>
    );
  }

  return (
    <div className="py-5 mx-auto max-w-screen-sm">
      <LexicalComposer initialConfig={lexicalConfig}>
        <RichTextPlugin
          contentEditable={CustomContent}
          placeholder={CustomPlaceholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <div style={{ margin: "20px 0px" }}>
          <CustomTextActions />
          <CustomSubmitAction />
        </div>
      </LexicalComposer>
    </div>
  );
}

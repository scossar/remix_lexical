import { useFetcher } from "@remix-run/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";

export const CustomSubmitAction = () => {
  const fetcher = useFetcher();
  const [editor] = useLexicalComposerContext();

  function handleHtmlSubmit() {
    const editorState = editor.getEditorState();
    editorState.read(() => {
      try {
        const html = $generateHtmlFromNodes(editor);
        const formData = new FormData();
        formData.append("html", html);
        fetcher.submit(formData, { method: "POST" });
      } catch (error) {
        console.error("Error converting editor content to Markdown", error);
      }
    });
  }

  function handleMarkdownSubmit() {
    const editorState = editor.getEditorState();
    editorState.read(() => {
      try {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        const formData = new FormData();
        formData.append("markdown", markdown);
        fetcher.submit(formData, { method: "POST" });
      } catch (error) {
        console.error("Error converting editor content to Markdown", error);
      }
    });
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <button
        onClick={handleHtmlSubmit}
        className="px-2 py-1 mr-1 border rounded-sm border-slate-499"
      >
        Submit as HTML
      </button>

      <button
        onClick={handleMarkdownSubmit}
        className="px-2 py-1 mr-1 border rounded-sm border-slate-499"
      >
        Submit as Markdown
      </button>
    </div>
  );
};

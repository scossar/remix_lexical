import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text";

type AvailableHeadingType = Exclude<HeadingTagType, "h4" | "h5" | "h6">;
type ActiveHeading = AvailableHeadingType | null;

export default function CustomHeadingActions() {
  const [editor] = useLexicalComposerContext();
  const [activeHeading, setActiveHeading] = useState<ActiveHeading>(null);

  useEffect(() => {
    if (activeHeading !== null) {
      const removeUpdateListener = editor.registerUpdateListener(
        ({ editorState }) => {
          editorState.read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const anchorNode = selection.anchor.getNode();
              if (anchorNode.getType() === "paragraph") {
                setActiveHeading(null);
              }
            }
          });
        }
      );

      return () => {
        removeUpdateListener();
      };
    }
  }, [editor, activeHeading]);

  function handleOnClick(tag: AvailableHeadingType) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (activeHeading === tag) {
          $setBlocksType(selection, () => $createParagraphNode());
          setActiveHeading(null);
        } else {
          $setBlocksType(selection, () => $createHeadingNode(tag));
          setActiveHeading(tag);
        }
      }
    });
  }

  return (
    <div className="mt-3">
      <span className="font-bold">Headings</span>
      <div>
        {(["h1", "h2", "h3"] as Array<AvailableHeadingType>).map((tag) => {
          return (
            <button
              className={`px-2 py-1 mr-1 border rounded-sm border-slate-500 ${
                activeHeading === tag
                  ? "bg-blue-400 text-white"
                  : "bg-white text-slate-500"
              }`}
              key={tag}
              onClick={() => handleOnClick(tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

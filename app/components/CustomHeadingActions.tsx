import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text";

type AvailableHeadingTypes = "h1" | "h2" | "h3";
type ActiveHeading = AvailableHeadingTypes | null;

export default function CustomHeadingActions() {
  const [editor] = useLexicalComposerContext();
  const [activeHeading, setActiveHeading] = useState<ActiveHeading>(null);

  function handleOnClick(tag: AvailableHeadingTypes) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
        console.log(tag);
        setActiveHeading(tag);
      }
    });
  }

  return (
    <div className="mt-3">
      <span className="font-bold">Headings</span>
      <div>
        {(["h1", "h2", "h3"] as Array<AvailableHeadingTypes>).map((tag) => {
          console.log(tag);
          console.log(activeHeading);
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

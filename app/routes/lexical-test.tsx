import Composer from "~/components/Composer";
import { ClientOnly } from "~/components/ClientOnly";

export default function LexicalTest() {
  return (
    <div className="py-5 pt-8 mx-auto max-w-screen-sm">
      <h1 className="py-3 text-3xl">Lexical Test</h1>
      <ClientOnly
        fallback={
          <div className="max-w-full p-2 border rounded-sm min-h-16 border-slate-400">
            Enter some text...
          </div>
        }
      >
        {() => <Composer />}
      </ClientOnly>
    </div>
  );
}

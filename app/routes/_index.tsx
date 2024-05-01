import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="py-5 mx-auto max-w-screen-sm">
      <h1>Index</h1>
    </div>
  );
}

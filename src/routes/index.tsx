import { CreatePage } from "~/components/CreatePage";

export default function Home() {
  return (
    <main class="h-screen text-center font-sans bg-neutral-900 text-neutral-200 flex flex-col items-center">
      <h1 class="text-4xl pt-6 font-black">
        Full Stack <span class="text-#86BDE6">Solid</span> Components
      </h1>

      <div class="pt-10" />
      <CreatePage />
    </main>
  );
}

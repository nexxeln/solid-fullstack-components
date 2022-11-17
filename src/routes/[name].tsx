import { Match } from "solid-js";
import { type RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { prisma } from "~/server/db";

export const routeData = ({ params }: RouteDataArgs) => {
  return {
    page: createServerData$(
      async (name) => {
        const data = await prisma.page.findUnique({
          where: { name },
        });

        return data;
      },
      { key: () => params.name }
    ),
  };
};

export default function Page() {
  const { page } = useRouteData<typeof routeData>();

  return (
    <main class="h-screen text-center font-sans bg-neutral-900 text-neutral-200 flex flex-col items-center justify-center">
      <h1 class="text-4xl">
        hi <span class="text-#86BDE6">{page()?.name}</span>
      </h1>
    </main>
  );
}

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
        console.log("data is", data);
        return data;
      },
      { key: () => params.name }
    ),
  };
};

export default function Page() {
  const { page } = useRouteData<typeof routeData>();

  return (
    <>
      <Match when={!page()}>
        <h1>Not Found</h1>
      </Match>
      <Match when={page()}>
        <h1>{page()?.name}</h1>
      </Match>
    </>
  );
}
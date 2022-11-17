import { createServerAction$, redirect } from "solid-start/server";
import { prisma } from "~/server/db";

export const CreatePage = () => {
  const [create, { Form }] = createServerAction$(async (form: FormData) => {
    // probably should validate this
    const name = form.get("name") as string;

    await prisma.page.create({ data: { name } });

    return redirect(`/${name}`);
  });

  return (
    <Form class="flex flex-col gap-2">
      <input
        type="text"
        name="name"
        id="name"
        class="bg-neutral-800 px-4 py-2 border border-zinc-700 rounded focus:(outline-none ring ring-zinc-600)"
      />
      <button
        type="submit"
        disabled={create.pending}
        class="font-semibold text-xl disabled:text-neutral-400"
      >
        {create.pending ? "Creating..." : "Create"}
      </button>
    </Form>
  );
};

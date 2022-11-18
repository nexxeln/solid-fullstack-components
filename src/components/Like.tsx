import { type Component, createSignal } from "solid-js";
import server$ from "solid-start/server";
import { prisma } from "~/server/db";

export const Like: Component<{
  id: string;
  likes: number;
  onSuccess: () => void;
}> = (props) => {
  const like = server$(async (id: string) => {
    await prisma.page.update({
      where: { id },
      data: {
        likes: { increment: 1 },
      },
    });
  });

  const dislike = server$(async (id: string) => {
    await prisma.page.update({
      where: { id },
      data: {
        likes: { decrement: 1 },
      },
    });
  });

  const [liked, setLiked] = createSignal(false);

  return (
    <>
      <button
        onClick={() => {
          if (liked()) {
            dislike(props.id);
          } else {
            like(props.id);
          }
          props.onSuccess();
          setLiked(!liked());
        }}
        class={`${
          liked() ? "text-red-400" : "text-neutral-400"
        } hover:text-red-400`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      <span>{props.likes}</span>
    </>
  );
};

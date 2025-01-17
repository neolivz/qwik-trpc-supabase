import { component$ } from "@builder.io/qwik";
import type { Comment } from "@prisma/client";
import { CommentsListItem } from "./CommentsListItem/CommentsListItem";

type Props = {
  comments: Comment[];
  count: number;
};

export const CommentsList = component$((props: Props) => {
  return (
    <div>
      {props.comments.map((comment) => (
        <CommentsListItem comment={comment} />
      ))}
    </div>
  );
});

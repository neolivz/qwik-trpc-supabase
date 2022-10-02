import { component$ } from "@builder.io/qwik";
import { Post } from "@prisma/client";
import { PostListItem } from "./PostListItem/PostListItem";

export type Props = {
  posts: Post[];
};

export const PostsList = component$((props: Props) => {
  return (
    <div class="flex flex-col gap-4">
      {props.posts.map((post) => (
        <PostListItem post={post} />
      ))}
    </div>
  );
});
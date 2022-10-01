import { component$ } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { z } from "zod";
import { RegisterForm } from "~/modules/RegisterForm/RegisterForm";
import { paths } from "~/utils/paths";

export const onPost: RequestHandler = async (ev) => {
  const { supabase, updateAuthCookies } = await import("~/server/supabase");

  const json = await ev.request.json();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const args = formSchema.parse(json);

  const result = await supabase.auth.signIn(args);

  console.log({ result });

  if (result.error || !result.session) {
    throw new Error(result.error?.message || "INVALID_INPUT");
  }

  updateAuthCookies(result.session, ev.response);

  return null;
};

export const onGet: RequestHandler = async (ev) => {
  const { getUserByCookie } = await import("~/server/supabase");

  const user = await getUserByCookie(ev.request);

  if (user) {
    throw ev.response.redirect(paths.board);
  }

  return;
};

export default component$(() => {
  useEndpoint();

  return (
    <div>
      <h1>
        Welcome to Qwik <span class="lightning">⚡️</span>
      </h1>

      <RegisterForm />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign Up - Welcome to Qwik",
};
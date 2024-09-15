import { Form } from "@remix-run/react";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { auth } from "~/auth.server";

export default function Login() {
  return (
    <Form action="/auth/discord" method="post">
      <button>Login with Discord</button>
    </Form>
  );
}

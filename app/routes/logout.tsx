import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { auth } from "~/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return await auth.logout(request, { redirectTo: "/" });
};

export let loader: LoaderFunction = async ({ request }) => {
  console.log("Logging out");
  return await auth.logout(request, { redirectTo: "/" });
};

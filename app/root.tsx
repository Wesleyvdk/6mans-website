import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
  Form,
} from "@remix-run/react";
import { auth } from "~/auth.server";
import "./tailwind.css";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Trophy, User, Moon, Sun } from "lucide-react";
import { Home as LucideHome } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const meta: MetaFunction = () => {
  return [
    { title: "6mans" },
    { name: "description", content: "Welcome to Alyan Studio's Sixmans!" },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request, {});
};

export function Layout({ children }: { children: React.ReactNode }) {
  const user = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

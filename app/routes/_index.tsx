import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  ArrowRight,
  Users,
  Trophy,
  BarChart,
  Menu,
  X,
  User,
} from "lucide-react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { auth } from "~/auth.server";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request, {});
};

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      {/* Navigation */}
      <nav className="bg-blue-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold">
              RL 6mans & Scrims
            </a>
            <div className="hidden md:flex space-x-4">
              <a href="/" className="hover:text-orange-500">
                Home
              </a>
              <a href="/leaderboard" className="hover:text-orange-500">
                Leaderboard
              </a>
              <a href="/queue" className="hover:text-orange-500">
                Queue
              </a>
              <a href="/scrims" className="hover:text-orange-500">
                Scrims
              </a>
              <a href="/leagues" className="hover:text-orange-500">
                Leagues
              </a>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                        />
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Form action="/logout" method="post">
                        <button>Logout</button>
                      </Form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Form action="/auth/discord" method="post">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Sign In
                  </Button>
                </Form>
              )}
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="container mx-auto px-4 py-2">
            <a href="/" className="block py-2 hover:text-orange-500">
              Home
            </a>
            <a href="/leaderboard" className="block py-2 hover:text-orange-500">
              Leaderboard
            </a>
            <a href="/queue" className="block py-2 hover:text-orange-500">
              Queue
            </a>
            <a href="/scrims" className="block py-2 hover:text-orange-500">
              Scrims
            </a>
            <a href="/leagues" className="block py-2 hover:text-orange-500">
              Leagues
            </a>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                      />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Form action="/logout" method="post">
                      <button>Logout</button>
                    </Form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Form action="/auth/discord" method="post">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Sign In
                </Button>
              </Form>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Rocket League 6mans & Scrims
        </h1>
        <p className="text-xl mb-8">
          Queue up, find matches, and improve your game across Discord servers!
        </p>
        {user ? (
          <p></p>
        ) : (
          <Form action="/auth/discord" method="post">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Sign in with Discord <ArrowRight className="ml-2" />
            </Button>
          </Form>
        )}
      </header>

      {/* How It Works */}
      <section className="bg-blue-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-blue-700">
              <h3 className="text-xl font-semibold mb-4">
                1. Connect Your Account
              </h3>
              <p>
                Link your Discord and Rocket League accounts to get started.
              </p>
            </Card>
            <Card className="p-6 bg-blue-700">
              <h3 className="text-xl font-semibold mb-4">2. Join a Queue</h3>
              <p>Choose from various 6mans queues or find a scrim match.</p>
            </Card>
            <Card className="p-6 bg-blue-700">
              <h3 className="text-xl font-semibold mb-4">
                3. Play and Improve
              </h3>
              <p>Compete in matches, track your stats, and climb the ranks!</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Users size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Cross-Server Queuing
              </h3>
              <p className="text-center">
                Queue up with players from different Discord servers.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Trophy size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Rank-Based Matchmaking
              </h3>
              <p className="text-center">
                Get matched with players of similar skill levels.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BarChart size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Stats</h3>
              <p className="text-center">
                Track your performance and progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Players Are Saying
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-blue-700">
              <p className="mb-4">
                "This platform has revolutionized how I practice and improve in
                Rocket League!"
              </p>
              <p className="font-semibold">- xXRocketMasterXx</p>
            </Card>
            <Card className="p-6 bg-blue-700">
              <p className="mb-4">
                "Finding scrims has never been easier. Highly recommended for
                competitive teams!"
              </p>
              <p className="font-semibold">- AerialQueen</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Growing Community</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold mb-2">10,000+</p>
              <p>Active Players</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50,000+</p>
              <p>Matches Played</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p>Discord Servers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">
                Rocket League 6mans & Scrims
              </h3>
              <p>Elevate your game, one match at a time.</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-orange-500">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-orange-500">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
              <ul>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

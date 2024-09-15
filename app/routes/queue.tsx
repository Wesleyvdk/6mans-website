import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Menu, X, Users, Filter, Globe, User } from "lucide-react";
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

export default function QueuePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();

  const queues = [
    {
      id: 1,
      name: "Champion 6mans",
      region: "EU",
      players: 4,
      maxPlayers: 6,
      estimatedWait: "2 min",
    },
    {
      id: 2,
      name: "Diamond 6mans",
      region: "NA",
      players: 2,
      maxPlayers: 6,
      estimatedWait: "5 min",
    },
    {
      id: 3,
      name: "Grand Champion 6mans",
      region: "EU",
      players: 5,
      maxPlayers: 6,
      estimatedWait: "1 min",
    },
    {
      id: 4,
      name: "Platinum 6mans",
      region: "OCE",
      players: 1,
      maxPlayers: 6,
      estimatedWait: "10 min",
    },
  ];

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
            <a href="scrims" className="block py-2 hover:text-orange-500">
              Scrims
            </a>
            <a href="leagues" className="block py-2 hover:text-orange-500">
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

      {/* Queue Page Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Available Queues</h1>

        {/* Filters */}
        <Card className="mb-8 bg-blue-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rank-filter">Rank</Label>
                <Select>
                  <SelectTrigger id="rank-filter">
                    <SelectValue placeholder="Select Rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="champion">Champion</SelectItem>
                    <SelectItem value="grand-champion">
                      Grand Champion
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="region-filter">Region</Label>
                <Select>
                  <SelectTrigger id="region-filter">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="na">North America</SelectItem>
                    <SelectItem value="oce">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="queue-type">Queue Type</Label>
                <Select>
                  <SelectTrigger id="queue-type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Queue</SelectItem>
                    <SelectItem value="team">Team Queue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Queue List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {queues.map((queue) => (
            <Card key={queue.id} className="bg-blue-800">
              <CardHeader>
                <CardTitle>{queue.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Globe className="mr-2" />
                    <span>{queue.region}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2" />
                    <span>
                      {queue.players}/{queue.maxPlayers}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Est. Wait: {queue.estimatedWait}</span>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Join Queue
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cross-Server Queue Information */}
        <Card className="mt-8 bg-blue-800">
          <CardHeader>
            <CardTitle>Cross-Server Queueing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              You can now queue for 6mans across different Discord servers! This
              means more players and faster queue times.
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Globe className="mr-2" /> Enable Cross-Server Queueing
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 py-8 mt-12">
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

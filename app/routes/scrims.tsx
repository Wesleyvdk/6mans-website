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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Menu,
  X,
  Users,
  Filter,
  Globe,
  Calendar,
  Clock,
  User,
} from "lucide-react";
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
import { Form, Link, useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request, {});
};

export default function ScrimFinderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();

  const scrims = [
    {
      id: 1,
      teamName: "Rocket Rebels",
      rank: "Champion",
      region: "EU",
      matchType: "Best of 5",
      scheduledTime: "2023-06-20 18:00 UTC",
    },
    {
      id: 2,
      teamName: "Aerial Aces",
      rank: "Diamond",
      region: "NA",
      matchType: "Best of 3",
      scheduledTime: "2023-06-21 22:00 UTC",
    },
    {
      id: 3,
      teamName: "Boost Bandits",
      rank: "Grand Champion",
      region: "OCE",
      matchType: "Best of 7",
      scheduledTime: "2023-06-22 10:00 UTC",
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

      {/* Scrim Finder Page Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Scrim Finder</h1>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Available Scrims</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                Create Scrim
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-800">
              <DialogHeader>
                <DialogTitle>Create a New Scrim</DialogTitle>
                <DialogDescription>
                  Set up a scrim match for your team
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team-name" className="text-right">
                    Team Name
                  </Label>
                  <Input id="team-name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rank" className="text-right">
                    Rank
                  </Label>
                  <Select>
                    <SelectTrigger id="rank" className="col-span-3">
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">
                    Region
                  </Label>
                  <Select>
                    <SelectTrigger id="region" className="col-span-3">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="oce">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="match-type" className="text-right">
                    Match Type
                  </Label>
                  <Select>
                    <SelectTrigger id="match-type" className="col-span-3">
                      <SelectValue placeholder="Select Match Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bo3">Best of 3</SelectItem>
                      <SelectItem value="bo5">Best of 5</SelectItem>
                      <SelectItem value="bo7">Best of 7</SelectItem>
                      <SelectItem value="1hour">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="scheduled-time" className="text-right">
                    Scheduled Time
                  </Label>
                  <Input
                    id="scheduled-time"
                    type="datetime-local"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Scrim</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

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
                <Label htmlFor="match-type-filter">Match Type</Label>
                <Select>
                  <SelectTrigger id="match-type-filter">
                    <SelectValue placeholder="Select Match Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bo3">Best of 3</SelectItem>
                    <SelectItem value="bo5">Best of 5</SelectItem>
                    <SelectItem value="bo7">Best of 7</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scrim List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scrims.map((scrim) => (
            <Card key={scrim.id} className="bg-blue-800">
              <CardHeader>
                <CardTitle>{scrim.teamName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Users className="mr-2" />
                    <span>{scrim.rank}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="mr-2" />
                    <span>{scrim.region}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2" />
                    <span>{scrim.matchType}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>
                      {new Date(scrim.scheduledTime).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                  Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scrim History */}
        <Card className="mt-8 bg-blue-800">
          <CardHeader>
            <CardTitle>Scrim History</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-700">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Opponent</th>
                  <th className="text-left p-2">Result</th>
                  <th className="text-left p-2">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-700">
                  <td className="p-2">2023-06-15</td>
                  <td className="p-2">Rocket Rebels</td>
                  <td className="p-2 text-green-500">Win</td>
                  <td className="p-2">3 - 1</td>
                </tr>
                <tr className="border-b border-blue-700">
                  <td className="p-2">2023-06-10</td>
                  <td className="p-2">Aerial Aces</td>
                  <td className="p-2 text-red-500">Loss</td>
                  <td className="p-2">2 - 3</td>
                </tr>
                <tr>
                  <td className="p-2">2023-06-05</td>
                  <td className="p-2">Boost Bandits</td>
                  <td className="p-2 text-green-500">Win</td>
                  <td className="p-2">4 - 2</td>
                </tr>
              </tbody>
            </table>
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

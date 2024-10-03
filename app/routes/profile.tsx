import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Menu,
  X,
  Users,
  Trophy,
  BarChart,
  User,
  Gamepad2,
  Clock,
  Flame,
  Snowflake,
} from "lucide-react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { auth } from "~/auth.server";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import Leaderboard from "./leaderboard";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await auth.isAuthenticated(request, {});
  let stats = null;
  if (user) {
    const res = await fetch("https://api.aylanibot.app/api/users/show?id=1", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    stats = await res.json();
  }
  return { user, stats };
};
export default function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, stats } = useLoaderData<typeof loader>();

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

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        {/* User Profile Information */}
        <Card className="mb-8 bg-blue-800">
          <CardContent className="flex items-center space-x-4 p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
              />
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              <p className="text-blue-300">Rank: Champion II</p>
              <div className="flex space-x-2 mt-2">
                <Gamepad2 size={20} />
                <span>Epic, Steam</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/queue"
            className="bg-green-500 hover:bg-green-600 rounded-md inline-flex items-center justify-center"
          >
            <Users className="mr-2" /> Join 6mans Queue
          </Link>
          <Link
            to="/scrims"
            className="bg-purple-500 hover:bg-purple-600 rounded-md inline-flex items-center justify-center"
          >
            <Trophy className="mr-2" /> Find Scrim
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600">
                View Full Stats
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-800 text-white">
              <DialogHeader>
                <DialogTitle>Full Player Statistics</DialogTitle>
                <DialogDescription>
                  Detailed stats for JohnDoe
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stat</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Matches</TableCell>
                      <TableCell>{stats.total_games}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Wins</TableCell>
                      <TableCell>{stats.wins}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Losses</TableCell>
                      <TableCell>{stats.losses}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Win Rate</TableCell>
                      <TableCell>{(stats.wins / 1) * 100}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Goals</TableCell>
                      <TableCell>587</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Assists</TableCell>
                      <TableCell>342</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Saves</TableCell>
                      <TableCell>456</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MVPs</TableCell>
                      <TableCell>78</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average Score</TableCell>
                      <TableCell>742</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <Card className="mb-8 bg-blue-800">
          <CardHeader>
            <CardTitle>Career Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-semibold">Win Rate</p>
                <Progress
                  value={(stats.wins / stats.total_games) * 100}
                  className="mt-2"
                />
                <p className="text-right mt-1">
                  {(stats.wins / stats.total_games) * 100}%
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Matches Played</p>
                <p className="text-3xl font-bold mt-2">{stats.total_games}</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Current Streak</p>
                <div
                  className={`flex items-center ${
                    stats.streak > 0
                      ? "text-3xl text-orange-500"
                      : "text-3xl text-blue-500"
                  }`}
                >
                  {stats.streak > 0 ? (
                    <>
                      <Flame className="w-8 h-8 mr-1" />
                      <span>{stats.streak}</span>
                    </>
                  ) : (
                    <>
                      <Snowflake className="w-8 h-8 mr-1" />
                      <span>{Math.abs(stats.streak)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match History and Queue Status */}
        <Tabs defaultValue="history" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Match History</TabsTrigger>
            <TabsTrigger value="queue">Queue Status</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <Card className="bg-blue-800">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-700">
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Type</th>
                      <th className="p-4 text-left">Result</th>
                      <th className="p-4 text-left">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-700">
                      <td className="p-4">2023-06-15</td>
                      <td className="p-4">6mans</td>
                      <td className="p-4 text-green-500">Win</td>
                      <td className="p-4">3 - 2</td>
                    </tr>
                    <tr className="border-b border-blue-700">
                      <td className="p-4">2023-06-14</td>
                      <td className="p-4">Scrim</td>
                      <td className="p-4 text-red-500">Loss</td>
                      <td className="p-4">1 - 3</td>
                    </tr>
                    <tr>
                      <td className="p-4">2023-06-13</td>
                      <td className="p-4">6mans</td>
                      <td className="p-4 text-green-500">Win</td>
                      <td className="p-4">4 - 1</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="queue">
            <Card className="bg-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>Estimated wait time: 3 minutes</span>
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600">
                    Leave Queue
                  </Button>
                </div>
                <p>You are currently in queue for: 6mans - Champion Rank</p>
                <p className="mt-2">Players in queue: 4/6</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

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

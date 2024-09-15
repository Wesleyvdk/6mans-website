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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Menu, X, Users, Trophy, Calendar, Clock, User } from "lucide-react";
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

export default function LeaguesTournamentsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();

  const leagues = [
    {
      id: 1,
      name: "Champion League",
      teams: 8,
      matches: 28,
      startDate: "2023-07-01",
      endDate: "2023-08-31",
    },
    {
      id: 2,
      name: "Diamond Cup",
      teams: 16,
      matches: 60,
      startDate: "2023-07-15",
      endDate: "2023-09-15",
    },
  ];

  const tournaments = [
    {
      id: 1,
      name: "Grand Champion Showdown",
      teams: 32,
      format: "Single Elimination",
      date: "2023-07-22",
    },
    {
      id: 2,
      name: "Platinum Playoffs",
      teams: 64,
      format: "Double Elimination",
      date: "2023-08-05",
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

      {/* Leagues and Tournaments Page Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Leagues & Tournaments</h1>

        <Tabs defaultValue="leagues" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          </TabsList>
          <TabsContent value="leagues">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Active Leagues</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Create League
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-blue-800">
                  <DialogHeader>
                    <DialogTitle>Create a New League</DialogTitle>
                    <DialogDescription>
                      Set up a new league for teams to join
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="league-name" className="text-right">
                        League Name
                      </Label>
                      <Input id="league-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="teams" className="text-right">
                        Number of Teams
                      </Label>
                      <Input id="teams" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">
                        End Date
                      </Label>
                      <Input id="end-date" type="date" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create League</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leagues.map((league) => (
                <Card key={league.id} className="bg-blue-800">
                  <CardHeader>
                    <CardTitle>{league.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Users className="mr-2" />
                        <span>{league.teams} Teams</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="mr-2" />
                        <span>{league.matches} Matches</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2" />
                        <span>{league.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2" />
                        <span>{league.endDate}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                      View League
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tournaments">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Upcoming Tournaments</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Create Tournament
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-blue-800">
                  <DialogHeader>
                    <DialogTitle>Create a New Tournament</DialogTitle>
                    <DialogDescription>
                      Set up a new tournament for teams to join
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tournament-name" className="text-right">
                        Tournament Name
                      </Label>
                      <Input id="tournament-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="teams" className="text-right">
                        Number of Teams
                      </Label>
                      <Input id="teams" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="format" className="text-right">
                        Format
                      </Label>
                      <Select>
                        <SelectTrigger id="format" className="col-span-3">
                          <SelectValue placeholder="Select Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">
                            Single Elimination
                          </SelectItem>
                          <SelectItem value="double">
                            Double Elimination
                          </SelectItem>
                          <SelectItem value="round-robin">
                            Round Robin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input id="date" type="date" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Tournament</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="bg-blue-800">
                  <CardHeader>
                    <CardTitle>{tournament.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Users className="mr-2" />
                        <span>{tournament.teams} Teams</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="mr-2" />
                        <span>{tournament.format}</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <Calendar className="mr-2" />
                        <span>{tournament.date}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                      View Tournament
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* League/Tournament Stats */}
        <Card className="mb-8 bg-blue-800">
          <CardHeader>
            <CardTitle>Your League & Tournament Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Wins</TableHead>
                  <TableHead>Losses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Champion League</TableCell>
                  <TableCell>League</TableCell>
                  <TableCell>3rd</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Grand Champion Showdown</TableCell>
                  <TableCell>Tournament</TableCell>
                  <TableCell>Quarter-finalist</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Match Scheduling */}
        <Card className="bg-blue-800">
          <CardHeader>
            <CardTitle>Upcoming Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Opponent</TableHead>
                  <TableHead>League/Tournament</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-07-05</TableCell>
                  <TableCell>20:00 UTC</TableCell>
                  <TableCell>Rocket Rebels</TableCell>
                  <TableCell>Champion League</TableCell>
                  <TableCell>
                    <Button className="bg-green-500 hover:bg-green-600">
                      Reschedule
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-07-10</TableCell>
                  <TableCell>18:30 UTC</TableCell>
                  <TableCell>Aerial Aces</TableCell>
                  <TableCell>Champion League</TableCell>
                  <TableCell>
                    <Button className="bg-green-500 hover:bg-green-600">
                      Reschedule
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

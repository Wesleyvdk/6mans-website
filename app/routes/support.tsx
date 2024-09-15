import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Menu,
  X,
  HelpCircle,
  MessageSquare,
  FileText,
  Send,
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

export default function SupportPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();
  const faqs = [
    {
      question: "How do I join a 6mans queue?",
      answer:
        "To join a 6mans queue, go to the Queue page, select your rank and region, then click the 'Join Queue' button. You'll be notified when a match is ready.",
    },
    {
      question: "What happens if I disconnect during a match?",
      answer:
        "If you disconnect during a match, try to reconnect as soon as possible. If you can't reconnect, your team may forfeit the match. Repeated disconnects may result in temporary bans from the platform.",
    },
    {
      question: "How are ranks determined?",
      answer:
        "Ranks are initially based on your Rocket League competitive rank. As you play more matches on our platform, your rank will be adjusted based on your performance in 6mans and scrims.",
    },
    {
      question: "Can I queue with friends?",
      answer:
        "6mans queues are designed for solo players. However, you can create or join a team for scrims and tournaments to play with friends.",
    },
    {
      question: "How do I report a player for misconduct?",
      answer:
        "To report a player, go to your match history, find the relevant match, and click the 'Report Player' button. Fill out the form with as much detail as possible.",
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

      {/* Support Page Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Support Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <Card className="md:col-span-2 bg-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="bg-blue-800">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discord Support
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Rules & Guidelines
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <HelpCircle className="mr-2 h-4 w-4" />
                Tutorials
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Ticket Form */}
        <Card className="mt-8 bg-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2" />
              Submit a Support Ticket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="account">Account Problem</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question"
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </form>
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

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Gamepad2,
  Gauge,
  Globe,
  Terminal,
  UserRound,
  Building2,
  Car,
  Landmark,
  ShoppingBag,
  Lock,
  Store,
  Calculator,
  Dices,
  Puzzle,
  Zap,
  Eye,
  StickyNote,
  CheckSquare,
  KeyRound,
  Hash,
  ArrowRightLeft,
  Map,
  CloudSun,
  Users,
  Mail,
  Quote,
  Laugh,
  Cat,
  Utensils,
  Beef,
  MessageCircle,
} from "lucide-react";

export const projectIconMap = {
  BadgeCheck,
  Gamepad2,
  Gauge,
  Globe,
  Terminal,
  UserRound,
  Building2,
  Car,
  Landmark,
  ShoppingBag,
  Lock,
  Store,
  Calculator,
  Dices,
  Puzzle,
  Zap,
  Eye,
  StickyNote,
  CheckSquare,
  KeyRound,
  Hash,
  ArrowRightLeft,
  Map,
  CloudSun,
  Users,
  Mail,
  Quote,
  Laugh,
  Cat,
  Utensils,
  Beef,
  MessageCircle,
} satisfies Record<string, LucideIcon>;

export type ProjectIconName = keyof typeof projectIconMap;

export type ProjectItem = {
  id: number;
  icon: ProjectIconName;
  title: string;
  description: string;
  link: string;
};

export const projectsData = [
  // ─── S-Tier: Full-stack enterprise systems ───────────────────────────────
  {
    id: 1,
    icon: "Building2",
    title: "SONATRACH Nautique Manager",
    description:
      "Full-stack web application for managing a Nautical Center end-to-end. Covers member registrations, subscriptions, slot scheduling, billing, and detailed reporting with real-time monitoring.",
    link: "https://nautique-1.vercel.app/",
  },
  {
    id: 2,
    icon: "Car",
    title: "Mobilis Fleet Manager",
    description:
      "Enterprise vehicle fleet management system for tracking vehicles, scheduling maintenance, assigning drivers, and generating comprehensive operational reports with live monitoring.",
    link: "https://mobilis-gestion-du-parc-automobile.vercel.app/",
  },
  {
    id: 3,
    icon: "Landmark",
    title: "Enterprise Banking Platform",
    description:
      "Full-stack banking solution with separate user and admin interfaces. Manages accounts, processes transactions, and handles secure financial operations at scale.",
    link: "https://bank-eight-woad.vercel.app/",
  },

  // ─── A-Tier: Polished product-grade apps ─────────────────────────────────
  {
    id: 4,
    icon: "Store",
    title: "Shop Manager Pro",
    description:
      "Complete shop management suite with employee tracking, inventory control, daily workflow automation, financial reporting, and premium enterprise-store features.",
    link: "https://shop-manager-x3o9.vercel.app/",
  },
  {
    id: 5,
    icon: "ShoppingBag",
    title: "E-Clothes Store",
    description:
      "Modern e-commerce platform for fashion. Browse clothing and accessories, manage your cart, and complete purchases through a smooth and secure checkout flow.",
    link: "https://e-commerce-shop-seven-pearl.vercel.app/",
  },
  {
    id: 6,
    icon: "Lock",
    title: "Crypting Password",
    description:
      "Secure password manager for generating, saving, and encrypting credentials. Features easy management, encrypted local storage, and a clean user interface.",
    link: "https://crypting-password.vercel.app/",
  },

  // ─── B-Tier: Solid utility and learning projects ─────────────────────────
  {
    id: 7,
    icon: "UserRound",
    title: "Simple CRUD App",
    description:
      "Next.js + React + Tailwind + ShadCN app with combined login/signup and a users page for viewing and deleting accounts. A clean reference for full-stack CRUD flows.",
    link: "https://crud-auth-gray.vercel.app/",
  },
  {
    id: 8,
    icon: "Map",
    title: "World Explorer",
    description:
      "Browse detailed information for every country on Earth — flags, capitals, population, languages, currencies, and direct Google Maps integration.",
    link: "https://world-info-omega.vercel.app/",
  },
  {
    id: 9,
    icon: "CloudSun",
    title: "Weather Forecast",
    description:
      "Real-time weather updates with current temperature, multi-day forecasts, and location-based conditions in a clean, modern interface.",
    link: "https://dev-weather-hamza.vercel.app/",
  },
  {
    id: 10,
    icon: "KeyRound",
    title: "Password Generator Pro",
    description:
      "Generate strong passwords with custom naming and a saved history. Revisit previously generated passwords for complete account management.",
    link: "https://password-generator-tan-iota.vercel.app/",
  },
  {
    id: 11,
    icon: "ArrowRightLeft",
    title: "Money Transfer",
    description:
      "Send money instantly with secure transactions. Enter an amount, choose a recipient, and track the real-time transfer status from start to finish.",
    link: "https://transfer-money-two.vercel.app/",
  },

  // ─── C-Tier: Fun games and interactive demos ──────────────────────────────
  {
    id: 12,
    icon: "Calculator",
    title: "Equation Calc Game",
    description:
      "Math challenge game with 50+ progressive levels, background music, and special unlockable stages. Tests and trains mental calculation speed.",
    link: "https://equation-two.vercel.app/",
  },
  {
    id: 13,
    icon: "Dices",
    title: "Dice vs Bot",
    description:
      "Interactive dice game with smooth animations. Roll against a smart AI opponent and compete for the highest cumulative score.",
    link: "https://dice-web-game.vercel.app/",
  },
  {
    id: 14,
    icon: "Puzzle",
    title: "Mini Games Hub",
    description:
      "A browser-based collection of mini-games including puzzles, reaction tests, and skill challenges — quick entertainment for any break.",
    link: "https://mini-games-h.vercel.app/",
  },
  {
    id: 15,
    icon: "Gauge",
    title: "Guess the Word",
    description:
      "Word-guessing challenge driven by clues and logic. Test your vocabulary and uncover hidden words through deductive reasoning.",
    link: "https://abrain.vercel.app/",
  },
  {
    id: 16,
    icon: "Zap",
    title: "Pokémon Battle",
    description:
      "Quick Pokémon battle simulator. Draw a card by luck, face the bot, and find out who wins in this fast turn-based mini game.",
    link: "https://pokemon-battel.vercel.app/",
  },
  {
    id: 17,
    icon: "Eye",
    title: "Guess Who",
    description:
      "Enter any name and get predicted age, gender, and nationality from live API data. Interactive predictions complete with audio feedback.",
    link: "https://geuss-who.vercel.app/",
  },

  // ─── D-Tier: Handy micro-tools ────────────────────────────────────────────
  {
    id: 18,
    icon: "StickyNote",
    title: "NotePad Pro",
    description:
      "Distraction-free note-taking with sidebar organization. Create, edit, and manage all your notes in one minimal, focused interface.",
    link: "https://notepad-azure-xi.vercel.app/",
  },
  {
    id: 19,
    icon: "CheckSquare",
    title: "To-Do Manager",
    description:
      "Stay on top of your day with task creation, completion tracking, and priority management in a clean, modern productivity interface.",
    link: "https://to-do-app-puce-three.vercel.app/",
  },
  {
    id: 20,
    icon: "Users",
    title: "Random User Generator",
    description:
      "Generate random user profiles — name, gender, email, phone, and location — via the RandomUser.me API. Ideal for UI testing and seed data.",
    link: "https://get-alot-random-users.vercel.app/",
  },
  {
    id: 21,
    icon: "Mail",
    title: "Email Generator",
    description:
      "Instantly create free random email addresses with one-click copy. Perfect for testing, signups, or temporary use cases.",
    link: "https://random-free-email.vercel.app/",
  },
  {
    id: 22,
    icon: "Hash",
    title: "Counter App",
    description:
      "Simple counter with increment, decrement, and reset controls. Clean UI with smooth interactions for counting anything you need.",
    link: "https://timer-conter.vercel.app/",
  },

  // ─── E-Tier: Fun & showcase pages ─────────────────────────────────────────
  {
    id: 23,
    icon: "Utensils",
    title: "Syrian Delights",
    description:
      "Authentic Syrian cuisine showcase with menus, reviews, and rich cultural flavor. A digital window into Syria's culinary heritage.",
    link: "https://syrien.vercel.app/",
  },
  {
    id: 24,
    icon: "Beef",
    title: "Meet & Meat",
    description:
      "Premium BBQ and meat restaurant site with smoky vibes, menu highlights, and location details crafted for carnivore enthusiasts.",
    link: "https://meet-meat-alg.vercel.app/",
  },
  {
    id: 25,
    icon: "MessageCircle",
    title: "Discord Community",
    description:
      "Modern Discord server showcase featuring event announcements, community highlights, and a direct invite link to join the conversation.",
    link: "https://algerian-discored.vercel.app/",
  },
  {
    id: 26,
    icon: "Quote",
    title: "Daily Quotes",
    description:
      "Random motivational quotes served fresh on every click. A tiny daily dose of wisdom and inspiration whenever you need a lift.",
    link: "https://quote-day.vercel.app/",
  },
  {
    id: 27,
    icon: "Laugh",
    title: "Joke Generator",
    description:
      "Random jokes on demand. One click for a fresh punchline whenever you need a quick mood boost.",
    link: "https://joke-gen-ten.vercel.app/",
  },
  {
    id: 28,
    icon: "Cat",
    title: "Cat Images",
    description:
      "Endless random cat photos to brighten your day. Click for adorable feline content whenever you need a cuteness overload.",
    link: "https://cats-gen.vercel.app/",
  },
] as const satisfies readonly ProjectItem[];
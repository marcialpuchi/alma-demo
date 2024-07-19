import { Logo } from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#d9dea5] h-dvh flex items-center justify-center px-5">
      <header className="absolute inset-x-0 top-0">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Logo />
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end gap-2">
            <a
              href="/assessment"
              className="text-sm font-semibold leading-6 text-white bg-black rounded-full px-3.5 py-2.5"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>
      <main className="max-w-7xl py-10 flex flex-col items-center gap-5">
        <h1 className="text-7xl font-bold">Immigration made easy!</h1>
        <p className="text-lg my-5">
          Alma simplifies immigration for technologists, founders, and
          researchers with our top legal talent and user-friendly platform.
        </p>
        <a
          href="/assessment"
          className="text-sm font-semibold leading-6 text-white bg-black rounded-full py-5 px-7"
        >
          Start assessment of your case!
        </a>
      </main>
    </div>
  );
}

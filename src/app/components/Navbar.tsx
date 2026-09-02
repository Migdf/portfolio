import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">

      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-lg font-bold"
        >
          Michael Chen
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">

          <Link
            href="/#projects"
            className="transition hover:text-gray-500"
          >
            Projects
          </Link>

          <Link
            href="/experience"
            className="transition hover:text-gray-500"
          >
            Experience
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            className="transition hover:text-gray-500"
          >
            Resume
          </a>

        </div>

      </div>

    </nav>
  );
}
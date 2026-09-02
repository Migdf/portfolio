import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-lg font-bold text-white"
        >
          Michael Chen
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">

          <a
            href="/#projects"
            className="transition hover:text-white"
          >
            Projects
          </a>

          <Link
            href="/experience"
            className="transition hover:text-white"
          >
            Experience
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Resume
          </a>

        </div>
      </div>
    </nav>
  );
}
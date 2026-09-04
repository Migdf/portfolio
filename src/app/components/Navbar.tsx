"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleHomeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();

    if (pathname === "/") {
      window.history.replaceState(null, "", "/");

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    router.push("/");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      });
    });
  };

  const handleProjectsClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();

    if (pathname === "/") {
      window.history.replaceState(null, "", "/#projects");

      scrollToSection("projects");
      return;
    }

    router.push("/#projects");
  };

  const handleExperienceClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();

    if (pathname === "/") {
      window.history.replaceState(null, "", "/#experience");

      scrollToSection("experience");
      return;
    }

    router.push("/#experience");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Home */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="text-lg font-bold text-white"
        >
          Home
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">

          <Link
            href="/#projects"
            onClick={handleProjectsClick}
            className="whitespace-nowrap transition hover:text-white"
          >
            Projects
          </Link>

          <Link
            href="/#experience"
            onClick={handleExperienceClick}
            className="whitespace-nowrap transition hover:text-white"
          >
            Experience
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap transition hover:text-white"
          >
            Resume
          </a>

        </div>

      </div>

    </nav>
  );
}
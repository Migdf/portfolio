export default function Footer() {
  return (
    <footer className="border-t border-gray-800">

      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">

        <p>
          © 2026 Michael Chen
        </p>

        <div className="flex gap-5">

          <a
            href="https://github.com/Migdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/michaeldchen/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>

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

    </footer>
  );
}
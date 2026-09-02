export default function Footer() {
  return (
    <footer className="mt-1 border-t">

      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

        <p>
          © 2026 Michael Chen
        </p>

        <div className="flex gap-5">

          <a
            href="YOUR_GITHUB_URL"
            target="_blank"
            className="hover:text-black"
          >
            GitHub
          </a>

          <a
            href="YOUR_LINKEDIN_URL"
            target="_blank"
            className="hover:text-black"
          >
            LinkedIn
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            className="hover:text-black"
          >
            Resume
          </a>

        </div>

      </div>

    </footer>
  );
}
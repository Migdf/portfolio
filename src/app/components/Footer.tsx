export default function Footer() {
  return (
    <footer className="border-t border-gray-800">

      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">

        <p>
          © 2026 Michael Chen
        </p>


        <div className="flex items-center gap-3">

          <a
            href="https://github.com/Migdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-105"
          >
            <img
              src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white"
              alt="GitHub"
              className="h-6"
            />
          </a>


          <a
            href="https://www.linkedin.com/in/michaeldchen/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-105"
          >
            <img
              src="https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff"
              alt="LinkedIn"
              className="h-6"
            />
          </a>

        </div>

      </div>

    </footer>
  );
}
import Link from "next/link";

type ExperienceItemProps = {
  title: string;
  company: string;
  date: string;
  description: string;
  companyHref?: string;
  projectHref?: string;
  projectLabel?: string;
};

export default function ExperienceItem({
  title,
  company,
  date,
  description,
  companyHref,
  projectHref,
  projectLabel = "View Project →",
}: ExperienceItemProps) {
  return (
    <div className="max-w-3xl">

      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          {companyHref ? (
            <a
              href={companyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-gray-400 transition hover:text-white"
            >
              {company}
            </a>
          ) : (
            <p className="mt-1 text-[#B7BCC5]">
              {company}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-400">
          {date}
        </p>

      </div>

      <p className="mt-4 whitespace-pre-line leading-7 text-gray-200">
        {description}
      </p>

      {projectHref && (
        <Link
          href={projectHref}
          className="mt-4 inline-block font-medium text-gray-300 underline underline-offset-4 transition hover:text-white"
        >
          {projectLabel}
        </Link>
      )}

    </div>
  );
}
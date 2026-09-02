import Link from "next/link";

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-5 pb-16">

      <h1 className="text-4xl font-bold">
        Experience
      </h1>

      <div className="mt-10 max-w-3xl">

        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Data Analyst Intern
            </h2>

            <p className="mt-1 text-gray-600">
              IDX Exchange
            </p>
          </div>

          <p className="text-sm text-gray-500">
            June 2026 – September 2026
          </p>

        </div>

        <p className="mt-4 leading-7 text-gray-700">
          Built an end-to-end real estate analytics pipeline using 
          Python and large-scale MLS datasets, transforming raw 
          monthly data into analysis-ready datasets through data 
          cleaning, validation, feature engineering, outlier detection, 
          mortgage-rate integration, and geospatial enrichment. Developed 
          interactive Tableau dashboards to surface housing market trends, 
          pricing insights, geographic patterns, and competitive performance 
          across agents and offices.
        </p>

        <Link
          href="/projects/idx-analytics"
          className="mt-4 inline-block font-medium text-gray-700 underline underline-offset-4 hover:text-black"
        >
          View Project →
        </Link>

      </div>

    </main>
  );
}
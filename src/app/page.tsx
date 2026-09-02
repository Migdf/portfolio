import Link from "next/link";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 text-gray-100">

      <section className="mb-10 pt-6">

        <p className="mb-1 pl-1 text-sm uppercase tracking-[0.25em] text-gray-300">
          Portfolio
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
          Michael Chen
        </h1>

        <p className="mt-1 text-2xl font-medium text-gray-300">
          Machine Learning • Data Science • Computational Physics
        </p>

        <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-[#B7BCC5]">
          Current M.S. AI/ML, UW Seattle 2028 • B.S. Physics, UIUC 2026
        </p>

        <div className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          <p>
            I build machine learning and data-driven systems with interests in
            artificial intelligence, scientific computing, optimization, and analytics.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <a
            href="https://github.com/Migdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-5 py-3 font-medium text-gray-950 transition hover:bg-white"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/michaeldchen/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-5 py-3 font-medium text-gray-950 transition hover:bg-white"
          >
            LinkedIn
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-5 py-3 font-medium text-gray-950 transition hover:bg-white"
          >
            Resume
          </a>

        </div>

      </section>


      <section id="projects" className="scroll-mt-18">

        <div className="mb-10">

          <p className="text-sm uppercase tracking-[0.2em] text-gray-300">
            Selected Work
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Featured Projects
          </h2>

          <p className="mt-3 max-w-2xl text-[#B7BCC5]">
            A selection of machine learning, scientific computing,
            and data analytics projects.
          </p>

        </div>


        <div className="grid gap-8 md:grid-cols-2">

          <ProjectCard
            title="Real Estate Data Analytics Pipeline"
            description="Built an end-to-end analytics pipeline for MLS housing data, including data cleaning, feature engineering, geospatial enrichment, outlier detection, and interactive Tableau dashboards."
            technologies={[
              "Python",
              "Pandas",
              "GeoPandas",
              "Tableau",
              "Data Cleaning",
              "Feature Engineering",
              "Data Visualization",
            ]}
            href="/projects/idx-analytics"
            image="/images/idx-project.png"
          />

          <ProjectCard
            title="Machine Learning Neural Network Exploration"
            description="Developed Hopfield Networks and Restricted Boltzmann Machines from scratch without machine learning libraries."
            technologies={[
              "Python",
              "NumPy",
              "Machine Learning",
              "Hopfield Networks",
              "Restricted Boltzmann Machines",
              "Energy-Based Models",
            ]}
            href="/projects/machine-learning"
            image="/images/ml-corrupt.png"
          />

          <ProjectCard
            title="Galaxy Classification"
            description="Deep learning for galaxy morphology classification using astronomical images."
            technologies={[
              "Python",
              "PyTorch",
              "Computer Vision",
              "Deep Learning",
              "CNN",
            ]}
            href="/projects/galaxy-zoo"
            image="/images/galaxy-project.png"
          />

        </div>

      </section>

    </main>
  );
}
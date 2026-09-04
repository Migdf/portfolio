"use client";

import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ExperienceItem from "./components/ExperienceItem";
import CertificateItem from "./components/CertificateItem";
import { projects } from "./data/projects";

export default function Home() {
  const [projectPage, setProjectPage] = useState<number>(0);

  const projectsPerPage: number = 6;

  const start: number = projectPage * projectsPerPage;

  const visibleProjects = projects.slice(
    start,
    start + projectsPerPage
  );

  const totalPages: number = Math.ceil(
    projects.length / projectsPerPage
  );

  const goToProjectPage = (newPage: number): void => {
    setProjectPage(newPage);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const projectGrid =
          document.getElementById("project-cards");

        if (!projectGrid) return;

        const previousScrollBehavior =
          document.documentElement.style.scrollBehavior;

        document.documentElement.style.scrollBehavior = "auto";

        projectGrid.scrollIntoView({
          behavior: "auto",
          block: "start",
        });

        document.documentElement.style.scrollBehavior =
          previousScrollBehavior;
      });
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-6 text-gray-100">

      {/* Intro */}
      <section className="mb-10">

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


        {/* Social / Resume */}
        <div className="mt-8 flex flex-wrap items-center gap-3">

          <a
            href="https://github.com/Migdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-105"
          >
            <img
              src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white"
              alt="GitHub"
              className="h-8"
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
              className="h-8"
            />
          </a>


          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#222222] px-5 py-2 font-medium text-white transition hover:bg-[#2C2C2C]"
          >
            Resume
          </a>

        </div>

      </section>


      {/* Projects */}
      <section
        id="projects"
        className="scroll-mt-18 mb-20"
      >

        <div className="mb-10">

          <h2 className="mt-2 text-3xl font-bold text-white">
            Featured Projects
          </h2>

          <p className="mt-3 max-w-2xl text-[#B7BCC5]">
            A selection of machine learning, scientific computing,
            and data analytics projects.
          </p>

        </div>


        {/* Project cards */}
        <div
          id="project-cards"
          className="scroll-mt-20 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              href={project.href}
              image={project.image}
            />
          ))}
        </div>


        {/* Project pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center">

            <div className="flex items-center justify-center gap-3">

              <button
                type="button"
                onClick={() =>
                  goToProjectPage(
                    Math.max(projectPage - 1, 0)
                  )
                }
                disabled={projectPage === 0}
                className="rounded-lg border border-gray-700 px-4 py-2 text-xl text-gray-200 transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() =>
                  goToProjectPage(
                    Math.min(
                      projectPage + 1,
                      totalPages - 1
                    )
                  )
                }
                disabled={projectPage === totalPages - 1}
                className="rounded-lg border border-gray-700 px-4 py-2 text-xl text-gray-200 transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
              >
                →
              </button>

            </div>

            <span className="mt-2 text-center text-sm font-medium text-gray-400">
              {projectPage + 1} / {totalPages}
            </span>

          </div>
        )}

      </section>


      {/* Experience */}
      <section
        id="experience"
        className="scroll-mt-8 border-t border-gray-800 pt-10"
      >

        <h2 className="text-4xl font-bold text-white">
          Experience
        </h2>

        <div className="mt-10 space-y-12">

          <ExperienceItem
            title="Data Analyst Intern"
            company="IDX Exchange"
            date="June 2026 – September 2026"
            description={
              "Built an end-to-end real estate analytics pipeline using Python " +
              "and large-scale MLS datasets, transforming raw monthly data into " +
              "analysis-ready datasets through data cleaning, validation, feature " +
              "engineering, outlier detection, mortgage-rate integration, and geospatial " +
              "enrichment. Developed interactive Tableau dashboards to surface housing " +
              "market trends, pricing insights, geographic patterns, and competitive " +
              "performance across agents and offices."
            }
            projectHref="/projects/idx-analytics"
          />

        </div>

      </section>


      {/* Certifications */}
      <section
        id="certifications"
        className="mt-16 border-t border-gray-800 pt-10 pb-16"
      >

        <h2 className="text-4xl font-bold text-white">
          Certifications
        </h2>

        <div className="mt-10 space-y-10">

          <CertificateItem
            title="Intermediate Machine Learning"
            issuer="Kaggle"
            date="Issued August 2026"
            credentialUrl="https://www.kaggle.com/learn/certification/migdfme/intermediate-machine-learning"
          />

          <CertificateItem
            title="Intro to Machine Learning"
            issuer="Kaggle"
            date="Issued August 2026"
            credentialUrl="https://www.kaggle.com/learn/certification/migdfme/intro-to-machine-learning"
          />

        </div>

      </section>

    </main>
  );
}
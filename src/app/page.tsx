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
      <section className="relative mb-14 overflow-hidden pt-10 text-center">

        {/* Decorative stars */}
        <div className="pointer-events-none absolute inset-0 -z-10">

          {/* Left side */}
          <span className="absolute left-[5%] top-[8%] h-1 w-1 rounded-full bg-white/60" />
          <span className="absolute left-[8%] top-[20%] h-0.5 w-0.5 rounded-full bg-white/35" />
          <span className="absolute left-[11%] top-[34%] h-1 w-1 rounded-full bg-white/45" />
          <span className="absolute left-[14%] top-[14%] h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="absolute left-[16%] top-[46%] h-0.5 w-0.5 rounded-full bg-white/30" />
          <span className="absolute left-[18%] top-[28%] h-1 w-1 rounded-full bg-white/50" />
          <span className="absolute left-[21%] top-[10%] h-0.5 w-0.5 rounded-full bg-white/30" />
          <span className="absolute left-[23%] top-[38%] h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="absolute left-[26%] top-[18%] h-1 w-1 rounded-full bg-white/55" />
          <span className="absolute left-[29%] top-[30%] h-0.5 w-0.5 rounded-full bg-white/25" />
          <span className="absolute left-[31%] top-[7%] h-1 w-1 rounded-full bg-white/40" />
          <span className="absolute left-[34%] top-[44%] h-1 w-1 rounded-full bg-white/30" />
          <span className="absolute left-[37%] top-[22%] h-0.5 w-0.5 rounded-full bg-white/25" />

          <span className="absolute left-[7%] top-[58%] h-1 w-1 rounded-full bg-white/35" />
          <span className="absolute left-[12%] top-[70%] h-0.5 w-0.5 rounded-full bg-white/25" />
          <span className="absolute left-[18%] top-[62%] h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="absolute left-[24%] top-[76%] h-1 w-1 rounded-full bg-white/20" />
          <span className="absolute left-[30%] top-[66%] h-0.5 w-0.5 rounded-full bg-white/20" />
          <span className="absolute left-[36%] top-[56%] h-1 w-1 rounded-full bg-white/25" />
          <span className="absolute left-[9%] top-[82%] h-0.5 w-0.5 rounded-full bg-white/20" />
          <span className="absolute left-[16%] top-[86%] h-1 w-1 rounded-full bg-white/20" />
          <span className="absolute left-[28%] top-[84%] h-0.5 w-0.5 rounded-full bg-white/15" />

          {/* Right side */}
          <span className="absolute right-[5%] top-[10%] h-1 w-1 rounded-full bg-white/60" />
          <span className="absolute right-[8%] top-[24%] h-0.5 w-0.5 rounded-full bg-white/35" />
          <span className="absolute right-[11%] top-[36%] h-1 w-1 rounded-full bg-white/45" />
          <span className="absolute right-[14%] top-[16%] h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="absolute right-[17%] top-[48%] h-0.5 w-0.5 rounded-full bg-white/30" />
          <span className="absolute right-[19%] top-[30%] h-1 w-1 rounded-full bg-white/50" />
          <span className="absolute right-[22%] top-[11%] h-0.5 w-0.5 rounded-full bg-white/30" />
          <span className="absolute right-[24%] top-[40%] h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="absolute right-[27%] top-[20%] h-1 w-1 rounded-full bg-white/55" />
          <span className="absolute right-[30%] top-[32%] h-0.5 w-0.5 rounded-full bg-white/25" />
          <span className="absolute right-[32%] top-[8%] h-1 w-1 rounded-full bg-white/40" />
          <span className="absolute right-[35%] top-[45%] h-1 w-1 rounded-full bg-white/30" />
          <span className="absolute right-[38%] top-[23%] h-0.5 w-0.5 rounded-full bg-white/25" />

          <span className="absolute right-[7%] top-[60%] h-1 w-1 rounded-full bg-white/35" />
          <span className="absolute right-[13%] top-[72%] h-0.5 w-0.5 rounded-full bg-white/25" />
          <span className="absolute right-[19%] top-[64%] h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="absolute right-[25%] top-[78%] h-1 w-1 rounded-full bg-white/20" />
          <span className="absolute right-[31%] top-[68%] h-0.5 w-0.5 rounded-full bg-white/20" />
          <span className="absolute right-[37%] top-[58%] h-1 w-1 rounded-full bg-white/25" />
          <span className="absolute right-[10%] top-[84%] h-0.5 w-0.5 rounded-full bg-white/20" />
          <span className="absolute right-[18%] top-[88%] h-1 w-1 rounded-full bg-white/20" />
          <span className="absolute right-[29%] top-[85%] h-0.5 w-0.5 rounded-full bg-white/15" />

          {/* Center / near-title stars */}
          <span className="absolute left-[41%] top-[6%] h-0.5 w-0.5 rounded-full bg-white/25" />
          <span className="absolute left-[44%] top-[16%] h-1 w-1 rounded-full bg-white/20" />
          <span className="absolute left-[47%] top-[27%] h-0.5 w-0.5 rounded-full bg-white/20" />
          <span className="absolute left-[49%] top-[9%] h-1 w-1 rounded-full bg-white/15" />

          <span className="absolute right-[41%] top-[7%] h-0.5 w-0.5 rounded-full bg-white/25" />
          <span className="absolute right-[44%] top-[18%] h-1 w-1 rounded-full bg-white/20" />
          <span className="absolute right-[47%] top-[29%] h-0.5 w-0.5 rounded-full bg-white/20" />
          <span className="absolute right-[49%] top-[12%] h-1 w-1 rounded-full bg-white/15" />

          {/* Lower subtle stars */}
          <span className="absolute left-[42%] top-[62%] h-0.5 w-0.5 rounded-full bg-white/15" />
          <span className="absolute left-[46%] top-[74%] h-1 w-1 rounded-full bg-white/15" />
          <span className="absolute right-[43%] top-[64%] h-0.5 w-0.5 rounded-full bg-white/15" />
          <span className="absolute right-[47%] top-[76%] h-1 w-1 rounded-full bg-white/15" />

        </div>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[0.9] text-white md:text-8xl">
          Michael Chen
        </h1>

        <p className="mt-2 text-2xl font-medium text-gray-300">
          Machine Learning • Data Science • Computational Physics
        </p>

        <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-[#B7BCC5]">
          Current M.S. AI/ML, UW Seattle (EGT 2028)
        </p>

        <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-[#B7BCC5]">
          B.S. Physics, UIUC 2026
        </p>

        {/* Divider */}
        <div className="mx-auto mt-6 h-px w-48 bg-gray-700 md:w-64" />

        <div className="mx-auto mt-8 max-w-2xl text-left text-lg leading-8 text-gray-300">
          <p>
            I combine a background in physics with machine learning and
            scientific computing to build data-driven models for complex
            systems. My work sits at the intersection of computational physics
            and AI, using numerical methods, optimization, and machine learning
            to solve technical problems.
          </p>
        </div>


        {/* Social / Resume */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

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


        {/* Scroll down arrow */}
        <a
          href="#projects"
          aria-label="Scroll to projects"
          className="mt-8 inline-flex animate-bounce items-center justify-center text-gray-400 transition hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>

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
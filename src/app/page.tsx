"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import ProjectCard from "./components/ProjectCard";
import ExperienceItem from "./components/ExperienceItem";
import CertificateItem from "./components/CertificateItem";
import { projects } from "./data/projects";
import styles from "./page.module.css";

const stars = [
  // Far left
  { left: "2%", top: "9%", size: 2, opacity: 0.35 },
  { left: "4%", top: "31%", size: 3, opacity: 0.45, pulse: true, duration: 3.2, delay: 0.4 },
  { left: "6%", top: "18%", size: 2, opacity: 0.25 },
  { left: "7%", top: "52%", size: 4, opacity: 0.35 },
  { left: "9%", top: "72%", size: 2, opacity: 0.3, pulse: true, duration: 5.2, delay: 1.7 },
  { left: "11%", top: "39%", size: 3, opacity: 0.5 },
  { left: "12%", top: "12%", size: 2, opacity: 0.35 },
  { left: "14%", top: "61%", size: 2, opacity: 0.25 },
  { left: "15%", top: "25%", size: 4, opacity: 0.4, pulse: true, duration: 4.1, delay: 2.1 },
  { left: "17%", top: "82%", size: 3, opacity: 0.25 },
  { left: "18%", top: "44%", size: 2, opacity: 0.35 },
  { left: "20%", top: "7%", size: 3, opacity: 0.45, pulse: true, duration: 5.8, delay: 0.9 },
  { left: "21%", top: "67%", size: 2, opacity: 0.2 },
  { left: "23%", top: "32%", size: 3, opacity: 0.4 },
  { left: "25%", top: "16%", size: 2, opacity: 0.3 },
  { left: "26%", top: "53%", size: 4, opacity: 0.3, pulse: true, duration: 3.6, delay: 1.4 },
  { left: "28%", top: "77%", size: 2, opacity: 0.2 },
  { left: "29%", top: "26%", size: 3, opacity: 0.45 },
  { left: "31%", top: "10%", size: 2, opacity: 0.25 },
  { left: "32%", top: "62%", size: 3, opacity: 0.3, pulse: true, duration: 4.7, delay: 1.3 },
  { left: "34%", top: "38%", size: 2, opacity: 0.25 },
  { left: "36%", top: "20%", size: 3, opacity: 0.35 },
  { left: "38%", top: "71%", size: 2, opacity: 0.2 },

  // Center-left
  { left: "40%", top: "12%", size: 2, opacity: 0.25 },
  { left: "43%", top: "28%", size: 3, opacity: 0.3, pulse: true, duration: 5.5, delay: 2.2 },
  { left: "44.5%", top: "74%", size: 2, opacity: 0.18 },
  { left: "46%", top: "8%", size: 3, opacity: 0.22 },

  // Center
  { left: "48%", top: "37%", size: 2, opacity: 0.16 },
  { left: "49.5%", top: "15%", size: 2, opacity: 0.18 },

  // Divider area kept clear
  { left: "52.5%", top: "24%", size: 3, opacity: 0.25, pulse: true, duration: 4.3, delay: 0.6 },

  // Center-right
  { left: "54%", top: "78%", size: 2, opacity: 0.18 },
  { left: "56%", top: "11%", size: 3, opacity: 0.22 },
  { left: "59%", top: "29%", size: 3, opacity: 0.25, pulse: true, duration: 6.0, delay: 3.1 },
  { left: "60.5%", top: "69%", size: 2, opacity: 0.2 },

  // Right
  { left: "62%", top: "19%", size: 3, opacity: 0.35 },
  { left: "64%", top: "72%", size: 2, opacity: 0.2 },
  { left: "66%", top: "36%", size: 2, opacity: 0.25 },
  { left: "68%", top: "9%", size: 3, opacity: 0.4, pulse: true, duration: 3.4, delay: 1.8 },
  { left: "69%", top: "58%", size: 3, opacity: 0.3 },
  { left: "71%", top: "25%", size: 2, opacity: 0.3 },
  { left: "73%", top: "79%", size: 2, opacity: 0.2 },
  { left: "74%", top: "44%", size: 4, opacity: 0.3, pulse: true, duration: 5.0, delay: 0.5 },
  { left: "76%", top: "15%", size: 2, opacity: 0.3 },
  { left: "78%", top: "65%", size: 3, opacity: 0.35 },
  { left: "79%", top: "32%", size: 3, opacity: 0.4, pulse: true, duration: 3.8, delay: 2.5 },
  { left: "81%", top: "8%", size: 3, opacity: 0.45 },
  { left: "82%", top: "52%", size: 2, opacity: 0.3 },
  { left: "84%", top: "73%", size: 2, opacity: 0.25 },
  { left: "85%", top: "23%", size: 4, opacity: 0.4, pulse: true, duration: 5.6, delay: 1.1 },
  { left: "87%", top: "42%", size: 2, opacity: 0.35 },
  { left: "88%", top: "84%", size: 3, opacity: 0.25 },
  { left: "90%", top: "12%", size: 2, opacity: 0.35 },
  { left: "91%", top: "60%", size: 3, opacity: 0.4, pulse: true, duration: 4.5, delay: 3.2 },
  { left: "93%", top: "34%", size: 2, opacity: 0.3 },
  { left: "95%", top: "76%", size: 2, opacity: 0.25 },
  { left: "96%", top: "19%", size: 3, opacity: 0.45, pulse: true, duration: 3.7, delay: 2.1 },
  { left: "98%", top: "49%", size: 2, opacity: 0.3 },
];

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
      <section className="relative mb-14 pt-10 text-center">

        {/* Full-width star field */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 overflow-hidden">

          {stars.map((star, index) => {
            const starStyle = {
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,

              "--star-opacity": star.opacity,

              "--star-duration": star.pulse
                ? `${star.duration}s`
                : undefined,

              "--star-delay": star.pulse
                ? `${star.delay}s`
                : undefined,
            } as CSSProperties;

            return (
              <span
                key={`portfolio-star-${index}`}
                className={
                  star.pulse
                    ? `${styles.pulse} absolute rounded-full bg-white`
                    : "absolute rounded-full bg-white"
                }
                style={starStyle}
              />
            );
          })}

        </div>


        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[0.9] text-white md:text-8xl">
          Michael Chen
        </h1>

        <p className="mt-8 text-2xl font-medium text-gray-300">
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


        {/* Intro text */}
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
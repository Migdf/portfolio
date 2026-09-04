"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TechnologyBadge from "./TechnologyBadge";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectImage = {
  src: string;
  alt?: string;
  caption?: string;
};

type ProjectBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "image";
      image: ProjectImage;
    }
  | {
      type: "code";
      code: string;
    };

type ProjectSection = {
  title: string;
  blocks: ProjectBlock[];
};

type ProjectPageProps = {
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  technologies: string[];
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export default function ProjectPage({
  title,
  subtitle,
  image,
  video,
  technologies,
  sections,
  links = [],
}: ProjectPageProps) {
  const pathname = usePathname();

  const [selectedImage, setSelectedImage] =
    useState<ProjectImage | null>(null);

  const [activeSection, setActiveSection] =
    useState<string>("");

  const [tocTop, setTocTop] =
    useState<number>(96);

  const tocRef =
    useRef<HTMLDivElement | null>(null);


  const getSectionId = (
    title: string
  ): string =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");


  /* Always start each project page at the top */
  useEffect(() => {
    const previousScrollBehavior =
      document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior =
      "auto";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    document.documentElement.style.scrollBehavior =
      previousScrollBehavior;
  }, [pathname]);


  /* Track active section */
  useEffect(() => {
    if (sections.length === 0) return;

    const sectionElements = sections
      .map((section) =>
        document.getElementById(
          getSectionId(section.title)
        )
      )
      .filter(
        (element): element is HTMLElement =>
          element !== null
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                Math.abs(
                  a.boundingClientRect.top
                ) -
                Math.abs(
                  b.boundingClientRect.top
                )
            );

          if (
            visibleEntries.length > 0
          ) {
            setActiveSection(
              visibleEntries[0].target.id
            );
          }
        },
        {
          rootMargin:
            "-25% 0px -60% 0px",
          threshold: 0,
        }
      );

    sectionElements.forEach(
      (section) => {
        observer.observe(section);
      }
    );

    if (
      sectionElements.length > 0
    ) {
      setActiveSection(
        sectionElements[0].id
      );
    }

    return () => {
      observer.disconnect();
    };
  }, [sections]);


  /* Keep TOC vertically centered once reached */
  useEffect(() => {
    const updateTocPosition =
      (): void => {
        if (!tocRef.current) return;

        const tocHeight =
          tocRef.current.offsetHeight;

        const viewportHeight =
          window.innerHeight;

        const centeredTop =
          viewportHeight / 2 -
          tocHeight / 2;

        const minimumTop = 96;

        setTocTop(
          Math.max(
            centeredTop,
            minimumTop
          )
        );
      };

    updateTocPosition();

    window.addEventListener(
      "resize",
      updateTocPosition
    );

    const resizeObserver =
      new ResizeObserver(
        updateTocPosition
      );

    if (tocRef.current) {
      resizeObserver.observe(
        tocRef.current
      );
    }

    return () => {
      window.removeEventListener(
        "resize",
        updateTocPosition
      );

      resizeObserver.disconnect();
    };
  }, [sections]);


  return (
    <main className="mx-auto max-w-7xl px-6 pt-0 pb-8 text-gray-100">

      {/* Hero */}
      <section className="mb-8">

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-300">
          {subtitle}
        </p>


        {/* Technology badges */}
        <div className="mt-6 flex flex-wrap items-center gap-2">

          {technologies.map(
            (technology) => (
              <TechnologyBadge
                key={technology}
                technology={technology}
              />
            )
          )}

        </div>


        {/* Project links */}
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3">

            {links.map((link) => {
              const normalizedLabel =
                link.label.toLowerCase();

              let badgeUrl: string | null =
                null;


              /* GitHub / Source Code */
              if (
                normalizedLabel.includes(
                  "source"
                ) ||
                normalizedLabel.includes(
                  "github"
                )
              ) {
                badgeUrl =
                  "https://img.shields.io/badge/View_Source_Code-181717?logo=github&logoColor=white";
              }


              /* Tableau / Dashboard */
              else if (
                normalizedLabel.includes(
                  "dashboard"
                ) ||
                normalizedLabel.includes(
                  "tableau"
                )
              ) {
                badgeUrl =
                  "https://custom-icon-badges.demolab.com/badge/View_Dashboard-0176D3?logo=tableau&logoColor=fff";
              }


              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition hover:scale-105"
                >

                  {badgeUrl ? (
                    <img
                      src={badgeUrl}
                      alt={link.label}
                      title={link.label}
                      className="h-8"
                    />
                  ) : (
                    <span className="inline-block rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-950 transition hover:bg-white">
                      {link.label}
                    </span>
                  )}

                </a>
              );
            })}

          </div>
        )}

      </section>


      {/* Hero image or video */}
      <section className="mb-8">

        {video ? (
          <div className="aspect-video overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

            <iframe
              src={video}
              className="h-full w-full"
              allowFullScreen
              title={`${title} demo`}
            />

          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              setSelectedImage({
                src: image,
                alt: `${title} project`,
              })
            }
            className="block w-full cursor-zoom-in"
          >

            <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

              <Image
                src={image}
                alt={`${title} project`}
                fill
                className="object-contain p-2 transition-transform duration-300 hover:scale-[1.03]"
              />

            </div>

          </button>
        )}

      </section>


      {/* Main project content */}
      <div className="grid gap-20 md:grid-cols-[minmax(0,1fr)_260px]">

        {/* Project sections */}
        <div>

          {sections.map((section) => {
            const sectionId =
              getSectionId(
                section.title
              );

            return (
              <section
                key={section.title}
                id={sectionId}
                className="scroll-mt-14 mb-14 border-t border-gray-800 pt-10"
              >

                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {section.title}
                </h2>


                {section.blocks.map(
                  (block, index) => {

                    if (
                      block.type ===
                      "text"
                    ) {
                      return (
                        <p
                          key={index}
                          className="mt-4 whitespace-pre-line text-lg leading-8 text-gray-200"
                        >
                          {block.content}
                        </p>
                      );
                    }


                    if (
                      block.type ===
                      "image"
                    ) {
                      return (
                        <figure
                          key={index}
                          className="mt-6"
                        >

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedImage(
                                block.image
                              )
                            }
                            className="block w-full cursor-zoom-in"
                          >

                            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-gray-900">

                              <Image
                                src={
                                  block.image.src
                                }
                                alt={
                                  block.image.alt ||
                                  ""
                                }
                                fill
                                className="object-contain p-2 transition-transform duration-300 hover:scale-[1.03]"
                              />

                            </div>

                          </button>


                          {block.image.caption && (
                            <figcaption className="mt-2 text-center text-sm text-gray-400">
                              {
                                block.image
                                  .caption
                              }
                            </figcaption>
                          )}

                        </figure>
                      );
                    }


                    if (
                      block.type ===
                      "code"
                    ) {
                      return (
                        <pre
                          key={index}
                          className="mt-6 overflow-x-auto rounded-xl border border-gray-800 bg-black p-5 text-sm leading-6 text-gray-200"
                        >
                          <code>
                            {block.code}
                          </code>
                        </pre>
                      );
                    }


                    return null;
                  }
                )}

              </section>
            );
          })}

        </div>


        {/* Table of Contents */}
        <aside className="relative hidden md:block">

          <div
            ref={tocRef}
            className="
              group
              sticky
              ml-auto
              w-[240px]
            "
            style={{
              top: `${tocTop}px`,
            }}
          >

            <nav className="flex flex-col items-end gap-2">

              {sections.map(
                (section) => {
                  const sectionId =
                    getSectionId(
                      section.title
                    );

                  const isActive =
                    activeSection ===
                    sectionId;

                  return (
                    <a
                      key={section.title}
                      href={`#${sectionId}`}
                      className="
                        flex
                        min-h-5
                        w-full
                        items-center
                        justify-end
                        text-right
                      "
                    >

                      {/* Active section */}
                      <span
                        className={`
                          text-base
                          font-medium

                          ${
                            isActive
                              ? "block text-white group-hover:hidden"
                              : "hidden"
                          }
                        `}
                      >
                        {section.title}
                      </span>


                      {/* Inactive line */}
                      <span
                        className={`
                          h-[2px]
                          rounded-full
                          bg-gray-600

                          ${
                            isActive
                              ? "hidden"
                              : "block w-12 group-hover:hidden"
                          }
                        `}
                      />


                      {/* All section names on hover */}
                      <span
                        className="
                          hidden
                          text-base
                          font-medium
                          text-gray-400
                          hover:text-white
                          group-hover:block
                        "
                      >
                        {section.title}
                      </span>

                    </a>
                  );
                }
              )}

            </nav>

          </div>

        </aside>

      </div>


      {/* Image lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            type="button"
            onClick={() =>
              setSelectedImage(null)
            }
            className="absolute right-6 top-6 z-50 text-4xl font-light text-white transition hover:scale-110"
            aria-label="Close image"
          >
            ×
          </button>


          <div
            className="relative h-[85vh] w-[90vw] max-w-6xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <Image
              src={selectedImage.src}
              alt={
                selectedImage.alt ||
                ""
              }
              fill
              className="object-contain"
            />

          </div>

        </div>
      )}

    </main>
  );
}
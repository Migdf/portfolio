"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [selectedImage, setSelectedImage] =
    useState<ProjectImage | null>(null);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8 text-gray-100">

      <Link
        href="/#projects"
        className="mb-10 inline-block text-sm text-gray-400 transition hover:text-white"
      >
        ← Back to Projects
      </Link>


      {/* Hero */}
      <section className="mb-10">

        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-400">
          Project
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-300">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-200"
            >
              {technology}
            </span>
          ))}
        </div>


        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gray-100 px-5 py-3 font-medium text-gray-950 transition hover:bg-white"
              >
                {link.label}
              </a>
            ))}
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
      <div className="grid gap-12 md:grid-cols-[1fr_250px]">

        <div>

          {sections.map((section) => (
            <section
              key={section.title}
              className="mb-14 border-t border-gray-800 pt-10"
            >

              <h2 className="text-2xl font-bold tracking-tight text-white">
                {section.title}
              </h2>


              {section.blocks.map((block, index) => {

                /* Text block */
                if (block.type === "text") {
                  return (
                    <p
                      key={index}
                      className="mt-4 whitespace-pre-line text-lg leading-8 text-gray-300"
                    >
                      {block.content}
                    </p>
                  );
                }


                /* Image block */
                if (block.type === "image") {
                  return (
                    <figure key={index} className="mt-6">

                      <button
                        type="button"
                        onClick={() => setSelectedImage(block.image)}
                        className="block w-full cursor-zoom-in"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-gray-900">

                          <Image
                            src={block.image.src}
                            alt={block.image.alt || ""}
                            fill
                            className="object-contain p-2 transition-transform duration-300 hover:scale-[1.03]"
                          />

                        </div>
                      </button>


                      {block.image.caption && (
                        <figcaption className="mt-2 text-center text-sm text-gray-400">
                          {block.image.caption}
                        </figcaption>
                      )}

                    </figure>
                  );
                }


                /* Code block */
                if (block.type === "code") {
                  return (
                    <pre
                      key={index}
                      className="mt-6 overflow-x-auto rounded-xl border border-gray-800 bg-black p-5 text-sm leading-6 text-gray-200"
                    >
                      <code>{block.code}</code>
                    </pre>
                  );
                }


                return null;
              })}

            </section>
          ))}

        </div>


        {/* Sidebar */}
        <aside>

          <div className="sticky top-28">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Technologies
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-200"
                >
                  {technology}
                </span>
              ))}

            </div>

          </div>

        </aside>

      </div>


      {/* Image lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelectedImage(null)}
        >

          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 z-50 text-4xl font-light text-white transition hover:scale-110"
            aria-label="Close image"
          >
            ×
          </button>


          <div
            className="relative h-[85vh] w-[90vw] max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >

            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || ""}
              fill
              className="object-contain"
            />

          </div>

        </div>
      )}

    </main>
  );
}
import Image from "next/image";
import Link from "next/link";
import TechnologyBadge from "./TechnologyBadge";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  image: string;
};

export default function ProjectCard({
  title,
  description,
  technologies,
  href,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      scroll={true}
      className="group block overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition hover:border-gray-700"
    >

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">

        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
        />

      </div>


      {/* Content */}
      <div className="p-6">

        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-3 text-gray-300">
          {description}
        </p>


        {/* Technology badges */}
        <div className="mt-5 flex flex-wrap items-center gap-2">

          {technologies.map((technology) => (
            <TechnologyBadge
              key={technology}
              technology={technology}
            />
          ))}

        </div>

      </div>

    </Link>
  );
}
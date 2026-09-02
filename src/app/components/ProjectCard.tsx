import Image from "next/image";
import Link from "next/link";

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
      className="group block overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-800 bg-gray-900">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-3 text-gray-300">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-200"
            >
              {technology}
            </span>
          ))}
        </div>

        <p className="mt-6 font-medium text-gray-200 transition group-hover:text-white">
          View Project →
        </p>
      </div>
    </Link>
  );
}
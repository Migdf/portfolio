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
      className="group block overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-white">
    <Image
        src={image}
        alt={title}
        fill
        className="object-contain p-2"
    />
    </div>

      <div className="p-7">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-3 text-gray-600">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {technology}
            </span>
          ))}
        </div>

        <p className="mt-6 font-medium">
          View Project →
        </p>
      </div>
    </Link>
  );
}
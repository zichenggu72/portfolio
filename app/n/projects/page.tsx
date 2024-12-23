// app/projects/page.tsx
import Link from "next/link";
import Image from "next/image";
import circleImage from "../../assets/images/circle.png";

export default function ProjectsPage() {
  const projects = [
    {
      organization: "University of the Arts London",
      year: "2024",
      title: "The News Font",
      description: [
        "I designed an experimental typeface using discarded newspapers.",
        "Each character occupies equal space with 20% intentionally blacked out, symbolizing information gaps in modern news. Letters are dampened and adhered to windows, visible from both sides, encouraging multi-perspective interpretation of media.",
      ],
      images: [
        { src: circleImage, alt: "News Font Example 1" },
        { src: circleImage, alt: "News Font Example 2" },
        { src: circleImage, alt: "News Font Example 3" },
      ],
    },
    {
      organization: "Brand owner",
      year: "2024",
      title: "Good Nut Butter",
      description: [
        "I founded a passion-driven nut butter brand in China and managed every aspect of the brand from the ground up.",
        "From sourcing ingredients, crafting the product to creative marketing, I oversaw photography, social media content creation, and hands-on product and graphic design of packaging and market booths.",
      ],
      images: [
        { src: circleImage, alt: "Nut Butter Example 1" },
        { src: circleImage, alt: "Nut Butter Example 2" },
        { src: circleImage, alt: "Nut Butter Example 3" },
      ],
    },
  ];

  return (
    <div className="space-y-16">
      <h1 className="font-semibold mb-6">Projects</h1>

      {projects.map((project, index) => (
        <article key={index} className="space-y-4">
          {/* Organization and Year */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {project.organization}
            </span>
            <span className="text-sm text-gray-500">{project.year}</span>
          </div>

          {/* Title */}
          <h2 className="font-medium">{project.title}</h2>

          {/* Description */}
          <div className="space-y-4">
            {project.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {project.images.map((image, index) => (
              <div key={index} className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

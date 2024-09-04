// app/works/page.tsx
import Link from 'next/link';

export default function WorksPage() {
  const works = [
    {
      dateRange: "2024",
      title: "Proponent app 0 to 1",
      description: "Revolutionizing sales enablement through AI",
      projectUrl: "#"
    },
    {
      dateRange: "2023",
      title: "VMware Cloud Service Integration",
      description: "Unified workflow to augment cloud capabilities",
      projectUrl: "#"
    },
    {
      dateRange: "2023",
      title: "VMware Cloud Task Monitor",
      description: "Unbuckle a hidden behavior to facilitate task monitoring",
      projectUrl: "#"
    },
    {
      dateRange: "2021",
      title: "Securonix Policy Creation",
      description: "Streamline the process of building tailored policies",
      projectUrl: "#"
    }
  ];

  return (
    <div className="space-y-16">
      <h1 className="font-semibold mb-6">Works</h1>
      
      {works.map((work, index) => (
        <div key={index}>
          <div className="mb-4">
            {/* Title and Date row */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">
                  {work.title}
                  {work.projectUrl && (
                    <Link href={work.projectUrl} className="text-gray-500 inline-flex items-center ml-1">
                      ↗
                    </Link>
                  )}
                </span>
              </div>
              <span className="text-sm text-gray-500">{work.dateRange}</span>
            </div>
            
            {/* Description */}
            <p className="font-semibold mb-6">{work.description}</p>

            {/* Images */}
            <div className="mt-4 flex gap-8">
              <div className="w-[334px] aspect-video bg-gray-100 rounded-lg"></div>
              <div className="w-[334px] aspect-video bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


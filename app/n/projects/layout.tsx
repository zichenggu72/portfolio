import Link from 'next/link';

export default function ProjectsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="prose prose-xl">
        <div className="font-graphik">
          {children}
        </div>
      </section>
    );
  }
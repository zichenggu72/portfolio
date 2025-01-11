import Link from 'next/link';

export default function ProjectsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      
        <div className="font-graphik">
          {children}
        </div>
      
    );
  }
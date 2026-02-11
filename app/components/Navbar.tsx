import Link from "next/link";

const navItems = [
  { path: "/", name: "Works", color: "bg-orange-500" },
  { path: "/blog", name: "Blog", color: "bg-blue-500" },
  { path: "/n/projects", name: "Projects", color: "bg-yellow-500" },
  { path: "/n/create", name: "Create", color: "bg-green-300" },
  { path: "/n/thoughts", name: "Thoughts", color: "bg-green-700" },
  {
    path: "https://vercel.com/templates/next.js/portfolio-starter-kit",
    name: "Deploy",
    color: "bg-purple-500",
    isExternal: true
  },
];

const bottomNavItems = [
  { path: "/n/visitors", name: "Visitors", color: "bg-red-500" },
];

export function Navbar() {
  return (
    <aside className="w-full h-full flex flex-col font-konstant-grotesk -ml-[8px] mb-16 tracking-tight">
      <div className="h-[80%] flex items-center justify-center">
        <nav className="flex flex-col items-center justify-between space-y-8">
          {navItems.map(({ path, name, color, isExternal }) => (
            <Link
              key={path + name}
              href={path}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-3 px-4 text-center w-full text-base flex items-center"
            >
              <span className={`w-3 h-3 rounded-full mr-3 ${color}`}></span>
              {name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="h-[20%] flex items-center justify-center">
        <nav className="flex flex-col items-center justify-between space-y-8">
          {bottomNavItems.map(({ path, name, color }) => (
            <Link
              key={path + name}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-3 px-4 text-center w-full text-base flex items-center"
            >
              <span className={`w-3 h-3 rounded-full mr-3 ${color}`}></span>
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

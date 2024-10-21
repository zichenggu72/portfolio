import Link from "next/link";

const navItems = [
  { path: "/", name: "Home", color: "bg-red-500" },
  { path: "/", name: "", color: "bg-transparent" },
  { path: "/n/works", name: "Works", color: "bg-orange-500" },
  { path: "/n/projects", name: "Projects", color: "bg-yellow-500" },
  { path: "/n/create", name: "Create", color: "bg-green-300" },
  { path: "/n/thoughts", name: "Thoughts", color: "bg-green-700" },
];

export function Navbar() {
  return (
    <aside className="w-full h-full flex flex-col font-konstant-grotesk">
      <div className="h-[80%] flex items-center justify-center">
        <nav className="flex flex-col items-center justify-between space-y-8">
          {navItems.map(({ path, name, color }) => (
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
      <div className="h-[20%] flex items-center justify-center">
        <nav className="flex flex-col items-center justify-between space-y-8">
          <Link
            href="/n/visitors"
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-3 px-4 text-center w-full text-base flex items-center"
          >
            <span className="w-3 h-3 rounded-full mr-3 bg-red-500"></span>
            Visitors
          </Link>
        </nav>
      </div>
    </aside>
  );
}

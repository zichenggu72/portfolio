export default function WorksLayout({
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

// app/page.tsx
export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Profile */}
      <div className="space-y-2">
        <h1 className="text-xl font-medium">Zicheng Gu</h1>
        <p className="text-sm">Designer around the 🌍</p>
      </div>

      {/* Status Update */}
      <div className="bg-[#F8F8F8] p-4 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Updated Sep 18</p>
          <p>Exploring London Design Festival - so much fun!</p>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
      </div>

      {/* About Section */}
      <section>
        <h2 className="font-semibold mb-6">About me</h2>
        <div className="space-y-6">
          <p>I am a product designer with curiosity in the vast spectrum of design — from the elegant forms of furniture to the visual allure of graphics and print, the storytelling power of photography, the artistry of gastronomy, and objects infused with personality.</p>
          <p>This multifaceted approach to design fuels my work in the digital realm. I aspire to create software experiences that resonate on a human level.</p>
          <p>Through a blend of aesthetics, functionality, and empathy, I create digital products that not only solve problems but enrich lives, leaving people inspired and eager to explore further.</p>
        </div>
      </section>

      {/* This Site Section */}
      <section>
        <h2 className="font-semibold mb-6">This Site</h2>
        <div className="space-y-6">
          <p>I built this site to transform my aversion to portfolio updates into a passion for continuous learning and sharing, creating a space I'm eager to revisit and enhance. By showcasing everything I'm passionate about to a broader audience, I strive to inspire others while holding myself accountable to high standards of creativity and growth.</p>
          <p>This site is curated with the same care and personality I'd put into decorating my home. It's a space that reflects who I am and what I do.</p>
          <p>I've always found it fascinating to get to know someone through a well-maintained personal website. So whether you are a stranger, a friend, or somewhere in between – welcome. Make yourself comfortable in my digital home.</p>
        </div>
      </section>
    </div>
  );
}
// app/page.tsx
export default function HomePage() {
  const links = [
    { 
      label: 'Email', 
      value: 'oorange.design@gmail.com',
      href: 'mailto:oorange.design@gmail.com'
    },
    { 
      label: 'LinkedIn', 
      value: 'Zicheng Gu',
      href: 'https://linkedin.com/in/gudesign'
    },
    { 
      label: 'Instagram', 
      value: '@zichengguu',
      href: 'https://instagram.com/zichengguu'
    },
    { 
      label: 'Read.cv', 
      value: 'Zicheng Gu',
      href: 'https://read.cv/zichenggu'
    },
    { 
      label: 'GitHub', 
      value: 'zichenggu72',
      href: 'https://github.com/zichenggu72'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Profile */}
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Zicheng Gu</h1>
        <p className="text-sm">Designer around the 🌍</p>
      </div>

      {/* Status Update */}
      <div className="bg-[#F8F8F8] p-4 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Updated Jan 12</p>
          <p>Back from holiday in Seattle - great to chat with friends!</p>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
      </div>

      {/* About Section */}
      <section>
        <h2 className="font-semibold mb-2">About me</h2>
        <div className="space-y-4 text-gray-800">
          <p>I am a product designer with curiosity in the vast spectrum of design — from the elegant forms of furniture to the visual allure of graphics and print, the storytelling power of photography, the artistry of gastronomy, and objects infused with personality.</p>
          <p>This multifaceted approach to design fuels my work in the digital realm. I aspire to create software experiences that resonate on a human level.</p>
          <p>Through a blend of aesthetics, functionality, and empathy, I create digital products that not only solve problems but enrich lives, leaving people inspired and eager to explore further.</p>
        </div>
      </section>

      {/* This Site Section */}
      <section>
        <h2 className="font-semibold mb-2">This Site</h2>
        <div className="space-y-4 text-gray-800">
          <p>I built this site to transform my aversion to portfolio updates into a passion for continuous learning and sharing, creating a space I'm eager to revisit and enhance. By showcasing everything I'm passionate about to a broader audience, I strive to inspire others while holding myself accountable to high standards of creativity and growth.</p>
          <p>This site is curated with the same care and personality I'd put into decorating my home. It's a space that reflects who I am and what I do.</p>
          <p>I've always found it fascinating to get to know someone through a well-maintained personal website. So whether you are a stranger, a friend, or somewhere in between – welcome! Make yourself comfortable at my digital home.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-semibold mb-2">Find me elsewhere</h2>
        
        <div className="space-y-2">
          {links.map((link, index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-600 w-20">{link.label}</span>
              <span className="w-24" />
              <a 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
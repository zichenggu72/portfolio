import { BlogPosts } from "app/components/posts";
import { User } from "app/types/user";
import { Post } from "app/types/post";
import PostPreview from "app/components/PostPreview";

export default function Page() {
  const user: User = {
    name: "Zicheng Gu",
    description: "Designer around the 🌍",
  };
 
  // todo fetch with the latest post;
  const post: Post = {
    date: "Updated Sep 18",
    headline: "Exploring London Design Festival  -  so much fun!",
    previewUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  }
  
  return (
    <section className="mt-8 w-[80%]">
      {UserProfile(user)}
      {PostPreview(post)}
      {TextSection(
        "About me",
        `I am a product designer with curiosity in the vast spectrum of  
        design — from the elegant forms of furniture to the visual allure
        of graphics and print, the storytelling power of photography,
        the artistry of gastronomy, and objects infused with personality.\\n
        This multifaceted approach to design fuels my work in the digital realm.
        I aspire to create software experiences that resonate on a human level.\\n
        Through a blend of aesthetics, functionality, and empathy, I create digital 
        products that not only solve problems but enrich lives, leaving people 
        inspired and eager to explore further.`
      )}
      {TextSection(
        "This Site",
        `I built this site to transform my aversion to portfolio updates into a passion
        for continuous learning and sharing, creating a space I'm eager to revisit
        and enhance. By showcasing everything I’m passionate about to a broader
        audience, I strive to inspire others while holding myself accountable to
        high standards of creativity and growth.\\n
        This site is curated with the same care and personality I'd put into decorating my home.
        It's a space that reflects who I am and what I do. \\n
        I've always found it fascinating to get to know someone through a well-maintained personal 
        website. So whether you are a stranger, a friend, or somewhere in between – welcome. Make 
        yourself comfortable in my digital home. `
      )}
    </section>
  );
}

function UserProfile(user: User) {
  return (
    <div className="flex flex-col">
      <h1 className="text-[20px] font-medium mb-2 leading-[24px] text-[var(--sds-color-text-default-default)]">
        {user.name}
      </h1>
      <p className="text-[14px] font-normal leading-[16px] text-[var(--sds-color-text-default-default)]">
        {user.description}
      </p>
    </div>
  );
};

function TextSection(title: string, body: string) {
  return (
    <div className="flex-auto flex flex-col mt-10">
      <h1 className="mt-2 mb-2 font-semibold tracking-tighter">{title}</h1>
      {body.split('\\n').map((line, index) => (
        <>
          <p className="tracking-tighter mb-3">{line}</p>
        </>))}
    </div>
  );
}

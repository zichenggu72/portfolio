import { BlogPosts } from "app/components/posts";
import ProfileAvatar from "app/components/ProfileAvatar";
import { User } from "app/types/user";

export default function Page() {
  const user: User = {
    name: "John Doe",
    job: "Product designer in London",
    avatarUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    // other user properties...
  };
  return (
    <section>
      {UserProfile(user)}
      {TextSection(
        "About me",
        `I built this site to transform my aversion to portfolio updates into a passion for continuous learning and sharing, creating a space I'm eager to revisit and enhance. By showcasing everything I’m passionate about to a broader audience, I strive to inspire others while holding myself accountable to high standards of creativity and growth.
This site is curated with the same care and personality I'd put into decorating my home. It's a space that reflects who I am and what I do.
I've always found it fascinating to get to know someone through a well-maintained personal website. So whether you are a stranger, a friend, or somewhere in between – welcome. Make yourself comfortable in my digital home.`
      )}
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}

function UserProfile(user: User) {
  return (
    <div className="flex-auto flex flex-row">
      <ProfileAvatar
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
        size={80}
        name={user.name}
      />
      <div className="flex-auto flex flex-col">
        <h1 className="mt-2 mb-2 text-xl font-semibold tracking-tighter">
          {user.name}
        </h1>
        <h2 className="mb-4 text-xl tracking-tighter">{user.job}</h2>
      </div>
    </div>
  );
}

function TextSection(title: string, body: string) {
  return (
    <div className="flex-auto flex flex-col mt-10">
      <h1 className="mt-2 mb-2 font-semibold tracking-tighter">{title}</h1>
      <p className="mb-4 tracking-tighter">{body}</p>
    </div>
  );
}

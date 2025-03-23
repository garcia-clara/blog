import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

export default function Page() {

    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const posts = [
        {
          title: "My first post",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, dicta. Numquam ea cupiditate blanditiis soluta, consectetur quae magni dolorem? Aliquid cum perferendis, saepe quibusdam alias eligendi! Corrupti cumque ipsam libero.",
          date: "2022-01-01",
          author: "Clara Garcia",
          authorImage: "/images/avatar.png",
          slug: "01"
        },
        {
          title: "My second post",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, dicta. Numquam ea cupiditate blanditiis soluta, consectetur quae magni dolorem? Aliquid cum perferendis, saepe quibusdam alias eligendi! Corrupti cumque ipsam libero.",
          date: "2022-01-02",
          author: "Clara Garcia",
          authorImage: "/images/avatar.png",
          slug: "02"
        },
        {
          title: "My third post",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, dicta. Numquam ea cupiditate blanditiis soluta, consectetur quae magni dolorem? Aliquid cum perferendis, saepe quibusdam alias eligendi! Corrupti cumque ipsam libero.",
          date: "2022-01-03",
          author: "Clara Garcia",
          authorImage: "/images/avatar.png",
          slug: "03"
        },
        {
          title: "My fourth post",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, dicta. Numquam ea cupiditate blanditiis soluta, consectetur quae magni dolorem? Aliquid cum perferendis, saepe quibusdam alias eligendi! Corrupti cumque ipsam libero.",
          date: "2022-01-04",
          author: "Clara Garcia",
          authorImage: "/images/avatar.png",
          slug: "04"
        },
      ];

    return (
        <>
            <div className="flex flex-col items-center">
            <main className="p-3 flex flex-col gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px]  w-[900px]">
                {posts.map((post) => (
                <Link href={`/post/${post.slug}`}>
                    <div key={post.title} className="flex flex-col gap-1 border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px] p-4 w-full">
                        <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                        <h2 className="font-extrabold text-2xl">{post.title}</h2>
                        <p className="text-justify line-clamp-2">{post.description}</p>
                        <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={post.authorImage}/>
                        </Avatar>
                        <p className="font-extrabold">{post.author}</p>
                        </div>
                    </div>
                </Link>
                ))}
            </main>
            </div>
        </>
    )
  }
import AddPost from "@/features/post/add-post/add-post";

export default function Page() {

  return (
    <div className="flex flex-col items-center">
      <main className="p-3 flex flex-col gap-3 items-center sm:items-start border border-solid border-black/[.08] dark:border-white/[.145] rounded-[8px]  w-[900px]">
        <AddPost />
      </main>
    </div>
  );
}

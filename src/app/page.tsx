import { unstable_noStore as noStore } from "next/cache";
// import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const selection = await api.selections.getAll.query()
  console.log(selection)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
     
    </main>
  );
}

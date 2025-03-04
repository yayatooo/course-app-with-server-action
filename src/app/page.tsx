import { Banner } from "@/components/layout/banner";
import { Navbar } from "@/components/layout/navbar";

export default async function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <Navbar />
        <Banner />
      </main>
    </>
  );
}

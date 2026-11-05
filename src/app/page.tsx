import Banner from "@/components/Banner";
import RecentBooks from "@/components/RecentBooks";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <Banner></Banner>
        <RecentBooks></RecentBooks>
    </div>
  );
}

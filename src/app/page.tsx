import Banner from "@/components/Banner";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import RecentBooks from "@/components/RecentBooks";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <Banner></Banner>
        <RecentBooks></RecentBooks>
        <HowBorrowingWorks></HowBorrowingWorks>
    </div>
  );
}

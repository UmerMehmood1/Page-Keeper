import Category from "../Cards/Categories";
import BestSellingBooks from "../layout/BestSellingBooks";
import Hero from "../layout/Hero";
import RecentlySoldBooks from "../layout/RecentlySoldBooks";
import TrendingBooks from "../layout/TrendingBooks";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <main className=" px-4 py-12 md:px-6 lg:px-8 ">
        <Category />
        <BestSellingBooks />
        <TrendingBooks />
        <RecentlySoldBooks />
      </main>
    </div>
  );
};

export default HomePage;

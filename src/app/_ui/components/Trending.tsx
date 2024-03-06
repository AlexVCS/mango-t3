import { api } from "~/trpc/server";
import TrendingCard from "./TrendingCard";

const getTrendingData = async (search: string) => {
  const trendingData = await api.selections.getTrending.query({search})
  return trendingData
};

const Trending = async ({ search }: { search: string }) => {
  const trendingData = await getTrendingData(search);
  if (trendingData && trendingData.results < 1) return;
  return (
    <div className="text-entertainment-pure-white ml-4 overflow-scroll">
      <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">Trending</h1>
      {trendingData ? (
        <div
          className="mb-8 flex w-max flex-nowrap gap-4 md:gap-10"
          id="carousel"
        >
          {trendingData.data.map((selection) => {
            if (!selection.TrendingThumb?.large) return;
            return (
              <TrendingCard
                key={selection.id}
                id={selection.id}
                is_bookmarked={selection.is_bookmarked}
                title={selection.title}
                rating={selection.rating}
                category={selection.category}
                year={selection.year}
                imageString={selection.TrendingThumb?.large.slice(8)}
              />
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Trending;

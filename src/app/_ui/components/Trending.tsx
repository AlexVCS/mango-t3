"use client";

import { api } from "~/trpc/react";
import TrendingCard from "./TrendingCard";

const Trending = ({ search }: { search: string }) => {
  const { data: trendingData, isLoading } =
    api.selections.getTrending.useQuery({ search });
  if (trendingData && trendingData.results < 1)
    return (
      <div className="ml-4 text-entertainment-pure-white">
        <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">
          Trending
        </h1>
        <div>None Found</div>
      </div>
    );
  if(isLoading) return <div>Loading</div>
  return (
    <div className="ml-4 overflow-scroll text-entertainment-pure-white">
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

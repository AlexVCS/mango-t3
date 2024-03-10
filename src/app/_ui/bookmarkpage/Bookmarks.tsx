'use client'

import { api } from "~/trpc/react";
import Search from '~/app/_ui/components/Search'
import SectionComponent from '~/app/_ui/components/SectionComponent'
import { type ChangeEvent, useState } from 'react'

const Bookmarks = () => {
  const [search, setSearch] = useState('')

  const { data: bookmarkedMovieData, isLoading: loadingBookmarkedMovies } =
    api.selections.getBookmarkedMovies.useQuery({
      search,
    });

  const { data: bookmarkedSeriesData, isLoading: loadingBookmarkedSeries } = api.selections.getBookmarkedSeries.useQuery({
    search,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
     setSearch(e.target.value)
   }

  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      <SectionComponent
        section="Movies"
        isLoading={loadingBookmarkedMovies}
        sectionData={bookmarkedMovieData}
      />
      <SectionComponent
        section="TV Series"
        isLoading={loadingBookmarkedSeries}
        sectionData={bookmarkedSeriesData}
      />
    </div>
  );
}
export default Bookmarks

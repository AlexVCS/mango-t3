'use client'

import { SelectionWithRegularThumbs } from '@/types/db'
import { trpc } from '@/lib/server/trpc'
import Search from '~/app/_ui/components/Search'
import SectionComponent from '~/app/_ui/components/SectionComponent'
import { ChangeEvent, useState } from 'react'

const getBookmarkedSeriesData = (search: string) => {
  const seriesData = trpc.bookmarked_series.useQuery(search)
  return seriesData?.data?.data?.selections as SelectionWithRegularThumbs[]
}

const getBookmarkedMovieData = (search: string) => {
  const seriesData = trpc.bookmarked_movies.useQuery(search)
  return seriesData?.data?.data?.selections as SelectionWithRegularThumbs[]
}

const Bookmarks = () => {
  const [search, setSearch] = useState('')

  const bookmarkedSeriesData = getBookmarkedSeriesData(search)
  const bookmarkedMovieData = getBookmarkedMovieData(search)


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
     setSearch(e.target.value)
   }

  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      <SectionComponent section="Movies" sectionData={bookmarkedMovieData} />
      <SectionComponent section="TV Series" sectionData={bookmarkedSeriesData} />
    </div>
  )
}

export default Bookmarks

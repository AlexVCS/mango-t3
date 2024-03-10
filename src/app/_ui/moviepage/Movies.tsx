'use client'

import { api } from '~/trpc/react'
import Search from '~/app/_ui/components/Search'
import SectionComponent from '~/app/_ui/components/SectionComponent'
import { type ChangeEvent, useState } from 'react'

const Movies = () => {
  const [search, setSearch] = useState('')
  const { data: sectionData, isLoading } =
    api.selections.getMovies.useQuery({ search });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  
  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      <SectionComponent section="Movies" isLoading={isLoading} sectionData={sectionData} />
    </div>
  )
}

export default Movies

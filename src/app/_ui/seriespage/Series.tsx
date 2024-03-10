'use client'

import SectionComponent from '~/app/_ui/components/SectionComponent'
import Search from '../components/Search'
import { api } from "~/trpc/react";
import { type ChangeEvent, useState } from 'react'

const Series = () => {
  const [search, setSearch] = useState('')

  const { data: sectionData, isLoading } =
    api.selections.getRecommended.useQuery({ search });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="text-entertainment-greyish-blue">
      <Search search={search} handleChange={handleChange} />
      <SectionComponent section="TV Series" isLoading={isLoading} sectionData={sectionData} />
    </div>
  )
}

export default Series

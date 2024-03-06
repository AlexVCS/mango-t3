import SectionComponent from '~/app/_ui/components/SectionComponent'
import { api } from "~/trpc/server";

const getRecommendedData = async (search: string) => {
  const recommendedData = await api.selections.getRecommended.query({search})
  return recommendedData
}

const Recommended = async ({ search }: { search: string }) => {
  const sectionData = await getRecommendedData(search)
  console.log(sectionData)
  if (!sectionData) null

  return <SectionComponent sectionData={sectionData} section="Recommended" />
}

export default Recommended

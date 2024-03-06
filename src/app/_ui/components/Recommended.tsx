import SectionComponent from "~/app/_ui/components/SectionComponent";
import { api } from "~/trpc/server";

const getRecommendedData = (search: string) => {
  const recommendedData = api.selections.getRecommended.query({ search });
  return recommendedData;
};

const Recommended = ({ search }: { search: string }) => {
  const sectionData = getRecommendedData(search);
  console.log(sectionData);
  if (!sectionData) null;

  return <SectionComponent sectionData={sectionData} section="Recommended" />;
};

export default Recommended;

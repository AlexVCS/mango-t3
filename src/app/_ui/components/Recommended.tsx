'use client'

import SectionComponent from "~/app/_ui/components/SectionComponent";
import { api } from "~/trpc/react";

const Recommended = ({ search }: { search: string }) => {
  const { data: sectionData, isLoading } =
    api.selections.getRecommended.useQuery({ search });
  if (sectionData && sectionData.results < 1)
    return (
      <div className="ml-4 text-entertainment-pure-white">
        <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">
          Recommended
        </h1>
        <div>None Found</div>
      </div>
    );
  if (isLoading) return <div>Loading</div>;
  if (sectionData === undefined) return <div>Error</div>;
  return <SectionComponent sectionData={sectionData} section="Recommended" />;
};

export default Recommended;

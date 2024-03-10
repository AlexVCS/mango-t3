import RegularCard from "~/app/_ui/components/RegularCard";
import { type FC } from "react";
import { type RouterOutputs } from "~/trpc/shared";

interface SectionComponentProps {
  sectionData: RouterOutputs["selections"]["getRecommended"] | undefined;
  section: string;
  isLoading: boolean;
}

const SectionComponent: FC<SectionComponentProps> = ({
  sectionData,
  section,
  isLoading,
}) => {
  if (sectionData && sectionData.results < 1)
    return (
      <div className="ml-4 text-entertainment-pure-white">
        <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl">{section}</h1>
        <div>None Found</div>
      </div>
    );
  if (isLoading)
    return (
      <div>
        Loading
      </div>
    );
  if (sectionData === undefined) return <div>Error</div>;
  return (
    <div className="ml-4 text-entertainment-pure-white">
      <h1 className="mb-4 text-xl font-light md:mb-6 md:text-3xl lg:mb-8">
        {section}
      </h1>
      <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {sectionData?.data.map((selection) => {
          const largeThumb = selection.RegularThumb?.large.slice(8) || null;
          if (!largeThumb) return;
          return (
            <RegularCard
              key={selection.id}
              id={selection.id}
              title={selection.title}
              year={selection.year}
              category={selection.category}
              is_bookmarked={selection.is_bookmarked}
              rating={selection.rating}
              imageString={largeThumb}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SectionComponent;

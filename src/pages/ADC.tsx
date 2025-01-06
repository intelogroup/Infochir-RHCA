import { MainLayout } from "@/components/layouts/MainLayout";
import { AtlasTableOfContents } from "@/components/atlas/AtlasTableOfContents";
import { AtlasCard } from "@/components/atlas/AtlasCard";
import { atlasChapters } from "@/components/atlas/data/atlasChapters";
import { sortChaptersByDate } from "@/components/atlas/utils/chapterUtils";

const ADC = () => {
  const sortedChapters = sortChaptersByDate(atlasChapters);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-16 sm:pt-20 space-y-6 sm:space-y-8">
        <section className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary">
            Atlas de Diagnostic Chirurgical
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl">
            Explorez notre base de données visuelle de cas chirurgicaux pour améliorer votre pratique clinique.
          </p>
        </section>

        <section className="flex justify-between items-center">
          <AtlasTableOfContents />
        </section>

        <section className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedChapters.map((chapter) => (
            <AtlasCard key={chapter.id} chapter={chapter} />
          ))}
        </section>
      </div>
    </MainLayout>
  );
};

export default ADC;
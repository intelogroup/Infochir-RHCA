import { SearchBar } from "./index-medicus/SearchBar";
import { ArticlesTable } from "./index-medicus/ArticlesTable";
import { ArticlesGrid } from "./index-medicus/ArticlesGrid";
import { ViewModeToggle } from "./index-medicus/ViewModeToggle";
import { categories, sources } from "./index-medicus/constants";
import { useIndexMedicusSearch } from "@/hooks/useIndexMedicusSearch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export const IndexMedicusGrid = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSource,
    setSelectedSource,
    date,
    setDate,
    filteredArticles,
    error,
    handleSearch,
  } = useIndexMedicusSearch();

  if (!Array.isArray(categories) || !Array.isArray(sources)) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Une erreur de configuration est survenue. Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error 
            ? error.message 
            : 'Une erreur est survenue lors du chargement des articles. Veuillez réessayer.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          date={date}
          setDate={setDate}
          onSearch={handleSearch}
          categories={categories}
          sources={sources}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} className="mb-6" />

        {viewMode === 'table' ? (
          <ArticlesTable articles={filteredArticles} />
        ) : (
          <ArticlesGrid articles={filteredArticles} isLoading={false} />
        )}
      </div>
    </div>
  );
};
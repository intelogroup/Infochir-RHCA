
import { Badge } from "@/components/ui/badge";
import { BookOpen, LayoutGrid } from "lucide-react";

interface ArticleCategoriesProps {
  source: string;
  category: string;
}

export const ArticleCategories = ({ source, category }: ArticleCategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1.5 transition-transform hover:scale-105">
        <BookOpen className="h-3.5 w-3.5 text-primary" />
        <Badge variant="secondary" className="font-semibold text-xs px-2.5 py-0.5 bg-secondary/20 text-secondary-dark hover:bg-secondary/30 transition-colors">
          {source}
        </Badge>
      </div>
      <div className="flex items-center gap-1.5 transition-transform hover:scale-105">
        <LayoutGrid className="h-3.5 w-3.5 text-gray-500" />
        <Badge variant="outline" className="text-gray-600 text-xs font-medium border-gray-300 hover:bg-gray-100 transition-colors">
          {category}
        </Badge>
      </div>
    </div>
  );
};

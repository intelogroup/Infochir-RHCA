import { CardContent } from "@/components/ui/card";
import type { RhcaArticle } from "../types";

interface ArticleContentProps {
  article: RhcaArticle;
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <CardContent className="px-6 pb-6">
      <p className="text-gray-600 mb-4 line-clamp-3">
        {article.abstract}
      </p>
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary/5 text-primary text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </CardContent>
  );
};

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BookOpen } from "lucide-react";
import { CardActions } from "./CardActions";
import type { RhcaArticle } from "../types";

interface CardContentProps {
  article: RhcaArticle;
  pdfUrl: string | null;
}

export const CardContent: React.FC<CardContentProps> = ({ article, pdfUrl }) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-1.5 gap-2">
        <div className="flex items-center">
          <CalendarIcon className="mr-1 h-3 w-3 text-primary/60 flex-shrink-0" />
          <span className="font-medium truncate">
            {article.publicationDate ? new Date(article.publicationDate).toLocaleDateString('fr-FR') : 'Date non disponible'}
          </span>
        </div>
        {article.volume && article.issue && (
          <div className="flex items-center">
            <BookOpen className="mr-1 h-3 w-3 text-secondary/70 flex-shrink-0" />
            <span className="font-medium text-xs text-secondary-dark truncate">
              Vol. {article.volume}, N° {article.issue}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="font-semibold leading-tight line-clamp-2 mb-2 text-gray-800 hover:text-primary transition-colors">
        {article.title}
      </h3>
      
      {article.abstract && (
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2 overflow-hidden">
          {article.abstract}
        </p>
      )}
      
      <div className="flex flex-wrap gap-1.5 mt-auto mb-2 overflow-hidden">
        {article.tags && article.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="outline" className="px-2 py-0 text-xs bg-gray-50 hover:bg-gray-100 transition-colors truncate max-w-[120px]">
            {tag}
          </Badge>
        ))}
        {article.tags && article.tags.length > 3 && (
          <Badge variant="outline" className="px-2 py-0 text-xs bg-gray-50 hover:bg-gray-100 transition-colors">
            +{article.tags.length - 3}
          </Badge>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-auto pt-1">
        <CardActions article={article} pdfUrl={pdfUrl} />
      </div>
    </div>
  );
};

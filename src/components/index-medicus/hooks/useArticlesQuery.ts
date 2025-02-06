
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "../types";

const PAGE_SIZE = 10;

const mapDatabaseArticleToArticle = (dbArticle: any): Article => {
  console.log('Mapping database article:', dbArticle);
  
  // Extract author names from the article_authors relationship
  const authorNames = dbArticle.article_authors?.map((author: any) => author.member.name) || [];
  console.log('Extracted author names:', authorNames);

  const mappedArticle = {
    id: dbArticle.id,
    title: dbArticle.title,
    abstract: dbArticle.abstract,
    date: dbArticle.publication_date,
    source: dbArticle.source,
    category: dbArticle.category,
    authors: authorNames,
    tags: dbArticle.tags || [],
    imageUrl: dbArticle.image_url || undefined,
    views: dbArticle.views || 0,
    citations: dbArticle.citations || 0,
    pdfUrl: dbArticle.pdf_url || undefined,
    downloads: dbArticle.downloads || 0,
  };

  console.log('Mapped article:', mappedArticle);
  return mappedArticle;
};

export const useArticlesQuery = (page = 0) => {
  return useQuery({
    queryKey: ["articles", page],
    queryFn: async () => {
      console.log('Fetching articles for page:', page);
      
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from("articles")
        .select(`
          *,
          article_authors (
            member:members (
              name
            )
          )
        `, { count: 'exact' })
        .range(start, end)
        .order("publication_date", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }

      if (!data) {
        console.log('No data returned from query');
        return { articles: [], totalPages: 0 };
      }

      console.log('Raw data from Supabase:', data);
      const mappedArticles = data.map((article) => mapDatabaseArticleToArticle(article));
      const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

      console.log('Final mapped articles:', mappedArticles);
      return { articles: mappedArticles, totalPages };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep inactive data for 30 minutes
  });
};

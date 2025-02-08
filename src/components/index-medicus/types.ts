
export type ArticleSource = "RHCA" | "IGM" | "ADC";

export interface Article {
  id: string;
  title: string;
  authors: string[];
  date: string;
  publicationDate: string; // Added to match the required type
  category: string;
  source: ArticleSource;
  abstract: string;
  tags: string[];
  imageUrl?: string;
  views?: number;
  citations?: number;
  pdfUrl?: string;
  downloads?: number;
  shares?: number;
  status?: string;
  institution?: string;
  userId?: string;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  source: string;
  tags: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}
